const mammoth = require('mammoth');
const path = require('path');

const docxPath = path.join(__dirname, '..', 'www', 'content', 'upper-limb', 'deltoid.docx');

mammoth.convertToHtml({ 
  path: docxPath,
  styleMap: [
    "p[style-id='clinical-box'] => div.clinical-box:fresh",
    "p[style-id='warning-box'] => div.warning-box:fresh",
    "p[style-id='note-box'] => div.note-box:fresh"
  ]
})
  .then(result => {
    console.log('=== HTML Output ===');
    console.log(result.value);
    console.log('\n=== Messages ===');
    result.messages.forEach(msg => console.log(msg));
  })
  .catch(err => console.error('Error:', err));
