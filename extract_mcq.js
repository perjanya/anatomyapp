const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

async function extractMCQs() {
  const docxPath = 'www/content/abdomen-pelvis/Inguinal canal.docx';
  
  try {
    const result = await mammoth.extractRawText({ path: docxPath });
    const text = result.value;
    
    console.log('=== FULL DOCUMENT TEXT ===\n');
    console.log(text);
    console.log('\n=== END OF DOCUMENT ===\n');
    
    // Look for MCQ patterns
    const mcqPattern = /___MCQ_START___([\s\S]*?)___MCQ_END___/g;
    const matches = text.match(mcqPattern);
    
    if (matches) {
      console.log(`\nFOUND ${matches.length} MCQ BLOCK(S)\n`);
      matches.forEach((match, index) => {
        console.log(`\n--- MCQ BLOCK ${index + 1} ---\n`);
        console.log(match);
      });
    } else {
      console.log('\nNO MCQ BLOCKS FOUND with ___MCQ_START___ / ___MCQ_END___ markers\n');
      
      // Search for alternative patterns
      const qPattern = /Q\d+\.|Question/gi;
      const qMatches = text.match(qPattern);
      if (qMatches) {
        console.log(`FOUND ${qMatches.length} potential question markers\n`);
        
        // Extract last 1000 characters to see end of document
        console.log('\n--- LAST 1000 CHARACTERS OF DOCUMENT ---\n');
        console.log(text.slice(-1000));
      }
    }
    
  } catch (error) {
    console.error('Error reading document:', error.message);
  }
}

extractMCQs();
