# SVG Animation Automation Workflow

## Overview

This document describes the complete workflow for adding animated SVG diagrams to anatomy content using the **SVG Animation Automation System**. The system allows you to specify animation directives directly in Word documents, which are automatically processed into interactive animations on the web.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Quick Start](#quick-start)
3. [Marker Syntax](#marker-syntax)
4. [Supported Animation Types](#supported-animation-types)
5. [Workflow: From Word to Web](#workflow-from-word-to-web)
6. [CSS Animation Reference](#css-animation-reference)
7. [JavaScript Components](#javascript-components)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)

---

## System Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   User Workflow                              │
├─────────────────────────────────────────────────────────────┤
│ 1. Add SVG to Word document (w/ marker)                    │
│ 2. Run: node scripts/generate_toc.js                        │
└────────────┬────────────────────────────────────────────────┘
             │
             ├──────────────────────┬──────────────────────┐
             │                      │                      │
     ┌───────▼────────┐    ┌──────▼───────┐    ┌────────▼──────┐
     │  mammoth.js    │    │ process_    │    │ process_      │
     │  (DOCX→HTML)   │    │ boxes.js    │    │ mcqs.js       │
     └────────────────┘    │  (parse     │    └───────────────┘
                           │  markers)   │
                           └──────┬──────┘
                                  │
                     ┌────────────▼──────────────┐
                     │  HTML with data attrs    │
                     │ <div data-animations=...>│
                     └────────────┬──────────────┘
                                  │
                  ┌───────────────────────────────┐
                  │   Generated HTML Files        │
                  │  www/content/[region]/*.html │
                  └───────────────────────────────┘
                                  │
                   ┌──────────────────────────────┐
                   │    Browser (Client-Side)     │
                   ├──────────────────────────────┤
                   │  1. Page loads                │
                   │  2. svg-animator.js runs     │
                   │  3. Parses data-animations   │
                   │  4. Applies CSS classes      │
                   │  5. Animations execute       │
                   └──────────────────────────────┘
```

### File Structure

```
www/
├── content/
│   └── [region]/
│       ├── diagram.svg         ← SVG source file
│       └── Topic.html          ← Generated HTML (auto-updated)
├── js/
│   ├── svg-animator.js         ← NEW: Animation parser & applier
│   ├── interactive-features.js
│   ├── topic-tools.js
│   └── toc.js
└── css/
    └── anatomy-modern.css      ← Contains animation keyframes

scripts/
├── generate_toc.js             ← UPDATED: Injects svg-animator.js
├── process_boxes.js            ← UPDATED: Parses animation directives
├── process_mcqs.js
└── ...
```

---

## Quick Start

### 1. Place SVG in Content Folder

```bash
cp your-diagram.svg www/content/upper-limb/
```

### 2. Add Marker to Word Document

In your Word `.docx` file, add:

```
[SVG]your-diagram.svg|animations="lineID:draw:5|circleID:pulse"[/SVG]
```

### 3. Identify SVG Element IDs

Open the SVG file and find element IDs:

```xml
<line id="h-line-1" x1="10" y1="50" x2="200" y2="50" stroke="black"/>
<circle id="pulse-circle" cx="100" cy="100" r="30" fill="none" stroke="red"/>
```

### 4. Generate HTML

```bash
node scripts/generate_toc.js
```

### 5. Test Locally

```bash
npx http-server www -p 8080 -c-1
# Open http://localhost:8080/content/upper-limb/Topic.html
```

---

## Marker Syntax

### Basic Marker Format

```
[SVG]filename.svg|animations="id1:type:count|id2:type"[/SVG]
```

### Components

| Component | Description | Required | Example |
|-----------|-------------|----------|---------|
| `[SVG]...[/SVG]` | Marker delimiters | Yes | `[SVG]...data...[/SVG]` |
| `filename.svg` | SVG file name (relative to HTML location) | Yes | `quadrants.svg` |
| `\|animations="..."` | Animation directive pipe | No | `\|animations="..."` |
| `id` | SVG element ID | Yes* | `lineID`, `path-5` |
| `type` | Animation type | Yes* | `draw`, `pulse` |
| `count` | Iteration count (draw only) | No | `5`, `3` |

**\* Only if animations directive present*

### Syntax Examples

**No animations (simple embed):**
```
[SVG]simple-diagram.svg[/SVG]
```

**Single animation (draw 3 times):**
```
[SVG]diagram.svg|animations="line-1:draw:3"[/SVG]
```

**Multiple animations (mixed types):**
```
[SVG]complex.svg|animations="line-1:draw:5|line-2:draw:5|circle:pulse"[/SVG]
```

**Multiple with different iterations:**
```
[SVG]graph.svg|animations="path-a:draw:3|path-b:draw:5|bg:pulse"[/SVG]
```

---

## Supported Animation Types

### 1. **Draw Animation**

**Purpose:** Animate path/line drawing effect with stroke-dash animation

**Parameters:**
- `type: "draw"`
- `iterations: [1-∞]` → Number of times animation repeats

**Duration:** 1.2 seconds per cycle

**Effect:**
- Lines appear to be drawn
- Opacity fades in from 0 to 1
- Repeats N times, then stays visible

**CSS Class Applied:** `svg-animate-draw`

**Example in Word:**
```
[SVG]veins.svg|animations="vein-1:draw:3|vein-2:draw:3"[/SVG]
```

**Result:** Veins draw 3 times each when page loads


### 2. **Pulse Animation**

**Purpose:** Continuous glow/throb effect for highlighting elements

**Parameters:**
- `type: "pulse"`
- `iterations: infinite` (automatic)

**Duration:** 3 seconds per cycle

**Effect:**
- Stroke-width oscillates between 2px and 4px
- Drop-shadow grows/shrinks
- Loops infinitely while page is loaded

**CSS Class Applied:** `svg-animate-pulse`

**Example in Word:**
```
[SVG]heart.svg|animations="heart-chamber:pulse"[/SVG]
```

**Result:** Heart chamber pulses continuously


### 3. **Hover Effects** (Applied Automatically)

All animated elements get interactive hover effects:

**CSS Class Applied:** `svg-animate-hover`

**Effect on Hover:**
- Stroke-width increases to 5px
- Drop-shadow amplifies to 12px
- Cursor changes to pointer
- Smooth 0.2s transition

---

## Workflow: From Word to Web

### Step 1: Prepare SVG File

**Requirements:**
- SVG elements must have unique `id` attributes
- Store in `www/content/[region]/` directory
- Relative filename from HTML location

**Example SVG Structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 754.7 493.5" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .line-stroke { stroke: #333; stroke-width: 2; }
    </style>
  </defs>
  
  <g id="Layer_2">
    <line id="h-line-1" x1="10" y1="50" x2="200" y2="50" class="line-stroke"/>
    <line id="v-line-1" x1="100" y1="0" x2="100" y2="100" class="line-stroke"/>
  </g>
</svg>
```

### Step 2: Add Marker to Word Document

Open your `.docx` in Microsoft Word:

1. Place cursor where you want SVG embedded
2. Type marker (exactly as shown):
   ```
   [SVG]filename.svg|animations="id1:draw:5|id2:pulse"[/SVG]
   ```
3. Save document

**Word Format Guidelines:**
- Keep marker on single line (wrapping is okay)
- Use straight quotes: `"` (not curly quotes: `"`)
- Use pipe symbol: `|` (not other separators)
- Separate animations with `|` inside quotes

### Step 3: Run HTML Generation

From project root:

```bash
node scripts/generate_toc.js
```

**What this does:**
1. Reads all `.docx` files from `www/content/[region]/`
2. Converts to HTML using mammoth.js
3. Extracts animation directives from markers
4. Passes to `process_boxes.js`:
   - Parses `[SVG]` markers
   - Extracts animation string
   - Adds `data-animations` attribute to SVG container
5. Generates HTML with injected scripts

### Step 4: Generated HTML Output

Generated HTML in `www/content/[region]/Topic.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Topic Title</title>
  <link rel="stylesheet" href="../../css/style.css">
  <link rel="stylesheet" href="../../css/anatomy-modern.css">
</head>
<body>
  <div class="container">
    <main id="content">
      <!-- Content from Word -->
      <h1>Topic Title</h1>
      
      <!-- SVG Container with animation directive -->
      <div class="svg-container" data-animations="h-line-1:draw:5|v-line-1:draw:5|h-line-2:pulse">
        <img src="filename.svg" alt="SVG Diagram" class="responsive-svg" />
      </div>
      
      <p>More content...</p>
    </main>
  </div>

  <!-- Animation system is injected HERE ↓ -->
  <script src="../../js/svg-animator.js"></script>
  <script src="../../js/interactive-features.js"></script>
  <script src="../../js/topic-tools.js"></script>
</body>
</html>
```

### Step 5: Client-Side Execution

When user visits the page in browser:

```
1. HTML loads in browser
2. DOM fully constructed
3. svg-animator.js auto-initializes
   ├─ Finds all [data-animations] containers
   ├─ Waits for SVG img to load (onload event)
   ├─ Parses "h-line-1:draw:5|v-line-1:draw:5|h-line-2:pulse"
   ├─ Finds #h-line-1, #v-line-1, #h-line-2 in SVG
   ├─ Applies CSS classes:
   │  ├─ .svg-animate-draw (to h-line-1, v-line-1)
   │  ├─ .svg-animate-pulse (to h-line-2)
   │  └─ .svg-animate-hover (to all)
   └─ Sets CSS variable: --iterations: 5
4. CSS animations start playing
   └─ Lines draw with 1.2s stroke-dash animation
   └─ Repeats 5 times
   └─ h-line-2 pulses infinitely
5. User can hover to see effects
6. Animations are fully interactive
```

---

## CSS Animation Reference

### Keyframe Definitions

All animation keyframes are in `www/css/anatomy-modern.css`:

#### drawLine Animation

```css
@keyframes drawLine {
  0% {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
```

**Timeline:**
- `0% → 100%` in 1.2 seconds
- Stroke-dash animates from 1000 to 0 (drawing effect)
- Opacity animates from 0 to 1 (fade-in effect)

#### pulseGlow Animation

```css
@keyframes pulseGlow {
  0%, 100% {
    stroke-width: 2;
    filter: drop-shadow(0 0 0px rgba(236, 0, 140, 0.5));
  }
  50% {
    stroke-width: 4;
    filter: drop-shadow(0 0 8px rgba(236, 0, 140, 0.9));
  }
}
```

**Timeline:**
- 0s-1.5s: Expand (width 2→4, shadow 0→8px)
- 1.5s-3s: Contract (width 4→2, shadow 8→0px)
- Repeats infinitely

### Animation Classes

#### `.svg-animate-draw`

```css
.svg-animate-draw {
  stroke-dasharray: 1000;
  animation: drawLine 1.2s ease-in-out var(--iterations, 1);
}
```

- Applies drawLine keyframes
- `--iterations` CSS variable controls repeat count
- Default: 1 iteration (use variable to override)

#### `.svg-animate-pulse`

```css
.svg-animate-pulse {
  animation: pulseGlow 3s ease-in-out infinite;
}
```

- Applies pulseGlow keyframes
- Always infinite (no iteration control)
- Timing: ease-in-out for smooth acceleration

#### `.svg-animate-hover`

```css
.svg-animate-hover {
  cursor: pointer;
  transition: all 0.2s ease;
}

.svg-animate-hover:hover {
  stroke-width: 5 !important;
  filter: drop-shadow(0 0 12px rgba(236, 0, 140, 0.9)) !important;
}
```

- Makes element interactive
- Hover intensifies stroke and glow
- Applied automatically to all animated elements

---

## JavaScript Components

### svg-animator.js Location

`www/js/svg-animator.js` (NEW)

### Key Functions

#### `parseAnimationDirective(animationString)`

**Purpose:** Parse animation directive string into structured objects

**Input:**
```javascript
"h-line-1:draw:5|h-line-2:pulse|circle-1:draw:3"
```

**Output:**
```javascript
[
  { id: 'h-line-1', type: 'draw', iterations: 5 },
  { id: 'h-line-2', type: 'pulse', iterations: null },
  { id: 'circle-1', type: 'draw', iterations: 3 }
]
```

#### `applySVGAnimations(svgContainer, animations)`

**Purpose:** Find SVG elements and apply animation CSS classes

**Parameters:**
- `svgContainer`: HTMLElement containing SVG
- `animations`: Array of animation objects

**Process:**
1. Loops through each animation object
2. Finds element by ID in SVG: `querySelector('#id')`
3. Adds CSS class: `svg-animate-[type]`
4. Adds hover class: `svg-animate-hover`
5. Sets CSS variable: `--iterations` (if applicable)

#### `initializeSVGAnimations()`

**Purpose:** Auto-initialize on page load

**When Called:** Automatically on `DOMContentLoaded`

**Process:**
1. Finds all elements with `data-animations` attribute
2. For each container:
   - Waits for SVG img to load (onload event)
   - Parses animation directive
   - Calls `applySVGAnimations()`

#### `applyStaggeredDelay(svgContainer, elementIds, delayMs)`

**Purpose:** Add sequential delays between animations (advanced)

**Example:**
```javascript
applyStaggeredDelay(container, ['line-1', 'line-2', 'line-3'], 300);
// Result: line-1 starts at 0ms, line-2 at 300ms, line-3 at 600ms
```

### Auto-Initialization

The system auto-initializes without manual setup:

```javascript
// Automatically runs on page load:
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSVGAnimations);
} else {
  initializeSVGAnimations();
}
```

---

## Examples

### Example 1: Quadrant Diagram (Abdomen)

**SVG File:** `quadrants-outline.svg`

**Word Marker:**
```
[SVG]quadrants-outline.svg|animations="h-line-1:draw:5|h-line-2:draw:5|v-line-1:draw:5|v-line-2:draw:5"[/SVG]
```

**Result:** 
- 4 lines (creating quadrants) draw in sequence
- Each repeats 5 times
- Total animation: 4 lines × 1.2s × 5 repeats = 24 seconds total

**Stagger (implicit):**
- Without explicit stagger, all 4 lines start simultaneously
- Each completes its 5 cycles before user interaction

---

### Example 2: Heart with Pulsing Chamber

**SVG File:** `heart.svg`

**Word Marker:**
```
[SVG]heart.svg|animations="chamber:pulse|valve-a:draw:2|valve-b:draw:2"[/SVG]
```

**Result:**
- Chamber pulses infinitely (attention-grabbing)
- Valves draw twice on page load
- Mixed animation types on single diagram

---

### Example 3: Skeletal System with Highlights

**SVG File:** `arm-anatomy.svg`

**Word Marker:**
```
[SVG]arm-anatomy.svg|animations="bone-1:draw:3|bone-2:draw:3|muscle-1:pulse|muscle-2:pulse"[/SVG]
```

**Result:**
- Bones draw 3 times (learning reinforcement)
- Muscles pulse to indicate functional areas
- Multiple element types with different animation strategies

---

## Troubleshooting

### Problem 1: Animation Not Playing

**Symptoms:** SVG loads but no animation occurs

**Checklist:**
- [ ] SVG elements have `id` attributes? (Open SVG in text editor)
- [ ] IDs match animation directive exactly (case-sensitive)?
- [ ] Animation directive format correct? (`id:type:count`)
- [ ] `svg-animator.js` injected in HTML? (View page source)
- [ ] Browser console shows errors? (Press F12)

**Debug Steps:**
1. Open DevTools (F12)
2. Run in console:
   ```javascript
   // Check if svg-animator.js loaded
   console.log(typeof parseAnimationDirective);
   // Should print: "function"
   
   // Check data attribute
   document.querySelector('[data-animations]').dataset.animations
   // Should print: animation directive string
   
   // Check if SVG element found
   document.querySelector('svg #myElementId')
   // Should print: SVG element, not null
   ```

### Problem 2: SVG Not Displaying

**Symptoms:** Blank space where SVG should appear

**Checklist:**
- [ ] SVG filename correct? (Check typo)
- [ ] SVG file in same directory as HTML?
- [ ] File path is relative (not absolute)?
- [ ] SVG viewBox attribute present? (For responsive sizing)

**Debug Steps:**
```html
<!-- Temporarily test with absolute path -->
<img src="file:///D:/anatomy_notes_explorer/notes_to_website/www/content/upper-limb/diagram.svg" />
```

### Problem 3: Wrong Animation Type Applied

**Symptoms:** Element pulses but should draw (or vice versa)

**Checklist:**
- [ ] Marker has correct type name? (`draw` or `pulse`)
- [ ] No typos in type? (case-sensitive)
- [ ] Animation directive has spaces removed?

**Example Correct:**
```
[SVG]file.svg|animations="line:draw:5"[/SVG]
```

**Example Wrong:**
```
[SVG]file.svg|animations="line : draw : 5"[/SVG]
                                ^ spaces cause parsing to fail
```

### Problem 4: Iteration Count Not Working

**Symptoms:** Animation repeats wrong number of times

**Checklist:**
- [ ] Using `draw` type (not `pulse`)?
- [ ] Iteration count is positive integer?
- [ ] SVG element has `stroke-dasharray` property?

**CSS Fix:** Add to SVG style:
```xml
<style>
  line { stroke-dasharray: 1000; }
</style>
```

### Problem 5: Multiple Animations on Same Element

**Current Limitation:** System doesn't support combining `draw` + `pulse` on same element

**Workaround:** Duplicate the element in SVG:
```xml
<!-- Instead of: -->
<line id="my-line" x1="0" y1="0" x2="100" y2="100"/>

<!-- Do: -->
<line id="my-line-draw" x1="0" y1="0" x2="100" y2="100" stroke="black" stroke-width="2"/>
<line id="my-line-glow" x1="0" y1="0" x2="100" y2="100" stroke="pink" stroke-width="0" opacity="0.5"/>

<!-- Animate separately: -->
[SVG]file.svg|animations="my-line-draw:draw:5|my-line-glow:pulse"[/SVG]
```

---

## Performance Considerations

### Animation Optimization

1. **Limit Repetitions:** 
   - `draw` > 10 times can feel excessive
   - Recommended: 3-5 times for learning effect

2. **Limit Pulse Count:**
   - Infinite pulse (pulse type) fine, but only for key elements
   - Recommended: Max 2-3 pulsing elements per page

3. **SVG Complexity:**
   - Simpler SVGs = smoother animations
   - Test with complex diagrams before deployment

### Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| SVG Animation | ✅ | ✅ | ✅ | ✅ |
| CSS Keyframes | ✅ | ✅ | ✅ | ✅ |
| stroke-dasharray | ✅ | ✅ | ✅ | ✅ |
| drop-shadow filter | ✅ | ✅ | ✅ | ✅ |

---

## Summary Checklist

**For Each New Animated SVG:**

- [ ] SVG file created with element `id` attributes
- [ ] SVG placed in `www/content/[region]/`
- [ ] Word marker added to `.docx`:
  - [ ] Format: `[SVG]file.svg|animations="id:type:count"`
  - [ ] All quotes are straight quotes `"`
  - [ ] IDs match SVG element IDs exactly
- [ ] Run `node scripts/generate_toc.js`
- [ ] Generated HTML contains:
  - [ ] SVG container with `data-animations` attribute
  - [ ] `svg-animator.js` injected before closing body tag
- [ ] Test locally: `npx http-server www -p 8080`
- [ ] Animations play correctly in browser
- [ ] Hover effects work (cursor changes, element highlights)
- [ ] Git commit and push changes

---

## Quick Reference Card

### Marker Format Cheat Sheet

```
Simple (no animation):
[SVG]diagram.svg[/SVG]

Single draw animation (3 repeats):
[SVG]diagram.svg|animations="line:draw:3"[/SVG]

Multiple elements:
[SVG]diagram.svg|animations="line1:draw:5|line2:draw:5|circle:pulse"[/SVG]

All animation types in one diagram:
[SVG]complex.svg|animations="path1:draw:4|path2:draw:4|highlight:pulse"[/SVG]
```

### CSS Class Reference

| Class | Effect | Duration |
|-------|--------|----------|
| `svg-animate-draw` | Stroke-dash draw animation | 1.2s |
| `svg-animate-pulse` | Glow throb effect | 3s (infinite) |
| `svg-animate-hover` | Hover interaction | 0.2s transition |

---

**Last Updated:** January 16, 2026  
**Version:** 1.0 - Initial Release  
**Status:** Production Ready
