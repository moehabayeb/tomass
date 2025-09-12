// Grammar Error Detection and Categorization System
// Analyzes incorrect answers to identify specific grammar patterns that need review

import { GrammarError, GrammarErrorCategory } from '../types/progressTypes';

// Common patterns for different grammar errors
const VERB_BE_PATTERNS = {
  incorrect: ['i is', 'you is', 'he are', 'she are', 'it are', 'they is', 'we is'],
  correct: ['i am', 'you are', 'he is', 'she is', 'it is', 'they are', 'we are']
};

const ARTICLE_PATTERNS = {
  missing: /\b(student|teacher|book|car|house|dog|cat)\b/i, // Common nouns that often need articles
  incorrect: ['a university', 'an hotel', 'a hour', 'an one'],
  aVsAn: /\b(a [aeiou]|an [bcdfghjklmnpqrstvwxyz])/i
};

const CONTRACTION_PATTERNS = {
  missing: ['do not', 'does not', 'did not', 'will not', 'cannot', 'i am', 'you are', 'he is', 'she is'],
  incorrect: ['dont', 'doesnt', 'didnt', 'wont', 'cant', 'im', 'youre', 'hes', 'shes']
};

const PLURAL_PATTERNS = {
  singular_with_plural_verb: /\b(cat|dog|book|student) are\b/i,
  plural_with_singular_verb: /\b(cats|dogs|books|students) is\b/i,
  missing_plural: /\btwo (cat|dog|book|student)\b/i,
  unnecessary_plural: /\ba (cats|dogs|books|students)\b/i
};

const QUESTION_PATTERNS = {
  missing_do: /\byou (like|want|have|go)\b/i,
  wrong_order: /\byou do like\b/i,
  missing_inversion: /\byou are student\?/i
};

/**
 * Analyzes user's incorrect answer to detect grammar error patterns
 */
export function detectGrammarErrors(
  userAnswer: string,
  expectedAnswer: string,
  questionContext?: string
): GrammarError[] {
  const errors: GrammarError[] = [];
  const userNormalized = normalizeForAnalysis(userAnswer);
  const expectedNormalized = normalizeForAnalysis(expectedAnswer);
  
  // Skip if answers are too similar (minor typos only)
  if (calculateSimilarity(userNormalized, expectedNormalized) > 0.8) {
    return errors;
  }

  // Detect verb "to be" errors
  const verbErrors = detectVerbBeErrors(userNormalized, expectedNormalized);
  errors.push(...verbErrors);

  // Detect article errors
  const articleErrors = detectArticleErrors(userNormalized, expectedNormalized);
  errors.push(...articleErrors);

  // Detect contraction errors
  const contractionErrors = detectContractionErrors(userNormalized, expectedNormalized);
  errors.push(...contractionErrors);

  // Detect plural/singular errors
  const pluralErrors = detectPluralErrors(userNormalized, expectedNormalized);
  errors.push(...pluralErrors);

  // Detect pronoun errors
  const pronounErrors = detectPronounErrors(userNormalized, expectedNormalized);
  errors.push(...pronounErrors);

  // Detect word order errors
  const wordOrderErrors = detectWordOrderErrors(userNormalized, expectedNormalized);
  errors.push(...wordOrderErrors);

  // Detect question formation errors
  const questionErrors = detectQuestionErrors(userNormalized, expectedNormalized, questionContext);
  errors.push(...questionErrors);

  return errors.filter(error => error.confidence > 0.3); // Only return confident detections
}

/**
 * Normalize text for analysis by removing punctuation, lowercasing, etc.
 */
function normalizeForAnalysis(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate similarity between two strings (0-1)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = str1.split(' ');
  const words2 = str2.split(' ');
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
}

/**
 * Detect errors with verb "to be" (am, is, are)
 */
