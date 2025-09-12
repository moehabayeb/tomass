// Central mock exports for easy importing in tests
export * from './supabase';
export * from './speech';
export * from './tts';

// Re-export commonly used mocks
export { mockSupabase as supabase } from './supabase';
export { mockTTSManager as ttsManager } from './tts';
export { 
  mockSpeechRecognition as speechRecognition,
  mockSpeechSynthesis as speechSynthesis 
} from './speech';

// Global setup function for all mocks
export const setupAllMocks = () => {
  const { setupSpeechMocks } = require('./speech');
  const { setupTTSMocks } = require('./tts');
  
  setupSpeechMocks();
  setupTTSMocks();
};

// Global cleanup function
export const cleanupAllMocks = () => {
  const { cleanupSpeechMocks } = require('./speech');
  const { cleanupTTSMocks } = require('./tts');
  
  cleanupSpeechMocks();
  cleanupTTSMocks();
};