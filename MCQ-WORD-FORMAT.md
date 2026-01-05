# MCQ Formatting Guidelines for Word Documents

## How to Add MCQs to Your Word Documents

### Format in Word Document

At the end of your topic content in the Word document, add MCQs using this exact format:

```
___MCQ_START___

Q1. What is the primary lymphatic drainage site for the breast?
A. Inguinal lymph nodes
B. Axillary lymph nodes [CORRECT]
C. Cervical lymph nodes
D. Mediastinal lymph nodes
___

Q2. Where are the pectoral (anterior) group of axillary nodes located?
A. Along the subscapular vessels
B. Along the lateral thoracic vessels [CORRECT]
C. At the apex of the axilla
D. In the center of the axilla
___

Q3. How many main groups of axillary lymph nodes are there?
A. 3 groups
B. 5 groups [CORRECT]
C. 7 groups
D. 10 groups
___

___MCQ_END___
```

## Important Rules

### 1. **Start and End Markers**
- Begin MCQ section with: `___MCQ_START___`
- End MCQ section with: `___MCQ_END___`
- These MUST be on their own lines

### 2. **Question Format**
- Start each question with `Q1.`, `Q2.`, `Q3.`, etc.
- Question text follows immediately after the number
- Leave a blank line between questions is optional but recommended

### 3. **Separator Between Questions**
- Use three underscores `___` on a separate line between questions
- This creates a visual separator in Word and helps parsing

### 4. **Answer Options**
- Use letters: `A.`, `B.`, `C.`, `D.` (or more if needed)
- Each option on its own line
- At least 2 options, typically 4 options recommended

### 5. **Marking the Correct Answer**
- Add `[CORRECT]` after the correct answer text
- Alternative markers also accepted:
  - `[CORRECT]`
  - `[✓]`
  - `[RIGHT]`
  - `[ANSWER]`
- **Only ONE correct answer per question**

## Example in Word

Here's exactly how it should look in your Word document:

---

**Normal content above...**

Lymphatic metastasis occurs primarily to the axillary and internal mammary lymph nodes.

---

___MCQ_START___

Q1. What drains into the axillary lymph nodes?
A. Liver tissue
B. Breast tissue [CORRECT]
C. Brain tissue
D. Kidney tissue
___

Q2. The apical lymph nodes are located where?
A. Along the axillary vein
B. At the apex of the axilla [CORRECT]
C. In the center of the axilla
D. Along the lateral thoracic vessels
___

Q3. Which is NOT a group of axillary lymph nodes?
A. Pectoral nodes
B. Central nodes
C. Hepatic nodes [CORRECT]
D. Apical nodes
___

___MCQ_END___

---

## Visual Tips for Word

To make MCQs stand out in your Word document (optional but helpful):

1. **Use a different font color** for MCQ section (e.g., dark blue)
2. **Use bold** for question numbers and letters (Q1., A., B., etc.)
3. **Highlight** the correct answer with yellow highlighting + `[CORRECT]` tag
4. **Add a heading** before MCQs like "Practice Questions" or "Self-Assessment"

## What NOT to Do

❌ **Don't do this:**
```
Question 1: What is the answer?
- Option A
- Option B (correct)
- Option C
```

❌ **Don't do this:**
```
1) What is the answer?
a) Option A
b) Option B ✓
c) Option C
```

❌ **Don't do this:**
```
Q1. What is the answer?
A, B, C, or D (all correct)
```

## After Saving the Word Document

1. Save your Word document with MCQs in: `www/content/upper-limb/`
2. Run the generation script:
   ```powershell
   node scripts/generate_toc.js
   ```
3. The script will:
   - Detect the MCQ section
   - Convert it to interactive HTML
   - Add the celebration effects automatically
   - Create the collapsible structure

## Result

Your MCQs will appear at the bottom of the topic page with:
- ✨ Beautiful styling with borders
- 🎯 Click-to-answer interactivity
- 🎉 Confetti celebration for correct answers
- 📊 Score tracking
- ✓ Immediate feedback (correct/incorrect)
- 🎨 Color-coded responses (green for correct, red for incorrect)

## Quick Checklist

Before running the conversion script, verify:
- [ ] `___MCQ_START___` at the beginning
- [ ] `___MCQ_END___` at the end
- [ ] Each question starts with `Q1.`, `Q2.`, etc.
- [ ] Questions separated by `___`
- [ ] Options use `A.`, `B.`, `C.`, `D.`
- [ ] Exactly ONE option has `[CORRECT]` marker
- [ ] At least 3-4 options per question
- [ ] Questions are clear and unambiguous

## Example File

See `www/mcq-example.html` to see what the final interactive MCQs look like on the website.
