# Box Formatting and Media Guide for Word Documents

## ✨ Simple Automated Method (RECOMMENDED)

The easiest way to create boxes and embed videos is to use **text markers** in your Word document.

### How to Use Text Markers:

1. **In your Word document**, add a marker before the text you want in a box:
   ```
   [CLINICAL]Needle is inserted vertically - Four finger breadth below the acromial process
   ```

2. **Save the document**

3. **Run the generator**:
   ```powershell
   node scripts/generate_toc.js
   ```
   
4. **Done!** The HTML will automatically have styled boxes and embedded videos.

---

## 📦 Available Box Markers:

| Marker in Word | HTML Result | Color | Use Case |
|---------------|-------------|-------|----------|
| `[CLINICAL]...` | Clinical Box | Red | Critical clinical information |
| `[WARNING]...` | Warning Box | Orange | Warnings, cautions |
| `[NOTE]...` | Note Box | Purple | Important notes, highlights |
| `[INFO]...` | Info Box | Blue | General information |
| `[TIP]...` | Tip Box | Green | Helpful tips |
| `[SUCCESS]...` | Success Box | Green | Success notes |

### Box Examples:

**Clinical Box:**
```
[CLINICAL]Damage to the axillary nerve can paralyze the deltoid muscle.
```

**Warning Box:**
```
[WARNING]Axillary nerve is at risk of injury during deltoid injections.
```

**Note Box:**
```
[NOTE]Axillary nerve supplies deltoid and teres minor muscles.
```

---

## 🎥 Embedding YouTube Videos:

To embed a YouTube video in your Word document, use the `[YOUTUBE]` marker:

### Method 1: Full YouTube URL
```
[YOUTUBE]https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Method 2: Short YouTube URL
```
[YOUTUBE]https://youtu.be/dQw4w9WgXcQ
```

### Method 3: Just the Video ID (11 characters)
```
[YOUTUBE]dQw4w9WgXcQ
```

### Optional: Closing Tag
```
[YOUTUBE]https://www.youtube.com/watch?v=dQw4w9WgXcQ[/YOUTUBE]
```

### Real Example:
```
[NOTE]Watch this video for a detailed explanation of the shoulder joint anatomy:

[YOUTUBE]https://www.youtube.com/watch?v=SHOULDER_VIDEO_ID
```

**How to find the Video ID:**
- From `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → the ID is `dQw4w9WgXcQ`
- From `https://youtu.be/dQw4w9WgXcQ` → the ID is `dQw4w9WgXcQ`
- The video ID is always 11 characters long

---

## Optional: Closing Tags

You can optionally use closing tags for clarity (but they're not required):
```
[CLINICAL]Your clinical note here[/CLINICAL]
```

---

## Alternative Method: Manual HTML Editing

If you need to add boxes directly to HTML files:

```html
<div class="clinical-box">
  <p>Your clinical note here</p>
</div>
```

Available classes: `clinical-box`, `warning-box`, `note-box`, `info-box`, `tip-box`, `success-box`

---

## Workflow Summary:

1. **Write your Word document** with text markers:
   - Add `[CLINICAL]`, `[WARNING]`, `[NOTE]`, etc. before important text
   - Add `[YOUTUBE]video_id` to embed YouTube videos
   
2. **Save the .docx file** in `www/content/upper-limb/`

3. **Generate HTML**:
   ```powershell
   node scripts/generate_toc.js
   ```

4. **Test locally**:
   ```powershell
   cd www
   python -m http.server 8000
   ```
   Then open http://localhost:8000

---

## Visual Preview:

### Boxes will have:
- Gradient background
- Colored left border (5px)
- Rounded corners (12px radius)
- Shadow effect
- Hover animation (lifts up slightly)
- Responsive design (adapts to mobile)

### Videos will have:
- Responsive 16:9 aspect ratio
- Rounded corners
- Full-width on mobile
- Professional embed styling

---

## Quick Reference:

**Boxes:**
- **Red** → Clinical notes: `[CLINICAL]`
- **Orange** → Warnings: `[WARNING]`
- **Purple** → Important notes: `[NOTE]`
- **Blue** → General info: `[INFO]`
- **Green** → Tips/Success: `[TIP]` or `[SUCCESS]`

**Media:**
- **YouTube Videos** → `[YOUTUBE]video_id_or_url`
