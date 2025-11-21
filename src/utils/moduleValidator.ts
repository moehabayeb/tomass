/**
 * Module Data Validation Utility
 *
 * Validates that all lesson modules have complete and correct data structures.
 * Helps ensure production-ready quality across all modules.
 *
 * 🔧 FIX #26: Now uses centralized MODULE_RANGES constants
 */

import { MODULE_RANGES, isValidModuleId } from '@/constants/moduleRanges';

export interface ModuleData {
  title: string;
  description: string;
  intro: string;
  tip: string;
  table: any[];
  listeningExamples: string[];
  speakingPractice: Array<{ question: string; answer: string } | string>;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  moduleId?: number;
}

export interface AuditReport {
  totalModules: number;
  validModules: number;
  invalidModules: number;
  moduleResults: Map<number, ValidationResult>;
  summary: {
    missingFields: number;
    insufficientQuestions: number;
    emptyTables: number;
    genericContent: number;
    duplicateContent: number;
  };
}

/**
 * Validate a single module's data structure and content quality
 */
export function validateModule(
  moduleId: number,
  data: ModuleData | null | undefined
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if data exists
  if (!data) {
    errors.push(`Module ${moduleId}: Data is null or undefined`);
    return { valid: false, errors, warnings, moduleId };
  }

  // Check required fields exist
  const requiredFields: (keyof ModuleData)[] = [
    'title',
    'description',
    'intro',
    'tip',
    'table',
    'listeningExamples',
    'speakingPractice'
  ];

  for (const field of requiredFields) {
    if (!(field in data) || data[field] === undefined || data[field] === null) {
      errors.push(`Module ${moduleId}: Missing required field "${field}"`);
    }
  }

  // Validate title
  if (data.title) {
    if (data.title.length < 5) {
      warnings.push(`Module ${moduleId}: Title is too short (${data.title.length} chars)`);
    }
    if (data.title.toLowerCase().includes('module ' + moduleId) && data.title.split(' ').length <= 3) {
      warnings.push(`Module ${moduleId}: Title appears to be placeholder: "${data.title}"`);
    }
  }

  // Validate description
  if (data.description) {
    if (data.description.length < 10) {
      warnings.push(`Module ${moduleId}: Description is too short`);
    }
    if (data.description.toLowerCase().includes('coming soon')) {
      warnings.push(`Module ${moduleId}: Description contains "coming soon"`);
    }
    if (data.description.toLowerCase().includes('learn') && data.description.split(' ').length < 5) {
      warnings.push(`Module ${moduleId}: Description may be placeholder`);
    }
  }

  // Validate intro
  if (data.intro) {
    if (data.intro.length < 20) {
      warnings.push(`Module ${moduleId}: Intro is too short (${data.intro.length} chars)`);
    }
    if (data.intro.toLowerCase().includes('in this module, you will learn about')) {
      warnings.push(`Module ${moduleId}: Intro appears to be generic template`);
    }
    // Check if intro is in Turkish (basic heuristic)
    const turkishIndicators = ['bu modülde', 'öğreneceğiz', 'kullanılır', 'cümleler', 'örnek'];
    const hasTurkish = turkishIndicators.some(indicator =>
      data.intro?.toLowerCase().includes(indicator)
    );
    // 🔧 FIX #26: Use centralized validation instead of hardcoded range
    if (!hasTurkish && isValidModuleId(moduleId)) {
      warnings.push(`Module ${moduleId}: Intro may not contain Turkish explanation`);
    }
  }

  // Validate tip
  if (data.tip) {
    if (data.tip.length < 10) {
      warnings.push(`Module ${moduleId}: Tip is too short`);
    }
    if (data.tip === 'Practice this topic regularly to improve your English proficiency.') {
      warnings.push(`Module ${moduleId}: Tip is generic placeholder text`);
    }
  }

  // Validate table
  if (Array.isArray(data.table)) {
    if (data.table.length === 0) {
      warnings.push(`Module ${moduleId}: Table is empty`);
    }
    if (data.table.length > 0 && data.table.length < 2) {
      warnings.push(`Module ${moduleId}: Table has only ${data.table.length} row(s)`);
    }
  } else {
    errors.push(`Module ${moduleId}: Table is not an array`);
  }

  // Validate listeningExamples
  if (Array.isArray(data.listeningExamples)) {
    if (data.listeningExamples.length < 5) {
      errors.push(`Module ${moduleId}: Listening examples must have at least 5 items (has ${data.listeningExamples.length})`);
    }
    if (data.listeningExamples.length > 5) {
      warnings.push(`Module ${moduleId}: Has more than 5 listening examples (${data.listeningExamples.length})`);
    }

    // Check for generic content
    const genericPhrases = [
      'this is an example',
      'here\'s how we use this grammar',
      'practice makes perfect'
    ];
    const hasGeneric = data.listeningExamples.some(ex =>
      genericPhrases.some(phrase => ex?.toLowerCase().includes(phrase))
    );
    if (hasGeneric) {
      warnings.push(`Module ${moduleId}: Listening examples contain generic placeholder text`);
    }

    // Check for very short examples
    const shortExamples = data.listeningExamples.filter(ex => ex && ex.length < 10);
    if (shortExamples.length > 0) {
      warnings.push(`Module ${moduleId}: ${shortExamples.length} listening example(s) are too short`);
    }
  } else {
    errors.push(`Module ${moduleId}: listeningExamples is not an array`);
  }

  // Validate speakingPractice
  if (Array.isArray(data.speakingPractice)) {
    if (data.speakingPractice.length !== 40) {
      errors.push(`Module ${moduleId}: Speaking practice must have exactly 40 questions (has ${data.speakingPractice.length})`);
    }

    // Check each question
    let invalidQuestions = 0;
    let genericQuestions = 0;
    const questionTexts = new Set<string>();

    data.speakingPractice.forEach((item, idx) => {
      if (typeof item === 'string') {
        if (item.length < 5) {
          invalidQuestions++;
        }
        questionTexts.add(item.toLowerCase());
      } else if (typeof item === 'object' && item !== null) {
        if (!item.question || !item.answer) {
          invalidQuestions++;
        }
        if (item.question) {
          questionTexts.add(item.question.toLowerCase());
        }

        // Check for generic questions
        const genericQuestionPatterns = [
          'how often do you practice this grammar',
          'do you find this topic difficult',
          'can you give an example',
          'how does this help your english',
          'what is the most important point'
        ];
        if (item.question && genericQuestionPatterns.some(pattern =>
          item.question.toLowerCase().includes(pattern)
        )) {
          genericQuestions++;
        }
      } else {
        invalidQuestions++;
      }
    });

    if (invalidQuestions > 0) {
      errors.push(`Module ${moduleId}: ${invalidQuestions} invalid speaking practice items`);
    }

    // Check for duplicate questions
    if (questionTexts.size < data.speakingPractice.length) {
      const duplicates = data.speakingPractice.length - questionTexts.size;
      warnings.push(`Module ${moduleId}: ${duplicates} duplicate question(s) found`);
    }

    // Warn about too many generic questions
    if (genericQuestions > 10) {
      warnings.push(`Module ${moduleId}: ${genericQuestions} generic placeholder questions detected`);
    }
  } else {
    errors.push(`Module ${moduleId}: speakingPractice is not an array`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    moduleId
  };
}

/**
 * Audit all modules in the application
 */
export function auditAllModules(
  getModuleData: (moduleId: number) => ModuleData | null | undefined,
  moduleRange: { start: number; end: number }
): AuditReport {
  const moduleResults = new Map<number, ValidationResult>();
  let validModules = 0;
  let invalidModules = 0;

  const summary = {
    missingFields: 0,
    insufficientQuestions: 0,
    emptyTables: 0,
    genericContent: 0,
    duplicateContent: 0
  };

  // Validate each module
  for (let moduleId = moduleRange.start; moduleId <= moduleRange.end; moduleId++) {
    const data = getModuleData(moduleId);
    const result = validateModule(moduleId, data);
    moduleResults.set(moduleId, result);

    if (result.valid) {
      validModules++;
    } else {
      invalidModules++;
    }

    // Update summary statistics
    result.errors.forEach(error => {
      if (error.includes('Missing required field')) summary.missingFields++;
      if (error.includes('must have exactly 40 questions')) summary.insufficientQuestions++;
    });

    result.warnings.forEach(warning => {
      if (warning.includes('Table is empty')) summary.emptyTables++;
      if (warning.includes('generic') || warning.includes('placeholder')) summary.genericContent++;
      if (warning.includes('duplicate')) summary.duplicateContent++;
    });
  }

  return {
    totalModules: moduleRange.end - moduleRange.start + 1,
    validModules,
    invalidModules,
    moduleResults,
    summary
  };
}

/**
 * Print a formatted audit report to console
 */
export function printAuditReport(report: AuditReport, verbose: boolean = false): void {
  // Apple Store Compliance: Silent operation - audit reports disabled in production
}

/**
 * Get list of module IDs that need content updates
 */
export function getModulesNeedingUpdates(report: AuditReport): number[] {
  const needsUpdate: number[] = [];

  report.moduleResults.forEach((result, moduleId) => {
    // Mark as needing update if:
    // 1. Has errors
    // 2. Has warnings about generic/placeholder content
    // 3. Has insufficient questions
    const hasGenericWarnings = result.warnings.some(w =>
      w.includes('generic') || w.includes('placeholder')
    );

    if (!result.valid || hasGenericWarnings) {
      needsUpdate.push(moduleId);
    }
  });

  return needsUpdate.sort((a, b) => a - b);
}
