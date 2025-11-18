const fs = require('fs');

const content = fs.readFileSync('src/components/A1A2B1ModulesData.ts', 'utf-8');

// Extract all MODULE_X_DATA exports
const modulePattern = /const MODULE_(\d+)_DATA = \{([\s\S]*?)speakingPractice: \[([\s\S]*?)\]\s*\};/g;
let match;
let issues = [];

console.log('=== DEEP MODULE DATA ANALYSIS ===\n');

while ((match = modulePattern.exec(content)) !== null) {
  const moduleNum = parseInt(match[1]);
  const moduleContent = match[2];
  const speakingPracticeContent = match[3];

  // Count questions by counting question/answer pairs
  const questionCount = (speakingPracticeContent.match(/\{ question:/g) || []).length;

  // Check for missing answers
  const answerCount = (speakingPracticeContent.match(/answer:/g) || []).length;

  // Check for malformed questions (missing quotes, etc)
  const questions = speakingPracticeContent.match(/question:\s*"([^"]*?)"/g) || [];
  const answers = speakingPracticeContent.match(/answer:\s*"([^"]*?)"/g) || [];

  // Check for empty strings
  const emptyQuestions = questions.filter(q => q.includes('question: ""'));
  const emptyAnswers = answers.filter(a => a.includes('answer: ""'));

  // Check if module has title and description
  const hasTitle = /title:/.test(moduleContent);
  const hasDescription = /description:/.test(moduleContent);
  const hasIntro = /intro:/.test(moduleContent);

  // Report issues
  if (questionCount !== 40) {
    issues.push({
      module: moduleNum,
      type: 'CRITICAL',
      issue: `Wrong question count: ${questionCount} (expected 40)`
    });
  }

  if (questionCount !== answerCount) {
    issues.push({
      module: moduleNum,
      type: 'CRITICAL',
      issue: `Mismatch: ${questionCount} questions but ${answerCount} answers`
    });
  }

  if (emptyQuestions.length > 0) {
    issues.push({
      module: moduleNum,
      type: 'CRITICAL',
      issue: `${emptyQuestions.length} empty questions detected`
    });
  }

  if (emptyAnswers.length > 0) {
    issues.push({
      module: moduleNum,
      type: 'CRITICAL',
      issue: `${emptyAnswers.length} empty answers detected`
    });
  }

  if (!hasTitle) {
    issues.push({
      module: moduleNum,
      type: 'HIGH',
      issue: 'Missing title field'
    });
  }

  if (!hasDescription) {
    issues.push({
      module: moduleNum,
      type: 'MEDIUM',
      issue: 'Missing description field'
    });
  }

  // Check for duplicate questions
  const questionTexts = questions.map(q => q.replace(/question:\s*"/, '').replace(/"$/, ''));
  const uniqueQuestions = new Set(questionTexts);
  if (uniqueQuestions.size !== questionTexts.length) {
    const duplicateCount = questionTexts.length - uniqueQuestions.size;
    issues.push({
      module: moduleNum,
      type: 'HIGH',
      issue: `${duplicateCount} duplicate questions detected`
    });
  }
}

// Group issues by severity
const critical = issues.filter(i => i.type === 'CRITICAL');
const high = issues.filter(i => i.type === 'HIGH');
const medium = issues.filter(i => i.type === 'MEDIUM');

console.log(`Total modules analyzed: 150`);
console.log(`Total issues found: ${issues.length}\n`);

if (critical.length > 0) {
  console.log('🔴 CRITICAL ISSUES (Data Loss/Crashes):');
  critical.forEach(i => console.log(`  Module ${i.module}: ${i.issue}`));
  console.log('');
}

if (high.length > 0) {
  console.log('🟠 HIGH PRIORITY ISSUES (Broken Functionality):');
  high.forEach(i => console.log(`  Module ${i.module}: ${i.issue}`));
  console.log('');
}

if (medium.length > 0) {
  console.log('🟡 MEDIUM PRIORITY ISSUES (UX Issues):');
  medium.forEach(i => console.log(`  Module ${i.module}: ${i.issue}`));
  console.log('');
}

if (issues.length === 0) {
  console.log('✅ All modules passed validation!');
}

// Specific problematic modules
const problematicModules = [21, 22, 23, 24, 47, 51, 107, 114, 126, 131, 141, 142, 150];
console.log('\n=== PROBLEMATIC MODULES (Wrong Question Count) ===');
problematicModules.forEach(moduleNum => {
  const moduleIssues = issues.filter(i => i.module === moduleNum);
  console.log(`\nModule ${moduleNum}:`);
  moduleIssues.forEach(i => console.log(`  - ${i.type}: ${i.issue}`));
});
