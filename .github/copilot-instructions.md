# AI Coding Agent Instructions

## Project Overview
Anatomy notes explorer: converts Word `.docx` anatomy documents to interactive web content with auto-generated TOC, MCQs, styled boxes, and YouTube embeds. Dual deployment: web (Vercel) and native mobile (Capacitor/Android).

## Architecture

### Core Pipeline
1. **Source**: `.docx` files in `www/content/{region}/` (e.g., `upper-limb/`, `thorax/`)
2. **Processing**: `node scripts/generate_toc.js` → uses mammoth.js to convert `.docx` → HTML
3. **Output**: HTML files with injected CSS/JS, `data/toc.json` for navigation

### Dual Deployment Model
- **Web**: `www/` → Vercel (production URL)
- **Mobile**: `mobile/` → Capacitor → Android APK (Play Store)
  - Uses `@capacitor/app` for hardware back button
  - Consumes same `data/toc.json` remotely
  - Standalone PWA with service worker

## Critical Workflows

### Adding New Content
**Never manually edit HTML files** - they're auto-generated from `.docx`:
```powershell
# 1. Add .docx to www/content/{region}/
# 2. Regenerate all content:
node scripts/generate_toc.js

# 3. For single file update (faster):
node scripts/regenerate_single.js www/content/upper-limb/Elbow.docx
```

### Box Markers in Word Documents
Use **text markers** in `.docx` files (not Word styles) for automatic box conversion:
- `[CLINICAL]text` → red clinical box
- `[WARNING]text` → orange warning
- `[NOTE]text` → purple note
- `[INFO]text`, `[TIP]text`, `[SUCCESS]text`

YouTube embeds: `[YOUTUBE]dQw4w9WgXcQ` or full URL

See [BOX-FORMATTING-GUIDE.md](BOX-FORMATTING-GUIDE.md) for details.

### MCQ Format in Word
Embed MCQs directly in `.docx`:
```
___MCQ_START___

Q1. Question text?
A. Wrong answer
B. Correct answer [CORRECT]
C. Wrong answer
___

___MCQ_END___
```
Auto-converted to interactive HTML with confetti animations. See [MCQ-GUIDE.md](MCQ-GUIDE.md).

### Mobile Build Commands
```powershell
# Sync web changes to Android:
npm run cap:sync

# Open Android Studio:
npm run cap:open-android

# Build release APK (from android/):
.\build-release.ps1
```

## Project-Specific Conventions

### Generated HTML Structure
`generate_toc.js` wraps content in standard template:
```html
<!-- Lines 66-92 of scripts/generate_toc.js -->
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../../css/anatomy-modern.css">
<script src="../../js/toc.js"></script>
<script src="../../js/interactive-features.js"></script>
<script src="../../js/topic-tools.js"></script>
```
**Always use relative paths** from `content/{region}/` (2 levels up: `../../`).

### Mammoth Style Mappings
`generate_toc.js` uses both `style-name` and `style-id` for Word compatibility:
```javascript
// Lines 36-58 of scripts/generate_toc.js
styleMap: [
  "p[style-name='clinical-box'] => div.clinical-box:fresh",
  "p[style-id='clinical-box'] => div.clinical-box:fresh",
  // ... repeat for each box type
]
```

### Interactive Features
`www/js/interactive-features.js` auto-initializes on page load:
1. **Collapsible H1s**: All `<h1>` tags → clickable collapse/expand
2. **MCQ interactivity**: `.mcq-container` → click-to-answer with score tracking

No manual initialization needed in HTML.

### Navigation Stack (Mobile)
`mobile/app.js` maintains `navigationStack` array for hardware back button:
```javascript
// Push when navigating forward:
navigationStack.push('topic');

// Pop on back button or home:
App.addListener('backButton', handleBackButton);
```

## Key Files Reference

### Content Processing
- [scripts/generate_toc.js](scripts/generate_toc.js) - Main converter (mammoth → HTML)
- [scripts/process_boxes.js](scripts/process_boxes.js) - Post-process text markers (`[CLINICAL]` → `<div class="clinical-box">`)
- [scripts/regenerate_single.js](scripts/regenerate_single.js) - Fast single-file updates

### Styling
- [www/css/anatomy-modern.css](www/css/anatomy-modern.css) - Modern UI: box styles, MCQ styles, collapsible H1s, dark mode
- [www/css/style.css](www/css/style.css) - Legacy base styles (still loaded)

### Mobile
- [mobile/app.js](mobile/app.js) - PWA logic, navigation stack, TOC rendering
- [capacitor.config.json](capacitor.config.json) - Config: `webDir: "www"` for web build, uses `mobile/` for native
- [android/build-release.ps1](android/build-release.ps1) - Automated APK signing/building

## Common Pitfalls

1. **Editing HTML directly**: Changes will be overwritten by next `generate_toc.js` run. Always edit `.docx` source.
2. **Wrong relative paths**: Content files are in `www/content/{region}/`, so CSS is `../../css/`, not `../css/`.
3. **Missing capacitor sync**: After changing `mobile/` or `www/`, run `npm run cap:sync` before testing Android app.
4. **Box markers not working**: Ensure no spaces inside brackets: `[CLINICAL]text`, not `[ CLINICAL ] text`.

## Build & Deploy

### Web Deployment
```powershell
git add -A
git commit -m "Add topic: [name]"
git push origin main  # Auto-deploys to Vercel
```

### Android Release
```powershell
cd android
.\build-release.ps1  # Outputs signed APK to app/build/outputs/apk/release/
```
See [PLAY-STORE-DEPLOYMENT.md](PLAY-STORE-DEPLOYMENT.md) for upload steps.

## Testing Locally
```powershell
# Web (from project root):
npx http-server www -p 8080 -c-1
# Open: http://localhost:8080

# Mobile PWA:
npx http-server mobile -p 8080
# Open: http://localhost:8080 (install as PWA)
```

---

**For detailed guides**: See `WORKFLOW.md` (full content pipeline), `MCQ-GUIDE.md` (interactive MCQs), `BOX-FORMATTING-GUIDE.md` (box/video markers).
