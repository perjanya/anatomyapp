const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

/**
 * Convert Word documents to HTML with box formatting
 * Specific for abdomen-pelvis folder
 */

const inputFolder = path.join(__dirname, '..', 'www', 'content', 'abdomen-pelvis');
const outputFolder = inputFolder; // Save in same folder

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
  
  const patterns = [
    {
      keywords: ['clinical', 'diagnosis', 'pathology', 'disease', 'disorder', 'fracture', 'injury'],
      marker: '[CLINICAL]',
      example: 'Clinical information'
    },
    {
      keywords: ['warning', 'caution', 'danger', 'risk', 'contraindication', 'dangerous', 'avoid'],
      marker: '[WARNING]',
      example: 'Warnings and cautions'
    },
    {
      keywords: ['important', 'note', 'remember', 'key', 'essential', 'crucial', 'significant'],
      marker: '[NOTE]',
      example: 'Important notes'
    },
    {
      keywords: ['info', 'definition', 'anatomy', 'structure', 'about', 'consist', 'composed'],
      marker: '[INFO]',
      example: 'General information'
    },
    {
      keywords: ['tip', 'trick', 'technique', 'method', 'approach', 'procedure', 'landmark'],
      marker: '[TIP]',
      example: 'Helpful tips'
    }
  ];

  // Split by paragraphs
  const paragraphs = processed.split('</p>');
  
  processed = paragraphs.map((para, index) => {
    if (!para.trim()) return para;
    
    const textContent = para.replace(/<[^>]*>/g, '').toLowerCase();
    
    for (const pattern of patterns) {
      const hasKeyword = pattern.keywords.some(keyword => textContent.includes(keyword));
      if (hasKeyword && !para.includes('[')) {
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

        img {
            max-width: 100%;
            height: auto;
            margin: 15px 0;
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
  console.log(`Converting Word documents from: ${inputFolder}\n`);

  if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder not found: ${inputFolder}`);
    process.exit(1);
  }

  // Get all Word files
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

  let successCount = 0;
  let skipCount = 0;

  for (const filePath of files) {
    const fileName = path.parse(filePath).name;
    const htmlFileName = `${fileName}.html`;
    const outputPath = path.join(path.dirname(filePath), htmlFileName);

    // Check if HTML already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⊘ Skipping: ${htmlFileName} (already exists)`);
      skipCount++;
      continue;
    }

    console.log(`Converting: ${htmlFileName}`);
    
    try {
      const html = await convertDocxToHtml(filePath);
      
      if (html) {
        const formatted = applyBoxFormatting(html, fileName);
        const fullHtml = createHtmlPage(formatted, fileName);
        
        fs.writeFileSync(outputPath, fullHtml, 'utf8');
        console.log(`  ✓ Successfully converted\n`);
        successCount++;
      }
    } catch (error) {
      console.error(`  ✗ Error processing ${fileName}: ${error.message}\n`);
    }
  }

  console.log(`\n✓ Conversion Complete!`);
  console.log(`  Newly converted: ${successCount}`);
  console.log(`  Skipped (already exist): ${skipCount}`);
  console.log(`  Total processed: ${successCount + skipCount}/${files.length}`);
}

convertWordDocuments().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
