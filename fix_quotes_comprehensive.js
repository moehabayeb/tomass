const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tomass-main', 'src', 'components', 'LessonsApp.tsx');

console.log('🔧 Fixing smart quotes in LessonsApp.tsx...\n');

let content = fs.readFileSync(filePath, 'utf-8');

// Count occurrences before fixing
const smartQuotesCount = (content.match(/[""]/g) || []).length;
console.log(`Found ${smartQuotesCount} smart quotes to fix\n`);

// Replace smart quotes with regular quotes
content = content.replace(/"/g, '"');
content = content.replace(/"/g, '"');
content = content.replace(/'/g, "'");
content = content.replace(/'/g, "'");

// Write back
fs.writeFileSync(filePath, content, 'utf-8');

console.log('✅ Fixed all smart quotes!\n');
console.log('Running validation...\n');

// Verify no smart quotes remain
const verification = fs.readFileSync(filePath, 'utf-8');
const remaining = (verification.match(/[""'']/g) || []).length;

if (remaining === 0) {
  console.log('✅ All smart quotes successfully replaced!');
} else {
  console.log(`⚠️  Warning: ${remaining} smart quotes may still remain`);
}
