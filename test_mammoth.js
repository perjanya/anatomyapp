const mammoth = require('mammoth');
const path = require('path');

const testFile = 'www/content/upper-limb/breastlymphatic.docx';

console.log('Testing mammoth conversion on:', testFile);

mammoth.convertToHtml({path: testFile})
  .then(result => {
    console.log('\n=== CONVERSION RESULT ===');
    console.log('HTML length:', result.value.length);
    console.log('\nFirst 1000 characters:');
    console.log(result.value.substring(0, 1000));
    console.log('\n=== MESSAGES ===');
    console.log(result.messages);
    
    if (result.value.length === 0) {
      console.log('\n❌ WARNING: Conversion produced empty HTML!');
    } else {
      console.log(`\n✓ Conversion successful - ${result.value.length} characters`);
    }
  })
  .catch(err => {
    console.error('❌ ERROR:', err);
  });