function detectVerbBeErrors(userAnswer: string, expectedAnswer: string): GrammarError[] {
  const errors: GrammarError[] = [];
  
  // Check for common "to be" mistakes
  for (const pattern of VERB_BE_PATTERNS.incorrect) {
    if (userAnswer.includes(pattern)) {
      errors.push({
        category: 'verb_tense',
        specific: 'verb_to_be_agreement',
        confidence: 0.9,
        description: `Used wrong form of "to be" (${pattern})`,
        reviewTopic: 'Verb to Be - Subject Agreement'
      });
    }
  }

  // Check for missing "to be"
  if (expectedAnswer.includes(' is ') || expectedAnswer.includes(' are ') || expectedAnswer.includes(' am ')) {
    if (!userAnswer.includes(' is ') && !userAnswer.includes(' are ') && !userAnswer.includes(' am ')) {
      errors.push({
        category: 'verb_tense',
        specific: 'missing_verb_to_be',
        confidence: 0.7,
        description: 'Missing verb "to be"',
        reviewTopic: 'Verb to Be - Basic Usage'
      });
    }
  }

  return errors;
}

/**
 * Detect article errors (a, an, the)
 */
function detectArticleErrors(userAnswer: string, expectedAnswer: string): GrammarError[] {
  const errors: GrammarError[] = [];

  // Check for a/an confusion
  const aAnMatch = userAnswer.match(ARTICLE_PATTERNS.aVsAn);
  if (aAnMatch) {
    errors.push({
      category: 'article',
      specific: 'a_vs_an',
      confidence: 0.8,
      description: 'Confused "a" and "an" usage',
      reviewTopic: 'Articles - A vs An'
    });
  }

  // Check for missing articles
  const expectedArticles = (expectedAnswer.match(/\b(a|an|the)\s/g) || []).length;
  const userArticles = (userAnswer.match(/\b(a|an|the)\s/g) || []).length;
  
  if (expectedArticles > userArticles) {
    errors.push({
      category: 'article',
      specific: 'missing_article',
      confidence: 0.6,
      description: 'Missing article (a, an, or the)',
      reviewTopic: 'Articles - When to Use'
    });
  }

  return errors;
}

/**
 * Detect contraction errors
 */
function detectContractionErrors(userAnswer: string, expectedAnswer: string): GrammarError[] {
  const errors: GrammarError[] = [];

  // Check for missing apostrophes in contractions
  for (const incorrect of CONTRACTION_PATTERNS.incorrect) {
    if (userAnswer.includes(incorrect)) {
      errors.push({
        category: 'contraction',
        specific: 'missing_apostrophe',
        confidence: 0.9,
        description: `Missing apostrophe in contraction: ${incorrect}`,
        reviewTopic: 'Contractions - Apostrophe Usage'
      });
    }
  }

  // Check for expanded forms when contractions expected
  const hasExpandedForm = CONTRACTION_PATTERNS.missing.some(pattern => userAnswer.includes(pattern));
  const expectedHasContraction = expectedAnswer.includes("'");
  
  if (hasExpandedForm && expectedHasContraction) {
    errors.push({
      category: 'contraction',
      specific: 'should_use_contraction',
      confidence: 0.5,
      description: 'Could use contraction instead of full form',
      reviewTopic: 'Contractions - Common Usage'
    });
  }

  return errors;
}

/**
 * Detect plural/singular errors
 */
function detectPluralErrors(userAnswer: string, expectedAnswer: string): GrammarError[] {
  const errors: GrammarError[] = [];

  // Check for subject-verb disagreement with plurals
  if (PLURAL_PATTERNS.singular_with_plural_verb.test(userAnswer)) {
    errors.push({
      category: 'plural_singular',
      specific: 'singular_subject_plural_verb',
      confidence: 0.8,
      description: 'Used plural verb with singular subject',
      reviewTopic: 'Subject-Verb Agreement'
    });
  }

  if (PLURAL_PATTERNS.plural_with_singular_verb.test(userAnswer)) {
    errors.push({
      category: 'plural_singular',
      specific: 'plural_subject_singular_verb',
      confidence: 0.8,
      description: 'Used singular verb with plural subject',
      reviewTopic: 'Subject-Verb Agreement'
    });
  }

  // Check for missing plural with numbers
  if (PLURAL_PATTERNS.missing_plural.test(userAnswer)) {
    errors.push({
      category: 'plural_singular',
      specific: 'missing_plural_with_number',
      confidence: 0.7,
      description: 'Should use plural form with numbers greater than one',
      reviewTopic: 'Plural Forms'
    });
  }

  return errors;
}

/**
 * Detect pronoun errors
 */
