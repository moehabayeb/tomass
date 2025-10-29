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
  // Apple Store Compliance: Silent operation

  // Initialize voice consistency manager
  await VoiceConsistencyManager.initialize();
  const voiceInfo = VoiceConsistencyManager.getVoiceInfo();
  
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
    // Apple Store Compliance: Silent operation

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
      // Apple Store Compliance: Silent operation

    } catch (error) {
      results.failedTests.push(`Test ${i + 1}: Exception - ${error}`);
      // Apple Store Compliance: Silent fail - operation continues
    }
  }

  results.success = results.passedTests === results.totalTests;

  // Apple Store Compliance: Silent operation

  return results;
}

/**
 * Test TTS Manager integration
 */
export async function testTTSManagerConsistency(): Promise<boolean> {
  // Apple Store Compliance: Silent operation

  try {
    // Test with TTSManager
    const testText = "Testing voice consistency through TTSManager.";

    // This should initialize voice consistency automatically
    await TTSManager.speak(testText, { canSkip: true });

    const voiceInfo = VoiceConsistencyManager.getVoiceInfo();
    // Apple Store Compliance: Silent operation

    return voiceInfo.isInitialized && voiceInfo.isLocked;

  } catch (error) {
    // Apple Store Compliance: Silent fail - operation continues
    return false;
  }
}

/**
 * Run complete voice consistency test suite
 */
export async function runVoiceConsistencyTestSuite(): Promise<void> {
  // Apple Store Compliance: Silent operation

  // Test 1: Basic voice consistency
  const basicTest = await testVoiceConsistency();

  // Test 2: TTSManager integration
  const ttsTest = await testTTSManagerConsistency();

  // Apple Store Compliance: Silent operation
}

// Expose test functions on window for easy browser console testing
if (typeof window !== 'undefined') {
  (window as any).testVoiceConsistency = runVoiceConsistencyTestSuite;
  (window as any).voiceInfo = () => VoiceConsistencyManager.getVoiceInfo();
}