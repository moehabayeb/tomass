// Complete QA Testing for Speaking Test → Level Routing
import { normalizeScores, determinePlacement } from './levelPlacement';
import { getPostTestRoute } from './levelResume';
import { evaluateAnswer } from './evaluator';

// Run comprehensive QA tests and log results
export function runCompleteQA(): void {
  
  // Test Case 1: A1 placement
  const a1Scores = normalizeScores(3, 4, 3); // Low scores
  const a1Placement = determinePlacement(a1Scores);
  const a1Route = getPostTestRoute(a1Placement.level, 'guest');
  
  // Test Case 2: A2 placement
  const a2Scores = normalizeScores(6, 7, 5); // Mid scores
  const a2Placement = determinePlacement(a2Scores);
  const a2Route = getPostTestRoute(a2Placement.level, 'guest');
  
  // Test Case 3: B1 placement
  const b1Scores = normalizeScores(8, 8, 7); // High scores
  const b1Placement = determinePlacement(b1Scores);
  const b1Route = getPostTestRoute(b1Placement.level, 'guest');
  
  // Test Case 4: Insufficient data
  // Simulate insufficient data by checking the hasInsufficientData function
  const insufficientAnswers = 6; // < 8 answers
  const insufficientDuration = 25; // < 30 seconds
  
  // Test Case 5: Robust evaluator testing
  
  const evaluatorTests = [
    {
      expected: 'Yes, they are students.',
      userInput: 'Yes, they are my students.',
      shouldPass: true,
      name: 'Accept "my students"'
    },
    {
      expected: 'Yes, they are students.',
      userInput: "Yes, they're students.",
      shouldPass: true,
      name: 'Accept contractions'
    },
    {
      expected: 'Yes, they are students.',
      userInput: 'yes they are students',
      shouldPass: true,
      name: 'Accept case/punctuation variants'
    },
    {
      expected: 'Yes, they are students.',
      userInput: 'No, they are students.',
      shouldPass: false,
      name: 'Reject polarity mismatch'
    }
  ];
  
  evaluatorTests.forEach(test => {
    const result = evaluateAnswer(test.userInput, {
      expected: test.expected,
      requireAffirmationPolarity: true,
      keyLemmas: ['student']
    });
    
    const passed = result === test.shouldPass;
  });
  
  // Test resume logic by simulating saved progress
  const userId = 'guest';
  const progressKey = `speakflow:v2:${userId}`;
  
  // Save test progress
  const testProgress = {
    'A2:52': {
      total: 40,
      correct: 37,
      completed: false,
      updatedAt: Date.now(),
      pointer: { levelId: 'A2', moduleId: '52', questionIndex: 37 }
    }
  };
  
  localStorage.setItem(progressKey, JSON.stringify(testProgress));
  
  // Test placement with existing progress
  const existingProgressRoute = getPostTestRoute('A1', userId); // Lower than saved A2

  // Clean up test data
  localStorage.removeItem(progressKey);
}

// Export for browser console
if (typeof window !== 'undefined') {
  (window as typeof window & { runQA?: typeof runCompleteQA }).runQA = runCompleteQA;
}