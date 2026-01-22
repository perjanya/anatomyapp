const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'www', 'content');
const outDataDir = path.join(__dirname, '..', 'www', 'data');

if (!fs.existsSync(outDataDir)) fs.mkdirSync(outDataDir, { recursive: true });

// Desired custom order per region (by HTML basename, exact match to filenames)
const desiredOrderByRegion = {
  'upper-limb': [
    'Clavicle',
    'Scapula',
    'Humerus',
    'Radius and Ulna',
    'Bones of the hand',
    'clavipectoral fascia',
    'Surgical anatomy of breast',
    'breastlymphatic', // Lymphatics of breast
    'Boundaries and contents of axilla',
    'Axillary artery and axillary vein',
    'Brachial plexus',
    'Muscles of upper limb',
    'deltoid',
    'Trapezius',
    'Latissimus dorsi',
    'Intermuscular spaces in scapular region',
    'Arterial anastomoses around the scapula',
    'Rotator cuff muscles',
    'Shoulder joint',
    'Biceps brachi and coracobrachialis',
    'Brachial artery',
    'Cubital fossa',
    'Elbow joint',
    'Supination and pronation',
    'Spaces of hand',
    'Palmar arterial arches',
    'Muscles of hand',
    'Movements of thumb and other fingers',
    'Anatomical snuffbox',
    'First carpometacarpal joint',
    'Median nerve',
    'Ulnar nerve',
    'Radial nerve',
    'Section through middle of right arm'
  ],
  'embryology': [
    'Cell cycle',
    'Mitosis',
    'Meiosis',
    'Spermatogenesis',
    'Oogenesis',
    // 'Ovarian follicles' (if added later)
    'Ovulation',
    'Fertilization',
    'Cleavage',
    'Implantation',
    'Week 2 Implantation and Bilaminar Disc Formation',
    'Week 3 Gastrulation and Trilaminar Disc Formation',
    'Gastrulation',
    'Oropharyngeal membrane and cloacal membrane',
    'Prechordal plate',
    'Primitive Streak',
    'Notochord', // Formation of notochord
    'Neural tube',
    'Neural crest cells and derivatives',
    'Fetal membranes',
    'Placenta',
    'Twinning',
    'Images and videos of embryology models'
  ]
};

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
    // Apply custom order if defined for this region, otherwise default alphabetical
    const desiredOrder = desiredOrderByRegion[region] || null;
    if (desiredOrder) {
      const indexMap = new Map(desiredOrder.map((name, idx) => [name.toLowerCase(), idx]));
      const getBasename = (url) => {
        const file = url.split('/').pop();
        return decodeURIComponent(file.replace(/\.html$/i, ''));
      };
      items.sort((a, b) => {
        const aBase = getBasename(a.url).toLowerCase();
        const bBase = getBasename(b.url).toLowerCase();
        const ai = indexMap.has(aBase) ? indexMap.get(aBase) : Number.POSITIVE_INFINITY;
        const bi = indexMap.has(bBase) ? indexMap.get(bBase) : Number.POSITIVE_INFINITY;
        if (ai !== bi) return ai - bi;
        return a.title.localeCompare(b.title);
      });
    } else {
      // Fallback alphabetical order
      items.sort((a, b) => a.title.localeCompare(b.title));
    }
    allRegions[region] = items;
    console.log(`${region}: ${items.length} topics`);
  }
}

// Write TOC
const outJson = path.join(outDataDir, 'toc.json');
fs.writeFileSync(outJson, JSON.stringify(allRegions, null, 2), 'utf8');
console.log(`\nWrote ${outJson} with ${Object.keys(allRegions).length} regions`);
console.log('Total topics:', Object.values(allRegions).reduce((sum, items) => sum + items.length, 0));
