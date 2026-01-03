# Box Formatting Guide for Word Documents

## How to Create Boxes in Word

To create styled boxes in your Word documents that will be converted to beautiful HTML boxes, use **Word Styles**.

### Method 1: Using Paragraph Styles (Recommended)

1. **Select the text** you want to appear in a box
2. **Apply a custom style name** by:
   - Going to Home → Styles → Create a Style
   - Or typing the style name directly

3. **Use these exact style names** for different box types:

#### Available Box Types:

| Style Name in Word | Result in HTML | Use Case | Color |
|-------------------|----------------|----------|-------|
| `box` or `info-box` | Info Box | General information, key points | Blue |
| `tip-box` or `success-box` | Tip/Success Box | Helpful tips, success notes | Green |
| `warning-box` | Warning Box | Warnings, cautions | Orange |
| `note-box` or `important-box` | Note/Important Box | Important notes, highlights | Purple |
| `clinical-box` or `alert-box` | Clinical/Alert Box | Critical info, clinical notes | Red |
| `definition-box` or `neutral-box` | Definition Box | Definitions, neutral content | Gray |

### Method 2: Using Custom XML (Alternative)

If your Word-to-HTML converter supports it, wrap content with:
```
<div class="info-box">
Your content here
</div>
```

### Example Word Formatting:

**For an Info Box:**
1. Type your content:
   ```
   Important Anatomical Point
   The deltoid muscle has three parts: anterior, middle, and posterior.
   ```
2. Select all the text
3. Apply style name: `info-box`
4. The conversion will create a blue box with this content

**For a Clinical Box:**
1. Type your content:
   ```
   Clinical Significance
   Damage to the axillary nerve can paralyze the deltoid muscle.
   ```
2. Select all the text
3. Apply style name: `clinical-box`
4. The conversion will create a red box with this content

### Tips for Best Results:

✅ **DO:**
- Use the exact style names listed above
- Put the box title in **bold** at the start
- Keep box content focused and concise
- Use one box type per concept

❌ **DON'T:**
- Mix multiple box types in one selection
- Use very long paragraphs in boxes
- Nest boxes inside boxes
- Use custom fonts or colors (the CSS handles styling)

### Visual Preview:

When converted, your boxes will have:
- Gradient background
- Colored left border (5px)
- Rounded corners (12px radius)
- Shadow effect
- Hover animation (lifts up slightly)
- Responsive design (adapts to mobile)

### Manual HTML Editing (If Needed):

If you need to manually add boxes in HTML files, use:

```html
<div class="info-box">
  <strong>Title Here</strong>
  <p>Your content goes here.</p>
</div>
```

Replace `info-box` with any of the box class names above.

---

## Quick Reference:

- **Blue boxes** → General info: `box`, `info-box`
- **Green boxes** → Tips/Success: `tip-box`, `success-box`  
- **Orange boxes** → Warnings: `warning-box`
- **Purple boxes** → Notes/Important: `note-box`, `important-box`
- **Red boxes** → Clinical/Alerts: `clinical-box`, `alert-box`
- **Gray boxes** → Definitions: `definition-box`, `neutral-box`
