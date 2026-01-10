/**
 * Interactive Features: Collapsible H1 sections and Interactive MCQs
 */

(function() {
  'use strict';

  // ==================== COLLAPSIBLE H1 SECTIONS ====================
  function initCollapsibleH1s() {
    const h1Elements = document.querySelectorAll('h1');
    
    h1Elements.forEach((h1, index) => {
      // Skip if already processed
      if (h1.classList.contains('collapsible-init')) return;
      h1.classList.add('collapsible-init');
      
      // Collect all content until next h1 or end of document
      const content = [];
      let nextElement = h1.nextElementSibling;
      
      while (nextElement && nextElement.tagName !== 'H1') {
        content.push(nextElement);
        nextElement = nextElement.nextElementSibling;
      }
      
      if (content.length === 0) return;
      
      // Create wrapper for collapsible content
      const wrapper = document.createElement('div');
      wrapper.className = 'h1-content';
      wrapper.id = `h1-content-${index}`;
      
      // Move content into wrapper
      content.forEach(el => wrapper.appendChild(el));
      h1.parentNode.insertBefore(wrapper, h1.nextSibling);
      
      // Make h1 clickable
      h1.style.cursor = 'pointer';
      h1.setAttribute('aria-expanded', 'true');
      h1.setAttribute('aria-controls', wrapper.id);
      
      // Toggle on click
      h1.addEventListener('click', function() {
        const isCollapsed = wrapper.classList.contains('collapsed');
        
        if (isCollapsed) {
          wrapper.classList.remove('collapsed');
          h1.classList.remove('collapsed');
          h1.setAttribute('aria-expanded', 'true');
        } else {
          wrapper.classList.add('collapsed');
          h1.classList.add('collapsed');
          h1.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ==================== INTERACTIVE MCQs ====================
  function initInteractiveMCQs() {
    // Look for MCQ containers or create them from structured content
    const mcqContainers = document.querySelectorAll('.mcq-container');
    
    mcqContainers.forEach(container => {
      setupMCQInteractivity(container);
    });
  }

  function setupMCQInteractivity(container) {
    const questions = container.querySelectorAll('.mcq-question');
    let correctCount = 0;
    let totalQuestions = questions.length;
    
    questions.forEach((question, qIndex) => {
      const options = question.querySelectorAll('.mcq-option');
      const correctAnswer = question.dataset.correct || question.querySelector('[data-correct="true"]')?.dataset.value;
      let answered = false;
      
      options.forEach(option => {
        option.addEventListener('click', function() {
          if (answered) return; // Already answered
          
          answered = true;
          const selectedValue = this.dataset.value;
          const isCorrect = selectedValue === correctAnswer || this.dataset.correct === 'true';
          
          // Mark all options as disabled
          options.forEach(opt => opt.classList.add('disabled'));
          
          // Mark the selected option
          this.classList.add('selected');
          
          if (isCorrect) {
            this.classList.add('correct');
            correctCount++;
            showCelebration(this);
            showFeedback(question, true);
          } else {
            this.classList.add('incorrect');
            // Highlight the correct answer
            options.forEach(opt => {
              if (opt.dataset.value === correctAnswer || opt.dataset.correct === 'true') {
                opt.classList.add('correct');
              }
            });
            showFeedback(question, false);
          }
          
          // Update score if all questions answered
          updateScore(container, correctCount, totalQuestions);
        });
      });
    });
  }

  function showFeedback(question, isCorrect) {
    // Remove existing feedback
    const existingFeedback = question.querySelector('.mcq-feedback');
    if (existingFeedback) existingFeedback.remove();
    
    const feedback = document.createElement('div');
    feedback.className = `mcq-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
      const messages = [
        '🎉 Excellent! That\'s correct!',
        '✨ Perfect! Well done!',
        '🌟 Correct! Great job!',
        '👏 Outstanding! You got it!',
        '💯 Brilliant! That\'s right!'
      ];
      feedback.textContent = messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        '📚 Not quite. Review the material and try again!',
        '🔍 Incorrect. The correct answer is highlighted.',
        '💡 Not this time. See the correct answer above.',
        '📖 Try reviewing the topic again.'
      ];
      feedback.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
    
    question.appendChild(feedback);
  }

  function showCelebration(element) {
    // Create confetti effect
    const colors = ['#6366f1', '#8b5cf6', '#10b981', '#3b82f6', '#f59e0b'];
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createConfetti(centerX, centerY, colors[i % colors.length]);
      }, i * 20);
    }
  }

  function createConfetti(x, y, color) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.background = color;
    confetti.style.position = 'fixed';
    
    // Random rotation and direction
    const angle = Math.random() * 360;
    const velocity = 2 + Math.random() * 3;
    confetti.style.transform = `rotate(${angle}deg)`;
    
    document.body.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => confetti.remove(), 3000);
  }

  function updateScore(container, correct, total) {
    // Check if all questions are answered
    const answeredQuestions = container.querySelectorAll('.mcq-option.selected, .mcq-option.correct, .mcq-option.incorrect');
    const totalAnswered = new Set(Array.from(answeredQuestions).map(opt => opt.closest('.mcq-question'))).size;
    
    if (totalAnswered < total) return; // Not all answered yet
    
    // Remove existing score
    const existingScore = container.querySelector('.mcq-score');
    if (existingScore) existingScore.remove();
    
    const score = document.createElement('div');
    score.className = 'mcq-score';
    const percentage = Math.round((correct / total) * 100);
    
    let emoji = '📚';
    let message = 'Keep studying!';
    
    if (percentage === 100) {
      emoji = '🏆';
      message = 'Perfect score!';
    } else if (percentage >= 80) {
      emoji = '🌟';
      message = 'Excellent work!';
    } else if (percentage >= 60) {
      emoji = '👍';
      message = 'Good job!';
    }
    
    score.innerHTML = `${emoji} Score: ${correct}/${total} (${percentage}%) - ${message}`;
    container.appendChild(score);
    
    // Celebration for high scores
    if (percentage >= 80) {
      setTimeout(() => {
        const rect = score.getBoundingClientRect();
        showCelebration({ getBoundingClientRect: () => rect });
      }, 300);
    }
  }

  // ==================== HELPER: Create MCQ from HTML ====================
  // This function helps create interactive MCQs from simple HTML structure
  window.createInteractiveMCQ = function(config) {
    /*
    Usage example:
    createInteractiveMCQ({
      container: document.querySelector('#mcq-area'),
      questions: [
        {
          question: "What drains into the axillary lymph nodes?",
          options: [
            { text: "Breast tissue", correct: true },
            { text: "Liver", correct: false },
            { text: "Brain", correct: false },
            { text: "Kidneys", correct: false }
          ]
        }
      ]
    });
    */
    
    const container = config.container;
    if (!container) return;
    
    container.className = 'mcq-container';
    
    if (config.title) {
      const title = document.createElement('h2');
      title.textContent = config.title;
      container.appendChild(title);
    }
    
    config.questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'mcq-question';
      
      const questionText = document.createElement('div');
      questionText.className = 'mcq-question-text';
      questionText.textContent = `${index + 1}. ${q.question}`;
      questionDiv.appendChild(questionText);
      
      const optionsList = document.createElement('ul');
      optionsList.className = 'mcq-options';
      
      // Shuffle options if not already shuffled
      const options = q.shuffle !== false ? shuffleArray([...q.options]) : q.options;
      
      options.forEach((opt, optIndex) => {
        const optionItem = document.createElement('li');
        optionItem.className = 'mcq-option';
        optionItem.textContent = opt.text;
        optionItem.dataset.value = opt.text;
        if (opt.correct) {
          optionItem.dataset.correct = 'true';
          questionDiv.dataset.correct = opt.text;
        }
        optionsList.appendChild(optionItem);
      });
      
      questionDiv.appendChild(optionsList);
      container.appendChild(questionDiv);
    });
    
    setupMCQInteractivity(container);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ==================== DARK MODE TOGGLE ====================
  function initDarkModeToggle() {
    const toggle = document.getElementById('dark-toggle');
    if (!toggle) return;
    
    // Check for saved preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
      document.body.classList.add('dark-mode');
      toggle.textContent = '☀️';
    }
    
    // Toggle dark mode on click
    toggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        toggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        toggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // ==================== INITIALIZATION ====================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    initCollapsibleH1s();
    initInteractiveMCQs();
    initDarkModeToggle();
  }

  init();
})();
