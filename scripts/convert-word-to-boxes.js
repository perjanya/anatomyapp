const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

/**
 * Convert Word documents to HTML with box formatting
 * Usage: node scripts/convert-word-to-boxes.js <inputFolder> <outputFolder>
 */

const inputFolder = process.argv[2] || 'c:\\Users\\pavan\\OneDrive\\Desktop\\Dr Vivek Files';
const outputFolder = process.argv[3] || path.join(__dirname, '..', 'www', 'content', 'dr-vivek-converted');

// Ensure output folder exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
  console.log(`Created output folder: ${outputFolder}`);
}

/**
 * Convert DOCX to HTML using mammoth
 */
async function convertDocxToHtml(filePath) {
  try {
    const result = await mammoth.convertToHtml({ path: filePath });
    return result.value;
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Detect and apply box formatting based on content patterns
 */
function applyBoxFormatting(html, fileName) {
  let processed = html;
  
  // Define patterns to detect box types (case-insensitive)
  const patterns = [
    {
      keywords: ['clinical', 'diagnosis', 'pathology', 'disease', 'disorder'],
      marker: '[CLINICAL]',
      example: 'Clinical information'
    },
    {
      keywords: ['warning', 'caution', 'danger', 'risk', 'contraindication'],
      marker: '[WARNING]',
      example: 'Warnings and cautions'
    },
    {
      keywords: ['important', 'note', 'remember', 'key', 'essential'],
      marker: '[NOTE]',
      example: 'Important notes'
    },
    {
      keywords: ['info', 'definition', 'anatomy', 'structure', 'about'],
      marker: '[INFO]',
      example: 'General information'
    },
    {
      keywords: ['tip', 'trick', 'technique', 'method', 'approach'],
      marker: '[TIP]',
      example: 'Helpful tips'
    }
  ];

  // Split by paragraphs
  const paragraphs = processed.split('</p>');
  
  processed = paragraphs.map((para, index) => {
    // Skip if empty
    if (!para.trim()) return para;
    
    // Extract text content for keyword matching
    const textContent = para.replace(/<[^>]*>/g, '').toLowerCase();
    
    // Check for matching keywords
    for (const pattern of patterns) {
      const hasKeyword = pattern.keywords.some(keyword => textContent.includes(keyword));
      if (hasKeyword && !para.includes('[')) {
        // Add marker if not already present
        return para.replace(/^(<p>)?/, (match) => {
          return match + pattern.marker;
        });
      }
    }
    
    return para;
  }).join('</p>');

  return processed;
}

/**
 * Create styled HTML page
 */
function createHtmlPage(content, title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../../css/anatomy-modern.css">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            max-width: 900px;
            margin: 0 auto;
        }
        
        h1, h2, h3 {
            color: #2c3e50;
            margin-top: 20px;
        }
        
        /* Box Styles */
        .clinical-box {
            background-color: #ffe6e6;
            border-left: 4px solid #e74c3c;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        .note-box {
            background-color: #f3e5f5;
            border-left: 4px solid #9c27b0;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        .info-box {
            background-color: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        .tip-box {
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        .success-box {
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div class="content">
        ${content}
    </div>
</body>
</html>`;
}

/**
 * Main conversion function
 */
async function convertWordDocuments() {
  console.log(`Converting Word documents from: ${inputFolder}`);
  console.log(`Output will be saved to: ${outputFolder}\n`);

  if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder not found: ${inputFolder}`);
    process.exit(1);
  }

  // Get all Word files recursively
  function getAllWordFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(getAllWordFiles(fullPath));
      } else if (item.name.endsWith('.docx') || item.name.endsWith('.doc')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const files = getAllWordFiles(inputFolder);

  if (files.length === 0) {
    console.log('No Word documents found in the input folder.');
    return;
  }

  console.log(`Found ${files.length} Word document(s)\n`);

  for (const filePath of files) {
    const fileName = path.parse(filePath).name;
    const folderName = path.basename(path.dirname(filePath));
    const categoryFolder = path.join(outputFolder, folderName);
    
    // Create category subfolder if needed
    if (!fs.existsSync(categoryFolder)) {
      fs.mkdirSync(categoryFolder, { recursive: true });
    }
    
    const htmlFileName = `${fileName}.html`;
    const outputPath = path.join(categoryFolder, htmlFileName);

    console.log(`Converting: ${path.relative(inputFolder, filePath)}`);
    
    try {
      // Convert DOCX to HTML
      const html = await convertDocxToHtml(filePath);
      
      if (html) {
        // Apply box formatting
        const formatted = applyBoxFormatting(html, fileName);
        
        // Create full HTML page
        const fullHtml = createHtmlPage(formatted, fileName);
        
        // Save the HTML file
        fs.writeFileSync(outputPath, fullHtml, 'utf8');
        console.log(`✓ Successfully converted to: ${htmlFileName}`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log(`\nConversion complete! Files saved to: ${outputFolder}`);
}

// Run the conversion
convertWordDocuments().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
