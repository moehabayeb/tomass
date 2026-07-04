/**
 * Regression tests for the resume race (settledKey).
 *
 * LessonsApp's restore effect must be able to tell "checkpoint load still in
 * flight" apart from "load finished, no progress found". Before settledKey the
 * effect ran on first render, saw currentProgress === null, took the fresh-start
 * branch and set restoredOnceRef — the real saved position arriving from the
 * async load moments later was silently ignored ("it forgot where I was").
 *
 * settledKey must be set to "<level>-<moduleId>" when loadProgress RESOLVES and
 * when it REJECTS — never left null after a completed attempt.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@/services/lessonProgressService', () => ({
  lessonProgressService: {
    loadProgress: vi.fn(),
    saveCheckpoint: vi.fn(),
    mergeProgressOnLogin: vi.fn(),
    syncOfflineQueue: vi.fn(),
    clearAllProgress: vi.fn(),
    getPendingCheckpointsCount: vi.fn().mockResolvedValue(0),
  },
}));

vi.mock('./useAuthReady', () => ({
  useAuthReady: () => ({ user: { id: 'test-user' }, isAuthenticated: true }),
}));

vi.mock('./useNetworkStatus', () => ({
  useSyncStatus: () => ({
    isSyncing: false,
    isOnline: true,
    lastSyncAt: null,
    syncError: null,
    startSync: vi.fn(),
    completeSync: vi.fn(),
  }),
}));

import { useLessonProgress } from './useLessonProgress';
import { lessonProgressService } from '@/services/lessonProgressService';

const mockedLoad = vi.mocked(lessonProgressService.loadProgress);

describe('useLessonProgress — settledKey (resume race guard)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with settledKey null (load in flight)', () => {
    // Never-resolving load: settledKey must stay null
    mockedLoad.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useLessonProgress('A1', 1));
    expect(result.current.settledKey).toBeNull();
  });

  it('settles to "<level>-<moduleId>" when load resolves WITH progress', async () => {
    mockedLoad.mockResolvedValue({
      level: 'A2',
      module_id: 51,
      question_index: 7,
      total_questions: 40,
      question_phase: 'MCQ',
      is_module_completed: false,
      timestamp: 123,
    });

    const { result } = renderHook(() => useLessonProgress('A2', 51));

    await waitFor(() => expect(result.current.settledKey).toBe('A2-51'));
    expect(result.current.currentProgress?.question_index).toBe(7);
    expect(result.current.hasProgress).toBe(true);
  });

  it('settles even when load resolves with NO progress (fresh module)', async () => {
    mockedLoad.mockResolvedValue(null);

    const { result } = renderHook(() => useLessonProgress('B1', 101));

    await waitFor(() => expect(result.current.settledKey).toBe('B1-101'));
    expect(result.current.currentProgress).toBeNull();
    expect(result.current.hasProgress).toBe(false);
  });

  it('settles even when load REJECTS (offline / RPC failure)', async () => {
    mockedLoad.mockRejectedValue(new Error('network down'));

    const { result } = renderHook(() => useLessonProgress('C2', 251));

    await waitFor(() => expect(result.current.settledKey).toBe('C2-251'));
    expect(result.current.currentProgress).toBeNull();
  });
});