function detectPronounErrors(userAnswer: string, expectedAnswer: string): GrammarError[] {
  const errors: GrammarError[] = [];

  // Common pronoun mistakes
  const pronounMistakes = [
    { incorrect: 'me am', correct: 'i am', type: 'subject_object_confusion' },
    { incorrect: 'him is', correct: 'he is', type: 'subject_object_confusion' },
    { incorrect: 'her is', correct: 'she is', type: 'subject_object_confusion' },
    { incorrect: 'them are', correct: 'they are', type: 'subject_object_confusion' }
  ];

  for (const mistake of pronounMistakes) {
    if (userAnswer.includes(mistake.incorrect)) {
      errors.push({
        category: 'pronoun',
        specific: mistake.type,
        confidence: 0.9,
        description: `Confused subject and object pronouns: ${mistake.incorrect}`,
        reviewTopic: 'Personal Pronouns - Subject vs Object'
      });
    }
  }

  return errors;
}

/**
 * Detect word order errors
 */
function detectWordOrderErrors(userAnswer: string, expectedAnswer: string): GrammarError[] {
  const errors: GrammarError[] = [];

  // Simple check for basic word order issues
  const userWords = userAnswer.split(' ').filter(w => w.length > 0);
  const expectedWords = expectedAnswer.split(' ').filter(w => w.length > 0);

  // If same words but different order
  if (userWords.length === expectedWords.length) {
    const userSorted = [...userWords].sort();
    const expectedSorted = [...expectedWords].sort();
    
    if (JSON.stringify(userSorted) === JSON.stringify(expectedSorted) && 
        userAnswer !== expectedAnswer) {
      errors.push({
        category: 'word_order',
        specific: 'incorrect_sentence_structure',
        confidence: 0.6,
        description: 'Words are correct but in wrong order',
        reviewTopic: 'Basic Sentence Structure'
      });
    }
  }

  return errors;
}

/**
 * Detect question formation errors
 */
function detectQuestionErrors(userAnswer: string, expectedAnswer: string, questionContext?: string): GrammarError[] {
  const errors: GrammarError[] = [];

  // Only check if this appears to be a question context
  if (!questionContext?.toLowerCase().includes('question') && !expectedAnswer.includes('?')) {
    return errors;
  }

  // Check for missing "do/does" in questions
  if (QUESTION_PATTERNS.missing_do.test(userAnswer) && expectedAnswer.includes('do')) {
    errors.push({
      category: 'question_formation',
      specific: 'missing_auxiliary_do',
      confidence: 0.7,
      description: 'Missing "do" or "does" in question',
      reviewTopic: 'Question Formation - Do/Does'
    });
  }

  // Check for word order in questions
  if (QUESTION_PATTERNS.wrong_order.test(userAnswer)) {
    errors.push({
      category: 'question_formation',
      specific: 'incorrect_question_order',
      confidence: 0.8,
      description: 'Incorrect word order in question',
      reviewTopic: 'Question Formation - Word Order'
    });
  }

  return errors;
}

/**
 * Get review suggestions based on error patterns
 */
export function getReviewSuggestions(errors: GrammarError[]): string[] {
  const suggestions = new Set<string>();
  
  errors.forEach(error => {
    if (error.reviewTopic) {
      suggestions.add(error.reviewTopic);
    }
  });

  return Array.from(suggestions);
}

/**
 * Analyze error frequency to identify persistent weaknesses
 */
export function analyzePersistentErrors(
  allErrors: GrammarError[],
  timeWindow: number = 7 * 24 * 60 * 60 * 1000 // 7 days
): { category: GrammarErrorCategory; count: number; topics: string[] }[] {
  const now = Date.now();
  const recentErrors = allErrors.filter(error => 
    // Note: This assumes errors have timestamps, would need to be added to GrammarError type
    // For now, consider all errors as recent
    true
  );

  const errorCounts = new Map<GrammarErrorCategory, { count: number; topics: Set<string> }>();
  
  recentErrors.forEach(error => {
    if (!errorCounts.has(error.category)) {
      errorCounts.set(error.category, { count: 0, topics: new Set() });
    }
    
    const data = errorCounts.get(error.category)!;
    data.count++;
    if (error.reviewTopic) {
      data.topics.add(error.reviewTopic);
    }
  });

  return Array.from(errorCounts.entries())
    .map(([category, data]) => ({
      category,
      count: data.count,
      topics: Array.from(data.topics)
    }))
    .sort((a, b) => b.count - a.count); // Most frequent first
}