const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const marked = require('marked');

// Configuration - Process all regions
const contentDir = path.join(__dirname, '..', 'www', 'content');
const outDataDir = path.join(__dirname, '..', 'www', 'data');

if (!fs.existsSync(contentDir)) {
  console.error('Content directory does not exist:', contentDir);
  process.exit(1);
}
if (!fs.existsSync(outDataDir)) fs.mkdirSync(outDataDir, { recursive: true });

// Process a single region folder
async function processRegion(regionName) {
  const sourceDir = path.join(contentDir, regionName);
  if (!fs.existsSync(sourceDir)) {
    console.log(`Skipping ${regionName} - directory does not exist`);
    return [];
  }

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
      // include site CSS and topic-tools script (relative path from content/[region] -> ../../)
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
<script src="../../js/quadrant-interactive.js"></script>
<script src="../../js/topic-tools.js"></script>
<script src="../../data/flashcards-data.js"></script>
<script src="../../js/flashcards.js"></script>
</body>
</html>`;
      fs.writeFileSync(outHtmlPath, wrapped, 'utf8');
      items.push({ title, url: `content/${regionName}/${basename}.html` });
    } catch(err){
      console.error('Failed to process', file, err);
    }
  }

  console.log(`Processed ${regionName}: ${items.length} topics`);
  return items;
}

// Main execution
(async () => {
  // Get all region folders in content directory
  const regions = fs.readdirSync(contentDir)
    .filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());

  console.log(`Found regions: ${regions.join(', ')}\n`);

  // Process each region
  const allRegions = {};
  for (const region of regions) {
    const items = await processRegion(region);
    if (items.length > 0) {
      allRegions[region] = items;
    }
  }

  // Write combined TOC
  const outJson = path.join(outDataDir, 'toc.json');
  fs.writeFileSync(outJson, JSON.stringify(allRegions, null, 2), 'utf8');
  console.log(`\nWrote ${outJson} with ${Object.keys(allRegions).length} regions`);
  
  // Auto-process box markers
  console.log('\nProcessing box markers...');
  try {
    require('./process_boxes.js');
  } catch(err) {
    console.error('Error processing boxes:', err);
  }
  
  // Auto-process MCQs
  console.log('\nProcessing MCQs...');
  try {
    require('./process_mcqs.js');
  } catch(err) {
    console.error('Error processing MCQs:', err);
  }
  
  console.log('\n✓ Generation complete!');
})().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
