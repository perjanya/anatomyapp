# Sample MCQ Format for Word Documents

Copy and paste this into your Word document at the end of your content:

---

## Your Normal Content Above

... your anatomy notes here ...

The lymphatic drainage is important for understanding breast cancer metastasis.

---

## Add MCQs Below (copy everything from ___MCQ_START___ to ___MCQ_END___)

___MCQ_START___

Q1. What is the primary site of lymphatic drainage from the breast?
A. Inguinal lymph nodes
B. Axillary lymph nodes [CORRECT]
C. Cervical lymph nodes
D. Mediastinal lymph nodes
___

Q2. How many groups of axillary lymph nodes are commonly described?
A. 3 groups
B. 5 groups [CORRECT]
C. 7 groups
D. 9 groups
___

Q3. Where are the apical lymph nodes located?
A. At the base of the axilla
B. Along the axillary vein
C. At the apex of the axilla [CORRECT]
D. Along the lateral thoracic vessels
___

Q4. The pectoral (anterior) nodes are located along which vessel?
A. Subscapular vessels
B. Axillary vein
C. Lateral thoracic vessels [CORRECT]
D. Internal thoracic vessels
___

Q5. Which of the following is a clinical significance of axillary lymph nodes?
A. They are never involved in disease
B. They are important in breast cancer staging [CORRECT]
C. They only drain the upper limb
D. They drain directly into the thoracic duct
___

___MCQ_END___

---

## Tips for Your MCQs:

1. **Keep questions clear and specific**
   - Good: "Where are the apical lymph nodes located?"
   - Bad: "What about the nodes?"

2. **Make distractors plausible**
   - All options should seem reasonable to someone who didn't study
   - Avoid obvious wrong answers like "The moon"

3. **Only ONE correct answer**
   - Mark it with [CORRECT]
   - Double-check before saving

4. **Use 4 options typically**
   - A, B, C, D is standard
   - You can use more (E, F) if needed
   - Minimum 2 options required

5. **Test different levels**
   - Mix recall questions (facts)
   - Include application questions (clinical scenarios)
   - Add some challenging questions

## Common Mistakes to Avoid:

❌ Forgetting the `___` separator between questions
❌ Using different markers like (1), (2) instead of Q1., Q2.
❌ Marking multiple answers as [CORRECT]
❌ Forgetting to mark ANY answer as [CORRECT]
❌ Using a), b), c) instead of A., B., C.
❌ Not including ___MCQ_END___ marker

## After Adding MCQs:

1. **Save your .docx file** in: `www/content/upper-limb/`
2. **Run the script**: `node scripts/generate_toc.js`
3. **Check the result**: Open the generated HTML in browser
4. **Test the MCQs**: Click through to verify they work

The script will automatically:
✓ Detect your MCQ section
✓ Parse questions and answers  
✓ Create interactive HTML
✓ Add celebration effects
✓ Include score tracking
