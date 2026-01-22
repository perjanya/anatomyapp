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
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,  // YouTube Shorts
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
  
  // Process SVG files with optional animation directives
  // Pattern: [SVG]filename.svg|animations="id:type:count|id:type"[/SVG] or simple: [SVG]filename.svg[/SVG]
  const svgPattern = /\[SVG\](.*?)(?:\[\/SVG\]|(?=<\/p>|<p>|\[))/gi;
  processed = processed.replace(svgPattern, (match, content) => {
    const contentTrim = content.trim();

    // Parse SVG filename and optional animations
    const [filenamePart, ...rest] = contentTrim.split('|');
    let filename = filenamePart.trim();
    const animationPart = rest.join('|');

    if (filename) {
      // Fix duplicate .svg extensions (e.g., "file.svg.svg" -> "file.svg")
      filename = filename.replace(/\.svg\.svg$/i, '.svg');

      // Extract animation directive
      let dataAttr = '';
      let hasAnimations = false;
      if (animationPart) {
        const animMatch = animationPart.match(/animations="([^"]*)"/i);
        if (animMatch && animMatch[1]) {
          dataAttr = ` data-animations="${animMatch[1]}"`;
          hasAnimations = true;
        }
      }

      // Ensure filename ends with .svg
      if (!filename.toLowerCase().endsWith('.svg')) {
        filename = filename + '.svg';
      }

      // Use <object> tag for animated SVGs to allow DOM access to internal elements
      // Use <img> tag for non-animated SVGs for better performance
      if (hasAnimations) {
        return `<div class="svg-container"${dataAttr}>
  <object data="${filename}" type="image/svg+xml" class="responsive-svg"></object>
</div>`;
      } else {
        return `<div class="svg-container"${dataAttr}>
  <img src="${filename}" alt="SVG Diagram" class="responsive-svg" />
</div>`;
      }
    }
    return match;
  });

  // Fix nested svg-container divs preserving data-animations
  const nestedSvgWithData = /<div class="svg-container"(\s+data-animations="[^"]*")>\s*<div class="svg-container">([\s\S]*?)<\/div>\s*<\/div>/gi;
  processed = processed.replace(nestedSvgWithData, '<div class="svg-container"$1>$2</div>');

  // Fix: Remove remaining nested svg-container divs - multiple passes
  let prevProcessed = '';
  let iterations = 0;
  const maxIterations = 20;
  while (prevProcessed !== processed && iterations < maxIterations) {
    prevProcessed = processed;
    // Remove double-nested divs
    processed = processed.replace(/<div class="svg-container">\s*<div class="svg-container">\s*([\s\S]*?)\s*<\/div>\s*<\/div>/gi, '<div class="svg-container">$1</div>');
    // Remove triple-nested and deeper
    processed = processed.replace(/<div class="svg-container">\s*<div class="svg-container">\s*<div class="svg-container">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi, '<div class="svg-container">$1</div>');
    iterations++;
  }

  // Fix: Remove <p> tags wrapping SVG containers (invalid HTML)
  processed = processed.replace(/<p>(\s*<div class="svg-container"[\s\S]*?<\/div>\s*)<\/p>/gi, '$1');
  
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
