/**
 * Regression tests for the hardcoded-40 sweep.
 *
 * total_questions used to default to `|| 40` in every checkpoint function, so
 * modules whose real length isn't 40 (e.g. A1 module 14 has 39) got corrupted
 * completion math (isLastQuestion vs a fabricated total) and wrong resume
 * clamping. The hooks now use the REAL total and SKIP the write when the
 * total is unknown (module data not loaded yet) instead of lying.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';

const saveCheckpointMock = vi.fn().mockResolvedValue(undefined);

vi.mock('./useLessonProgress', () => ({
  useLessonProgress: () => ({
    saveCheckpoint: saveCheckpointMock,
    loadProgress: vi.fn().mockResolvedValue(null),
    currentProgress: null,
    canResume: false,
    isLoading: false,
    settledKey: null,
    isSyncing: false,
    isOnline: true,
    lastSyncAt: null,
    showResumeDialog: false,
    setShowResumeDialog: vi.fn(),
    resumeProgress: vi.fn(),
    startFromBeginning: vi.fn(),
    triggerSync: vi.fn(),
  }),
}));

vi.mock('./useAuthReady', () => ({
  useAuthReady: () => ({ user: { id: 'test-user' }, isAuthenticated: true }),
}));

import { useLessonCheckpoints } from './useLessonCheckpoints';

describe('useLessonCheckpoints — real totals, never fabricated 40', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes the module at the REAL last question (12-item module, index 11)', async () => {
    const { result } = renderHook(() => useLessonCheckpoints('A1', 14));

    await result.current.checkpointQuestionComplete({
      level: 'A1', moduleId: 14, questionIndex: 11, totalQuestions: 12,
    });

    expect(saveCheckpointMock).toHaveBeenCalledWith(expect.objectContaining({
      question_phase: 'COMPLETED',
      is_module_completed: true,
      total_questions: 12,   // was 40 → completion would never fire at index 11
      question_index: 11,
    }));
  });

  it('advances (not completes) when below the real total', async () => {
    const { result } = renderHook(() => useLessonCheckpoints('A1', 14));

    await result.current.checkpointQuestionComplete({
      level: 'A1', moduleId: 14, questionIndex: 5, totalQuestions: 39,
    });

    expect(saveCheckpointMock).toHaveBeenCalledWith(expect.objectContaining({
      question_phase: 'MCQ',
      is_module_completed: false,
      question_index: 6,
      total_questions: 39,
    }));
  });

  it('SKIPS the write when the total is unknown (0) — all checkpoint functions', async () => {
    const { result } = renderHook(() => useLessonCheckpoints('A2', 51));
    const opts = { level: 'A2', moduleId: 51, questionIndex: 3, totalQuestions: 0 };

    await result.current.checkpointMCQShown(opts);
    await result.current.checkpointMCQCorrect(opts);
    await result.current.checkpointSpeechStarted(opts);
    await result.current.checkpointQuestionComplete(opts);

    expect(saveCheckpointMock).not.toHaveBeenCalled();
  });

  it('SKIPS the write when the total is missing entirely', async () => {
    const { result } = renderHook(() => useLessonCheckpoints('A2', 51));

    await result.current.checkpointMCQShown({ level: 'A2', moduleId: 51, questionIndex: 3 });

    expect(saveCheckpointMock).not.toHaveBeenCalled();
  });
});
