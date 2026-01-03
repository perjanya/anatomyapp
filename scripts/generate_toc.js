const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const marked = require('marked');

// Configuration
const sourceDir = path.join(__dirname, '..', 'content', 'upper-limb');
const outDataDir = path.join(__dirname, '..', 'data');

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
      const result = await mammoth.convertToHtml({path: full});
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
})();
