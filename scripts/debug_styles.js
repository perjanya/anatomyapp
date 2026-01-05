const mammoth = require('mammoth');
const path = require('path');

const docxPath = path.join(__dirname, '..', 'www', 'content', 'upper-limb', 'deltoid.docx');

mammoth.convertToHtml({ 
  path: docxPath,
  includeDefaultStyleMap: false
})
  .then(result => {
    console.log('=== HTML Output ===');
    console.log(result.value);
    console.log('\n=== Messages ===');
    result.messages.forEach(msg => console.log(msg));
  })
  .catch(err => console.error('Error:', err));
