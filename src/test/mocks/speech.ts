import { vi } from 'vitest';

// Mock SpeechRecognition API
export const mockSpeechRecognition = {
  start: vi.fn(),
  stop: vi.fn(),
  abort: vi.fn(),
  lang: 'en-US',
  continuous: false,
  interimResults: false,
  maxAlternatives: 1,
  serviceURI: '',
  grammars: null,
  onresult: null as any,
  onerror: null as any,
  onend: null as any,
  onstart: null as any,
  onsoundstart: null as any,
  onsoundend: null as any,
  onspeechstart: null as any,
  onspeechend: null as any,
  onaudiostart: null as any,
  onaudioend: null as any,
  onnomatch: null as any,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

// Mock SpeechSynthesis API
export const mockSpeechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn(() => [
    {
      voiceURI: 'Alex',
      name: 'Alex',
      lang: 'en-US',
      localService: true,
      default: true,
    },
  ]),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  pending: false,
  speaking: false,
  paused: false,
  onvoiceschanged: null as any,
};

// Mock SpeechSynthesisUtterance
export const mockSpeechSynthesisUtterance = vi.fn().mockImplementation((text?: string) => ({
  text: text || '',
  lang: 'en-US',
  voice: null,
  volume: 1,
  rate: 1,
  pitch: 1,
  onstart: null,
  onend: null,
  onerror: null,
  onpause: null,
  onresume: null,
  onmark: null,
  onboundary: null,
}));

// Helper functions to simulate speech recognition events
export const simulateSpeechRecognition = {
  success: (transcript: string, confidence: number = 0.9) => {
    if (mockSpeechRecognition.onresult) {
      const mockEvent = {
        results: {
          length: 1,
          0: {
            0: { transcript, confidence },
            length: 1,
            item: () => ({ transcript, confidence }),
            isFinal: true,
          },
          item: () => ({
            0: { transcript, confidence },
            length: 1,
            item: () => ({ transcript, confidence }),
            isFinal: true,
          }),
        },
      };
      mockSpeechRecognition.onresult(mockEvent);
    }
    
    if (mockSpeechRecognition.onend) {
      mockSpeechRecognition.onend();
    }
  },
  
  error: (errorType: string = 'network') => {
    if (mockSpeechRecognition.onerror) {
      mockSpeechRecognition.onerror({ error: errorType });
    }
  },
  
  noSpeech: () => {
    if (mockSpeechRecognition.onend) {
      mockSpeechRecognition.onend();
    }
  },
  
  start: () => {
    if (mockSpeechRecognition.onstart) {
      mockSpeechRecognition.onstart();
    }
  },
};

// Helper functions to simulate speech synthesis events
export const simulateSpeechSynthesis = {
  start: () => {
    mockSpeechSynthesis.speaking = true;
  },
  
  end: () => {
    mockSpeechSynthesis.speaking = false;
  },
  
  error: (errorType: string = 'synthesis-failed') => {
    mockSpeechSynthesis.speaking = false;
  },
};

// Mock MediaRecorder API
export const mockMediaRecorder = vi.fn().mockImplementation(() => ({
  start: vi.fn(),
  stop: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  requestData: vi.fn(),
  state: 'inactive',
  mimeType: 'audio/webm',
  ondataavailable: null,
  onerror: null,
  onpause: null,
  onresume: null,
  onstart: null,
  onstop: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock getUserMedia
export const mockGetUserMedia = vi.fn(() => Promise.resolve({
  getTracks: () => [
    {
      stop: vi.fn(),
      kind: 'audio',
      enabled: true,
      id: 'mock-audio-track',
      label: 'Mock Audio Track',
      muted: false,
      readyState: 'live',
      getSettings: () => ({
        sampleRate: 44100,
        channelCount: 1,
      }),
      getConstraints: () => ({}),
      getCapabilities: () => ({}),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  ],
  getAudioTracks: () => [
    {
      stop: vi.fn(),
      kind: 'audio',
      enabled: true,
      id: 'mock-audio-track',
      getSettings: () => ({
        sampleRate: 44100,
        channelCount: 1,
      }),
    }
  ],
  id: 'mock-stream-id',
  active: true,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock AudioContext
export const mockAudioContext = vi.fn().mockImplementation(() => ({
  state: 'running',
  sampleRate: 44100,
  currentTime: 0,
  destination: {},
  listener: {},
  suspend: vi.fn().mockResolvedValue(undefined),
  resume: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  createBuffer: vi.fn(),
  createBufferSource: vi.fn(),
  createOscillator: vi.fn(),
  createGain: vi.fn(),
  createAnalyser: vi.fn(() => ({
    fftSize: 2048,
    frequencyBinCount: 1024,
    minDecibels: -100,
    maxDecibels: -30,
    smoothingTimeConstant: 0.8,
    connect: vi.fn(),
    disconnect: vi.fn(),
    getFloatFrequencyData: vi.fn(),
    getByteFrequencyData: vi.fn(),
    getFloatTimeDomainData: vi.fn(),
    getByteTimeDomainData: vi.fn(),
  })),
  createMediaStreamSource: vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
  })),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Setup function to mock all speech-related APIs
export const setupSpeechMocks = () => {
  // Mock global speech recognition
  (global as any).SpeechRecognition = vi.fn(() => ({ ...mockSpeechRecognition }));
  (global as any).webkitSpeechRecognition = (global as any).SpeechRecognition;
  
  // Mock global speech synthesis
  (global as any).speechSynthesis = mockSpeechSynthesis;
  (global as any).SpeechSynthesisUtterance = mockSpeechSynthesisUtterance;
  
  // Mock MediaRecorder
  (global as any).MediaRecorder = mockMediaRecorder;
  (global as any).MediaRecorder.isTypeSupported = vi.fn(() => true);
  
  // Mock AudioContext
  (global as any).AudioContext = mockAudioContext;
  (global as any).webkitAudioContext = mockAudioContext;
  
  // Mock getUserMedia
  Object.defineProperty(navigator, 'mediaDevices', {
    writable: true,
    value: {
      getUserMedia: mockGetUserMedia,
      enumerateDevices: vi.fn(() => Promise.resolve([])),
    },
  });
  
  // Mock vibrate API
  Object.defineProperty(navigator, 'vibrate', {
    writable: true,
    value: vi.fn(),
  });
};

// Cleanup function to reset all mocks
export const cleanupSpeechMocks = () => {
  vi.clearAllMocks();
  mockSpeechRecognition.onresult = null;
  mockSpeechRecognition.onerror = null;
  mockSpeechRecognition.onend = null;
  mockSpeechSynthesis.speaking = false;
  mockSpeechSynthesis.pending = false;
  mockSpeechSynthesis.paused = false;
};