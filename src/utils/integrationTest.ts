// Integration test for placement and auto-advance logic
import { runPlacementQA } from './testPlacementQA';
import { evaluateAnswer, EvalOptions } from './evaluator';

// Test the evaluator with the "Yes, they are my students" case
export function testEvaluatorRobustness(): void {
  console.log('🧪 Testing Evaluator Robustness...\n');
  
  const testCases = [
    {
      name: 'Original Case - Accept "my students"',
      expected: 'Yes, they are students.',
      userInput: 'Yes, they are my students.',
      shouldPass: true,
      options: { 
        expected: 'Yes, they are students.',
        requireAffirmationPolarity: true,
        keyLemmas: ['student']
      }
    },
    {
      name: 'Contraction Variant',
      expected: 'Yes, they are students.',
      userInput: "Yes, they're students.",
      shouldPass: true,
      options: { 
        expected: 'Yes, they are students.',
        requireAffirmationPolarity: true,
        keyLemmas: ['student']
      }
    },
    {
      name: 'Case/Punctuation Variant',
      expected: 'Yes, they are students.',
      userInput: 'yes they are students',
      shouldPass: true,
      options: { 
        expected: 'Yes, they are students.',
        requireAffirmationPolarity: true,
        keyLemmas: ['student']
      }
    },
    {
      name: 'Polarity Mismatch - Should Fail',
      expected: 'Yes, they are students.',
      userInput: 'No, they are students.',
      shouldPass: false,
      options: { 
        expected: 'Yes, they are students.',
        requireAffirmationPolarity: true,
        keyLemmas: ['student']
      }
    },
    {
      name: 'Wrong Key Lemma - Should Fail',  
      expected: 'Yes, they are students.',
      userInput: 'Yes, they are teachers.',
      shouldPass: false,
      options: { 
        expected: 'Yes, they are students.',
        requireAffirmationPolarity: true,
        keyLemmas: ['student']
      }
    }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\n--- Evaluator Test ${index + 1}: ${testCase.name} ---`);
    console.log(`Expected: "${testCase.expected}"`);
    console.log(`User Input: "${testCase.userInput}"`);
    
    const result = evaluateAnswer(testCase.userInput, testCase.options as EvalOptions);
    const passed = result === testCase.shouldPass;
    
    console.log(`✅ ${passed ? 'PASS' : 'FAIL'}: Expected ${testCase.shouldPass}, got ${result}`);
    
    if (!passed) {
      console.error(`❌ EVALUATOR TEST FAILED: ${testCase.name}`);
    }
  });
  
  console.log('\n🏁 Evaluator Tests Complete');
}

// Test resume functionality
export function testResumeLogic(): void {
  console.log('🧪 Testing Resume Logic...\n');
  
  // Clear any existing progress
  localStorage.removeItem('speakflow:v2:guest');
  
  // Simulate progress save at A2 Module 52, Question 37
  const userId = 'guest';
  const progressKey = `speakflow:v2:${userId}`;
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
  console.log('💾 Simulated progress: A2 Module 52, Question 38/40');
  
  // Test resume
  import('./progress').then(({ resumeLastPointer }) => {
    const resumed = resumeLastPointer(userId);
    if (resumed) {
      console.log(`🔄 Resume test: ${resumed.levelId} Module ${resumed.moduleId}, Question ${resumed.questionIndex + 1}`);
      
      const passed = resumed.levelId === 'A2' && resumed.moduleId === '52' && resumed.questionIndex === 37;
      console.log(`✅ ${passed ? 'PASS' : 'FAIL'}: Resume logic working correctly`);
    } else {
      console.error('❌ RESUME TEST FAILED: No pointer returned');
    }
  });
}

// Run all integration tests
export function runIntegrationTests(): void {
  console.log('🚀 Starting Integration Tests...\n');
  
  // Test placement logic
  runPlacementQA();
  
  // Test evaluator robustness  
  testEvaluatorRobustness();
  
  // Test resume logic
  testResumeLogic();
  
  console.log('\n🎉 All Integration Tests Complete!');
}

// Export for browser console testing
if (typeof window !== 'undefined') {
  (window as any).runIntegrationTests = runIntegrationTests;
  (window as any).testEvaluator = testEvaluatorRobustness;
  (window as any).testResume = testResumeLogic;
}