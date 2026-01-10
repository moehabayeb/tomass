// Robust answer evaluator for all modules - Module 51 proven logic
// v53: THE GODLY FIX - Perfect balance between acceptance and grammar checking
// - Removed "i" from FILLERS (it's a pronoun, not a filler!)
// - Smart verb error check (only rejects if expected has correct form)
// - 65% threshold (balanced between strict 70% and lenient 60%)

export type EvalOptions = {
  expected: string;                 // canonical answer from content
  accepted?: string[];              // optional additional accepted variants
  requireAffirmationPolarity?: boolean; // when "Yes/No" matters
  keyLemmas?: string[];             // optional lemmas we must see (e.g., ["student"])
};

export type EvaluationResult = {
  isCorrect: boolean;
  confidence: 'perfect' | 'good' | 'retry';
  grammarCorrections?: GrammarCorrection[];
  feedback: string;
  hint?: string;
};

export type GrammarCorrection = {
  type: 'verb_agreement' | 'article' | 'plural' | 'word_order' | 'contraction' | 'pronoun' | 'missing_word' | 'extra_word';
  userText: string;
  correctedText: string;
  explanation: string;
};

const YES = ["yes","yeah","yep","sure","of course","correct","that's right","indeed"];
const NO  = ["no","nope","nah","not really","negative"];
// v46: Removed "teacher","sir","madam" - these are content words, not fillers!
// v51: Added more fillers for accent/speech recognition tolerance
// v53: CRITICAL - Removed "i" which is a PRONOUN, not a filler!
const FILLERS = ["uh","um","erm","hmm","well","please","like","so","okay","oh","mean"];

