const fs = require('fs');
const path = require('path');

// Box type mappings
const boxPatterns = [
  { marker: /\[CLINICAL\](.*?)(\[\/CLINICAL\]|(?=<\/p>|<p>|\[))/gs, class: 'clinical-box' },
  { marker: /\[WARNING\](.*?)(\[\/WARNING\]|(?=<\/p>|<p>|\[))/gs, class: 'warning-box' },
  { marker: /\[NOTE\](.*?)(\[\/NOTE\]|(?=<\/p>|<p>|\[))/gs, class: 'note-box' },
  { marker: /\[INFO\](.*?)(\[\/INFO\]|(?=<\/p>|<p>|\[))/gs, class: 'info-box' },
  { marker: /\[TIP\](.*?)(\[\/TIP\]|(?=<\/p>|<p>|\[))/gs, class: 'tip-box' },
  { marker: /\[SUCCESS\](.*?)(\[\/SUCCESS\]|(?=<\/p>|<p>|\[))/gs, class: 'success-box' }
];

// YouTube video ID extraction
function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
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
  
  // Fix: Remove <p> tags wrapping video containers
  processed = processed.replace(/<p>(\s*<div class="video-container">[\s\S]*?<\/div>\s*)<\/p>/gi, '$1');
  
  // Process each box type
  for (const { marker, class: className } of boxPatterns) {
    processed = processed.replace(marker, (match, content) => {
      const cleanContent = content.trim();
      
      if (cleanContent.startsWith('<p>')) {
        return `<div class="${className}">${cleanContent}</div>`;
      } else {
        return `<div class="${className}"><p>${cleanContent}</p></div>`;
      }
    });
  }
  
  // Fix: Remove <p> tags wrapping box divs
  processed = processed.replace(/<p>(\s*<div class="[^"]*-box">[\s\S]*?<\/div>\s*)<\/p>/gi, '$1');
  
  return processed;
}

module.exports = function(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  content = processBoxes(content);
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Processed boxes in: ${path.basename(filePath)}`);
  } else {
    console.log(`  No boxes found in: ${path.basename(filePath)}`);
  }
};
