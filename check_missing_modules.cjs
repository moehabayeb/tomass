const fs = require('fs');

const content = fs.readFileSync('src/components/A1A2B1ModulesData.ts', 'utf-8');

// Check for all modules 1-150
const missing = [];
const found = [];

for (let i = 1; i <= 150; i++) {
  const pattern = new RegExp(`const MODULE_${i}_DATA = \\{`);
  if (pattern.test(content)) {
    found.push(i);
  } else {
    missing.push(i);
  }
}

console.log(`Total modules found: ${found.length}/150`);
console.log('');

if (missing.length > 0) {
  console.log('MISSING MODULES:');
  console.log(missing.join(', '));
  console.log('');
  console.log(`Total missing: ${missing.length}`);
} else {
  console.log('✓ All modules 1-150 are defined!');
}
