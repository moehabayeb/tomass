/**
 * Module Question Analysis Script
 * Finds modules with wrong question counts and duplicate questions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODULE_FILES = [
  '../src/components/A1A2B1ModulesData.ts',
  '../src/components/B2ModulesData.ts',
  '../src/components/C1ModulesData.ts',
  '../src/components/C1ModulesData_Extended.ts',
  '../src/components/C1ModulesData_Advanced.ts',
  '../src/components/C2ModulesData.ts'
];

const EXPECTED_QUESTIONS = 40;

console.log('📊 Starting module question analysis...\n');

// Results storage
const results = {
  wrongCounts: [],
  duplicates: [],
  totalModules: 0,
  totalQuestions: 0
};

// Process each file
MODULE_FILES.forEach(file => {
  const filePath = path.join(__dirname, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${path.basename(file)} (not found)\n`);
    return;
  }

  console.log(`\n📁 Analyzing ${path.basename(file)}...`);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract all modules
  const moduleRegex = /const MODULE_(\d+)_DATA\s*=\s*{[\s\S]*?questions:\s*\[([\s\S]*?)\]\s*(?:,\s*speakingPractice|}\s*;)/g;

  let match;
  while ((match = moduleRegex.exec(content)) !== null) {
    const moduleNum = parseInt(match[1]);
    const questionsBlock = match[2];

    // Count questions by counting opening braces of question objects
    // Look for patterns like: { id: 'xxx', question: 'yyy', ...
    const questionMatches = questionsBlock.match(/{\s*id:/g);
    const questionCount = questionMatches ? questionMatches.length : 0;

    results.totalModules++;
    results.totalQuestions += questionCount;

    // Check if count is wrong
    if (questionCount !== EXPECTED_QUESTIONS) {
      results.wrongCounts.push({
        module: moduleNum,
        file: path.basename(file),
        count: questionCount,
        expected: EXPECTED_QUESTIONS,
        diff: questionCount - EXPECTED_QUESTIONS
      });

      const status = questionCount < EXPECTED_QUESTIONS ? '❌' : '⚠️';
      const diffText = questionCount < EXPECTED_QUESTIONS
        ? `MISSING ${EXPECTED_QUESTIONS - questionCount}`
        : `EXTRA ${questionCount - EXPECTED_QUESTIONS}`;

      console.log(`  ${status} Module ${moduleNum}: ${questionCount} questions (${diffText})`);
    }

    // Find duplicates within this module
    const questionTextRegex = /question:\s*["'](.*?)["']/g;
    const questions = [];
    let qMatch;

    while ((qMatch = questionTextRegex.exec(questionsBlock)) !== null) {
      questions.push(qMatch[1]);
    }

    // Check for duplicates
    const seen = new Map();
    questions.forEach((q, idx) => {
      if (seen.has(q)) {
        results.duplicates.push({
          module: moduleNum,
          file: path.basename(file),
          question: q,
          indices: [seen.get(q), idx]
        });
      } else {
        seen.set(q, idx);
      }
    });
  }
});

// Print summary report
console.log('\n\n' + '='.repeat(70));
console.log('📋 MODULE QUESTION ANALYSIS REPORT');
console.log('='.repeat(70));

console.log(`\n📊 Overall Statistics:`);
console.log(`   Total Modules: ${results.totalModules}`);
console.log(`   Total Questions: ${results.totalQuestions}`);
console.log(`   Average per Module: ${(results.totalQuestions / results.totalModules).toFixed(1)}`);

// Wrong counts
console.log(`\n\n❌ MODULES WITH WRONG QUESTION COUNTS: ${results.wrongCounts.length}`);
if (results.wrongCounts.length > 0) {
  console.log('=' .repeat(70));

  // Group by issue type
  const missing = results.wrongCounts.filter(m => m.diff < 0);
  const extra = results.wrongCounts.filter(m => m.diff > 0);

  if (missing.length > 0) {
    console.log(`\n🔴 MISSING QUESTIONS (${missing.length} modules):`);
    missing.sort((a, b) => a.module - b.module).forEach(m => {
      console.log(`   Module ${m.module.toString().padStart(3)}: ${m.count.toString().padStart(2)} questions (need ${Math.abs(m.diff)} more)`);
    });
  }

  if (extra.length > 0) {
    console.log(`\n🟡 EXTRA QUESTIONS (${extra.length} modules):`);
    extra.sort((a, b) => a.module - b.module).forEach(m => {
      console.log(`   Module ${m.module.toString().padStart(3)}: ${m.count.toString().padStart(2)} questions (remove ${m.diff})`);
    });
  }

  // Detailed breakdown
  console.log(`\n📝 Detailed Breakdown:`);
  results.wrongCounts.sort((a, b) => a.module - b.module).forEach(m => {
    const action = m.diff < 0 ? `ADD ${Math.abs(m.diff)}` : `REMOVE ${m.diff}`;
    console.log(`   Module ${m.module}: ${m.count}/${EXPECTED_QUESTIONS} → ${action} questions`);
  });
}

// Duplicates
console.log(`\n\n🔄 DUPLICATE QUESTIONS: ${results.duplicates.length}`);
if (results.duplicates.length > 0) {
  console.log('='.repeat(70));

  // Group by module
  const byModule = {};
  results.duplicates.forEach(d => {
    if (!byModule[d.module]) byModule[d.module] = [];
    byModule[d.module].push(d);
  });

  Object.keys(byModule).sort((a, b) => parseInt(a) - parseInt(b)).forEach(moduleNum => {
    const dups = byModule[moduleNum];
    console.log(`\n   Module ${moduleNum} (${dups.length} duplicates):`);
    dups.forEach((d, idx) => {
      const preview = d.question.length > 60
        ? d.question.substring(0, 57) + '...'
        : d.question;
      console.log(`     ${idx + 1}. "${preview}"`);
      console.log(`        Found at indices: ${d.indices.join(', ')}`);
    });
  });
}

// Priority action items
console.log('\n\n' + '='.repeat(70));
console.log('🎯 PRIORITY ACTION ITEMS:');
console.log('='.repeat(70));

if (results.wrongCounts.length > 0) {
  console.log('\n1. Fix Module Question Counts:');
  results.wrongCounts.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff)).slice(0, 10).forEach((m, idx) => {
    const action = m.diff < 0 ? 'ADD' : 'REMOVE';
    console.log(`   ${idx + 1}. Module ${m.module}: ${action} ${Math.abs(m.diff)} questions`);
  });
}

if (results.duplicates.length > 0) {
  console.log('\n2. Remove Duplicate Questions:');
  const modulesWithDups = new Set(results.duplicates.map(d => d.module));
  console.log(`   Affected modules: ${Array.from(modulesWithDups).sort((a, b) => a - b).join(', ')}`);
}

console.log('\n\n✅ Analysis complete!\n');

// Export results to JSON for automated fixing
const outputPath = path.join(__dirname, 'module-analysis-results.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`📄 Detailed results saved to: ${path.basename(outputPath)}\n`);
