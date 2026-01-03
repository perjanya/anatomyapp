# Anatomy Notes Website - Topic Addition Workflow

## Complete Process: Add Topic → Push → Deploy

### Step 1: Prepare Your Word Document (.docx)
- Create or obtain your anatomy topic document in Microsoft Word format
- Ensure the document has:
  - Clear heading (will be used as page title)
  - Properly formatted body text and images
  - No special characters that might break file naming

### Step 2: Add .docx File to Content Directory
1. Copy your `.docx` file to: `content/upper-limb/`
2. File naming: Use clear names like `Elbow.docx`, `Wrist anatomy.docx`
   - Avoid special characters except hyphens and underscores
   - Example: ✅ `Elbow-joint.docx` ✅ `Wrist_anatomy.docx`

### Step 3: Generate HTML & Update Table of Contents
Run the build script to automatically:
- Convert `.docx` to HTML using mammoth.js
- Extract title from the first heading
- Wrap HTML with proper structure and CSS links
- Generate `data/toc.json` with all topics

```powershell
node scripts/generate_toc.js
```

**Output:**
- `content/upper-limb/[topic].html` - Generated topic page
- `data/toc.json` - Updated table of contents

### Step 4: Verify Locally
Test the topic on your local server:

```powershell
# Start local server (if not running)
npx http-server -p 8080 -c-1

# Open in browser
Start-Process "http://localhost:8080/index.html"

# Then navigate to your new topic or directly:
# http://localhost:8080/content/upper-limb/[topic-name].html
```

Check for:
- ✅ Heading displays correctly with gradient color
- ✅ Body text is readable
- ✅ Images display properly
- ✅ No horizontal scroll on mobile view
- ✅ New topic appears in navigation

### Step 5: Commit & Push to GitHub

```powershell
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "Add topic: [Topic Name]"

# Push to main branch
git push origin main
```

**Example commit messages:**
- `git commit -m "Add topic: Elbow joint anatomy"`
- `git commit -m "Add topics: Wrist and Hand structures"`

### Step 6: Vercel Auto-Deployment
- **Automatic**: Vercel detects the push to `main` branch
- **Wait time**: 1-2 minutes for deployment
- **Status**: Check at https://vercel.com/dashboard
- **Live**: Your new topic is live on the Vercel deployment URL

---

## Quick Reference

### Directory Structure
```
content/
├── upper-limb/
│   ├── breastlymphatic.docx
│   ├── breastlymphatic.html      (generated)
│   ├── Shoulder joint.docx
│   ├── Shoulder joint.html       (generated)
│   └── [new-topic].docx          (add here)
data/
├── toc.json                       (auto-generated)
css/
├── style.css                      (original styling)
├── anatomy-modern.css             (modern UI)
```

### Required Commands Summary
```powershell
# 1. Generate HTML & TOC
node scripts/generate_toc.js

# 2. Test locally
npx http-server -p 8080 -c-1

# 3. Push to GitHub
git add -A
git commit -m "Add topic: [Name]"
git push origin main

# Vercel deploys automatically ✅
```

---

## Troubleshooting

### Topic not appearing in navigation
- Run `node scripts/generate_toc.js` again
- Check `data/toc.json` has your new entry
- Refresh browser (Ctrl+Shift+Delete to clear cache)

### HTML file not generated
- Verify `.docx` file is in `content/upper-limb/` directory
- Check file has `.docx` extension (not `.doc` or other format)
- Ensure file name has no spaces or special characters

### Styling not applied
- Verify both CSS files are linked in generated HTML:
  - `../../css/style.css`
  - `../../css/anatomy-modern.css`
- Clear browser cache and refresh

### Vercel deployment not updating
- Verify push was successful: `git log --oneline | Select-Object -First 1`
- Check Vercel dashboard for build errors
- Wait 2-3 minutes (sometimes takes longer)

---

## File Modifications Made

### `scripts/generate_toc.js`
- Updated to process only `.docx` files in `content/upper-limb/`
- Generates properly structured HTML5 with modern CSS
- Cleans HTML tags from titles
- Creates `data/toc.json` automatically

### Generated HTML Structure
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Topic Title]</title>
  <link rel="stylesheet" href="../../css/style.css">
  <link rel="stylesheet" href="../../css/anatomy-modern.css">
</head>
<body>
  <div class="content-wrapper">
    <main class="topic-content">
      [Converted content from .docx]
    </main>
  </div>
  <script src="../../js/topic-tools.js"></script>
</body>
</html>
```

---

## Support Files

- **Modern CSS**: `css/anatomy-modern.css` - Provides responsive, modern styling
- **Build Script**: `scripts/generate_toc.js` - Handles .docx to HTML conversion
- **Navigation Data**: `data/toc.json` - JSON file with all topics and URLs
