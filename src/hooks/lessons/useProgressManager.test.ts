import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgressManager } from './useProgressManager';

// Mock the ProgressStore functions
vi.mock('../../utils/ProgressStore', () => ({
  getProgress: vi.fn(),
  setProgress: vi.fn(),
  keyFor: vi.fn(),
}));

// Mock the progress utils
vi.mock('../../utils/progress', () => ({
  save: vi.fn(),
  getModuleState: vi.fn(),
}));

describe('useProgressManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes correctly', () => {
    const { result } = renderHook(() => useProgressManager());

    expect(result.current.saveModuleProgress).toBeDefined();
    expect(result.current.loadModuleProgress).toBeDefined();
    expect(typeof result.current.saveModuleProgress).toBe('function');
    expect(typeof result.current.loadModuleProgress).toBe('function');
  });

  it('saves module progress to both old and new systems', async () => {
    const { getProgress, setProgress } = vi.mocked(await import('../../utils/ProgressStore'));
    const { save } = vi.mocked(await import('../../utils/progress'));

    const { result } = renderHook(() => useProgressManager());

    act(() => {
      result.current.saveModuleProgress('A1', 5, 'listening', 10);
    });

    // Should call setProgress with correct data structure
    expect(setProgress).toHaveBeenCalledWith({
      level: 'A1',
      module: 5,
      phase: 'listening',
      listeningIndex: 0,
      speakingIndex: 10,
      completed: false,
      totalListening: 0,
      totalSpeaking: 40,
      updatedAt: expect.any(Number),
      v: 1,
    });

    // Should call new progress system
    expect(save).toHaveBeenCalledWith(
      'guest', // default user ID
      'A1',
      '5',
      10, // questionIndex
      40, // total questions
      11, // correct answers (questionIndex + 1)
      false // not completed
    );
  });

  it('saves completed module progress correctly', async () => {
    const { setProgress } = vi.mocked(await import('../../utils/ProgressStore'));
    const { save } = vi.mocked(await import('../../utils/progress'));

    const { result } = renderHook(() => useProgressManager());

    act(() => {
      result.current.saveModuleProgress('B1', 3, 'complete', 40);
    });

    expect(setProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'B1',
        module: 3,
        phase: 'complete',
        completed: true,
        speakingIndex: 40,
      })
    );

    expect(save).toHaveBeenCalledWith(
      'guest',
      'B1',
      '3',
      40,
      40,
      40, // All 40 questions answered when complete
      true // completed
    );
  });

  it('handles save errors gracefully', async () => {
    const { setProgress } = vi.mocked(await import('../../utils/ProgressStore'));
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    setProgress.mockImplementation(() => {
      throw new Error('Save failed');
    });

    const { result } = renderHook(() => useProgressManager());

    act(() => {
      result.current.saveModuleProgress('A1', 1, 'intro', 0);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to save progress:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('loads module progress successfully', async () => {
    const { getProgress } = vi.mocked(await import('../../utils/ProgressStore'));

    getProgress.mockReturnValue({
      level: 'A1',
      module: 5,
      phase: 'speaking',
      listeningIndex: 0,
      speakingIndex: 15,
      completed: false,
      totalListening: 0,
      totalSpeaking: 40,
      updatedAt: Date.now(),
      v: 1,
    });

    const { result } = renderHook(() => useProgressManager());

    let progressState;
    act(() => {
      progressState = result.current.loadModuleProgress('A1', 5);
    });

    expect(getProgress).toHaveBeenCalledWith('A1', 5);
    expect(progressState).toEqual({
      phase: 'speaking',
      questionIndex: 15,
    });
  });

  it('loads completed module progress correctly', async () => {
    const { getProgress } = vi.mocked(await import('../../utils/ProgressStore'));

    getProgress.mockReturnValue({
      level: 'B1',
      module: 10,
      phase: 'complete',
      listeningIndex: 0,
      speakingIndex: 40,
      completed: true,
      totalListening: 0,
      totalSpeaking: 40,
      updatedAt: Date.now(),
      v: 1,
    });

    const { result } = renderHook(() => useProgressManager());

    let progressState;
    act(() => {
      progressState = result.current.loadModuleProgress('B1', 10);
    });

    expect(progressState).toEqual({
      phase: 'complete',
      questionIndex: 40,
    });
  });

  it('returns default progress when no saved progress exists', async () => {
    const { getProgress } = vi.mocked(await import('../../utils/ProgressStore'));

    getProgress.mockReturnValue(null);

    const { result } = renderHook(() => useProgressManager());

    let progressState;
    act(() => {
      progressState = result.current.loadModuleProgress('A1', 1);
    });

    expect(progressState).toEqual({
      phase: 'intro',
      questionIndex: 0,
    });
  });

  it('handles load errors gracefully', async () => {
    const { getProgress } = vi.mocked(await import('../../utils/ProgressStore'));
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    getProgress.mockImplementation(() => {
      throw new Error('Load failed');
    });

    const { result } = renderHook(() => useProgressManager());

    let progressState;
    act(() => {
      progressState = result.current.loadModuleProgress('A1', 1);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to load progress:', expect.any(Error));
    expect(progressState).toEqual({
      phase: 'intro',
      questionIndex: 0,
    });

    consoleSpy.mockRestore();
  });

  it('handles progress with missing phase correctly', async () => {
    const { getProgress } = vi.mocked(await import('../../utils/ProgressStore'));

    getProgress.mockReturnValue({
      level: 'A1',
      module: 5,
      phase: null, // Missing phase
      listeningIndex: 0,
      speakingIndex: 10,
      completed: false,
      totalListening: 0,
      totalSpeaking: 40,
      updatedAt: Date.now(),
      v: 1,
    });

    const { result } = renderHook(() => useProgressManager());

    let progressState;
    act(() => {
      progressState = result.current.loadModuleProgress('A1', 5);
    });

    expect(progressState).toEqual({
      phase: 'intro', // Falls back to intro
      questionIndex: 10,
    });
  });

  it('handles progress with missing speakingIndex correctly', async () => {
    const { getProgress } = vi.mocked(await import('../../utils/ProgressStore'));

    getProgress.mockReturnValue({
      level: 'A1',
      module: 5,
      phase: 'listening',
      listeningIndex: 0,
      speakingIndex: null, // Missing speakingIndex
      completed: false,
      totalListening: 0,
      totalSpeaking: 40,
      updatedAt: Date.now(),
      v: 1,
    });

    const { result } = renderHook(() => useProgressManager());

    let progressState;
    act(() => {
      progressState = result.current.loadModuleProgress('A1', 5);
    });

    expect(progressState).toEqual({
      phase: 'listening',
      questionIndex: 0, // Falls back to 0
    });
  });

  it('saves progress with correct timestamp', async () => {
    const { setProgress } = vi.mocked(await import('../../utils/ProgressStore'));
    const mockNow = 1234567890;
    vi.spyOn(Date, 'now').mockReturnValue(mockNow);

    const { result } = renderHook(() => useProgressManager());

    act(() => {
      result.current.saveModuleProgress('A1', 1, 'intro', 0);
    });

    expect(setProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        updatedAt: mockNow,
      })
    );

    vi.restoreAllMocks();
  });

  it('saves intro phase progress correctly', async () => {
    const { setProgress } = vi.mocked(await import('../../utils/ProgressStore'));
    const { save } = vi.mocked(await import('../../utils/progress'));

    const { result } = renderHook(() => useProgressManager());

    act(() => {
      result.current.saveModuleProgress('A2', 8, 'intro');
    });

    expect(setProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'A2',
        module: 8,
        phase: 'intro',
        speakingIndex: 0, // Default questionIndex
        completed: false,
      })
    );

    expect(save).toHaveBeenCalledWith(
      'guest',
      'A2',
      '8',
      0, // Default questionIndex
      40,
      1, // questionIndex + 1
      false
    );
  });

  it('maintains consistent module identification across systems', async () => {
    const { setProgress } = vi.mocked(await import('../../utils/ProgressStore'));
    const { save } = vi.mocked(await import('../../utils/progress'));

    const { result } = renderHook(() => useProgressManager());

    act(() => {
      result.current.saveModuleProgress('B2', 15, 'listening', 5);
    });

    // Both systems should receive the same module identification
    expect(setProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'B2',
        module: 15,
      })
    );

    expect(save).toHaveBeenCalledWith(
      'guest',
      'B2',
      '15', // Module as string for new system
      5,
      40,
      6,
      false
    );
  });
});