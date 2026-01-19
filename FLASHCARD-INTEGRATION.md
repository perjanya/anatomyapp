# Flashcard System Integration Guide

## Overview
This is a minimal Anki-style flashcard system for your anatomy learning website. It's self-contained, lightweight, and requires no external libraries.

## Features
- ✅ Clean flip animation (3D CSS transform)
- ✅ Animated SVGs (play only when flipped to answer)
- ✅ Topic-based card sets (5-20 cards per topic)
- ✅ Keyboard navigation (← → Space Esc)
- ✅ Mobile-friendly responsive design
- ✅ Progress tracking with visual progress bar
- ✅ Pure HTML/CSS/JS (no dependencies)

## File Structure
```
www/
├── css/
│   └── flashcards.css          # All flashcard styles and animations
├── js/
│   └── flashcards.js           # Core flashcard logic
├── data/
│   └── flashcards-data.js      # Flashcard content (edit this!)
└── flashcard-demo.html         # Working demo page
```

## Quick Start

### 1. Add to Existing Topic Page

In your topic HTML file (e.g., `www/content/upper-limb/Elbow.docx` → generated HTML):

**Add to `<head>` section:**
```html
<link rel="stylesheet" href="../../css/flashcards.css">
<script src="../../data/flashcards-data.js"></script>
<script src="../../js/flashcards.js"></script>
```

**Add container before `</body>`:**
```html
<div id="flashcard-container" style="display: none;"></div>
```

**Add trigger button in your content:**
```html
<button onclick="loadFlashcards('cubital-fossa')">
  🧠 Practice Flashcards
</button>
```

### 2. Create Flashcard Content

Edit `www/data/flashcards-data.js`:

```javascript
const flashcardsData = {
  "your-topic-slug": [
    {
      "q": "What are the boundaries of the cubital fossa?",
      "a": "Superior: Line between epicondyles\nMedial: Pronator teres\nLateral: Brachioradialis",
      "svg": "bone"  // Options: artery, nerve, bone, muscle, heart
    },
    {
      "q": "What passes through the cubital fossa?",
      "a": "Mnemonic: My Beer's Turned Nasty\n• Median nerve\n• Brachial artery\n• Tendon of biceps\n• Radial nerve",
      "svg": "artery"
    }
  ]
};
```

## For Auto-Generated Content (generate_toc.js)

### Modify your Word document template:

Add a flashcard marker at the end of each topic:

```
[FLASHCARDS]topic-slug
```

### Update `scripts/generate_toc.js`:

Add flashcard injection logic (around line 100, after content processing):

```javascript
// Check for flashcard marker
const flashcardMatch = content.match(/\[FLASHCARDS\]([a-z0-9-]+)/i);
if (flashcardMatch) {
  const topicSlug = flashcardMatch[1];
  content += `
    <div style="margin-top: 40px; padding: 20px; background: #f0f4ff; border-radius: 8px;">
      <button onclick="loadFlashcards('${topicSlug}')" 
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                     color: white; border: none; padding: 12px 24px; 
                     border-radius: 8px; cursor: pointer; font-weight: 600;">
        🧠 Practice Flashcards
      </button>
    </div>
  `;
}
```

### Update your HTML template:

In `scripts/generate_toc.js` (around line 70), add flashcard includes:

```javascript
const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="../../css/style.css">
  <link rel="stylesheet" href="../../css/anatomy-modern.css">
  <link rel="stylesheet" href="../../css/flashcards.css">
  <script src="../../data/flashcards-data.js"></script>
</head>
<body>
  ${processedContent}
  <div id="flashcard-container" style="display: none;"></div>
  <script src="../../js/flashcards.js"></script>
  <script src="../../js/toc.js"></script>
</body>
</html>`;
```

## SVG Animation Types

Available SVG types (customize in `flashcards.js`):

- `"artery"` - Flowing red artery with animated particle
- `"nerve"` - Yellow nerve with pulse effect
- `"bone"` - Gray bone structure with scale animation
- `"muscle"` - Red muscle fibers with pulse
- `"heart"` - Pink heart with pulse animation

**Add custom SVGs:**
Edit the `renderSVG()` method in `flashcards.js` (around line 160).

## Keyboard Controls

- **Space / Enter** - Flip current card
- **← Left Arrow** - Previous card
- **→ Right Arrow** - Next card
- **Esc** - Close flashcard system

## Customization

### Change Colors

Edit `www/css/flashcards.css`:

```css
/* Card front gradient */
.flashcard-front {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}