export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[''ʼˈ`]/g,"'")                 // smart→straight apostrophes
    .replace(/[""]/g,'"')
    .replace(/[.,!?;:()]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

// v58: Critical verb forms that should NEVER fuzzy-match each other
// "is" should never match "are", "am" should never match "is", etc.
const CRITICAL_VERBS = new Set(['is', 'are', 'am', 'was', 'were', 'has', 'have', 'do', 'does', 'did']);

// v51: Allow minor typos: token distance ≤ 3 (increased from 2 for better accent tolerance)
// v58: BUT critical verbs must match exactly
function lev1(a:string,b:string){
  if (a===b) return true;

  // v58: NEVER fuzzy-match critical verb forms with each other
  // This prevents "is" matching "are", which would accept grammar errors
  if (CRITICAL_VERBS.has(a) && CRITICAL_VERBS.has(b)) {
    return false; // "is" should NEVER match "are"
  }

  if (Math.abs(a.length-b.length)>3) return false;  // v51: was >2
  // small, fast check
  let i=0,j=0,edits=0;
  while(i<a.length && j<b.length){
    if (a[i]===b[j]) { i++; j++; continue; }
    edits++;
    if (edits>3) return false;  // v51: was >2
    if (a.length> b.length) i++;
    else if (a.length< b.length) j++;
    else { i++; j++; }
  }
  return (edits + (a.length-i) + (b.length-j)) <= 3;  // v51: was <= 2
}

function tokens(s:string){
  return normalize(s)
    .split(" ")
    .filter(w => w && !FILLERS.includes(w));
}

// very forgiving contraction/article/possessive handling
function relax(s:string){
  let n = normalize(s);
  n = n
    .replace(/\b(i am)\b/g,"i'm")
    .replace(/\b(you are)\b/g,"you're")
    .replace(/\b(he is)\b/g,"he's")
    .replace(/\b(she is)\b/g,"she's")
    .replace(/\b(it is)\b/g,"it's")
    .replace(/\b(we are)\b/g,"we're")
    .replace(/\b(they are)\b/g,"they're")
    .replace(/\b(have not)\b/g,"haven't")
    .replace(/\b(has not)\b/g,"hasn't")
    .replace(/\b(do not)\b/g,"don't")
    .replace(/\b(does not)\b/g,"doesn't")
    .replace(/\b(did not)\b/g,"didn't")
    .replace(/\b(will not)\b/g,"won't")
    .replace(/\b(would not)\b/g,"wouldn't")
    .replace(/\b(cannot)\b/g,"can't");
  // collapse optional determiners/possessives around nouns
  n = n.replace(/\b(my|our|your|his|her|their|the|a|an)\b/g, "");
  return n.replace(/\s+/g," ").trim();
}

function polarity(str:string){
  const n = normalize(str);
  if (YES.some(y => n.startsWith(y))) return "yes";
  if (NO.some(nw => n.startsWith(nw))) return "no";
  return "unknown";
}

export function evaluateAnswer(userInput: string, opt: EvalOptions): boolean {
  if (!userInput) return false;
  const uNorm = normalize(userInput);
  const uRelax = relax(userInput);

  // 1) Check polarity if requested
  if (opt.requireAffirmationPolarity) {
    const pUser = polarity(userInput);
    const pExp  = polarity(opt.expected);
    if (pExp !== "unknown" && pUser !== pExp) {
      return false;
    }
  }

  // v58: ROBUST grammar check - uses both regex AND string matching for reliability
  // This is critical for a grammar learning app - verb errors MUST be rejected
  const verbErrorChecks = [
    // "to be" errors - these are FUNDAMENTAL and must be caught
    { wrongStr: 'i is', correctStr: 'i am', wrong: /\bi\s+is\b/i, correct: /\bi\s+(am|'m)\b/i },
    { wrongStr: 'you is', correctStr: 'you are', wrong: /\byou\s+is\b/i, correct: /\byou\s+(are|'re)\b/i },
    { wrongStr: 'he are', correctStr: 'he is', wrong: /\bhe\s+are\b/i, correct: /\bhe\s+(is|'s)\b/i },
    { wrongStr: 'she are', correctStr: 'she is', wrong: /\bshe\s+are\b/i, correct: /\bshe\s+(is|'s)\b/i },
    { wrongStr: 'it are', correctStr: 'it is', wrong: /\bit\s+are\b/i, correct: /\bit\s+(is|'s)\b/i },
    { wrongStr: 'we is', correctStr: 'we are', wrong: /\bwe\s+is\b/i, correct: /\bwe\s+(are|'re)\b/i },
    { wrongStr: 'they is', correctStr: 'they are', wrong: /\bthey\s+is\b/i, correct: /\bthey\s+(are|'re)\b/i },
    // "have/has" errors
    { wrongStr: 'he have', correctStr: 'he has', wrong: /\bhe\s+have\b/i, correct: /\bhe\s+has\b/i },
    { wrongStr: 'she have', correctStr: 'she has', wrong: /\bshe\s+have\b/i, correct: /\bshe\s+has\b/i },
    { wrongStr: 'it have', correctStr: 'it has', wrong: /\bit\s+have\b/i, correct: /\bit\s+has\b/i },
    { wrongStr: 'i has', correctStr: 'i have', wrong: /\bi\s+has\b/i, correct: /\bi\s+have\b/i },
    { wrongStr: 'we has', correctStr: 'we have', wrong: /\bwe\s+has\b/i, correct: /\bwe\s+have\b/i },
    { wrongStr: 'they has', correctStr: 'they have', wrong: /\bthey\s+has\b/i, correct: /\bthey\s+have\b/i },
    // "do/does" errors
    { wrongStr: 'he do', correctStr: 'he does', wrong: /\bhe\s+do\b/i, correct: /\bhe\s+does\b/i },
    { wrongStr: 'she do', correctStr: 'she does', wrong: /\bshe\s+do\b/i, correct: /\bshe\s+does\b/i },
    { wrongStr: 'it do', correctStr: 'it does', wrong: /\bit\s+do\b/i, correct: /\bit\s+does\b/i },
    { wrongStr: 'i does', correctStr: 'i do', wrong: /\bi\s+does\b/i, correct: /\bi\s+do\b/i },
    { wrongStr: 'we does', correctStr: 'we do', wrong: /\bwe\s+does\b/i, correct: /\bwe\s+do\b/i },
    { wrongStr: 'they does', correctStr: 'they do', wrong: /\bthey\s+does\b/i, correct: /\bthey\s+do\b/i },
  ];
  const userLower = userInput.toLowerCase();
  const expectedLower = opt.expected.toLowerCase();
  for (const check of verbErrorChecks) {
    // v58: Check BOTH string includes AND regex for maximum reliability
    const hasWrongForm = userLower.includes(check.wrongStr) || check.wrong.test(userLower);
    const hasCorrectForm = expectedLower.includes(check.correctStr) || check.correct.test(expectedLower);

    if (hasWrongForm && hasCorrectForm) {
      // v58: Log rejection for debugging
      console.log(`[evaluateAnswer] v58 REJECTED: User said "${check.wrongStr}" but expected "${check.correctStr}"`);
      return false; // Grammar error = WRONG
    }
  }

  // 2) Fast exacts: expected or any accepted variant (normalized/relaxed)
  const candidates = [
    opt.expected,
    ...(opt.accepted ?? [])
  ];
  const passExact = candidates.some(c => {
    const cNorm = normalize(c);
    const cRelax = relax(c);
    return cNorm === uNorm || cRelax === uRelax;
  });
  if (passExact) {
    return true;
  }

  // 3) Lemma/key-word guard (e.g., must include "students")
  if (opt.keyLemmas && opt.keyLemmas.length){
    const uTok = new Set(tokens(uRelax));

    for (const k of opt.keyLemmas){
      // allow plural/singular & small typos
      const ok = [...uTok].some(t => {
        const base = t.endsWith("s") ? t.slice(0,-1) : t;
        return lev1(base,k) || lev1(t,k+"s");
      });
      if (!ok) {
        return false;
      }
    }
  }

  // 4) Token-level fuzzy match against expected (relaxed)
  const a = tokens(relax(opt.expected));
  const b = tokens(uRelax);

  // require high overlap with typo tolerance
  let matched = 0;
  for (const at of a) {
    if (b.some(bt => lev1(at, bt))) matched++;
  }
  const ratio = matched / Math.max(1,a.length);

  // v53: 65% threshold - balanced between strict (70%) and lenient (60%)
  // Now that "i" is no longer filtered, this works correctly
  const result = ratio >= 0.65;
  return result;
}

/**
 * Enhanced evaluation with detailed feedback and grammar corrections
 */
export function evaluateAnswerDetailed(userInput: string, opt: EvalOptions, attemptNumber: number = 1): EvaluationResult {
  if (!userInput || userInput.trim().length === 0) {
    return {
      isCorrect: false,
      confidence: 'retry',
      feedback: "I didn't catch that. Could you try speaking again? 🎤",
      hint: attemptNumber > 1 ? `Try saying: "${opt.expected}"` : undefined
    };
  }

  const uNorm = normalize(userInput);
  const eNorm = normalize(opt.expected);
  const uRelax = relax(userInput);
  const eRelax = relax(opt.expected);

  // Check for perfect match
  if (uNorm === eNorm || uRelax === eRelax) {
    return {
      isCorrect: true,
      confidence: 'perfect',
      feedback: "Perfect! 🎉 That's exactly right!",
    };
  }

  // Check semantic correctness with grammar analysis
  const isSemanticallySimilar = evaluateAnswer(userInput, opt);
  const grammarCorrections = detectGrammarDifferences(userInput, opt.expected);

  if (isSemanticallySimilar) {
    // v52: Check for verb agreement errors - these must be REJECTED
    const hasVerbError = grammarCorrections.some(c => c.type === 'verb_agreement');

    if (hasVerbError) {
      // Verb agreement errors = WRONG (not just feedback)
      return {
        isCorrect: false,
        confidence: 'retry',
        grammarCorrections,
        feedback: "Almost! But check your grammar:",
        hint: `The correct answer is: "${opt.expected}"`,
      };
    }

    // Minor corrections (contractions, articles) - still count as correct
    if (grammarCorrections.length > 0) {
      return {
        isCorrect: true,
        confidence: 'good',
        grammarCorrections,
        feedback: "Good job! 👍 Small tip:",
      };
    }

    // Semantically correct, no grammar issues detected
    return {
      isCorrect: true,
      confidence: 'perfect',
      feedback: "Excellent! 🌟 Your answer is correct!",
    };
  }

  // Incorrect answer - provide progressive hints
  const hint = generateHint(opt.expected, attemptNumber);
  const encouragement = getEncouragingMessage(attemptNumber);

  return {
    isCorrect: false,
    confidence: 'retry',
    grammarCorrections: grammarCorrections.length > 0 ? grammarCorrections : undefined,
    feedback: encouragement,
    hint,
  };
}

/**
 * Detect grammar differences between user answer and expected answer
 */
function detectGrammarDifferences(userAnswer: string, expectedAnswer: string): GrammarCorrection[] {
  const corrections: GrammarCorrection[] = [];

  // Check verb agreement errors (to be, have/has, do/does)
  const verbErrors = [
    // "to be" errors
    { wrong: "i is", correct: "i am", type: 'verb_agreement' as const, explanation: "Use 'am' with 'I'" },
    { wrong: "you is", correct: "you are", type: 'verb_agreement' as const, explanation: "Use 'are' with 'you'" },
    { wrong: "he are", correct: "he is", type: 'verb_agreement' as const, explanation: "Use 'is' with 'he'" },
    { wrong: "she are", correct: "she is", type: 'verb_agreement' as const, explanation: "Use 'is' with 'she'" },
    { wrong: "it are", correct: "it is", type: 'verb_agreement' as const, explanation: "Use 'is' with 'it'" },
    { wrong: "we is", correct: "we are", type: 'verb_agreement' as const, explanation: "Use 'are' with 'we'" },
    { wrong: "they is", correct: "they are", type: 'verb_agreement' as const, explanation: "Use 'are' with 'they'" },
    // "have/has" errors
    { wrong: "he have", correct: "he has", type: 'verb_agreement' as const, explanation: "Use 'has' with 'he'" },
    { wrong: "she have", correct: "she has", type: 'verb_agreement' as const, explanation: "Use 'has' with 'she'" },
    { wrong: "it have", correct: "it has", type: 'verb_agreement' as const, explanation: "Use 'has' with 'it'" },
    { wrong: "i has", correct: "i have", type: 'verb_agreement' as const, explanation: "Use 'have' with 'I'" },
    { wrong: "we has", correct: "we have", type: 'verb_agreement' as const, explanation: "Use 'have' with 'we'" },
    { wrong: "they has", correct: "they have", type: 'verb_agreement' as const, explanation: "Use 'have' with 'they'" },
    // "do/does" errors
    { wrong: "he do", correct: "he does", type: 'verb_agreement' as const, explanation: "Use 'does' with 'he'" },
    { wrong: "she do", correct: "she does", type: 'verb_agreement' as const, explanation: "Use 'does' with 'she'" },
    { wrong: "it do", correct: "it does", type: 'verb_agreement' as const, explanation: "Use 'does' with 'it'" },
    { wrong: "i does", correct: "i do", type: 'verb_agreement' as const, explanation: "Use 'do' with 'I'" },
    { wrong: "we does", correct: "we do", type: 'verb_agreement' as const, explanation: "Use 'do' with 'we'" },
    { wrong: "they does", correct: "they do", type: 'verb_agreement' as const, explanation: "Use 'do' with 'they'" },
  ];

  const userLower = userAnswer.toLowerCase();
  const expectedLower = expectedAnswer.toLowerCase();

  for (const error of verbErrors) {
    if (userLower.includes(error.wrong) && expectedLower.includes(error.correct)) {
      corrections.push({
        type: error.type,
        userText: error.wrong,
        correctedText: error.correct,
        explanation: error.explanation,
      });
    }
  }

  // Check article differences (a/an)
  const userHasA = /\ba\s+[aeiou]/i.test(userAnswer);
  const expectedHasAn = /\ban\s+[aeiou]/i.test(expectedAnswer);
  if (userHasA && expectedHasAn) {
    const match = userAnswer.match(/\b(a\s+[aeiou]\w*)/i);
    if (match) {
      corrections.push({
        type: 'article',
        userText: match[1],
        correctedText: match[1].replace(/^a\s+/i, 'an '),
        explanation: "Use 'an' before vowel sounds",
      });
    }
  }

  // Check contractions
  const contractionMap: Record<string, string> = {
    "i am": "I'm",
    "you are": "you're",
    "he is": "he's",
    "she is": "she's",
    "it is": "it's",
    "we are": "we're",
    "they are": "they're",
  };

  for (const [expanded, contracted] of Object.entries(contractionMap)) {
    if (userLower.includes(expanded) && expectedLower.includes(contracted.toLowerCase())) {
      corrections.push({
        type: 'contraction',
        userText: expanded,
        correctedText: contracted,
        explanation: `Native speakers often use "${contracted}" instead of "${expanded}"`,
      });
    }
  }

  return corrections;
}

/**
 * Generate progressive hints based on attempt number
 */
function generateHint(expectedAnswer: string, attemptNumber: number): string {
  if (attemptNumber === 1) {
    return "Think about the sentence structure. Try again! 💪";
  } else if (attemptNumber === 2) {
    // Give first word hint
    const firstWord = expectedAnswer.split(' ')[0];
    return `Hint: Start with "${firstWord}..." 💡`;
  } else if (attemptNumber >= 3) {
    // Give more of the answer
    const words = expectedAnswer.split(' ');
    const halfWay = Math.ceil(words.length / 2);
    const partialAnswer = words.slice(0, halfWay).join(' ');
    return `Try: "${partialAnswer}..." 🎯`;
  }
  return "";
}

/**
 * Get encouraging message based on attempt number
 */
function getEncouragingMessage(attemptNumber: number): string {
  const messages = [
    "Not quite, but you're doing great! Let's try again! 😊",
    "Almost there! Don't give up! 🌟",
    "Keep going! You're learning! 💪",
    "One more try! You can do this! 🎯",
  ];

  const index = Math.min(attemptNumber - 1, messages.length - 1);
  return messages[index];
}