const fs = require('fs');
const path = require('path');

/**
 * Post-process HTML files to convert MCQ markers into interactive MCQ HTML
 */

function processMCQsInHTML(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Check if file contains MCQ markers (with or without <p> tags)
  if (!html.includes('___MCQ_START___')) {
    return; // No MCQs to process
  }
  
  // Extract MCQ section - handle <p> wrapped markers
  // Pattern 1: <p>___MCQ_START___</p>...<p>___MCQ_END___</p> or with more underscores
  // Pattern 2: ___MCQ_START___ ... ___MCQ_END___ (or more underscores)
  const mcqMatch = html.match(/<p>___+MCQ_START___+<\/p>([\s\S]*?)<p>___+MCQ_END___+<\/p>/);
  const mcqMatch2 = html.match(/___+MCQ_START___+([\s\S]*?)___+MCQ_END___+/);
  
  if (!mcqMatch && !mcqMatch2) {
    console.warn(`  ⚠ MCQ markers found but malformed in: ${path.basename(htmlPath)}`);
    return;
  }
  
  const fullMatch = mcqMatch || mcqMatch2;
  const mcqText = fullMatch[1];
  const questions = parseMCQs(mcqText);
  
  if (questions.length === 0) {
    console.warn(`  ⚠ No valid MCQs parsed in: ${path.basename(htmlPath)}`);
    return;
  }
  
  // Generate interactive HTML
  const mcqHTML = generateMCQHTML(questions);
  
  // Replace the MCQ section with interactive HTML (handle both patterns, with variable underscores)
  html = html.replace(/<p>___+MCQ_START___+<\/p>[\s\S]*?<p>___+MCQ_END___+<\/p>/, mcqHTML);
  html = html.replace(/___+MCQ_START___+[\s\S]*?___+MCQ_END___+/, mcqHTML);
  
  // Clean up any <p> tags wrapping the MCQ container (invalid HTML)
  html = html.replace(/<p>(\s*<div class="mcq-container">[\s\S]*?<\/div>\s*)<\/p>/gi, '$1');
  
  // Write back
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`  ✓ Converted ${questions.length} MCQ(s) in: ${path.basename(htmlPath)}`);
}

function parseMCQs(text) {
  const questions = [];
  
  // Clean HTML tags to get plain text
  const cleanText = text
    .replace(/<\/p>/g, '\n')
    .replace(/<p>/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
  
  // Split by question separator (___) or question numbers
  const questionBlocks = cleanText.split(/___+/).filter(b => b.trim());
  
  for (const block of questionBlocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    
    // Find question line (starts with Q1., Q2., etc.)
    const questionLine = lines.find(l => /^Q\d+\./.test(l));
    if (!questionLine) continue;
    
    // Extract question text
    const questionText = questionLine.replace(/^Q\d+\.\s*/, '').trim();
    if (!questionText) continue;
    
    // Find options (lines starting with A., B., C., D., etc.)
    const options = [];
    let correctAnswer = null;
    
    for (const line of lines) {
      const optionMatch = line.match(/^([A-Z])\.\s*(.+)$/);
      if (optionMatch) {
        const [, letter, text] = optionMatch;
        
        // Check for correct answer markers
        const isCorrect = /\[CORRECT\]|\[✓\]|\[RIGHT\]|\[ANSWER\]/i.test(text);
        const cleanOptionText = text.replace(/\[CORRECT\]|\[✓\]|\[RIGHT\]|\[ANSWER\]/gi, '').trim();
        
        options.push({
          letter,
          text: cleanOptionText,
          correct: isCorrect
        });
        
        if (isCorrect) {
          correctAnswer = cleanOptionText;
        }
      }
    }
    
    // Validate: must have at least 2 options and exactly 1 correct answer
    if (options.length >= 2 && correctAnswer) {
      questions.push({
        question: questionText,
        options,
        correct: correctAnswer
      });
    }
  }
  
  return questions;
}

function generateMCQHTML(questions) {
  let html = `
<div class="mcq-container">
  <h2>📝 Test Your Knowledge</h2>
  <p>Click on your answer to see if you're correct!</p>
  `;
  
  questions.forEach((q, index) => {
    html += `
  <div class="mcq-question" data-correct="${escapeHTML(q.correct)}">
    <div class="mcq-question-text">
      ${index + 1}. ${escapeHTML(q.question)}
    </div>
    <ul class="mcq-options">`;
    
    q.options.forEach(opt => {
      html += `
      <li class="mcq-option" data-value="${escapeHTML(opt.text)}" data-correct="${opt.correct}">${escapeHTML(opt.text)}</li>`;
    });
    
    html += `
    </ul>
  </div>`;
  });
  
  html += `
</div>`;
  
  return html;
}

function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Process all HTML files in content directory
function processAllHTMLFiles(contentDir) {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.html'));
  
  let processedCount = 0;
  files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const before = fs.readFileSync(filePath, 'utf8');
    processMCQsInHTML(filePath);
    const after = fs.readFileSync(filePath, 'utf8');
    if (before !== after) processedCount++;
  });
  
  return processedCount;
}

// Main execution
try {
  const contentBaseDir = path.join(__dirname, '..', 'www', 'content');
  console.log('Reading content directory:', contentBaseDir);
  const regions = fs.readdirSync(contentBaseDir)
    .filter(f => fs.statSync(path.join(contentBaseDir, f)).isDirectory());
  
  console.log('Found regions:', regions);

  let totalCount = 0;

  for (const region of regions) {
    const regionDir = path.join(contentBaseDir, region);
    console.log(`Processing region: ${region}`);
    const count = processAllHTMLFiles(regionDir);
    totalCount += count;
  }

  if (totalCount > 0) {
    console.log(`✓ Processed MCQs in ${totalCount} file(s).`);
  }
  console.log('MCQ processing complete');
} catch (err) {
  console.error('Error processing MCQs:', err.message);
  console.error(err.stack);
}

module.exports = { processMCQsInHTML, parseMCQs };
