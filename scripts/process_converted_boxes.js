const fs = require('fs');
const path = require('path');

// Process HTML files to convert text markers to styled boxes
// Markers: [CLINICAL], [WARNING], [NOTE], [INFO], [TIP], [SUCCESS]

const convertedContentDir = path.join(__dirname, '..', 'www', 'content', 'dr-vivek-converted');

// Box type mappings with class names
const boxPatterns = [
  { marker: /\[CLINICAL\](.*?)(?:\[\/CLINICAL\]|(?=<\/p>|<p>|\[))/gs, class: 'clinical-box' },
  { marker: /\[WARNING\](.*?)(?:\[\/WARNING\]|(?=<\/p>|<p>|\[))/gs, class: 'warning-box' },
  { marker: /\[NOTE\](.*?)(?:\[\/NOTE\]|(?=<\/p>|<p>|\[))/gs, class: 'note-box' },
  { marker: /\[INFO\](.*?)(?:\[\/INFO\]|(?=<\/p>|<p>|\[))/gs, class: 'info-box' },
  { marker: /\[TIP\](.*?)(?:\[\/TIP\]|(?=<\/p>|<p>|\[))/gs, class: 'tip-box' },
  { marker: /\[SUCCESS\](.*?)(?:\[\/SUCCESS\]|(?=<\/p>|<p>|\[))/gs, class: 'success-box' }
];

// YouTube video ID extraction
function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function processBoxes(html) {
  let processed = html;
  
  // Process YouTube videos
  const youtubePattern = /\[YOUTUBE\](.*?)(?:\[\/YOUTUBE\]|(?=<\/p>|<p>|\[))/gi;
  processed = processed.replace(youtubePattern, (match, content) => {
    const videoId = extractYouTubeId(content.trim());
    if (videoId) {
      return `<div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
    title="YouTube video player" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>`;
    }
    return match;
  });
  
  // Process box markers
  for (const pattern of boxPatterns) {
    processed = processed.replace(pattern.marker, (match, content) => {
      const trimmedContent = content.trim();
      if (trimmedContent) {
        return `<div class="${pattern.class}"><p>${trimmedContent}</p></div>`;
      }
      return match;
    });
  }
  
  return processed;
}

// Get all HTML files recursively
function getAllHtmlFiles(dir) {
  let files = [];
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return files;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(getAllHtmlFiles(fullPath));
    } else if (item.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Main processing
function processAllFiles() {
  console.log(`Processing HTML files in: ${convertedContentDir}\n`);
  
  const htmlFiles = getAllHtmlFiles(convertedContentDir);
  
  if (htmlFiles.length === 0) {
    console.log('No HTML files found to process.');
    return;
  }

  let processedCount = 0;
  let boxCount = 0;

  for (const filePath of htmlFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const processed = processBoxes(content);
      
      // Count boxes found
      const boxMatches = processed.match(/class="(clinical-box|warning-box|note-box|info-box|tip-box|success-box)"/g);
      const fileBoxCount = boxMatches ? boxMatches.length : 0;
      
      if (fileBoxCount > 0 || content !== processed) {
        fs.writeFileSync(filePath, processed, 'utf8');
        processedCount++;
        boxCount += fileBoxCount;
        console.log(`✓ ${path.relative(convertedContentDir, filePath)}`);
        if (fileBoxCount > 0) {
          console.log(`  Found and styled ${fileBoxCount} box(es)`);
        }
      }
    } catch (error) {
      console.error(`✗ Error processing ${filePath}:`, error.message);
    }
  }

  console.log(`\n✓ Processing complete!`);
  console.log(`  Total files processed: ${processedCount}`);
  console.log(`  Total boxes styled: ${boxCount}`);
}

processAllFiles();
