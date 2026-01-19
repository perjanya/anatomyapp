/**
 * Anki-Style Flashcard System
 * Self-contained, lightweight flashcard component for anatomy topics
 * No external dependencies required
 */

class FlashcardSystem {
  constructor() {
    this.currentTopic = null;
    this.cards = [];
    this.currentCardIndex = 0;
    this.isFlipped = false;
    this.container = null;
  }

  /**
   * Initialize flashcards for a specific topic
   * @param {string} topicSlug - Topic identifier (e.g., 'cubital-fossa')
   * @param {string} containerId - DOM element ID to mount component
   */
  async loadFlashcards(topicSlug, containerId = 'flashcard-container') {
    this.currentTopic = topicSlug;
    
    // Load flashcard data
    const data = await this.fetchFlashcardData(topicSlug);
    if (!data || data.length === 0) {
      console.warn(`No flashcards found for topic: ${topicSlug}`);
      return;
    }

    // Randomize card order
    this.cards = this.shuffleArray([...data]);
    this.currentCardIndex = 0;
    this.isFlipped = false;

    // Create or get container
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      document.body.appendChild(this.container);
    }

    // Render component
    this.render();
    this.attachEventListeners();
  }

  /**
   * Fetch flashcard data for topic
   * Checks if flashcardsData global object exists
   */
  async fetchFlashcardData(topicSlug) {
    // Check for global flashcardsData object
    if (typeof flashcardsData !== 'undefined' && flashcardsData[topicSlug]) {
      return flashcardsData[topicSlug];
    }

    // Fallback: try to fetch from external JSON file
    try {
      const response = await fetch(`../../data/flashcards/${topicSlug}.json`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error loading flashcards:', error);
    }

    return [];
  }

  /**
   * Fisher-Yates shuffle algorithm
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Render the flashcard component HTML
   */
  render() {
    const currentCard = this.cards[this.currentCardIndex];
    
    this.container.innerHTML = `
      <div class="flashcard-system">
        <div class="flashcard-header">
          <h3>🧠 Flashcards: ${this.formatTopicName(this.currentTopic)}</h3>
          <button class="flashcard-close" id="flashcard-close">✕</button>
        </div>
        
        <div class="flashcard-counter">
          Card <span class="current-card">${this.currentCardIndex + 1}</span> / <span class="total-cards">${this.cards.length}</span>
        </div>

        <div class="flashcard-wrapper" id="flashcard-wrapper">
          <div class="flashcard" id="flashcard">
            <div class="flashcard-front">
              <div class="card-content">
                <p class="card-question">${currentCard.q}</p>
                <div class="tap-hint">Tap to reveal answer</div>
              </div>
            </div>
            <div class="flashcard-back">
              <div class="card-content">
                <p class="card-answer">${currentCard.a}</p>
                ${this.renderSVG(currentCard.svg)}
              </div>
            </div>
          </div>
        </div>

        <div class="flashcard-controls">
          <button class="flashcard-btn" id="prev-card" ${this.currentCardIndex === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <button class="flashcard-btn primary" id="flip-card">
            ${this.isFlipped ? 'Hide Answer' : 'Show Answer'}
          </button>
          <button class="flashcard-btn" id="next-card" ${this.currentCardIndex === this.cards.length - 1 ? 'disabled' : ''}>
            Next →
          </button>
        </div>

        <div class="flashcard-progress">
          <div class="progress-bar" style="width: ${((this.currentCardIndex + 1) / this.cards.length) * 100}%"></div>
        </div>
      </div>
    `;
  }

  /**
   * Format topic slug to readable name
   */
  formatTopicName(slug) {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Render SVG animation based on type
   */
  renderSVG(svgType) {
    if (!svgType) return '';

    const svgMap = {
      'artery': this.generateArterySVG(),
      'nerve': this.generateNerveSVG(),
      'bone': this.generateBoneSVG(),
      'muscle': this.generateMuscleSVG(),
      'heart': this.generateHeartSVG(),
    };

    return svgMap[svgType] || '';
  }

  /**
   * SVG Generators with inline animations
   * Medical educators can customize these
   */
  generateArterySVG() {
    return `
      <svg class="flashcard-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ee5a6f;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M 10 50 Q 60 30, 100 50 T 190 50" 
              fill="none" 
              stroke="url(#arteryGradient)" 
              stroke-width="8"
              stroke-linecap="round"
              class="svg-animate-draw" />
        <circle r="4" fill="#ff6b6b">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href="#flowPath"/>
          </animateMotion>
        </circle>
        <path id="flowPath" d="M 10 50 Q 60 30, 100 50 T 190 50" fill="none" />
      </svg>
    `;
  }

  generateNerveSVG() {
    return `
      <svg class="flashcard-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 100 10 L 100 90" 
              stroke="#ffd93d" 
              stroke-width="4"
              stroke-linecap="round"
              class="svg-animate-draw" />
        <circle cx="100" cy="50" r="8" fill="#ffd93d" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <path d="M 90 40 L 110 60 M 110 40 L 90 60" 
              stroke="#ffd93d" 
              stroke-width="3"
              stroke-linecap="round"
              class="svg-animate-fade" />
      </svg>
    `;
  }

  generateBoneSVG() {
    return `
      <svg class="flashcard-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="80" y="20" width="40" height="60" rx="5" 
              fill="#e8e8e8" 
              stroke="#b0b0b0" 
              stroke-width="2"
              class="svg-animate-scale" />
        <ellipse cx="100" cy="20" rx="15" ry="8" fill="#d4d4d4" class="svg-animate-fade" />
        <ellipse cx="100" cy="80" rx="15" ry="8" fill="#d4d4d4" class="svg-animate-fade" />
      </svg>
    `;
  }

  generateMuscleSVG() {
    return `
      <svg class="flashcard-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="50" rx="50" ry="30" 
                 fill="#c1666b" 
                 opacity="0.7"
                 class="svg-animate-pulse" />
        <path d="M 60 35 Q 100 30, 140 35" 
              stroke="#8b4953" 
              stroke-width="2"
              fill="none"
              class="svg-animate-draw" />
        <path d="M 60 50 Q 100 45, 140 50" 
              stroke="#8b4953" 
              stroke-width="2"
              fill="none"
              class="svg-animate-draw" />
        <path d="M 60 65 Q 100 60, 140 65" 
              stroke="#8b4953" 
              stroke-width="2"
              fill="none"
              class="svg-animate-draw" />
      </svg>
    `;
  }

  generateHeartSVG() {
    return `
      <svg class="flashcard-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 100 80 C 60 60, 40 40, 60 20 C 70 10, 90 15, 100 30 C 110 15, 130 10, 140 20 C 160 40, 140 60, 100 80 Z" 
              fill="#ff6b9d" 
              class="svg-animate-pulse" />
      </svg>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Flip card
    const flashcard = document.getElementById('flashcard');
    const flipBtn = document.getElementById('flip-card');
    
    const flipHandler = () => this.flipCard();
    flashcard.addEventListener('click', flipHandler);
    flipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      flipHandler();
    });

    // Navigation
    document.getElementById('prev-card')?.addEventListener('click', () => this.prevCard());
    document.getElementById('next-card')?.addEventListener('click', () => this.nextCard());
    document.getElementById('flashcard-close')?.addEventListener('click', () => this.close());

    // Keyboard support
    this.keyboardHandler = (e) => {
      if (e.key === 'ArrowLeft') this.prevCard();
      if (e.key === 'ArrowRight') this.nextCard();
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.flipCard();
      }
      if (e.key === 'Escape') this.close();
    };
    document.addEventListener('keydown', this.keyboardHandler);
  }

  /**
   * Flip the current card
   */
  flipCard() {
    const flashcard = document.getElementById('flashcard');
    this.isFlipped = !this.isFlipped;
    
    if (this.isFlipped) {
      flashcard.classList.add('flipped');
    } else {
      flashcard.classList.remove('flipped');
    }

    // Update button text
    const flipBtn = document.getElementById('flip-card');
    flipBtn.textContent = this.isFlipped ? 'Hide Answer' : 'Show Answer';
  }

  /**
   * Navigate to previous card
   */
  prevCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.isFlipped = false;
      this.render();
      this.attachEventListeners();
    }
  }

  /**
   * Navigate to next card
   */
  nextCard() {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
      this.isFlipped = false;
      this.render();
      this.attachEventListeners();
    }
  }

  /**
   * Close flashcard system
   */
  close() {
    document.removeEventListener('keydown', this.keyboardHandler);
    if (this.container) {
      this.container.innerHTML = '';
      this.container.style.display = 'none';
    }
  }
}

// Global instance
const flashcardSystem = new FlashcardSystem();

/**
 * Convenience function for embedding in topic pages
 * Usage: <button onclick="loadFlashcards('cubital-fossa')">🧠 Practice Flashcards</button>
 */
function loadFlashcards(topicSlug) {
  const container = document.getElementById('flashcard-container');
  if (container) {
    container.style.display = 'block';
  }
  flashcardSystem.loadFlashcards(topicSlug);
}

// Auto-init: on content pages, derive slug from URL and load flashcards if data exists
// Runs after DOM is ready. Safe: If no data for slug, loader exits quietly.
document.addEventListener('DOMContentLoaded', () => {
  try {
    const path = (location.pathname || '').toLowerCase();
    // Match /content/{region}/{file}.html
    const m = path.match(/\/content\/[^/]+\/([^/]+)\.html$/i);
    if (!m) return;
    // Decode and normalize filename to slug (spaces -> dashes)
    const rawName = decodeURIComponent(m[1]);
    const slug = rawName.trim().toLowerCase().replace(/\s+/g, '-');
    
    // Wire parse button to load on demand
    const parseBtn = document.getElementById('flashcard-parse');
    if (parseBtn) {
      // Check if flashcards exist for this topic in window.flashcardsData
      const hasFlashcards = window.flashcardsData && window.flashcardsData[slug];
      
      if (hasFlashcards) {
        // Enable button and wire click handler
        parseBtn.style.opacity = '1.0';
        parseBtn.style.cursor = 'pointer';
        parseBtn.title = 'Study with flashcards';
        parseBtn.disabled = false;
        
        parseBtn.addEventListener('click', async () => {
          const system = new FlashcardSystem();
          await system.loadFlashcards(slug);
        });
      } else {
        // Hide button when no flashcards available
        parseBtn.style.opacity = '0.5';
        parseBtn.style.cursor = 'not-allowed';
        parseBtn.title = 'Flashcards coming soon...';
        parseBtn.disabled = true;
      }
    }
  } catch (e) {
    console.warn('Flashcards auto-init skipped:', e);
  }
});
