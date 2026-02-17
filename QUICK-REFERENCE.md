# Quick Reference - Daily Commands

## 📝 Content Creation Workflow

```powershell
# 1. Create/edit Word document
# Place .docx file in www/content/{region}/

# 2. Generate/update all content
npm run gen-toc

# 3. Test locally
cd www
npx http-server . -p 8080
# Open: http://localhost:8080

# 4. Push to GitHub
git add -A
git commit -m "Add/update topic: Topic Name"
git push origin main
```

---

## 🎯 Common Tasks

### Update a Single Topic
```powershell
# Fast single-file regeneration
node scripts/regenerate_single.js www/content/upper-limb/Your-Topic.docx

# Test
cd www
npx http-server . -p 8080
```

### Pull Latest Changes
```powershell
git pull origin main
npm install  # If dependencies changed
```

### Check Git Status
```powershell
git status
git log --oneline -10  # Last 10 commits
```

### Discard Local Changes
```powershell
git checkout -- www/content/  # Discard changes to content
```

### Create a New Branch (for major changes)
```powershell
git checkout -b feature/new-topic
# ... make changes ...
git push origin feature/new-topic
# Then create Pull Request on GitHub
```

---

## 🔍 Debugging

### Clear Generated HTML Files
```powershell
# Remove ALL generated .html files to rebuild from .docx
Get-ChildItem www/content -Include "*.html" -Recurse | Remove-Item
npm run gen-toc  # Regenerate
```

### View Generated TOC
```powershell
# Windows: Open in default browser
Invoke-Item www/data/toc.json

# Or view raw JSON in VS Code
code www/data/toc.json
```

### Check npm Dependencies
```powershell
npm list
npm outdated  # Check for updates
```

---

## 🚀 Mobile Commands (Optional)

```powershell
# Sync web to Android
npm run cap:sync

# Open Android Studio
npm run cap:open-android

# Build signed APK
cd android
.\build-release.ps1
```

---

## 📌 Important Files to Know

| File | Purpose |
|------|---------|
| `package.json` | npm scripts and dependencies |
| `scripts/generate_toc.js` | Main HTML converter |
| `www/index.html` | Web app landing page |
| `www/css/anatomy-modern.css` | Styling for boxes, MCQs, collapsibles |
| `www/js/interactive-features.js` | MCQ and collapsible logic |
| `capacitor.config.json` | Mobile app configuration |
| `.github/copilot-instructions.md` | Project AI instructions |

---

## ✅ Before Pushing to GitHub

1. ✓ Run `npm run gen-toc` to generate all content
2. ✓ Test locally with `npx http-server`
3. ✓ Check formatting of generated HTML
4. ✓ Verify box markers and MCQs rendered correctly
5. ✓ Review commit message is descriptive
6. ✓ Check `git diff` before pushing

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Box markers not showing | No spaces in `[CLINICAL]`, check capitalization |
| MCQs not converting | Format must use `___MCQ_START___` and `___MCQ_END___` |
| HTML changes disappear | You edited generated HTML (do NOT do this) |
| Git push fails | Check internet, verify GitHub credentials |
| npm scripts not found | Run `npm install` again |

---

Generated: January 28, 2026
Repository: https://github.com/perjanya/anatomyapp
Local Location: c:\Users\pavan\OneDrive\Desktop\VS CODE\ANATOMY
