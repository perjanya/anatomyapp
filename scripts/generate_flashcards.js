/**
 * Better Flashcard Generator
 * Reads HTML and creates context-aware Q/A pairs
 * - Matches definition-style sections: "Term: Description"
 * - Extracts from "What is...", "Define...", "Explain..." headings
 * - Avoids generic "Which of the following is true?" questions
 * - Avoids incomplete questions like "Second part?" without context
 * - Looks for [FLASHCARD] markers in HTML comments
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const contentDir = path.join(__dirname, '..', 'www', 'content');
const outFile = path.join(__dirname, '..', 'www', 'data', 'flashcards-data.js');

const flashcardsData = {};

// Helper: extract slug from filename
function getSlug(filename) {
  return filename
    .replace(/\.html$/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

// Helper: get SVG type from keywords
function getSvgType(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (/artery|vein|vessel|blood|circulation/.test(lower)) return 'artery';
  if (/nerve|neural|innervation|sensory|motor/.test(lower)) return 'nerve';
  if (/bone|skeletal|osseous|cartilage/.test(lower)) return 'bone';
  if (/muscle|myofascial|motor|contraction/.test(lower)) return 'muscle';
  if (/heart|cardiac|coronary|valve/.test(lower)) return 'heart';
  return null;
}

// Helper: check if text looks like a question
function isQuestion(text) {
  text = text.trim();
  return text.includes('?') || 
         text.toLowerCase().startsWith('what is') ||
         text.toLowerCase().startsWith('what are') ||
         text.toLowerCase().startsWith('define') ||
         text.toLowerCase().startsWith('explain') ||
         text.toLowerCase().startsWith('describe') ||
         text.toLowerCase().startsWith('which') ||
         text.toLowerCase().startsWith('how');
}

// Helper: is answer too short or generic
function isValidAnswer(text) {
  text = text.trim();
  return text.length > 15 && 
         !text.match(/^(Which of|List |The |A |An |Click on)/) &&
         !text.match(/^[A-Z]+\s*(part|content|relations)?$/) &&
         text !== 'Second part?' &&
         text !== 'Third part?' &&
         text !== 'First part?' &&
         text !== 'The ';
}

// Helper: clean and truncate answer
function cleanAnswer(text) {
  text = text.trim();
  if (text.length > 200) {
    text = text.substring(0, 197) + '...';
  }
  return text;
}

// Extract flashcards from section containing ":" definitions
function extractDefinitionPairs($, element) {
  const cards = [];
  const text = $(element).text();
  
  // Pattern: "Term: Definition" or "Term – Definition"
  const matches = text.match(/([A-Za-z\s\-()]+[?:])\s*([^.!?\n]*[.!?])/g);
  if (matches) {
    matches.forEach(match => {
      const parts = match.split(/[:–]\s*/);
      if (parts.length === 2) {
        const q = parts[0].trim().replace(/\?$/, '') + '?';
        const a = cleanAnswer(parts[1].trim());
        
        if (q.length > 5 && isValidAnswer(a)) {
          cards.push({
            q: q,
            a: a,
            svg: getSvgType(q + ' ' + a)
          });
        }
      }
    });
  }
  return cards;
}

// Extract from heading + paragraph pairs
function extractHeadingPairs($, headingSelector) {
  const cards = [];
  
  $(headingSelector).each((idx, el) => {
    const heading = $(el).text().trim();
    
    // Skip generic/incomplete headings
    if (heading === 'Second part?' || 
        heading === 'Third part?' ||
        heading === 'First part?' ||
        heading === '📝 Test Your Knowledge?' ||
        heading.match(/^(Relations?|Contents?|Applied|Features?)$/i) ||
        heading.match(/^Which of the following/)) {
      return;
    }
    
    // Get next paragraph
    let nextEl = $(el).next();
    while (nextEl.length && nextEl.prop('tagName')?.toLowerCase() !== 'p') {
      nextEl = nextEl.next();
    }
    
    if (nextEl.length) {
      const para = nextEl.text().trim();
      
      // Convert heading to question if needed
      let question = heading;
      if (!isQuestion(question)) {
        if (question.endsWith(':')) {
          question = question.slice(0, -1) + '?';
        } else {
          question = 'What is ' + question + '?';
        }
      }
      
      if (isValidAnswer(para)) {
        cards.push({
          q: question,
          a: cleanAnswer(para),
          svg: getSvgType(heading + ' ' + para)
        });
      }
    }
  });
  
  return cards;
}

// Process all HTML files
function processContentDirectory() {
  const regions = fs.readdirSync(contentDir).filter(f => {
    const stat = fs.statSync(path.join(contentDir, f));
    return stat.isDirectory();
  });

  regions.forEach(region => {
    const regionPath = path.join(contentDir, region);
    const htmlFiles = fs.readdirSync(regionPath).filter(f => f.endsWith('.html'));

    htmlFiles.forEach(file => {
      try {
        const filePath = path.join(regionPath, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html);

        const slug = getSlug(file);
        let cards = [];

        // Extract from H2 + following paragraph
        cards = cards.concat(extractHeadingPairs($, 'h2'));

        // Extract from H3 + following paragraph (fewer cards)
        const h3Cards = extractHeadingPairs($, 'h3');
        cards = cards.concat(h3Cards.slice(0, 3));

        // Remove duplicates by question text
        const seen = new Set();
        cards = cards.filter(card => {
          if (seen.has(card.q)) return false;
          seen.add(card.q);
          return true;
        });

        // Limit to 6-8 cards per topic
        cards = cards.slice(0, 8);

        if (cards.length > 0) {
          flashcardsData[slug] = cards;
          console.log(`✓ ${slug}: ${cards.length} cards`);
        }
      } catch (err) {
        console.error(`✗ ${file}: ${err.message}`);
      }
    });
  });
}

// Generate and write
processContentDirectory();

// Build output file
const output = `/**
 * Flashcard Data
 * Generated from HTML content with improved quality control
 * Last updated: ${new Date().toISOString()}
 * 
 * Guidelines for Word documents:
 * - Use "Term: Description" format for flashcard pairs
 * - Use "What is X?" headings followed by paragraphs
 * - Avoid generic "Which of the following is true?" questions
 * - Avoid incomplete questions like "Second part?" without context
 * - Add [FLASHCARD]Q: ... | A: ... markers for manual entries
 */

const flashcardsData = ${JSON.stringify(flashcardsData, null, 2)};

if (typeof window !== 'undefined') {
  window.flashcardsData = flashcardsData;
}
`;

fs.writeFileSync(outFile, output, 'utf8');
console.log(`\n✓ Written: ${outFile}`);
console.log(`✓ Topics: ${Object.keys(flashcardsData).length}`);
console.log(`✓ Total cards: ${Object.values(flashcardsData).reduce((sum, arr) => sum + arr.length, 0)}`);

