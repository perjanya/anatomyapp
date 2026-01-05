# Adding Interactive MCQs to Topics

## Overview
The website now supports interactive Multiple Choice Questions (MCQs) with:
- Click to select answers
- Immediate feedback (correct/incorrect)
- Celebration effects for correct answers with confetti
- Score tracking
- All H1 headers are collapsible (click to expand/collapse)
- All boxes now have colored borders matching their theme

## How to Add MCQs

### Method 1: Direct HTML (Recommended)

Add this structure at the end of your HTML file (before `</main>`):

```html
<div class="mcq-container">
  <h2>📝 Test Your Knowledge</h2>
  
  <div class="mcq-question" data-correct="Correct answer text here">
    <div class="mcq-question-text">
      1. Your question here?
    </div>
    <ul class="mcq-options">
      <li class="mcq-option" data-value="Option A" data-correct="false">Option A</li>
      <li class="mcq-option" data-value="Option B" data-correct="false">Option B</li>
      <li class="mcq-option" data-value="Correct answer" data-correct="true">Correct answer</li>
      <li class="mcq-option" data-value="Option D" data-correct="false">Option D</li>
    </ul>
  </div>
  
  <!-- Add more questions by repeating the mcq-question div -->
</div>
```

### Method 2: Using JavaScript API

In a `<script>` tag at the bottom of your page:

```javascript
createInteractiveMCQ({
  container: document.querySelector('#mcq-area'), // Create a div with this ID
  title: "Test Your Knowledge",
  questions: [
    {
      question: "What is the capital of France?",
      options: [
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Madrid", correct: false }
      ]
    },
    {
      question: "Which organ pumps blood?",
      options: [
        { text: "Liver", correct: false },
        { text: "Heart", correct: true },
        { text: "Kidney", correct: false },
        { text: "Lung", correct: false }
      ]
    }
  ]
});
```

## Features

### Interactive Behavior
- **Click on an option** to select it
- **Correct answer**: Green highlight with checkmark ✓ and celebration confetti 🎉
- **Incorrect answer**: Red highlight with X mark, and correct answer is shown
- **Feedback messages**: Encouraging messages appear for each answer
- **Score display**: Shows total score when all questions are answered

### Collapsible H1 Headers
- All H1 headers are now clickable
- Click to collapse/expand the content under that section
- Arrow indicator (▼) rotates when collapsed/expanded
- Useful for long documents with multiple sections

### Box Styling
All boxes now have colored borders:
- **Info boxes** (blue): Knowledge points
- **Tip/Success boxes** (green): Helpful tips
- **Warning boxes** (orange): Important warnings
- **Clinical boxes** (red): Clinical applications
- **Note boxes** (purple): Important notes
- **Definition boxes** (gray): Definitions

## Example

See `/www/mcq-example.html` for a complete working example with:
- Collapsible H1 sections
- 5 interactive MCQs
- Different box types
- Full styling

## Tips for Creating Good MCQs

1. **Clear questions**: Make questions specific and unambiguous
2. **Plausible distractors**: Wrong answers should be plausible but clearly incorrect
3. **Avoid "all of the above"**: These are often easy to game
4. **One correct answer**: Each question should have exactly one correct option
5. **Shuffle options**: The API automatically shuffles options to prevent pattern recognition
6. **Mix difficulty**: Include both easy recall and harder application questions

## Celebration Effects

When students answer correctly:
- ✨ The option highlights in green
- ✓ A checkmark appears
- 🎊 Confetti animation plays
- 📝 Encouraging message displays
- 🏆 Trophy for perfect scores

This creates a rewarding learning experience!
