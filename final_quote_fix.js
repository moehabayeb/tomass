const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tomass-main', 'src', 'components', 'LessonsApp.tsx');

console.log('🔧 Final comprehensive quote fixing...\n');

let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let fixCount = 0;

// Module 113-114 area
for (let i = 6760; i < 6900 && i < lines.length; i++) {
  let line = lines[i];
  const original = line;

  // Fix pattern 1: '...' } where end quote is wrong
  line = line.replace(/(pattern|example|question|answer):\s*'([^']*?)'\s*}/g, '$1: "$2" }');
  line = line.replace(/(pattern|example|question|answer):\s*'([^']*?)'\s*,/g, '$1: "$2",');

  // Fix pattern 2: Inconsistent quotes in string values
  line = line.replace(/(pattern|example|question|answer):\s*"([^"]*?)'/g, '$1: "$2"');
  line = line.replace(/(pattern|example|question|answer):\s*'([^']*?)"/g, '$1: "$2"');

  if (line !== original) {
    lines[i] = line;
    fixCount++;
    console.log(`Line ${i + 1}: Fixed`);
  }
}

content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf-8');

console.log(`\n✅ Fixed ${fixCount} lines\n`);
console.log('Running build test...\n');
