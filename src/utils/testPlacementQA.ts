// QA Testing for Placement Logic
import { normalizeScores, determinePlacement, Level } from './levelPlacement';
import { getPostTestRoute } from './levelResume';

export interface QATestCase {
  name: string;
  scores: { grammar: number; vocab: number; pron: number }; // 0-10 scale
  expectedLevel: Level;
  answers: number;
  duration: number;
}

export const TEST_CASES: QATestCase[] = [
  // A1 cases - weak scores
  {
    name: 'A1 Case - Very Low Scores',
    scores: { grammar: 2, vocab: 3, pron: 2 },
    expectedLevel: 'A1',
    answers: 10,
    duration: 45
  },
  {
    name: 'A1 Case - Below A2 Threshold',
    scores: { grammar: 4, vocab: 3, pron: 4 },
    expectedLevel: 'A1',
    answers: 8,
    duration: 35
  },
  
  // A2 cases - mid scores  
  {
    name: 'A2 Case - Two High Scores',
    scores: { grammar: 6, vocab: 7, pron: 4 },
    expectedLevel: 'A2',
    answers: 9,
    duration: 50
  },
  {
    name: 'A2 Case - One Very High Score',
    scores: { grammar: 7, vocab: 5, pron: 5 },
    expectedLevel: 'A2',
    answers: 10,
    duration: 60
  },
  
  // B1 cases - strong scores
  {
    name: 'B1 Case - High Performance',
    scores: { grammar: 8, vocab: 8, pron: 7 },
    expectedLevel: 'B1',
    answers: 12,
    duration: 80
  },
  {
    name: 'B1 Case - Two Excellent Scores',
    scores: { grammar: 9, vocab: 6, pron: 8 },
    expectedLevel: 'B1',
    answers: 11,
    duration: 75
  },
  
  // Edge cases
  {
    name: 'Insufficient Data - Few Answers',
    scores: { grammar: 7, vocab: 6, pron: 7 },
    expectedLevel: 'A1', // Should fallback to last known or A1
    answers: 6, // < 8 answers
    duration: 25 // < 30 seconds
  }
];

export function runPlacementQA(): void {
  
  TEST_CASES.forEach((testCase, index) => {
    
    // Normalize scores
    const normalized = normalizeScores(testCase.scores.grammar, testCase.scores.vocab, testCase.scores.pron);
    
    // Determine placement
    const placement = determinePlacement(normalized);
    
    // Check if matches expected
    const passed = placement.level === testCase.expectedLevel;
    
    // Test routing
    const route = getPostTestRoute(placement.level, 'guest');
    
    if (!passed) {
    }
  });
  
}

// Export for browser console testing
if (typeof window !== 'undefined') {
  (window as any).testPlacement = runPlacementQA;
}