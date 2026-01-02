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
  const files = fs.readdirSync(sourceDir).filter(f => !f.startsWith('.'));
  const items = [];

  for (const file of files){
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);
    const full = path.join(sourceDir, file);

    try{
      if (ext === '.docx'){
        const result = await mammoth.convertToHtml({path: full});
        const html = result.value;
        // extract title: first heading or first line
        const titleMatch = html.match(/<h[1-6]>(.*?)<\/h[1-6]>/i);
        const title = titleMatch ? titleMatch[1].trim() : basename.replace(/[-_]/g,' ');
        const outHtmlPath = path.join(sourceDir, basename + '.html');
        // include site CSS and topic-tools script (relative path from content/upper-limb -> ../../)
        const wrapped = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="../../css/style.css"></head><body>${html}<script src="../../js/topic-tools.js"></script></body></html>`;
        fs.writeFileSync(outHtmlPath, wrapped);
        items.push({ title, url: `content/upper-limb/${basename}.html` });
      } else if (ext === '.md' || ext === '.markdown'){
        const md = fs.readFileSync(full, 'utf8');
        const titleMatch = md.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].trim() : basename.replace(/[-_]/g,' ');
        const html = marked(md);
        const outHtmlPath = path.join(sourceDir, basename + '.html');
        const wrapped = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="../../css/style.css"></head><body>${html}<script src="../../js/topic-tools.js"></script></body></html>`;
        fs.writeFileSync(outHtmlPath, wrapped);
        items.push({ title, url: `content/upper-limb/${basename}.html` });
      } else if (ext === '.html'){
        // leave existing html files as-is, but ensure they include topic-tools by appending a script tag if not present
        let html = fs.readFileSync(full, 'utf8');
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : basename.replace(/[-_]/g,' ');
        if (!/topic-tools\.js/.test(html)){
          // attempt to insert before </body>
          if (/<\/body>/i.test(html)){
            html = html.replace(/<\/body>/i, '<script src="../../js/topic-tools.js"></script></body>');
            fs.writeFileSync(full, html, 'utf8');
          }
        }
        items.push({ title, url: `content/upper-limb/${file}` });
      } else {
        // ignore other files
      }
    } catch(err){
      console.error('Failed to process', file, err);
    }
  }

  const outJson = path.join(outDataDir, 'toc-upper-limb.json');
  fs.writeFileSync(outJson, JSON.stringify(items, null, 2), 'utf8');
  console.log('Wrote', outJson, 'with', items.length, 'entries');
})();
