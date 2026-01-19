# Dr. Anat Voice Selection - Quick Start

## What's New ✨

Dr. Anat now includes **intelligent voice selection** with these features:

✅ **Auto-discover voices** from Web Speech API  
✅ **Voice dropdown selector** with 4+ curated options  
✅ **Labeled voices** with emoji (👩 female, 👨 male)  
✅ **Teaching-optimized audio** (slower rate, higher pitch)  
✅ **Real-time voice switching** during session  
✅ **Cross-browser support** (Chrome, Firefox, Safari, Edge)  
✅ **Graceful fallback** if preferred voices unavailable  

## How to Use

### 1. Open Demo Page
```
http://localhost:8080/dr-vivek-demo.html
```

### 2. Avatar Loads
- Dr. Anat appears on canvas
- Voice dropdown populates automatically (~500ms)

### 3. Select a Voice
- Click dropdown (🎤 Select Voice)
- Choose from available options:
  - 👩 Google US English Female
  - 👩 Google UK English Female
  - 👩 Microsoft Zira / Apple Samantha
  - 👨 Google US English Male

### 4. Click "🎓 Teach"
- Dr. Anat speaks with your selected voice
- Mouth animates in sync
- Eyes blink naturally

## Code Changes

### New Methods in DrAnatAvatar

```javascript
// Discovery
discoverVoices()                    // Auto-run on init
filterVoicesByGender(voices, gender) // Filter by gender
getVoiceOptions()                   // Get for UI

// Selection
setVoice(voice)                     // Set selected voice
formatVoiceLabel(voice)             // Pretty-print label
```

### New HTML Elements

```html
<label for="voiceSelect">🎤 Select Voice</label>
<select id="voiceSelect">
  <option>Auto (Recommended)</option>
  <!-- Populated dynamically -->
</select>
```

### Updated speak() Method

```javascript
// Now applies selected voice:
utterance.voice = this.selectedVoice  // ← New
utterance.rate = 0.85                 // ← Optimized
utterance.pitch = 1.1                 // ← Optimized
```

## Voice Priority

The system prioritizes voices in this order:

1. **Female voices first** (3 options)
   - Google US English Female
   - Google UK English Female
   - Microsoft Zira / Apple Samantha

2. **Male voice** (1 option)
   - Google US English Male or equivalent

3. **Fallback**
   - Any English voice
   - Browser default

## Integration Example

### Add to Your Anatomy Topic Page

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
  <!-- Your content -->
  <main class="topic-content">
    <h1>Topic Name</h1>
    <p>Content here...</p>
  </main>

  <!-- Dr. Anat Avatar -->
  <div style="position: fixed; bottom: 20px; right: 20px; background: white; border-radius: 12px; padding: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
    <canvas id="drAnatCanvas" width="200" height="250"></canvas>
    
    <!-- Voice selector -->
    <select id="voiceSelect" style="width: 100%; margin: 10px 0; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <option>Loading voices...</option>
    </select>
    
    <!-- Teach button -->
    <button onclick="drAnat.speak()" style="width: 100%; padding: 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
      🎓 Teach
    </button>
  </div>

  <script src="../../js/dr-vivek-avatar.js"></script>
  <script>
    let drAnat = new DrAnatAvatar('drAnatCanvas');

    // Populate voice selector when voices discovered
    document.addEventListener('voicesDiscovered', (e) => {
      const selector = document.getElementById('voiceSelect');
      selector.innerHTML = '<option value="0">🤖 Auto</option>';
      
      drAnat.getVoiceOptions().forEach((opt, i) => {
        const el = document.createElement('option');
        el.value = i + 1;
        el.textContent = opt.label;
        selector.appendChild(el);
      });
    });

    // Handle voice selection
    document.getElementById('voiceSelect').addEventListener('change', (e) => {
      if (e.target.value > 0) {
        const voices = drAnat.getVoiceOptions();
        drAnat.setVoice(voices[e.target.value - 1].voice);
      }
    });
  </script>
</body>
</html>
```

## Platform-Specific Notes

### Chrome / Edge
- ✅ Best voice support (Google, Microsoft voices)
- ✅ 4-5 voices typically available
- ✅ Optimal for medical teaching

### Firefox
- ✅ Works well
- ⚠️ Fewer voice options
- Uses system voices (Windows / macOS)

### Safari
- ✅ Apple voices (Samantha, Victoria)
- ✅ Good quality
- ✅ Limited gender variety

## Testing Checklist

- [ ] Voice dropdown appears on page load
- [ ] At least 3-4 voices available
- [ ] Voice switching works instantly
- [ ] Selected voice used when teaching
- [ ] Status message shows "Voice changed to..."
- [ ] Works on Chrome
- [ ] Works on Firefox
- [ ] Works on Safari
- [ ] Mouth animation syncs with speech
- [ ] Eyes blink during idle

## Common Issues

### "No voices available" error
**Fix:** Try different browser (Chrome recommended)

### Voice very fast/slow
**Fix:** Adjust rate in `speak()` method (line ~660 in avatar.js)

### Voice not switching
**Fix:** Make sure to click dropdown again after selecting

## File Updates

Changed files:
- ✅ `www/js/dr-vivek-avatar.js` - Added voice discovery + selection
- ✅ `www/dr-vivek-demo.html` - Added voice selector UI
- ✅ `VOICE-SELECTION-GUIDE.md` - Full documentation

No breaking changes - all existing functionality preserved!

## Next Steps

1. **Test the demo:** http://localhost:8080/dr-vivek-demo.html
2. **Try different voices** from the dropdown
3. **Integrate into topic pages** using the example above
4. **Customize voice rate/pitch** if needed (see VOICE-SELECTION-GUIDE.md)

---

**Questions?** Check VOICE-SELECTION-GUIDE.md for detailed documentation.
