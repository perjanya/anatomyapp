const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'www', 'content');
const outDataDir = path.join(__dirname, '..', 'www', 'data');

if (!fs.existsSync(outDataDir)) fs.mkdirSync(outDataDir, { recursive: true });

// Get all region folders
const regions = fs.readdirSync(contentDir)
  .filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());

console.log(`Found regions: ${regions.join(', ')}\n`);

const allRegions = {};

for (const region of regions) {
  const regionDir = path.join(contentDir, region);
  const files = fs.readdirSync(regionDir)
    .filter(f => path.extname(f).toLowerCase() === '.html')
    .filter(f => !f.startsWith('.') && !f.startsWith('~'));
  
  const items = [];
  
  for (const file of files) {
    const basename = path.basename(file, '.html');
    const filePath = path.join(regionDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract title from <title> tag or first <h1>
    let title = basename;
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    const h1Match = content.match(/<h1[^>]*>(?:<a[^>]*><\/a>)*\s*([^<]+)/i);
    
    if (titleMatch) {
      title = titleMatch[1].trim();
    } else if (h1Match) {
      title = h1Match[1].trim();
    }
    
    items.push({
      title: title,
      url: `content/${region}/${file}`
    });
  }
  
  if (items.length > 0) {
    // Sort alphabetically
    items.sort((a, b) => a.title.localeCompare(b.title));
    allRegions[region] = items;
    console.log(`${region}: ${items.length} topics`);
  }
}

// Write TOC
const outJson = path.join(outDataDir, 'toc.json');
fs.writeFileSync(outJson, JSON.stringify(allRegions, null, 2), 'utf8');
console.log(`\nWrote ${outJson} with ${Object.keys(allRegions).length} regions`);
console.log('Total topics:', Object.values(allRegions).reduce((sum, items) => sum + items.length, 0));
