const mammoth = require('mammoth');
const path = require('path');
const fs = require('fs');

const testFile = path.join(__dirname, '..', 'www', 'content', 'upper-limb', 'Median nerve.docx');

mammoth.convertToHtml({path: testFile})
  .then(result => {
    console.log('HTML Length:', result.value.length);
    console.log('First 500 chars:');
    console.log(result.value.substring(0, 500));
    console.log('\nLast 500 chars:');
    console.log(result.value.substring(result.value.length - 500));
    
    if (result.messages.length > 0) {
      console.log('\nMessages/Warnings:');
      result.messages.forEach(msg => console.log(msg));
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });
