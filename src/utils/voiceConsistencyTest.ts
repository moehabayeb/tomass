/**
 * 🎯 VOICE CONSISTENCY TEST UTILITY
 * Use this to verify that the same mature male voice is used consistently
 */

import { VoiceConsistencyManager } from '@/config/voice';
import { TTSManager } from '@/services/TTSManager';

export interface VoiceTestResult {
  success: boolean;
  voiceName: string;
  totalTests: number;
  passedTests: number;
  failedTests: string[];
  voiceInfo: any;
}

/**
 * Test voice consistency across multiple TTS calls
 */
export async function testVoiceConsistency(): Promise<VoiceTestResult> {
  console.log('🎯 Starting Voice Consistency Test...');
  
  // Initialize voice consistency manager
  await VoiceConsistencyManager.initialize();
  const voiceInfo = VoiceConsistencyManager.getVoiceInfo();
  
  console.log('📊 Voice Info:', voiceInfo);
  
  if (!voiceInfo.isInitialized || !voiceInfo.isLocked) {
    return {
      success: false,
      voiceName: 'None',
      totalTests: 0,
      passedTests: 0,
      failedTests: ['Voice manager not properly initialized'],
      voiceInfo
    };
  }

  const testPhrases = [
    "Hello, this is a test of voice consistency.",
    "I like playing pingpong with my friends.",
    "The weather is beautiful today, isn't it?",
    "What would you like to talk about next?",
    "That's very interesting, please tell me more.",
    "How has your day been so far?",
    "I love pizza! What's your favorite food?",
    "Learning English can be fun and rewarding.",
    "Thank you for practicing with me today.",
    "Let's continue our conversation practice."
  ];

  const results: VoiceTestResult = {
    success: true,
    voiceName: voiceInfo.name,
    totalTests: testPhrases.length,
    passedTests: 0,
    failedTests: [],
    voiceInfo
  };

  for (let i = 0; i < testPhrases.length; i++) {
    const phrase = testPhrases[i];
    console.log(`🧪 Test ${i + 1}/${testPhrases.length}: "${phrase.substring(0, 30)}..."`);

    try {
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(phrase);
      
      // Configure with VoiceConsistencyManager
      const configured = VoiceConsistencyManager.configureUtterance(utterance, phrase);
      
      if (!configured) {
        results.failedTests.push(`Test ${i + 1}: Failed to configure utterance`);
        continue;
      }

      // Validate voice consistency
      const isValid = VoiceConsistencyManager.validateUtterance(utterance);
      
      if (!isValid) {
        results.failedTests.push(`Test ${i + 1}: Voice validation failed - expected ${voiceInfo.name}, got ${utterance.voice?.name || 'null'}`);
        continue;
      }

      // Check voice characteristics
      if (utterance.voice?.name !== voiceInfo.name) {
        results.failedTests.push(`Test ${i + 1}: Voice mismatch - expected ${voiceInfo.name}, got ${utterance.voice?.name}`);
        continue;
      }

      results.passedTests++;
      console.log(`✅ Test ${i + 1} PASSED: Voice = ${utterance.voice?.name}`);

    } catch (error) {
      results.failedTests.push(`Test ${i + 1}: Exception - ${error}`);
      console.error(`❌ Test ${i + 1} ERROR:`, error);
    }
  }

  results.success = results.passedTests === results.totalTests;
  
  console.log(`\n🏁 VOICE CONSISTENCY TEST RESULTS:`);
  console.log(`✅ Passed: ${results.passedTests}/${results.totalTests}`);
  console.log(`❌ Failed: ${results.failedTests.length}`);
  console.log(`🎯 Voice Used: ${results.voiceName}`);
  console.log(`🔒 Success Rate: ${((results.passedTests / results.totalTests) * 100).toFixed(1)}%`);

  if (results.failedTests.length > 0) {
    console.log(`\n❌ Failed Tests:`);
    results.failedTests.forEach(failure => console.log(`   - ${failure}`));
  }

  return results;
}

/**
 * Test TTS Manager integration
 */
export async function testTTSManagerConsistency(): Promise<boolean> {
  console.log('🎯 Testing TTSManager Voice Consistency...');
  
  try {
    // Test with TTSManager
    const testText = "Testing voice consistency through TTSManager.";
    
    // This should initialize voice consistency automatically
    await TTSManager.speak(testText, { canSkip: true });
    
    const voiceInfo = VoiceConsistencyManager.getVoiceInfo();
    console.log('📊 TTSManager Voice Info:', voiceInfo);
    
    return voiceInfo.isInitialized && voiceInfo.isLocked;
    
  } catch (error) {
    console.error('❌ TTSManager test failed:', error);
    return false;
  }
}

/**
 * Run complete voice consistency test suite
 */
export async function runVoiceConsistencyTestSuite(): Promise<void> {
  console.log('\n🎯 ==========================================');
  console.log('🎯 RUNNING COMPLETE VOICE CONSISTENCY TEST');
  console.log('🎯 ==========================================\n');

  // Test 1: Basic voice consistency
  const basicTest = await testVoiceConsistency();
  
  // Test 2: TTSManager integration
  const ttsTest = await testTTSManagerConsistency();
  
  // Summary
  console.log('\n🏁 ==========================================');
  console.log('🏁 TEST SUITE RESULTS');
  console.log('🏁 ==========================================');
  console.log(`🎯 Voice Lock Test: ${basicTest.success ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`🎯 TTSManager Test: ${ttsTest ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`🔒 Voice Used: ${basicTest.voiceName}`);
  console.log(`📊 Consistency Rate: ${basicTest.success ? '100%' : (basicTest.passedTests / basicTest.totalTests * 100).toFixed(1) + '%'}`);
  
  if (basicTest.success && ttsTest) {
    console.log('\n🎉 VOICE CONSISTENCY: PERFECT! All tests passed.');
    console.log('✅ Your voice chat will now use the same mature male voice consistently.');
  } else {
    console.log('\n⚠️ VOICE CONSISTENCY: Issues detected. Check the logs above.');
  }
}

// Expose test functions on window for easy browser console testing
if (typeof window !== 'undefined') {
  (window as any).testVoiceConsistency = runVoiceConsistencyTestSuite;
  (window as any).voiceInfo = () => VoiceConsistencyManager.getVoiceInfo();
}