/* Card back gradient */
.flashcard-back {
  background: linear-gradient(135deg, #your-color-3, #your-color-4);
}
```

### Change Animation Speed

```css
/* Flip speed */
.flashcard {
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); /* Adjust 0.6s */
}

/* SVG draw speed */
@keyframes draw {
  /* Adjust duration in .svg-animate-draw class */
}
```

### Change Card Count

By default, all cards for a topic are shown. To limit:

```javascript
// In flashcards.js, line ~35
this.cards = this.shuffleArray([...data]).slice(0, 10); // Limit to 10 cards
```

## Mobile Optimization

The system is already mobile-responsive:
- Full-screen on mobile devices
- Touch-friendly tap to flip
- Large, accessible buttons
- Optimized font sizes

## Example Integration

See `www/flashcard-demo.html` for a complete working example with 4 topics.

## Testing

**Local testing:**
```bash
npx http-server www -p 8080 -c-1
# Open: http://localhost:8080/flashcard-demo.html
```

**Test in mobile PWA:**
```bash
npm run cap:sync
npm run cap:open-android
```

## Troubleshooting

**Flashcards not loading:**
- Check that `flashcards-data.js` is loaded before `flashcards.js`
- Verify topic slug matches exactly (case-sensitive)
- Open browser console for errors

**SVG not animating:**
- SVG only animates when card is flipped to back
- Check that `svg` property is set to valid type

**Container not showing:**
- Ensure `#flashcard-container` exists in HTML
- Check that `display: none` is set initially

## Content Guidelines for Medical Educators

### Writing Good Flashcards

✅ **DO:**
- Keep questions focused on one concept
- Use mnemonics when helpful
- Include clinical correlations
- Use bullet points for lists
- Test recall, not recognition

❌ **DON'T:**
- Make questions too vague
- Include multiple unrelated facts
- Use overly complex language
- Forget to proofread

### Example Question Patterns

**Definition:**
```
Q: What is the cubital fossa?
A: A triangular space on the anterior aspect of the elbow containing important neurovascular structures.
```

**List (with mnemonic):**
```
Q: What are the rotator cuff muscles?
A: SITS
• Supraspinatus
• Infraspinatus  
• Teres minor
• Subscapularis
```

**Clinical:**
```
Q: Why is the median nerve at risk during venipuncture?
A: It lies deep to the bicipital aponeurosis, beneath the median cubital vein. Deep needle insertion can damage it.
```

**Comparison:**
```
Q: What's the difference between Erb's and Klumpke's palsy?
A: Erb's (C5-C6): "Waiter's tip" - upper trunk
Klumpke's (C8-T1): "Claw hand" - lower trunk
```

## Advanced: Dynamic Card Loading

For very large datasets, implement lazy loading:

```javascript
// In flashcards.js, modify fetchFlashcardData:
async fetchFlashcardData(topicSlug) {
  const response = await fetch(`https://your-api.com/flashcards/${topicSlug}`);
  return await response.json();
}
```

## Performance

- **Initial load:** ~10KB CSS + ~15KB JS
- **Per topic dataset:** ~1-5KB
- **Zero external dependencies**
- **No build step required**

## Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

Potential additions (not yet implemented):
- [ ] Spaced repetition algorithm
- [ ] Progress persistence (localStorage)
- [ ] Card favoriting/bookmarking
- [ ] Study session statistics
- [ ] Print/export functionality

---

**Questions or Issues?**
Check `www/flashcard-demo.html` for working examples or consult the inline comments in the source files.
