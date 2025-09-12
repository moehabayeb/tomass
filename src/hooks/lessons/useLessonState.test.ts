import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLessonState } from './useLessonState';

describe('useLessonState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useLessonState());

    expect(result.current.viewState).toBe('levels');
    expect(result.current.selectedLevel).toBe('');
    expect(result.current.selectedModule).toBe(0);
    expect(result.current.currentPhase).toBe('intro');
    expect(result.current.isTeacherReading).toBe(false);
    expect(result.current.readingComplete).toBe(false);
    expect(result.current.listeningIndex).toBe(0);
    expect(result.current.speakingIndex).toBe(0);
    expect(result.current.correctAnswers).toBe(0);
    expect(result.current.attempts).toBe(0);
    expect(result.current.showCelebration).toBe(false);
    expect(result.current.showConfetti).toBe(false);
    expect(result.current.isRecording).toBe(false);
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.feedback).toBe('');
    expect(result.current.feedbackType).toBe('info');
  });

  it('sets hydrated state on mount', async () => {
    const { result } = renderHook(() => useLessonState());

    expect(result.current.isHydrated).toBe(false);
    
    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('updates view state correctly', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setViewState('modules');
    });

    expect(result.current.viewState).toBe('modules');

    act(() => {
      result.current.setViewState('lesson');
    });

    expect(result.current.viewState).toBe('lesson');
  });

  it('updates selected level and module', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setSelectedLevel('A1');
    });

    expect(result.current.selectedLevel).toBe('A1');

    act(() => {
      result.current.setSelectedModule(5);
    });

    expect(result.current.selectedModule).toBe(5);
  });

  it('manages lesson phases correctly', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setCurrentPhase('listening');
    });

    expect(result.current.currentPhase).toBe('listening');

    act(() => {
      result.current.setCurrentPhase('speaking');
    });

    expect(result.current.currentPhase).toBe('speaking');

    act(() => {
      result.current.setCurrentPhase('completed');
    });

    expect(result.current.currentPhase).toBe('completed');
  });

  it('tracks progress indices', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setListeningIndex(3);
    });

    expect(result.current.listeningIndex).toBe(3);

    act(() => {
      result.current.setSpeakingIndex(7);
    });

    expect(result.current.speakingIndex).toBe(7);
    expect(result.current.speakingIndexRef.current).toBe(7);
  });

  it('manages teacher reading state', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setIsTeacherReading(true);
    });

    expect(result.current.isTeacherReading).toBe(true);

    act(() => {
      result.current.setReadingComplete(true);
    });

    expect(result.current.readingComplete).toBe(true);
  });

  it('tracks correct answers and attempts', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setCorrectAnswers(5);
    });

    expect(result.current.correctAnswers).toBe(5);

    act(() => {
      result.current.setAttempts(8);
    });

    expect(result.current.attempts).toBe(8);
  });

  it('manages recording and processing states', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setIsRecording(true);
    });

    expect(result.current.isRecording).toBe(true);

    act(() => {
      result.current.setIsProcessing(true);
    });

    expect(result.current.isProcessing).toBe(true);
  });

  it('manages feedback state', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setFeedback('Great job!');
    });

    expect(result.current.feedback).toBe('Great job!');

    act(() => {
      result.current.setFeedbackType('success');
    });

    expect(result.current.feedbackType).toBe('success');
  });

  it('manages celebration states', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setShowCelebration(true);
    });

    expect(result.current.showCelebration).toBe(true);

    act(() => {
      result.current.setShowConfetti(true);
    });

    expect(result.current.showConfetti).toBe(true);
  });

  it('tracks reading completion per item', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setHasBeenRead({ 'item-1': true, 'item-2': false });
    });

    expect(result.current.hasBeenRead).toEqual({ 'item-1': true, 'item-2': false });
  });

  it('resets lesson state correctly', () => {
    const { result } = renderHook(() => useLessonState());

    // Set some non-default values
    act(() => {
      result.current.setCurrentPhase('speaking');
      result.current.setIsTeacherReading(true);
      result.current.setReadingComplete(true);
      result.current.setListeningIndex(5);
      result.current.setSpeakingIndex(10);
      result.current.setCorrectAnswers(8);
      result.current.setAttempts(15);
      result.current.setIsRecording(true);
      result.current.setFeedback('Some feedback');
      result.current.setFeedbackType('success');
      result.current.setShowCelebration(true);
      result.current.setShowConfetti(true);
      result.current.setIsProcessing(true);
      result.current.setLastResponseTime(12345);
    });

    // Reset the state
    act(() => {
      result.current.resetLessonState();
    });

    // Verify all values are reset to defaults
    expect(result.current.currentPhase).toBe('intro');
    expect(result.current.isTeacherReading).toBe(false);
    expect(result.current.readingComplete).toBe(false);
    expect(result.current.listeningIndex).toBe(0);
    expect(result.current.speakingIndex).toBe(0);
    expect(result.current.correctAnswers).toBe(0);
    expect(result.current.attempts).toBe(0);
    expect(result.current.isRecording).toBe(false);
    expect(result.current.feedback).toBe('');
    expect(result.current.feedbackType).toBe('info');
    expect(result.current.showCelebration).toBe(false);
    expect(result.current.showConfetti).toBe(false);
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.lastResponseTime).toBe(0);
    expect(result.current.lessonCompletedRef.current).toBe(false);
    expect(result.current.speakingIndexRef.current).toBe(0);
  });

  it('manages module guard correctly', () => {
    const { result } = renderHook(() => useLessonState());

    // Set module guard
    act(() => {
      result.current.setModuleGuard(5);
    });

    expect(result.current.moduleGuardRef.current).toBe(5);
    expect(result.current.isCurrentModule(5)).toBe(true);
    expect(result.current.isCurrentModule(3)).toBe(false);

    // Clear module guard
    act(() => {
      result.current.clearModuleGuard();
    });

    expect(result.current.moduleGuardRef.current).toBe(null);
    expect(result.current.isCurrentModule(5)).toBe(false);
  });

  it('clears timeouts when resetting lesson state', () => {
    const { result } = renderHook(() => useLessonState());

    // Set a timeout
    act(() => {
      const timeoutId = setTimeout(() => {}, 1000);
      result.current.timeoutRef.current = timeoutId;
    });

    expect(result.current.timeoutRef.current).not.toBe(null);

    // Reset should clear the timeout
    act(() => {
      result.current.resetLessonState();
    });

    expect(result.current.timeoutRef.current).toBe(null);
  });

  it('updates speaking index ref when speaking index changes', () => {
    const { result } = renderHook(() => useLessonState());

    act(() => {
      result.current.setSpeakingIndex(15);
    });

    expect(result.current.speakingIndex).toBe(15);
    expect(result.current.speakingIndexRef.current).toBe(15);

    act(() => {
      result.current.setSpeakingIndex(20);
    });

    expect(result.current.speakingIndex).toBe(20);
    expect(result.current.speakingIndexRef.current).toBe(20);
  });

  it('maintains refs consistency', () => {
    const { result } = renderHook(() => useLessonState());

    // Check that refs are initialized
    expect(result.current.moduleGuardRef).toBeDefined();
    expect(result.current.timeoutRef).toBeDefined();
    expect(result.current.lessonCompletedRef).toBeDefined();
    expect(result.current.speakingIndexRef).toBeDefined();

    // Check initial values
    expect(result.current.moduleGuardRef.current).toBe(null);
    expect(result.current.timeoutRef.current).toBe(null);
    expect(result.current.lessonCompletedRef.current).toBe(false);
    expect(result.current.speakingIndexRef.current).toBe(0);
  });

  it('updates last response time', () => {
    const { result } = renderHook(() => useLessonState());

    const timestamp = Date.now();

    act(() => {
      result.current.setLastResponseTime(timestamp);
    });

    expect(result.current.lastResponseTime).toBe(timestamp);
  });

  it('provides all necessary state and actions', () => {
    const { result } = renderHook(() => useLessonState());

    // Check that all expected properties are available
    const {
      // State
      isHydrated,
      viewState,
      selectedLevel,
      selectedModule,
      currentPhase,
      isTeacherReading,
      readingComplete,
      hasBeenRead,
      listeningIndex,
      speakingIndex,
      showCelebration,
      correctAnswers,
      attempts,
      isRecording,
      feedback,
      feedbackType,
      showConfetti,
      isProcessing,
      lastResponseTime,
      
      // Refs
      moduleGuardRef,
      timeoutRef,
      lessonCompletedRef,
      speakingIndexRef,
      
      // Setters
      setViewState,
      setSelectedLevel,
      setSelectedModule,
      setCurrentPhase,
      setIsTeacherReading,
      setReadingComplete,
      setHasBeenRead,
      setListeningIndex,
      setSpeakingIndex,
      setShowCelebration,
      setCorrectAnswers,
      setAttempts,
      setIsRecording,
      setFeedback,
      setFeedbackType,
      setShowConfetti,
      setIsProcessing,
      setLastResponseTime,
      
      // Actions
      resetLessonState,
      setModuleGuard,
      clearModuleGuard,
      isCurrentModule
    } = result.current;

    // Verify all are defined
    expect(typeof isHydrated).toBe('boolean');
    expect(typeof viewState).toBe('string');
    expect(typeof selectedLevel).toBe('string');
    expect(typeof selectedModule).toBe('number');
    expect(typeof currentPhase).toBe('string');
    expect(typeof isTeacherReading).toBe('boolean');
    expect(typeof readingComplete).toBe('boolean');
    expect(typeof hasBeenRead).toBe('object');
    expect(typeof listeningIndex).toBe('number');
    expect(typeof speakingIndex).toBe('number');
    expect(typeof showCelebration).toBe('boolean');
    expect(typeof correctAnswers).toBe('number');
    expect(typeof attempts).toBe('number');
    expect(typeof isRecording).toBe('boolean');
    expect(typeof feedback).toBe('string');
    expect(typeof feedbackType).toBe('string');
    expect(typeof showConfetti).toBe('boolean');
    expect(typeof isProcessing).toBe('boolean');
    expect(typeof lastResponseTime).toBe('number');
    
    expect(moduleGuardRef).toBeDefined();
    expect(timeoutRef).toBeDefined();
    expect(lessonCompletedRef).toBeDefined();
    expect(speakingIndexRef).toBeDefined();
    
    expect(typeof setViewState).toBe('function');
    expect(typeof setSelectedLevel).toBe('function');
    expect(typeof setSelectedModule).toBe('function');
    expect(typeof setCurrentPhase).toBe('function');
    expect(typeof setIsTeacherReading).toBe('function');
    expect(typeof setReadingComplete).toBe('function');
    expect(typeof setHasBeenRead).toBe('function');
    expect(typeof setListeningIndex).toBe('function');
    expect(typeof setSpeakingIndex).toBe('function');
    expect(typeof setShowCelebration).toBe('function');
    expect(typeof setCorrectAnswers).toBe('function');
    expect(typeof setAttempts).toBe('function');
    expect(typeof setIsRecording).toBe('function');
    expect(typeof setFeedback).toBe('function');
    expect(typeof setFeedbackType).toBe('function');
    expect(typeof setShowConfetti).toBe('function');
    expect(typeof setIsProcessing).toBe('function');
    expect(typeof setLastResponseTime).toBe('function');
    
    expect(typeof resetLessonState).toBe('function');
    expect(typeof setModuleGuard).toBe('function');
    expect(typeof clearModuleGuard).toBe('function');
    expect(typeof isCurrentModule).toBe('function');
  });
});