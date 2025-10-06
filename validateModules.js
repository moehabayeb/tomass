/**
 * Module Validation Script
 *
 * Validates all 150 modules in LessonsApp.tsx
 * Checks for:
 * - Missing speakingPractice arrays
 * - Empty Q&A pairs
 * - Invalid data structures
 * - Short/problematic answers
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tomass-main', 'src', 'components', 'LessonsApp.tsx');

function validateModules() {
  console.log('🔍 Starting module validation...\n');

  const content = fs.readFileSync(filePath, 'utf-8');
  const results = [];

  // Find all MODULE_X_DATA definitions
  const moduleRegex = /const MODULE_(\d+)_DATA = \{([\s\S]*?)^};/gm;
  let match;

  while ((match = moduleRegex.exec(content)) !== null) {
    const moduleId = parseInt(match[1]);
    const moduleContent = match[2];

    const issues = [];

    // Extract title
    const titleMatch = moduleContent.match(/title:\s*["'`]([^"'`]+)["'`]/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';

    // Check for speakingPractice array
    const speakingPracticeMatch = moduleContent.match(/speakingPractice:\s*\[([\s\S]*?)\]/);

    if (!speakingPracticeMatch) {
      issues.push({
        module: moduleId,
        severity: 'error',
        type: 'MISSING_SPEAKING_PRACTICE',
        message: 'No speakingPractice array found',
        fix: 'Add speakingPractice array with 40 Q&A pairs'
      });

      results.push({
        moduleId,
        title,
        speakingPracticeCount: 0,
        issues
      });
      continue;
    }

    const speakingPracticeContent = speakingPracticeMatch[1];

    // Count Q&A pairs
    const qaMatches = speakingPracticeContent.match(/\{\s*question:/g);
    const qaCount = qaMatches ? qaMatches.length : 0;

    if (qaCount === 0) {
      issues.push({
        module: moduleId,
        severity: 'error',
        type: 'EMPTY_SPEAKING_PRACTICE',
        message: 'speakingPractice array is empty',
        fix: 'Add 40 Q&A pairs'
      });
    } else if (qaCount < 40) {
      issues.push({
        module: moduleId,
        severity: 'warning',
        type: 'INSUFFICIENT_QA_PAIRS',
        message: `Only ${qaCount}/40 Q&A pairs found`,
        fix: `Add ${40 - qaCount} more Q&A pairs`
      });
    } else if (qaCount > 40) {
      issues.push({
        module: moduleId,
        severity: 'info',
        type: 'EXTRA_QA_PAIRS',
        message: `Has ${qaCount} Q&A pairs (more than standard 40)`,
        fix: 'Optional: trim to 40 or keep extra for variety'
      });
    }

    // Check for empty answers
    const emptyAnswerMatches = speakingPracticeContent.match(/answer:\s*["'`]["'`]/g);
    if (emptyAnswerMatches && emptyAnswerMatches.length > 0) {
      issues.push({
        module: moduleId,
        severity: 'error',
        type: 'EMPTY_ANSWERS',
        message: `${emptyAnswerMatches.length} empty answers found`,
        fix: 'Fill in all answer fields'
      });
    }

    // Check for very short answers (< 5 chars, likely problematic)
    const shortAnswerRegex = /answer:\s*["'`]([^"'`]{1,4})["'`]/g;
    let shortMatches;
    let shortCount = 0;
    while ((shortMatches = shortAnswerRegex.exec(speakingPracticeContent)) !== null) {
      // Exclude common short valid answers
      const answer = shortMatches[1].trim().toLowerCase();
      if (!['yes', 'no', 'ok'].includes(answer)) {
        shortCount++;
      }
    }

    if (shortCount > 0) {
      issues.push({
        module: moduleId,
        severity: 'warning',
        type: 'SHORT_ANSWERS',
        message: `${shortCount} very short answers (may cause MCQ issues)`,
        fix: 'Review and expand short answers if needed'
      });
    }

    results.push({
      moduleId,
      title,
      speakingPracticeCount: qaCount,
      issues
    });
  }

  return results;
}

function generateReport(results) {
  console.log('📊 VALIDATION REPORT\n');
  console.log('='.repeat(80));

  const errorModules = results.filter(r => r.issues.some(i => i.severity === 'error'));
  const warningModules = results.filter(r => r.issues.some(i => i.severity === 'warning'));
  const cleanModules = results.filter(r => r.issues.length === 0);

  console.log(`\n✅ Clean Modules: ${cleanModules.length}/150`);
  console.log(`⚠️  Modules with Warnings: ${warningModules.length}/150`);
  console.log(`❌ Modules with Errors: ${errorModules.length}/150`);

  if (errorModules.length > 0) {
    console.log('\n\n❌ ERRORS (Critical Issues):');
    console.log('='.repeat(80));
    errorModules.forEach(module => {
      console.log(`\nModule ${module.moduleId}: ${module.title}`);
      module.issues
        .filter(i => i.severity === 'error')
        .forEach(issue => {
          console.log(`  ❌ ${issue.type}: ${issue.message}`);
          if (issue.fix) console.log(`     Fix: ${issue.fix}`);
        });
    });
  }

  if (warningModules.length > 0 && warningModules.length <= 20) {
    console.log('\n\n⚠️  WARNINGS (Should Review):');
    console.log('='.repeat(80));
    warningModules.forEach(module => {
      console.log(`\nModule ${module.moduleId}: ${module.title}`);
      module.issues
        .filter(i => i.severity === 'warning')
        .forEach(issue => {
          console.log(`  ⚠️  ${issue.type}: ${issue.message}`);
          if (issue.fix) console.log(`     Fix: ${issue.fix}`);
        });
    });
  } else if (warningModules.length > 20) {
    console.log('\n\n⚠️  WARNINGS: Too many to display (see JSON report)');
  }

  // Summary statistics
  console.log('\n\n📈 STATISTICS:');
  console.log('='.repeat(80));

  const totalQAPairs = results.reduce((sum, r) => sum + r.speakingPracticeCount, 0);
  const avgQAPairs = totalQAPairs / results.length;

  console.log(`Total Modules Analyzed: ${results.length}`);
  console.log(`Total Q&A Pairs: ${totalQAPairs}`);
  console.log(`Average Q&A Pairs per Module: ${avgQAPairs.toFixed(1)}`);
  console.log(`Modules with 40 Q&A pairs: ${results.filter(r => r.speakingPracticeCount === 40).length}`);

  // Generate priority fix list
  console.log('\n\n🔧 PRIORITY FIX LIST:');
  console.log('='.repeat(80));

  const priorityFixes = results
    .filter(r => r.issues.some(i => i.severity === 'error'))
    .sort((a, b) => a.moduleId - b.moduleId);

  if (priorityFixes.length === 0) {
    console.log('✅ No critical fixes needed!');
  } else {
    priorityFixes.forEach((module, idx) => {
      console.log(`${idx + 1}. Module ${module.moduleId} - ${module.issues.filter(i => i.severity === 'error').map(i => i.type).join(', ')}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ Validation complete!\n');

  // Save detailed report to file
  const reportPath = path.join(__dirname, 'MODULE_VALIDATION_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}\n`);

  return results;
}

// Run validation
try {
  const results = validateModules();
  generateReport(results);
} catch (error) {
  console.error('❌ Validation failed:', error);
  process.exit(1);
}
