import { vi } from 'vitest';

// Mock TTS service interfaces
export interface MockTTSVoice {
  id: string;
  name: string;
  language: string;
  gender: 'male' | 'female' | 'neutral';
  accent?: string;
}

export interface MockTTSConfig {
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
  language: string;
}

// Mock TTS voices
export const mockTTSVoices: MockTTSVoice[] = [
  {
    id: 'en-us-male-1',
    name: 'David',
    language: 'en-US',
    gender: 'male',
    accent: 'american'
  },
  {
    id: 'en-us-female-1',
    name: 'Sarah',
    language: 'en-US',
    gender: 'female',
    accent: 'american'
  },
  {
    id: 'en-gb-male-1',
    name: 'James',
    language: 'en-GB',
    gender: 'male',
    accent: 'british'
  },
  {
    id: 'tr-tr-female-1',
    name: 'Ayse',
    language: 'tr-TR',
    gender: 'female',
    accent: 'turkish'
  }
];

// Mock TTS Manager class
export const mockTTSManager = {
  // State
  isInitialized: true,
  isPlaying: false,
  currentVoice: mockTTSVoices[0],
  config: {
    voice: 'en-us-female-1',
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
    language: 'en-US'
  } as MockTTSConfig,
  
  // Methods
  initialize: vi.fn(() => Promise.resolve(true)),
  speak: vi.fn((text: string, options?: Partial<MockTTSConfig>) => {
    mockTTSManager.isPlaying = true;
    return Promise.resolve();
  }),
  stop: vi.fn(() => {
    mockTTSManager.isPlaying = false;
    return Promise.resolve();
  }),
  pause: vi.fn(() => Promise.resolve()),
  resume: vi.fn(() => Promise.resolve()),
  getVoices: vi.fn(() => Promise.resolve(mockTTSVoices)),
  setVoice: vi.fn((voiceId: string) => {
    const voice = mockTTSVoices.find(v => v.id === voiceId);
    if (voice) {
      mockTTSManager.currentVoice = voice;
      return true;
    }
    return false;
  }),
  setRate: vi.fn((rate: number) => {
    mockTTSManager.config.rate = Math.max(0.1, Math.min(3.0, rate));
  }),
  setPitch: vi.fn((pitch: number) => {
    mockTTSManager.config.pitch = Math.max(0.1, Math.min(2.0, pitch));
  }),
  setVolume: vi.fn((volume: number) => {
    mockTTSManager.config.volume = Math.max(0, Math.min(1, volume));
  }),
  setLanguage: vi.fn((language: string) => {
    mockTTSManager.config.language = language;
  }),
  getConfig: vi.fn(() => ({ ...mockTTSManager.config })),
  
  // Event handlers
  onStart: vi.fn(),
  onEnd: vi.fn(),
  onError: vi.fn(),
  onPause: vi.fn(),
  onResume: vi.fn(),
  
  // Utility methods
  getSupportedLanguages: vi.fn(() => [
    'en-US', 'en-GB', 'tr-TR', 'es-ES', 'fr-FR', 'de-DE', 'it-IT'
  ]),
  isLanguageSupported: vi.fn((language: string) => 
    mockTTSManager.getSupportedLanguages().includes(language)
  ),
  getVoicesForLanguage: vi.fn((language: string) => 
    mockTTSVoices.filter(voice => voice.language === language)
  ),
  
  // Testing helpers
  simulateStart: () => {
    mockTTSManager.isPlaying = true;
    if (mockTTSManager.onStart) {
      mockTTSManager.onStart();
    }
  },
  
  simulateEnd: () => {
    mockTTSManager.isPlaying = false;
    if (mockTTSManager.onEnd) {
      mockTTSManager.onEnd();
    }
  },
  
  simulateError: (error: string = 'TTS Error') => {
    mockTTSManager.isPlaying = false;
    if (mockTTSManager.onError) {
      mockTTSManager.onError(new Error(error));
    }
  },
  
  reset: () => {
    mockTTSManager.isPlaying = false;
    mockTTSManager.currentVoice = mockTTSVoices[0];
    mockTTSManager.config = {
      voice: 'en-us-female-1',
      rate: 1.0,
      pitch: 1.0,
      volume: 0.8,
      language: 'en-US'
    };
    vi.clearAllMocks();
  }
};

// Mock specific TTS implementations

