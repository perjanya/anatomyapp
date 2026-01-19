const fs = require('fs');
const path = require('path');

// Process HTML files to convert text markers to styled boxes
// Markers: [CLINICAL], [WARNING], [NOTE], [INFO], [TIP], [SUCCESS]

const contentBaseDir = path.join(__dirname, '..', 'www', 'content');

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
  
  // Process SVG files with optional animation directives
  // Pattern: [SVG]filename.svg|animations="id:type:count|id:type"[/SVG]
  // or simple: [SVG]filename.svg[/SVG]
  const svgPattern = /\[SVG\](.*?)(?:\[\/SVG\]|(?=<\/p>|<p>|\[))/gi;
  processed = processed.replace(svgPattern, (match, content) => {
    const contentTrim = content.trim();
    
    // Parse SVG filename and animation directive
    // Format: "filename.svg" or "filename.svg|animations="directive""
    const [filenamePart, ...rest] = contentTrim.split('|');
    let filename = filenamePart.trim();
    const animationPart = rest.join('|'); // Rejoin in case animation string contains pipes
    
    if (filename) {
      // Fix: Remove duplicate .svg extensions (e.g., "file.svg.svg" -> "file.svg")
      // Handle both plain and URL-encoded versions
      filename = filename.replace(/\.svg\.svg$/i, '.svg');
      filename = filename.replace(/\.svg%20\.svg$/i, '.svg');
      filename = filename.replace(/\.svg\.svg(%20|%\.)/i, '.svg$1');
      
      // Extract animation directive if present
      let dataAttr = '';
      let hasAnimations = false;
      if (animationPart) {
        // Parse: animations="id1:draw:5|id2:pulse"
        const animMatch = animationPart.match(/animations="([^"]*)"/i);
        if (animMatch && animMatch[1]) {
          dataAttr = ` data-animations="${animMatch[1]}"`;
          hasAnimations = true;
        }
      }
      
      // SVG files are in the same directory as the HTML file
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
  
  // Fix nested svg-container divs with data-animations - preserve outer div attributes
  // Pattern: <div class="svg-container" data-animations="..."><div class="svg-container">...<img.../></div></div>
  const nestedSvgWithData = /<div class="svg-container"(\s+data-animations="[^"]*")>\s*<div class="svg-container">([\s\S]*?)<\/div>\s*<\/div>/gi;
  processed = processed.replace(nestedSvgWithData, '<div class="svg-container"$1>$2</div>');
  
  // Fix: Remove remaining nested svg-container divs (without data-animations) - multiple passes
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
  
  // Fix: Remove <p> tags wrapping SVG containers (invalid HTML) - preserve data-animations
  processed = processed.replace(/<p>(\s*<div class="svg-container"[\s\S]*?<\/div>\s*)<\/p>/gi, '$1');
  
  // Process direct <img> tags that are SVG diagrams (from mammoth.js conversion)
  // This handles cases where SVG filenames are already in img tags without markers
  // Pattern: <img src="filename" ... class="responsive-svg" ... />
  
  // First, add .svg extension to img tags if missing (but already in svg-container)
  const imgSvgAlreadyWrapped = /<div class="svg-container"([^>]*)>\s*<img\s+src="([^"]+)"\s+alt="SVG Diagram"\s+class="responsive-svg"\s*\/>\s*<\/div>/gi;
  processed = processed.replace(imgSvgAlreadyWrapped, (match, attrs, src) => {
    let filename = src.trim();
    
    // Add .svg extension if missing
    if (!filename.toLowerCase().endsWith('.svg')) {
      filename = filename + '.svg';
    }
    
    // Return properly formatted container with preserved attributes
    return `<div class="svg-container"${attrs}>
  <img src="${filename}" alt="SVG Diagram" class="responsive-svg" />
</div>`;
  });
  
  // Then handle unwrapped img tags (wrap in svg-container and add extension)
  const imgSvgPattern = /<img\s+src="([^"]+)"\s+alt="SVG Diagram"\s+class="responsive-svg"\s*\/>/gi;
  processed = processed.replace(imgSvgPattern, (match, src) => {
    let filename = src.trim();
    
    // Add .svg extension if missing
    if (!filename.toLowerCase().endsWith('.svg')) {
      filename = filename + '.svg';
    }
    
    // Wrap in svg-container div
    return `<div class="svg-container">
  <img src="${filename}" alt="SVG Diagram" class="responsive-svg" />
</div>`;
  });
  
  // Also handle img tags wrapped in p tags (fix invalid HTML structure)
  processed = processed.replace(/<p>(\s*<img\s+src="([^"]+)"\s+alt="SVG Diagram"\s+class="responsive-svg"\s*\/>\s*)<\/p>/gi, (match, imgTag, src) => {
    let filename = src.trim();
    
    // Add .svg extension if missing
    if (!filename.toLowerCase().endsWith('.svg')) {
      filename = filename + '.svg';
    }
    
    // Wrap in svg-container div
    return `<div class="svg-container">
  <img src="${filename}" alt="SVG Diagram" class="responsive-svg" />
</div>`;
  });
  
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
  const regions = fs.readdirSync(contentBaseDir)
    .filter(f => fs.statSync(path.join(contentBaseDir, f)).isDirectory());
  
  let processedCount = 0;
  
  for (const region of regions) {
    const regionDir = path.join(contentBaseDir, region);
    const files = fs.readdirSync(regionDir)
      .filter(f => f.endsWith('.html'));
    
    for (const file of files) {
      const filePath = path.join(regionDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      
      content = processBoxes(content);
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        processedCount++;
        console.log(`✓ Processed boxes in: ${region}/${file}`);
      }
    }
  }
  
  console.log(`\nProcessed ${processedCount} file(s) with box markers.`);
}

processAllFiles();
