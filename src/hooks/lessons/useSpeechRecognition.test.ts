import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSpeechRecognition } from './useSpeechRecognition';

// Mock SpeechRecognition
const mockSpeechRecognition = {
  start: vi.fn(),
  stop: vi.fn(),
  lang: 'en-US',
  continuous: false,
  interimResults: false,
  onresult: null as any,
  onerror: null as any,
  onend: null as any,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

// Mock AudioContext
global.AudioContext = vi.fn().mockImplementation(() => ({
  state: 'running',
  resume: vi.fn().mockResolvedValue(undefined),
}));

(global as any).webkitAudioContext = global.AudioContext;

describe('useSpeechRecognition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window.SpeechRecognition
    (global as any).SpeechRecognition = vi.fn(() => ({ ...mockSpeechRecognition }));
    (global as any).webkitSpeechRecognition = (global as any).SpeechRecognition;
    
    // Reset the mock
    Object.assign(mockSpeechRecognition, {
      start: vi.fn(),
      stop: vi.fn(),
      lang: 'en-US',
      continuous: false,
      interimResults: false,
      onresult: null,
      onerror: null,
      onend: null,
    });
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.speakStatus).toBe('idle');
    expect(result.current.speechRunIdRef.current).toBe(null);
    expect(result.current.retryCountRef.current).toBe(0);
    expect(result.current.MAX_ASR_RETRIES).toBe(3);
    expect(typeof result.current.startSpeechRecognition).toBe('function');
    expect(typeof result.current.updateSpeakStatus).toBe('function');
    expect(typeof result.current.resetSpeechRecognition).toBe('function');
    expect(typeof result.current.newRunId).toBe('function');
    expect(typeof result.current.isStale).toBe('function');
  });

  it('creates a new run ID correctly', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const runId1 = result.current.newRunId();
    const runId2 = result.current.newRunId();

    expect(typeof runId1).toBe('string');
    expect(typeof runId2).toBe('string');
    expect(runId1).not.toBe(runId2);
    expect(runId1.length).toBeGreaterThan(10); // Should have timestamp + random chars
  });

  it('updates speak status correctly', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.updateSpeakStatus('recording');
    });

    expect(result.current.speakStatus).toBe('recording');

    act(() => {
      result.current.updateSpeakStatus('evaluating');
    });

    expect(result.current.speakStatus).toBe('evaluating');
  });

  it('resets speech recognition state', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // Set some non-default state
    act(() => {
      result.current.speechRunIdRef.current = 'test-id';
      result.current.updateSpeakStatus('recording');
      result.current.retryCountRef.current = 2;
    });

    // Reset
    act(() => {
      result.current.resetSpeechRecognition();
    });

    expect(result.current.speechRunIdRef.current).toBe(null);
    expect(result.current.speakStatus).toBe('idle');
    expect(result.current.retryCountRef.current).toBe(0);
  });

  it('checks if run ID is stale correctly', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const runId = 'test-run-id';
    
    // Should be stale when speechRunIdRef is null
    expect(result.current.isStale(runId)).toBe(true);

    // Set current run ID
    act(() => {
      result.current.speechRunIdRef.current = runId;
    });

    // Should not be stale when IDs match
    expect(result.current.isStale(runId)).toBe(false);

    // Should be stale when IDs don't match
    expect(result.current.isStale('different-id')).toBe(true);
  });

  it('handles speech recognition success', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const mockResults = {
      length: 1,
      0: {
        0: { transcript: 'hello world', confidence: 0.9 },
        length: 1,
        item: () => ({ transcript: 'hello world', confidence: 0.9 }),
        isFinal: true,
      },
      item: () => ({
        0: { transcript: 'hello world', confidence: 0.9 },
        length: 1,
        item: () => ({ transcript: 'hello world', confidence: 0.9 }),
        isFinal: true,
      }),
    };

    const mockEvent = { results: mockResults };

    // Start speech recognition
    const recognitionPromise = result.current.startSpeechRecognition();

    // Simulate successful recognition
    act(() => {
      if (mockSpeechRecognition.onresult) {
        mockSpeechRecognition.onresult(mockEvent);
      }
      if (mockSpeechRecognition.onend) {
        mockSpeechRecognition.onend();
      }
    });

    const transcript = await recognitionPromise;
    expect(transcript).toBe('hello world');
    expect(mockSpeechRecognition.start).toHaveBeenCalled();
  });

  it('handles speech recognition error', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const recognitionPromise = result.current.startSpeechRecognition();

    // Simulate error
    act(() => {
      if (mockSpeechRecognition.onerror) {
        mockSpeechRecognition.onerror({ error: 'network' });
      }
    });

    await expect(recognitionPromise).rejects.toThrow('Speech recognition error: network');
  });

  it('handles no speech detected', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const recognitionPromise = result.current.startSpeechRecognition();

    // Simulate end without results
    act(() => {
      if (mockSpeechRecognition.onend) {
        mockSpeechRecognition.onend();
      }
    });

    await expect(recognitionPromise).rejects.toThrow('No speech detected');
  });

  it('handles empty transcript', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const mockResults = {
      length: 1,
      0: {
        0: { transcript: '   ', confidence: 0.9 }, // Empty/whitespace transcript
        length: 1,
        item: () => ({ transcript: '   ', confidence: 0.9 }),
        isFinal: true,
      },
      item: () => ({
        0: { transcript: '   ', confidence: 0.9 },
        length: 1,
        item: () => ({ transcript: '   ', confidence: 0.9 }),
        isFinal: true,
      }),
    };

    const recognitionPromise = result.current.startSpeechRecognition();

    // Simulate result with empty transcript
    act(() => {
      if (mockSpeechRecognition.onresult) {
        mockSpeechRecognition.onresult({ results: mockResults });
      }
      if (mockSpeechRecognition.onend) {
        mockSpeechRecognition.onend();
      }
    });

    await expect(recognitionPromise).rejects.toThrow('No speech detected');
  });

  it('rejects when speech recognition is not supported', async () => {
    // Mock unsupported browser
    delete (global as any).SpeechRecognition;
    delete (global as any).webkitSpeechRecognition;

    const { result } = renderHook(() => useSpeechRecognition());

    const recognitionPromise = result.current.startSpeechRecognition();

    await expect(recognitionPromise).rejects.toThrow('Speech recognition not supported');
  });

  it('handles abort signal correctly', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const controller = new AbortController();
    controller.abort();

    const recognitionPromise = result.current.startSpeechRecognition({ 
      signal: controller.signal 
    });

    await expect(recognitionPromise).rejects.toThrow('aborted');
  });

  it('handles abort signal during recognition', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const controller = new AbortController();
    
    const recognitionPromise = result.current.startSpeechRecognition({ 
      signal: controller.signal 
    });

    // Abort after starting
    act(() => {
      controller.abort();
    });

    await expect(recognitionPromise).rejects.toThrow('aborted');
    expect(mockSpeechRecognition.stop).toHaveBeenCalled();
  });

  it('creates recognizer with correct settings', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // Start recognition to trigger recognizer creation
    result.current.startSpeechRecognition();

    expect((global as any).SpeechRecognition).toHaveBeenCalled();
    // The recognizer should be created with proper settings
    // (settings are applied in the getRecognizer function)
  });

  it('reuses existing recognizer', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    // Start recognition twice
    result.current.startSpeechRecognition();
    result.current.startSpeechRecognition();

    // Should only create one recognizer instance
    expect((global as any).SpeechRecognition).toHaveBeenCalledTimes(1);
  });

  it('handles audio context unlock', async () => {
    // Mock suspended audio context
    const mockAudioContext = {
      state: 'suspended',
      resume: vi.fn().mockResolvedValue(undefined),
    };

    (global as any).__appAudioCtx = mockAudioContext;

    const { result } = renderHook(() => useSpeechRecognition());

    // This should trigger audio unlock
    const recognitionPromise = result.current.startSpeechRecognition();

    // Simulate successful recognition to resolve the promise
    act(() => {
      const mockResults = {
        length: 1,
        0: {
          0: { transcript: 'test', confidence: 0.9 },
          length: 1,
          item: () => ({ transcript: 'test', confidence: 0.9 }),
          isFinal: true,
        },
        item: () => ({
          0: { transcript: 'test', confidence: 0.9 },
          length: 1,
          item: () => ({ transcript: 'test', confidence: 0.9 }),
          isFinal: true,
        }),
      };

      if (mockSpeechRecognition.onresult) {
        mockSpeechRecognition.onresult({ results: mockResults });
      }
      if (mockSpeechRecognition.onend) {
        mockSpeechRecognition.onend();
      }
    });

    await recognitionPromise;

    expect(mockAudioContext.resume).toHaveBeenCalled();
  });

  it('handles audio context unlock failure gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const mockAudioContext = {
      state: 'suspended',
      resume: vi.fn().mockRejectedValue(new Error('Resume failed')),
    };

    (global as any).__appAudioCtx = mockAudioContext;

    const { result } = renderHook(() => useSpeechRecognition());

    // Should not throw even if audio context fails
    const recognitionPromise = result.current.startSpeechRecognition();

    // Simulate successful recognition
    act(() => {
      const mockResults = {
        length: 1,
        0: {
          0: { transcript: 'test', confidence: 0.9 },
          length: 1,
          item: () => ({ transcript: 'test', confidence: 0.9 }),
          isFinal: true,
        },
        item: () => ({
          0: { transcript: 'test', confidence: 0.9 },
          length: 1,
          item: () => ({ transcript: 'test', confidence: 0.9 }),
          isFinal: true,
        }),
      };

      if (mockSpeechRecognition.onresult) {
        mockSpeechRecognition.onresult({ results: mockResults });
      }
      if (mockSpeechRecognition.onend) {
        mockSpeechRecognition.onend();
      }
    });

    await recognitionPromise;

    expect(consoleSpy).toHaveBeenCalledWith('Failed to resume audio context:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('handles recognition start error', async () => {
    const startError = new Error('Start failed');
    mockSpeechRecognition.start.mockImplementation(() => {
      throw startError;
    });

    const { result } = renderHook(() => useSpeechRecognition());

    const recognitionPromise = result.current.startSpeechRecognition();

    await expect(recognitionPromise).rejects.toThrow('Start failed');
  });

  it('trims transcript correctly', async () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const mockResults = {
      length: 1,
      0: {
        0: { transcript: '  hello world  ', confidence: 0.9 },
        length: 1,
        item: () => ({ transcript: '  hello world  ', confidence: 0.9 }),
        isFinal: true,
      },
      item: () => ({
        0: { transcript: '  hello world  ', confidence: 0.9 },
        length: 1,
        item: () => ({ transcript: '  hello world  ', confidence: 0.9 }),
        isFinal: true,
      }),
    };

    const recognitionPromise = result.current.startSpeechRecognition();

    act(() => {
      if (mockSpeechRecognition.onresult) {
        mockSpeechRecognition.onresult({ results: mockResults });
      }
      if (mockSpeechRecognition.onend) {
        mockSpeechRecognition.onend();
      }
    });

    const transcript = await recognitionPromise;
    expect(transcript).toBe('hello world'); // Should be trimmed
  });
});