// Simple TTS mock
export const mockSimpleTTS = {
  speak: vi.fn((text: string) => Promise.resolve()),
  stop: vi.fn(() => Promise.resolve()),
  cancel: vi.fn(() => Promise.resolve()),
  isSpeaking: vi.fn(() => false),
  getVoices: vi.fn(() => Promise.resolve([])),
  setVoice: vi.fn((voice: any) => Promise.resolve()),
  setRate: vi.fn((rate: number) => Promise.resolve()),
  setPitch: vi.fn((pitch: number) => Promise.resolve()),
  setVolume: vi.fn((volume: number) => Promise.resolve()),
};

// Bilingual TTS mock
export const mockBilingualTTS = {
  speakInEnglish: vi.fn((text: string) => Promise.resolve()),
  speakInTurkish: vi.fn((text: string) => Promise.resolve()),
  speakBilingual: vi.fn((englishText: string, turkishText: string) => Promise.resolve()),
  setEnglishVoice: vi.fn((voice: any) => Promise.resolve()),
  setTurkishVoice: vi.fn((voice: any) => Promise.resolve()),
  toggleLanguage: vi.fn((language: 'en' | 'tr') => Promise.resolve()),
  getCurrentLanguage: vi.fn(() => 'en'),
  stop: vi.fn(() => Promise.resolve()),
  isSpeaking: vi.fn(() => false),
};

// Tomas Voice mock (character-specific TTS)
export const mockTomasVoice = {
  speak: vi.fn((text: string, emotion?: 'happy' | 'neutral' | 'encouraging') => Promise.resolve()),
  speakWithEmotion: vi.fn((text: string, emotion: string) => Promise.resolve()),
  introduce: vi.fn(() => Promise.resolve()),
  encourage: vi.fn() => Promise.resolve(),
  celebrate: vi.fn((achievement: string) => Promise.resolve()),
  correct: vi.fn((feedback: string) => Promise.resolve()),
  stop: vi.fn(() => Promise.resolve()),
  setPersonality: vi.fn((personality: 'friendly' | 'professional' | 'enthusiastic') => {}),
  isSpeaking: vi.fn(() => false),
};

// Audio utilities mock
export const mockAudioUtils = {
  preloadAudio: vi.fn((src: string) => Promise.resolve()),
  playSound: vi.fn((sound: string) => Promise.resolve()),
  setMasterVolume: vi.fn((volume: number) => {}),
  enableSounds: vi.fn((enabled: boolean) => {}),
  getSoundEnabled: vi.fn(() => true),
  
  // Sound effect mocks
  playSuccessSound: vi.fn(() => Promise.resolve()),
  playErrorSound: vi.fn(() => Promise.resolve()),
  playLevelUpSound: vi.fn(() => Promise.resolve()),
  playClickSound: vi.fn(() => Promise.resolve()),
  playNotificationSound: vi.fn(() => Promise.resolve()),
  
  // Volume control
  fadeIn: vi.fn((audio: any, duration?: number) => Promise.resolve()),
  fadeOut: vi.fn((audio: any, duration?: number) => Promise.resolve()),
  
  // Audio context management
  resumeAudioContext: vi.fn(() => Promise.resolve()),
  suspendAudioContext: vi.fn(() => Promise.resolve()),
  getAudioContext: vi.fn(() => null),
};

// Setup function to initialize all TTS mocks
export const setupTTSMocks = () => {
  // Reset all mocks to default state
  mockTTSManager.reset();
  vi.clearAllMocks();
  
  // Initialize with default configuration
  mockTTSManager.isInitialized = true;
  mockTTSManager.isPlaying = false;
};

// Cleanup function
export const cleanupTTSMocks = () => {
  mockTTSManager.reset();
  vi.clearAllMocks();
};

// Helper for testing TTS in different languages
export const mockTTSForLanguage = (language: string) => {
  const voice = mockTTSVoices.find(v => v.language === language) || mockTTSVoices[0];
  mockTTSManager.currentVoice = voice;
  mockTTSManager.config.language = language;
  mockTTSManager.config.voice = voice.id;
};

// Helper for testing TTS errors
export const mockTTSError = (errorType: 'network' | 'not-supported' | 'invalid-voice' = 'network') => {
  mockTTSManager.speak.mockRejectedValue(new Error(`TTS Error: ${errorType}`));
  mockTTSManager.getVoices.mockRejectedValue(new Error(`TTS Error: ${errorType}`));
};

// Helper for testing TTS success scenarios
export const mockTTSSuccess = () => {
  mockTTSManager.speak.mockResolvedValue(undefined);
  mockTTSManager.getVoices.mockResolvedValue(mockTTSVoices);
  mockTTSManager.initialize.mockResolvedValue(true);
};