/**
 * Regression tests for the revived offline queue.
 *
 * saveToServer used to swallow EVERY error behind an "emergency fix" catch, so:
 *  - the debounced save's catch (→ IndexedDB queue) was unreachable,
 *  - performSync always counted success and deleted queued checkpoints,
 *  - real cloud failures silently lost user progress.
 * These tests pin the corrected behavior: failures propagate, queue+retry are live.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    rpc: vi.fn(),
    from: vi.fn(),
  },
}));

vi.mock('@/utils/indexedDBStore', () => ({
  indexedDBStore: {
    addCheckpoint: vi.fn().mockResolvedValue(undefined),
    removeCheckpoint: vi.fn().mockResolvedValue(undefined),
    updateRetryCount: vi.fn().mockResolvedValue(undefined),
    getCheckpointsForRetry: vi.fn().mockResolvedValue([]),
    getAllCheckpoints: vi.fn().mockResolvedValue([]),
    getCheckpoint: vi.fn().mockResolvedValue(null),
    clearAll: vi.fn().mockResolvedValue(undefined),
  },
}));

import { LessonProgressService, type LessonCheckpoint } from './lessonProgressService';
import { supabase } from '@/integrations/supabase/client';
import { indexedDBStore } from '@/utils/indexedDBStore';

const mockedRpc = vi.mocked(supabase.rpc);
const mockedStore = vi.mocked(indexedDBStore);

const checkpoint: LessonCheckpoint = {
  user_id: 'user-1',
  level: 'A2',
  module_id: 51,
  question_index: 5,
  total_questions: 40,
  question_phase: 'MCQ',
  is_module_completed: false,
  timestamp: 1000,
};

function makeService() {
  // debounceMs 0 so the server save fires on the next timer tick
  return new LessonProgressService({ debounceMs: 0 });
}

describe('lessonProgressService — offline queue is live again', () => {
  let service: LessonProgressService;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    localStorage.clear();
    service = makeService();
  });

  afterEach(() => {
    service.cleanup();
    vi.useRealTimers();
  });

  it('queues to IndexedDB when the RPC returns an error object', async () => {
    mockedRpc.mockResolvedValue({ data: null, error: { code: '500', message: 'boom' } } as never);

    await service.saveCheckpoint(checkpoint);
    // flush ONLY the debounce (not the 5-min periodic sync interval)
    await vi.advanceTimersByTimeAsync(50);

    expect(mockedStore.addCheckpoint).toHaveBeenCalledTimes(1);
    expect(mockedStore.addCheckpoint).toHaveBeenCalledWith(expect.objectContaining({
      level: 'A2',
      module_id: 51,
    }));
  });

  it('queues to IndexedDB when the RPC rejects (network failure)', async () => {
    mockedRpc.mockRejectedValue(new Error('fetch failed') as never);

    await service.saveCheckpoint(checkpoint);
    await vi.advanceTimersByTimeAsync(50);

    expect(mockedStore.addCheckpoint).toHaveBeenCalledTimes(1);
  });

  it('does NOT queue when the RPC succeeds', async () => {
    mockedRpc.mockResolvedValue({ data: { updated: true }, error: null } as never);

    await service.saveCheckpoint(checkpoint);
    await vi.advanceTimersByTimeAsync(50);

    expect(mockedRpc).toHaveBeenCalledTimes(1);
    expect(mockedStore.addCheckpoint).not.toHaveBeenCalled();
  });

  it('syncOfflineQueue: failed save counts a retry and does NOT delete the checkpoint', async () => {
    mockedStore.getCheckpointsForRetry.mockResolvedValue([{ ...checkpoint, retry_count: 0 }]);
    mockedRpc.mockResolvedValue({ data: null, error: { code: '500', message: 'boom' } } as never);

    const result = await service.syncOfflineQueue();

    expect(mockedStore.updateRetryCount).toHaveBeenCalledWith('A2', 51, 1);
    expect(mockedStore.removeCheckpoint).not.toHaveBeenCalled();
    expect(result.synced).toBe(0);
  });

  it('syncOfflineQueue: successful save removes the checkpoint and counts synced', async () => {
    mockedStore.getCheckpointsForRetry.mockResolvedValue([{ ...checkpoint, retry_count: 2 }]);
    mockedRpc.mockResolvedValue({ data: { updated: true }, error: null } as never);

    const result = await service.syncOfflineQueue();

    expect(mockedStore.removeCheckpoint).toHaveBeenCalledWith('A2', 51);
    expect(mockedStore.updateRetryCount).not.toHaveBeenCalled();
    expect(result.synced).toBe(1);
    expect(result.failed).toBe(0);
  });

  it('syncOfflineQueue: max retries parks the checkpoint (failed++, still not deleted)', async () => {
    mockedStore.getCheckpointsForRetry.mockResolvedValue([{ ...checkpoint, retry_count: 4 }]);
    mockedRpc.mockResolvedValue({ data: null, error: { code: '500', message: 'boom' } } as never);

    const result = await service.syncOfflineQueue();

    expect(result.failed).toBe(1);
    expect(result.errors[0]).toMatch(/parked, not deleted/);
    expect(mockedStore.removeCheckpoint).not.toHaveBeenCalled();
    expect(mockedStore.updateRetryCount).toHaveBeenCalledWith('A2', 51, 5);
  });
});
