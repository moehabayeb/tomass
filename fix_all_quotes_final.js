const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tomass-main', 'src', 'components', 'LessonsApp.tsx');

console.log('🔧 Fixing ALL mismatched quotes in LessonsApp.tsx...\n');

let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let fixCount = 0;

// Fix patterns:
// 1. Single quote start, double quote end: 'text" → 'text'
// 2. Double quote start, single quote end: "text' → "text"

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Pattern 1: 'something" (single start, double end)
  if (line.includes("'") && line.includes('"')) {
    // Count quotes
    const singleQuotes = (line.match(/'/g) || []).length;
    const doubleQuotes = (line.match(/"/g) || []).length;

    // If mismatched and in Module 113 or 114 area (lines 6750-6900)
    if (i >= 6750 && i <= 6900) {
      // Replace pattern: 'text" → 'text'
      const fixed = line.replace(/'([^'"]*)"/g, "'$1'");
      if (fixed !== line) {
        lines[i] = fixed;
        fixCount++;
        console.log(`Line ${i + 1}: Fixed mismatched quotes`);
      }
    }
  }
}

// Write back
const newContent = lines.join('\n');
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log(`\n✅ Fixed ${fixCount} lines with mismatched quotes\n`);

// Verify
console.log('Running final verification...');
const verify = fs.readFileSync(filePath, 'utf-8');
const verifyLines = verify.split('\n');

let remaining = 0;
for (let i = 6750; i < 6900 && i < verifyLines.length; i++) {
  const line = verifyLines[i];
  if (line.match(/'[^'"]*"/)) {
    remaining++;
    console.log(`⚠️  Line ${i + 1}: ${line.substring(0, 80)}`);
  }
}

if (remaining === 0) {
  console.log('✅ All mismatched quotes fixed in Module 113-114 area!');
} else {
  console.log(`⚠️  ${remaining} lines still have mismatched quotes`);
}
