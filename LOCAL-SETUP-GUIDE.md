# Local Development Setup Guide

## ✅ Environment Ready
Your local development environment has been successfully configured for the anatomy notes explorer project. Here's what was set up:

### Installed Software
- **Git** (v2.52.0) - For version control and collaboration
- **Node.js** (v25.5.0) - Runtime for JavaScript
- **npm** - Package manager (included with Node.js)

### Project Configuration
- **Repository**: Cloned from https://github.com/perjanya/anatomyapp
- **Location**: `c:\Users\pavan\OneDrive\Desktop\VS CODE\ANATOMY`
- **Git Remote**: Configured to push/pull from main author's repository
- **Dependencies**: All npm packages installed (217 packages)

---

## 🚀 Quick Start Commands

### Generate/Regenerate Table of Contents
```powershell
npm run gen-toc
```
This command:
- Converts `.docx` files in `www/content/{region}/` to HTML
- Generates `www/data/toc.json` for navigation
- Processes box markers (`[CLINICAL]`, `[WARNING]`, `[NOTE]`, etc.)
- Converts MCQs from Word format to interactive HTML

### Regenerate Single File
For faster updates when working on one document:
```powershell
node scripts/regenerate_single.js www/content/upper-limb/Your-Topic.docx
```

### Process Box Markers Only
```powershell
npm run process-boxes
```

---

## 📝 Adding New Content

### Step 1: Create/Edit Word Document
Place `.docx` files in appropriate region folders:
- `www/content/upper-limb/`
- `www/content/abdomen-pelvis/`
- `www/content/embryology/`

### Step 2: Use Box Markers
In your Word document, add text markers for styled boxes:
```
[CLINICAL]Clinical pearl text here
[WARNING]Important warning message
[NOTE]Additional note
[INFO]Informational content
[TIP]Helpful tip
[SUCCESS]Success indicator
```

### Step 3: Embed MCQs
MCQs in Word documents use this format:
```
___MCQ_START___

Q1. What is the correct answer?
A. Wrong option
B. Correct answer [CORRECT]
C. Wrong option
___

___MCQ_END___
```

### Step 4: Add YouTube Videos
Embed videos using:
```
[YOUTUBE]dQw4w9WgXcQ
```
or full URL:
```
[YOUTUBE]https://youtube.com/watch?v=dQw4w9WgXcQ
```

### Step 5: Generate HTML
Run TOC generation to convert your content:
```powershell
npm run gen-toc
```

---

## 🧪 Test Locally

### Option 1: Simple HTTP Server
```powershell
cd www
npx http-server . -p 8080 -c-1
# Open: http://localhost:8080
```

### Option 2: Via npm (if task configured)
```powershell
npm run serve
```

---

## 📱 Mobile Development (Optional)

### Sync Web Changes to Mobile
```powershell
npm run cap:sync
```

### Open Android Studio
```powershell
npm run cap:open-android
```

### Build Release APK
```powershell
cd android
.\build-release.ps1
```

---

## 📤 Push Changes to GitHub

### 1. Check Status
```powershell
git status
```

### 2. Stage Changes
```powershell
# Stage specific files
git add www/content/upper-limb/Your-Topic.*

# Or stage all changes
git add -A
```

### 3. Commit
```powershell
git commit -m "Add topic: Your Topic Name"
# Example: "Add topic: Anatomy of the Elbow"
```

### 4. Push to Main Repository
```powershell
git push origin main
```

**Note**: You'll need push access. Contact the main author (@perjanya) to be added as a collaborator.

---

## 📁 Project Structure

```
ANATOMY/
├── www/                          # Web application
│   ├── content/
│   │   ├── upper-limb/          # Upper limb anatomy topics
│   │   ├── embryology/          # Embryology topics
│   │   └── abdomen-pelvis/      # Abdomen/pelvis topics
│   ├── data/
│   │   └── toc.json             # Auto-generated TOC (don't edit)
│   ├── css/
│   │   ├── style.css
│   │   └── anatomy-modern.css   # Modern styling
│   ├── js/
│   │   ├── toc.js              # TOC rendering
│   │   ├── interactive-features.js  # MCQs, collapsibles
│   │   └── topic-tools.js      # Topic utilities
│   └── index.html              # Landing page
├── mobile/                       # Mobile PWA
│   └── app.js                  # PWA logic
├── android/                      # Android native app
│   └── build-release.ps1       # APK builder
├── scripts/
│   ├── generate_toc.js         # Main converter (mammoth → HTML)
│   ├── process_boxes.js        # Box marker processor
│   └── regenerate_single.js    # Single file updater
├── package.json                # npm dependencies
├── capacitor.config.json       # Mobile config
└── WORKFLOW.md                 # Detailed workflow guide
```

---

## 🔑 Key Conventions

### ❌ DO NOT
- ❌ Manually edit generated HTML files - they will be overwritten
- ❌ Use spaces in box markers: use `[CLINICAL]` not `[ CLINICAL ]`
- ❌ Forget to run `npm run gen-toc` after adding content
- ❌ Push directly to `main` without testing locally first

### ✅ DO
- ✅ Always edit `.docx` source files, never the generated HTML
- ✅ Use text markers (not Word styles) for box formatting
- ✅ Run TOC generation before committing
- ✅ Test locally with the HTTP server
- ✅ Use descriptive commit messages

---

## 🛠️ Troubleshooting

### Issue: Changes not appearing in browser
**Solution**: Clear browser cache (Ctrl+Shift+Del) or run in incognito mode

### Issue: Box markers not converting
**Solution**: Ensure no spaces inside brackets. Use `[CLINICAL]` not `[ CLINICAL ]`

### Issue: npm command not found
**Solution**: Refresh terminal or restart VS Code

### Issue: Git push permission denied
**Solution**: Request collaborator access from @perjanya at https://github.com/perjanya/anatomyapp

---

## 📚 Reference Files
- **[WORKFLOW.md](WORKFLOW.md)** - Detailed content pipeline
- **[BOX-FORMATTING-GUIDE.md](BOX-FORMATTING-GUIDE.md)** - Box styling details
- **[MCQ-GUIDE.md](MCQ-GUIDE.md)** - Interactive MCQ format
- **[PLAY-STORE-DEPLOYMENT.md](PLAY-STORE-DEPLOYMENT.md)** - App store upload

---

## 🎯 Next Steps

1. **Create your first topic**:
   - Create a `.docx` file in `www/content/upper-limb/`
   - Add anatomy content with box markers
   - Run `npm run gen-toc`
   - Test at `http://localhost:8080`

2. **Push to GitHub**:
   ```powershell
   git add www/content/
   git commit -m "Add new topic"
   git push origin main
   ```

3. **Deploy**: Site auto-deploys to [https://anatomyapp.vercel.app](https://anatomyapp.vercel.app) on push

---

**Questions?** Check the copilot-instructions.md or contact the main author.
