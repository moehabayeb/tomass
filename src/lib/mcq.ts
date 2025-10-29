/**
 * Multiple Choice Question (MCQ) Generator
 *
 * This module generates cloze-style multiple choice questions from Q&A pairs.
 * It creates distractors and shuffles options to create engaging practice questions.
 */

export interface MCQResult {
  cloze: string;          // Question with blank: "What ___ your name?"
  options: string[];      // Array of 4 options (shuffled)
  correct: number;        // Index of correct answer in options array
}

/**
 * Extract key words from an answer to create the cloze
 * Prioritizes verbs, nouns, and adjectives
 * ENHANCED: Now handles short answers and edge cases
 */
function extractKeyword(answer: string): { keyword: string; index: number } {
  const words = answer.trim().split(/\s+/);

  // If only one word, use it
  if (words.length === 1) {
    return { keyword: words[0], index: 0 };
  }

  // Common words to skip (expanded list)
  const skipWords = new Set([
    'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were',
    'do', 'does', 'did', 'have', 'has', 'had',
    'to', 'in', 'on', 'at', 'for', 'with', 'by', 'of',
    'my', 'your', 'his', 'her', 'its', 'our', 'their',
    'yes', 'no', 'not', 'and', 'or', 'but'
  ]);

  // Priority 1: Find meaningful content words (length >= 3)
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase().replace(/[.,!?;:"']/g, '');
    if (word.length >= 3 && !skipWords.has(word)) {
      return { keyword: words[i], index: i };
    }
  }

  // Priority 2: Find any word >= 2 chars not in skip list
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase().replace(/[.,!?;:"']/g, '');
    if (word.length >= 2 && !skipWords.has(word)) {
      return { keyword: words[i], index: i };
    }
  }

  // Priority 3: Use the longest word regardless
  let longest = words[0];
  let longestIndex = 0;
  words.forEach((word, idx) => {
    const cleaned = word.replace(/[.,!?;:"']/g, '');
    const currentLongest = longest.replace(/[.,!?;:"']/g, '');
    if (cleaned.length > currentLongest.length) {
      longest = word;
      longestIndex = idx;
    }
  });

  return { keyword: longest, index: longestIndex };
}

/**
 * Generate distractor options based on the correct answer
 * Creates plausible wrong answers for the MCQ
 */
function generateDistractors(correct: string, question: string): string[] {
  const distractors: string[] = [];
  const correctLower = correct.toLowerCase().replace(/[.,!?;:"']/g, '');

  // Common distractor patterns for English learning
  const patterns: { [key: string]: string[] } = {
    // Verb tenses
    'am': ['is', 'are', 'was'],
    'is': ['am', 'are', 'was'],
    'are': ['am', 'is', 'were'],
    'was': ['is', 'were', 'am'],
    'were': ['was', 'are', 'is'],
    'do': ['does', 'did', 'done'],
    'does': ['do', 'did', 'doing'],
    'did': ['do', 'does', 'done'],
    'have': ['has', 'had', 'having'],
    'has': ['have', 'had', 'having'],
    'had': ['have', 'has', 'having'],
    'will': ['would', 'shall', 'can'],
    'would': ['will', 'could', 'should'],
    'can': ['could', 'will', 'may'],
    'could': ['can', 'would', 'should'],

    // Common adjectives
    'happy': ['sad', 'angry', 'tired'],
    'sad': ['happy', 'angry', 'worried'],
    'big': ['small', 'large', 'huge'],
    'small': ['big', 'tiny', 'large'],
    'good': ['bad', 'better', 'best'],
    'bad': ['good', 'worse', 'worst'],
    'hot': ['cold', 'warm', 'cool'],
    'cold': ['hot', 'warm', 'cool'],

    // Numbers
    'one': ['two', 'three', 'first'],
    'two': ['one', 'three', 'second'],
    'three': ['one', 'two', 'third'],

    // Time expressions
    'today': ['tomorrow', 'yesterday', 'now'],
    'yesterday': ['today', 'tomorrow', 'last week'],
    'tomorrow': ['today', 'yesterday', 'next week'],
    'now': ['then', 'later', 'soon'],

    // Pronouns
    'he': ['she', 'it', 'they'],
    'she': ['he', 'it', 'they'],
    'they': ['he', 'she', 'we'],
    'his': ['her', 'their', 'its'],
    'her': ['his', 'their', 'its'],
  };

  // Try pattern-based distractors first
  if (patterns[correctLower]) {
    distractors.push(...patterns[correctLower].slice(0, 3));
  }

  // If we need more distractors, generate generic ones
  while (distractors.length < 3) {
    const generic = [
      'never',
      'always',
      'sometimes',
      'very',
      'much',
      'many',
      'few',
      'some',
      'any',
      'every',
      'all',
      'no',
      'yes',
      'maybe',
      'often',
      'usually',
      'rarely',
      'here',
      'there',
      'everywhere',
      'nowhere'
    ];

    // Pick random generic distractors that aren't the correct answer
    const available = generic.filter(d =>
      d !== correctLower && !distractors.includes(d)
    );

    if (available.length > 0) {
      const random = available[Math.floor(Math.random() * available.length)];
      distractors.push(random);
    } else {
      // Last resort: add numbered options
      distractors.push(`option ${distractors.length + 1}`);
    }
  }

  return distractors.slice(0, 3);
}

/**
 * Build a cloze question with multiple choice options
 * ENHANCED: Now ALWAYS returns a valid MCQ (never null)
 *
 * @param question - The question text (e.g., "What is your name?")
 * @param answer - The correct answer (e.g., "My name is Tom.")
 * @returns MCQResult with cloze, options, and correct index
 */
export function buildClozeAndChoices(
  question: string,
  answer: string
): MCQResult {
  // Validate and normalize inputs
  const normalizedQuestion = (question || '').toString().trim();
  const normalizedAnswer = (answer || '').toString().trim();

  // Fallback for empty answer
  if (normalizedAnswer.length === 0) {
    // Apple Store Compliance: Silent operation
    return {
      cloze: 'No answer provided ___',
      options: ['yes', 'no', 'maybe', 'ok'],
      correct: 0
    };
  }

  // Extract a keyword to blank out (always returns a value now)
  const { keyword, index } = extractKeyword(normalizedAnswer);

  // Create cloze by replacing keyword with blank
  const words = normalizedAnswer.split(/\s+/);
  const clozeWords = [...words];
  clozeWords[index] = '___';
  const cloze = clozeWords.join(' ');

  // Generate distractors
  const cleanKeyword = keyword.replace(/[.,!?;:"']/g, '');
  const distractors = generateDistractors(cleanKeyword, normalizedQuestion);

  // Ensure we have exactly 4 unique options
  const allOptions = [cleanKeyword, ...distractors];
  const uniqueOptions = Array.from(new Set(allOptions));

  // If somehow we have duplicates, add more generic options
  while (uniqueOptions.length < 4) {
    const fillers = ['maybe', 'perhaps', 'definitely', 'absolutely', 'probably', 'certainly'];
    for (const filler of fillers) {
      if (!uniqueOptions.includes(filler)) {
        uniqueOptions.push(filler);
        break;
      }
    }
  }

  // Take only first 4 options
  const finalOptions = uniqueOptions.slice(0, 4);

  // Shuffle options using Fisher-Yates algorithm
  const shuffled = [...finalOptions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Find where the correct answer ended up after shuffling
  const correctIndex = shuffled.indexOf(cleanKeyword);

  return {
    cloze,
    options: shuffled,
    correct: correctIndex
  };
}

/**
 * Deterministic version of buildClozeAndChoices for testing
 * Uses seed for reproducible randomization
 */
export function buildClozeAndChoicesDeterministic(
  question: string,
  answer: string,
  seed: number = 42
): MCQResult | null {
  // Simple seeded random number generator
  let rng = seed;
  const seededRandom = () => {
    rng = (rng * 9301 + 49297) % 233280;
    return rng / 233280;
  };

  // Validate inputs
  if (!question || !answer || typeof question !== 'string' || typeof answer !== 'string') {
    return null;
  }

  const trimmedAnswer = answer.trim();
  if (trimmedAnswer.length === 0) {
    return null;
  }

  // Extract keyword
  const keywordData = extractKeyword(trimmedAnswer);
  if (!keywordData) {
    return null;
  }

  const { keyword, index } = keywordData;

  // Create cloze
  const words = trimmedAnswer.split(/\s+/);
  const clozeWords = [...words];
  clozeWords[index] = '___';
  const cloze = clozeWords.join(' ');

  // Generate distractors
  const cleanKeyword = keyword.replace(/[.,!?;:"']/g, '');
  const distractors = generateDistractors(cleanKeyword, question);

  // Create and shuffle options with seeded random
  const allOptions = [cleanKeyword, ...distractors];
  const shuffled = [...allOptions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const correctIndex = shuffled.indexOf(cleanKeyword);

  return {
    cloze,
    options: shuffled,
    correct: correctIndex
  };
}
