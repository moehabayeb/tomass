const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tomass-main', 'src', 'components', 'LessonsApp.tsx');

console.log('🔧 Complete quote fixing in LessonsApp.tsx...\n');

let content = fs.readFileSync(filePath, 'utf-8');

// Fix ALL quote inconsistencies in Modules 113-114 (lines ~6750-6900)
// Strategy: Replace ALL quotes in question/answer strings with double quotes

const lines = content.split('\n');
let fixCount = 0;

for (let i = 6750; i < 6900 && i < lines.length; i++) {
  const line = lines[i];

  // If line contains 'question:' or 'answer:' or listeningExamples
  if (line.includes('question:') || line.includes('answer:') ||
      (i >= 6849 && i <= 6855)) { // listeningExamples range

    // Replace: 'text" → "text"
    let fixed = line.replace(/'([^'"]*)"/, '"$1"');

    // Replace: "text' → "text"
    fixed = fixed.replace(/"([^'"]*)'/g, '"$1"');

    if (fixed !== line) {
      lines[i] = fixed;
      fixCount++;
    }
  }
}

content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf-8');

console.log(`✅ Fixed ${fixCount} quote inconsistencies\n`);
console.log('✅ All quotes in Modules 113-114 should now be consistent!\n');
