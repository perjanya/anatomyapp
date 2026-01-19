const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

// Regenerate a single file
const fileName = process.argv[2];
if (!fileName) {
  console.error('Usage: node regenerate_single.js <filename-without-extension>');
  process.exit(1);
}

const region = process.argv[3] || 'upper-limb';
const sourceDir = path.join(__dirname, '..', 'www', 'content', region);
const docxPath = path.join(sourceDir, fileName + '.docx');
const htmlPath = path.join(sourceDir, fileName + '.html');

if (!fs.existsSync(docxPath)) {
  console.error(`File not found: ${docxPath}`);
  process.exit(1);
}

async function regenerateFile() {
  try {
    console.log(`Processing: ${fileName}.docx`);
    
    const options = {
      path: docxPath,
      styleMap: [
        "p[style-name='clinical-box'] => div.clinical-box:fresh",
        "p[style-id='clinical-box'] => div.clinical-box:fresh",
        "p[style-name='warning-box'] => div.warning-box:fresh",
        "p[style-id='warning-box'] => div.warning-box:fresh",
        "p[style-name='note-box'] => div.note-box:fresh",
        "p[style-id='note-box'] => div.note-box:fresh",
        "p[style-name='note1-box'] => div.note-box:fresh",
        "p[style-id='note1-box'] => div.note-box:fresh",
        "p[style-name='info-box'] => div.info-box:fresh",
        "p[style-id='info-box'] => div.info-box:fresh",
        "p[style-name='tip-box'] => div.tip-box:fresh",
        "p[style-id='tip-box'] => div.tip-box:fresh",
        "p[style-name='success-box'] => div.success-box:fresh",
        "p[style-id='success-box'] => div.success-box:fresh",
        "p[style-name='important-box'] => div.important-box:fresh",
        "p[style-id='important-box'] => div.important-box:fresh"
      ]
    };
    
    const result = await mammoth.convertToHtml(options);
    const html = result.value;
    
    // Extract title
    const titleMatch = html.match(/<h[1-6]>(.*?)<\/h[1-6]>/i);
    let title = titleMatch ? titleMatch[1].trim() : fileName.replace(/[-_]/g,' ');
    title = title.replace(/<[^>]*>/g, '').trim();
    
    const wrapped = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../../css/anatomy-modern.css">
<link rel="stylesheet" href="../../css/flashcards.css">
</head>
<body>
<div class="container">
  <main id="content">
    <section class="flashcard-toolbar" style="margin: 12px 0;">
      <button id="flashcard-parse" class="flashcard-btn">🧠 Flashcards</button>
      <div id="flashcard-container" style="display: none;"></div>
    </section>
${html}
  </main>
</div>
<script src="../../js/svg-animator.js"></script>
<script src="../../js/interactive-features.js"></script>
<script src="../../js/topic-tools.js"></script>
<script src="../../data/flashcards-data.js"></script>
<script src="../../js/flashcards.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(htmlPath, wrapped, 'utf8');
    console.log(`✓ Generated: ${fileName}.html`);
    
    // Process boxes
    console.log('\nProcessing boxes...');
    const processBoxes = require('./process_boxes_single.js');
    processBoxes(htmlPath);
    
    // Process MCQs
    console.log('\nProcessing MCQs...');
    const { processMCQsInHTML } = require('./process_mcqs.js');
    processMCQsInHTML(htmlPath);
    
    console.log('\n✓ File regeneration complete!');
  } catch(err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

regenerateFile();
