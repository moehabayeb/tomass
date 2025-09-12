import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { startRecording, stopRecording, getState, onState, cleanup, getDiagnostics } from '../micEngine';

// Mock WebKit Speech Recognition
const mockRecognition = {
  start: vi.fn(),
  stop: vi.fn(),
  abort: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  continuous: false,
  interimResults: false,
  lang: '',
  maxAlternatives: 1,
  onstart: null,
  onend: null,
  onerror: null,
  onresult: null,
  onspeechstart: null,
  onspeechend: null,
};

const mockMediaStream = {
  getTracks: vi.fn(() => [{ stop: vi.fn(), kind: 'audio' }]),
  getAudioTracks: vi.fn(() => [{ stop: vi.fn() }]),
};

const mockMediaDevices = {
  getUserMedia: vi.fn(() => Promise.resolve(mockMediaStream)),
};

// Setup global mocks
beforeEach(() => {
  vi.clearAllMocks();
  
  // Mock webkitSpeechRecognition
  Object.defineProperty(window, 'webkitSpeechRecognition', {
    value: vi.fn(() => mockRecognition),
    writable: true,
  });
  
  // Mock MediaDevices
  Object.defineProperty(navigator, 'mediaDevices', {
    value: mockMediaDevices,
    writable: true,
  });
  
  // Mock AudioContext
  global.AudioContext = vi.fn().mockImplementation(() => ({
    state: 'running',
    resume: vi.fn(() => Promise.resolve()),
    suspend: vi.fn(() => Promise.resolve()),
    close: vi.fn(() => Promise.resolve()),
    createMediaStreamSource: vi.fn(() => ({
      connect: vi.fn(),
      disconnect: vi.fn(),
    })),
    createGain: vi.fn(() => ({
      gain: { value: 0 },
      connect: vi.fn(),
    })),
  })) as any;
  
  // Mock speechSynthesis
  Object.defineProperty(window, 'speechSynthesis', {
    value: { cancel: vi.fn() },
    writable: true,
  });
  
  // Mock timers
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('micEngine v1.0', () => {
  describe('State Management', () => {
    it('should start in idle state', () => {
      expect(getState()).toBe('idle');
    });
    
    it('should transition states correctly during recording', async () => {
      const states: string[] = [];
      const unsubscribe = onState((state) => states.push(state));
      
      const recordingPromise = startRecording({ maxSec: 1 });
      
      // Simulate recognition events
      setTimeout(() => {
        mockRecognition.onstart?.();
        mockRecognition.onspeechstart?.();
        mockRecognition.onresult?.({
          resultIndex: 0,
          results: [{ isFinal: true, 0: { transcript: 'hello world' } }]
        });
        mockRecognition.onend?.();
      }, 100);
      
      vi.advanceTimersByTime(2000);
      
      await expect(recordingPromise).resolves.toEqual({
        transcript: 'hello world',
        durationSec: expect.any(Number)
      });
      
      expect(states).toEqual(['initializing', 'recording', 'processing', 'idle']);
      unsubscribe();
    });
    
    it('should prevent overlapping recording sessions', async () => {
      const firstPromise = startRecording();
      
      await expect(startRecording()).rejects.toThrow('Recording already in progress');
      
      // Cleanup the first promise
      stopRecording();
      mockRecognition.onend?.();
      await firstPromise.catch(() => {});
    });
  });
  
  describe('Button Debouncing', () => {
    it('should debounce rapid button taps', async () => {
      const first = startRecording();
      vi.advanceTimersByTime(100); // Less than BUTTON_DEBOUNCE_MS (300)
      
      await expect(startRecording()).rejects.toThrow('Button debounced');
      
      stopRecording();
      mockRecognition.onend?.();
      await first.catch(() => {});
    });
    
    it('should allow recording after debounce period', async () => {
      const first = startRecording();
      stopRecording();
      mockRecognition.onend?.();
      await first.catch(() => {});
      
      vi.advanceTimersByTime(400); // More than BUTTON_DEBOUNCE_MS
      
      const second = startRecording();
      expect(second).toBeDefined();
      
      stopRecording();
      mockRecognition.onend?.();
      await second.catch(() => {});
    });
  });
  
  describe('Silence Detection', () => {
    it('should handle initial silence timeout', async () => {
      const recordingPromise = startRecording();
      
      // Simulate no speech detected
      setTimeout(() => {
        mockRecognition.onstart?.();
        // No onspeechstart call - simulates silence
      }, 100);
      
      vi.advanceTimersByTime(5000); // More than INITIAL_SILENCE_MS
      
      await expect(recordingPromise).rejects.toThrow('No speech detected');
      expect(getState()).toBe('idle');
    });
    
    it('should not timeout after speech starts', async () => {
      const recordingPromise = startRecording();
      
      setTimeout(() => {
        mockRecognition.onstart?.();
        mockRecognition.onspeechstart?.(); // Speech detected
        mockRecognition.onresult?.({
          resultIndex: 0,
          results: [{ isFinal: true, 0: { transcript: 'test' } }]
        });
        mockRecognition.onend?.();
      }, 100);
      
      vi.advanceTimersByTime(6000); // More than INITIAL_SILENCE_MS
      
      await expect(recordingPromise).resolves.toEqual({
        transcript: 'test',
        durationSec: expect.any(Number)
      });
    });
  });
  
  describe('Error Handling', () => {
    it('should handle microphone permission denied', async () => {
      mockMediaDevices.getUserMedia.mockRejectedValueOnce(
        new Error('NotAllowedError')
      );
      
      await expect(startRecording()).rejects.toThrow(
        'Microphone access denied. Allow mic in Settings.'
      );
      expect(getState()).toBe('idle');
    });
    
    it('should handle speech recognition errors', async () => {
      const recordingPromise = startRecording();
      
      setTimeout(() => {
        mockRecognition.onerror?.({ error: 'network' });
      }, 100);
      
      vi.advanceTimersByTime(1000);
      
      await expect(recordingPromise).rejects.toThrow(
        'Network error. Please check your connection.'
      );
      expect(getState()).toBe('idle');
    });
    
    it('should retry on no-speech error', async () => {
      let callCount = 0;
      const originalStart = mockRecognition.start;
      mockRecognition.start = vi.fn(() => {
        callCount++;
        if (callCount === 1) {
          setTimeout(() => mockRecognition.onerror?.({ error: 'no-speech' }), 50);
        } else {
          setTimeout(() => {
            mockRecognition.onstart?.();
            mockRecognition.onspeechstart?.();
            mockRecognition.onresult?.({
              resultIndex: 0,
              results: [{ isFinal: true, 0: { transcript: 'retry success' } }]
            });
            mockRecognition.onend?.();
          }, 50);
        }
      });
      
      const recordingPromise = startRecording();
      vi.advanceTimersByTime(2000);
      
      await expect(recordingPromise).resolves.toEqual({
        transcript: 'retry success',
        durationSec: expect.any(Number)
      });
      
      expect(callCount).toBe(2);
      mockRecognition.start = originalStart;
    });
  });
  
  describe('Resource Cleanup', () => {
    it('should cleanup all resources on component unmount', () => {
      const diag1 = getDiagnostics();
      expect(diag1.state).toBe('idle');
      
      cleanup();
      
      const diag2 = getDiagnostics();
      expect(diag2.state).toBe('idle');
      expect(diag2.runId).toBe(0);
      expect(diag2.retryCount).toBe(0);
    });
    
    it('should stop all timers on cleanup', async () => {
      const recordingPromise = startRecording();
      
      // Check that timers are active
      const diagBefore = getDiagnostics();
      expect(Object.values(diagBefore.timers).some(Boolean)).toBe(true);
      
      cleanup();
      
      // Check that all timers are cleared
      const diagAfter = getDiagnostics();
      expect(Object.values(diagAfter.timers).every(t => !t)).toBe(true);
      
      await recordingPromise.catch(() => {}); // Handle rejection
    });
  });
  
  describe('Stop Functionality', () => {
    it('should stop recording when stopRecording is called', async () => {
      const recordingPromise = startRecording();
      
      setTimeout(() => {
        mockRecognition.onstart?.();
        stopRecording(); // User stops recording
        mockRecognition.onend?.();
      }, 100);
      
      vi.advanceTimersByTime(1000);
      
      // Should resolve with empty transcript since stopped early
      await recordingPromise.catch(() => {}); // May reject if no speech
      expect(mockRecognition.stop).toHaveBeenCalled();
    });
  });
  
  describe('Invariant Checks', () => {
    it('should detect invalid state transitions', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Force an invalid state transition
      const recordingPromise = startRecording();
      
      // Manually trigger another start while recording (should fail)
      await expect(startRecording()).rejects.toThrow('Recording already in progress');
      
      stopRecording();
      mockRecognition.onend?.();
      await recordingPromise.catch(() => {});
      
      consoleSpy.mockRestore();
    });
  });
  
  describe('Feature Flags', () => {
    it('should respect fallback mode flag', () => {
      // Set fallback flag
      localStorage.setItem('speaking_use_fallback', '1');
      
      const diag = getDiagnostics();
      expect(diag.engine).toBe('media-recorder');
      
      localStorage.removeItem('speaking_use_fallback');
    });
  });
});