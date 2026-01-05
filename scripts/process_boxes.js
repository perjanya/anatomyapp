const fs = require('fs');
const path = require('path');

// Process HTML files to convert text markers to styled boxes
// Markers: [CLINICAL], [WARNING], [NOTE], [INFO], [TIP], [SUCCESS]

const contentDir = path.join(__dirname, '..', 'www', 'content', 'upper-limb');

// Box type mappings
const boxPatterns = [
  { marker: /\[CLINICAL\](.*?)(\[\/CLINICAL\]|(?=<\/p>|<p>|\[))/gs, class: 'clinical-box' },
  { marker: /\[WARNING\](.*?)(\[\/WARNING\]|(?=<\/p>|<p>|\[))/gs, class: 'warning-box' },
  { marker: /\[NOTE\](.*?)(\[\/NOTE\]|(?=<\/p>|<p>|\[))/gs, class: 'note-box' },
  { marker: /\[INFO\](.*?)(\[\/INFO\]|(?=<\/p>|<p>|\[))/gs, class: 'info-box' },
  { marker: /\[TIP\](.*?)(\[\/TIP\]|(?=<\/p>|<p>|\[))/gs, class: 'tip-box' },
  { marker: /\[SUCCESS\](.*?)(\[\/SUCCESS\]|(?=<\/p>|<p>|\[))/gs, class: 'success-box' }
];

// YouTube video ID extraction (supports full URLs and short links)
function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/  // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function processBoxes(html) {
  let processed = html;
  
  // Process YouTube videos first
  // Pattern: [YOUTUBE]video_id_or_url[/YOUTUBE] or [YOUTUBE]video_id_or_url
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
    return match; // If invalid, leave as is
  });
  
  // Fix: Remove <p> tags wrapping video containers (invalid HTML)
  processed = processed.replace(/<p>(\s*<div class="video-container">[\s\S]*?<\/div>\s*)<\/p>/gi, '$1');
  
  // Process each box type
  for (const { marker, class: className } of boxPatterns) {
    processed = processed.replace(marker, (match, content) => {
      // Clean up the content
      const cleanContent = content.trim();
      
      // Check if content is already wrapped in <p> tags
      if (cleanContent.startsWith('<p>')) {
        return `<div class="${className}">${cleanContent}</div>`;
      } else {
        return `<div class="${className}"><p>${cleanContent}</p></div>`;
      }
    });
  }
  
  // Fix: Remove <p> tags wrapping box divs (invalid HTML)
  processed = processed.replace(/<p>(\s*<div class="[^"]*-box">[\s\S]*?<\/div>\s*)<\/p>/gi, '$1');
  
  return processed;
}

// Process all HTML files in the content directory
function processAllFiles() {
  const files = fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.html'));
  
  let processedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    content = processBoxes(content);
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      processedCount++;
      console.log(`✓ Processed boxes in: ${file}`);
    }
  }
  
  console.log(`\nProcessed ${processedCount} file(s) with box markers.`);
}

processAllFiles();
