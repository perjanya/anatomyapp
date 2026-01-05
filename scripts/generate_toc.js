const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const marked = require('marked');

// Configuration
const sourceDir = path.join(__dirname, '..', 'www', 'content', 'upper-limb');
const outDir = path.join(__dirname, '..', 'www', 'content', 'upper-limb');
const outDataDir = path.join(__dirname, '..', 'www', 'data');

if (!fs.existsSync(sourceDir)) {
  console.error('Source directory does not exist:', sourceDir);
  process.exit(1);
}
if (!fs.existsSync(outDataDir)) fs.mkdirSync(outDataDir, { recursive: true });

(async () => {
  const files = fs.readdirSync(sourceDir)
    .filter(f => !f.startsWith('.') && !f.startsWith('~')) // Skip hidden and temp files
    .filter(f => path.extname(f).toLowerCase() === '.docx'); // Only process .docx files
  const items = [];

  for (const file of files){
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);
    const full = path.join(sourceDir, file);

    try{
      // Configure mammoth to preserve paragraph styles as CSS classes
      const options = {
        path: full,
        styleMap: [
          // Map Word styles to HTML classes for boxes (using both style-name and style-id)
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
      // extract title: first heading or first line
      const titleMatch = html.match(/<h[1-6]>(.*?)<\/h[1-6]>/i);
      let title = titleMatch ? titleMatch[1].trim() : basename.replace(/[-_]/g,' ');
      
      // Clean up HTML tags from title
      title = title.replace(/<[^>]*>/g, '').trim();
      
      const outHtmlPath = path.join(sourceDir, basename + '.html');
      // include site CSS and topic-tools script (relative path from content/upper-limb -> ../../)
      const wrapped = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../../css/anatomy-modern.css">
</head>
<body>
<div class="content-wrapper">
<main class="topic-content">
${html}
</main>
</div>
<script src="../../js/interactive-features.js"></script>
<script src="../../js/topic-tools.js"></script>
</body>
</html>`;
      fs.writeFileSync(outHtmlPath, wrapped, 'utf8');
      items.push({ title, url: `content/upper-limb/${basename}.html` });
    } catch(err){
      console.error('Failed to process', file, err);
    }
  }

  const outJson = path.join(outDataDir, 'toc.json');
  fs.writeFileSync(outJson, JSON.stringify(items, null, 2), 'utf8');
  console.log('Wrote', outJson, 'with', items.length, 'entries');
  
  // Auto-process box markers
  console.log('\nProcessing box markers...');
  require('./process_boxes.js');
  
  // Auto-process MCQs
  console.log('\nProcessing MCQs...');
  require('./process_mcqs.js');
})();
