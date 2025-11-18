const fs = require('fs');

const content = fs.readFileSync('src/components/A1A2B1ModulesData.ts', 'utf-8');

// Extract all MODULE_X_DATA exports
const modulePattern = /const MODULE_(\d+)_DATA = \{[\s\S]*?speakingPractice: \[([\s\S]*?)\]\s*\};/g;
let match;
let issues = [];
let questionCounts = {};

while ((match = modulePattern.exec(content)) !== null) {
  const moduleNum = match[1];
  const speakingPracticeContent = match[2];

  // Count questions by counting question/answer pairs
  const questionCount = (speakingPracticeContent.match(/\{ question:/g) || []).length;
  questionCounts[moduleNum] = questionCount;

  if (questionCount !== 40) {
    issues.push(`Module ${moduleNum}: ${questionCount} questions (expected 40)`);
  }
}

console.log(`Total modules validated: ${Object.keys(questionCounts).length}`);
console.log('');

if (issues.length > 0) {
  console.log('ISSUES FOUND:');
  issues.forEach(issue => console.log(issue));
  console.log('');
  console.log(`Total issues: ${issues.length}`);
} else {
  console.log('✓ All modules have exactly 40 questions!');
}
