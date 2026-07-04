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

/**
 * The global test setup (src/test/setup.ts) replaces localStorage with no-op
 * vi.fn() stubs. The fidelity/round-trip tests need a REAL store, so install a
 * functional in-memory localStorage for them.
 */
function installFunctionalLocalStorage() {
  const store = new Map<string, string>();
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => { store.set(k, String(v)); },
      removeItem: (k: string) => { store.delete(k); },
      clear: () => { store.clear(); },
      key: (i: number) => Array.from(store.keys())[i] ?? null,
      get length() { return store.size; },
    },
  });
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

describe('lessonProgressService — local phase fidelity (round-trip)', () => {
  let service: LessonProgressService;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    installFunctionalLocalStorage();
    service = makeService();
  });

  afterEach(() => {
    service.cleanup();
    vi.useRealTimers();
  });

  it('round-trips the granular phase and MCQ answer through localStorage', async () => {
    // Guest save (no user_id) → local layer only
    await service.saveCheckpoint({
      ...checkpoint,
      user_id: undefined,
      question_phase: 'SPEAK_READY',
      mcq_selected_choice: 'B',
      mcq_is_correct: true,
    });

    const restored = await service.loadProgress('', 'A2', 51);

    expect(restored).not.toBeNull();
    expect(restored!.question_phase).toBe('SPEAK_READY'); // was always 'MCQ' before
    expect(restored!.mcq_selected_choice).toBe('B');      // was dropped before
    expect(restored!.mcq_is_correct).toBe(true);
    expect(restored!.question_index).toBe(5);
  });

  it('legacy records without the fidelity fields still load via the old mapping', async () => {
    // Hand-written pre-fix record: no questionPhase/mcq* fields
    localStorage.setItem('ll_progress_v1', JSON.stringify({
      'A1-3': {
        level: 'A1', module: 3, phase: 'speaking', listeningIndex: 0,
        speakingIndex: 12, completed: false, totalListening: 0,
        totalSpeaking: 40, updatedAt: 1000, v: 1,
      },
      'A1-2': {
        level: 'A1', module: 2, phase: 'complete', listeningIndex: 0,
        speakingIndex: 39, completed: true, totalListening: 0,
        totalSpeaking: 40, updatedAt: 1000, v: 1,
      },
    }));

    const inProgress = await service.loadProgress('', 'A1', 3);
    expect(inProgress!.question_phase).toBe('MCQ'); // conservative legacy fallback
    expect(inProgress!.question_index).toBe(12);

    const completed = await service.loadProgress('', 'A1', 2);
    expect(completed!.question_phase).toBe('COMPLETED');
    expect(completed!.is_module_completed).toBe(true);
  });
});

describe('lessonProgressService — login sync safety', () => {
  let service: LessonProgressService;
  const mockedFrom = vi.mocked(supabase.from);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    installFunctionalLocalStorage();
    service = makeService();
  });

  afterEach(() => {
    service.cleanup();
    vi.useRealTimers();
  });

  it('loadProgressFromCloud does NOT overwrite strictly-newer local progress', async () => {
    vi.setSystemTime(100_000);

    // Local (guest) progress at Q10, updatedAt = 100_000
    await service.saveCheckpoint({
      ...checkpoint, user_id: undefined, question_index: 10, timestamp: undefined as unknown as number,
    });

    // Cloud has an OLDER row at Q3
    mockedFrom.mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({
          data: [{
            level: 'A2', module_id: 51, question_index: 3, total_questions: 40,
            question_phase: 'MCQ', mcq_selected_choice: null, mcq_is_correct: false,
            is_module_completed: false, device_id: null,
            updated_at: new Date(50_000).toISOString(),
          }],
          error: null,
        }),
      }),
    } as never);

    await service.loadProgressFromCloud('user-1');

    const local = await service.loadProgress('', 'A2', 51);
    expect(local!.question_index).toBe(10); // guest position preserved
  });

  it('loadProgressFromCloud still applies newer cloud rows and completions', async () => {
    vi.setSystemTime(100_000);
    await service.saveCheckpoint({
      ...checkpoint, user_id: undefined, question_index: 10, timestamp: undefined as unknown as number,
    });

    // Cloud row is older but a COMPLETION → must land (gates module unlock)
    mockedFrom.mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({
          data: [{
            level: 'A2', module_id: 51, question_index: 39, total_questions: 40,
            question_phase: 'COMPLETED', mcq_selected_choice: null, mcq_is_correct: false,
            is_module_completed: true, device_id: null,
            updated_at: new Date(50_000).toISOString(),
          }],
          error: null,
        }),
      }),
    } as never);

    await service.loadProgressFromCloud('user-1');

    const local = await service.loadProgress('', 'A2', 51);
    expect(local!.is_module_completed).toBe(true);
  });

  it('mergeProgressOnLogin skips empty placement seeds (no junk uploads)', async () => {
    // Empty seed: index 0, total 0, not completed (what handleTestComplete writes)
    localStorage.setItem('ll_progress_v1', JSON.stringify({
      'A2-51': {
        level: 'A2', module: 51, phase: 'intro', listeningIndex: 0,
        speakingIndex: 0, completed: false, totalListening: 0,
        totalSpeaking: 0, updatedAt: 1000, v: 1,
      },
    }));

    const result = await service.mergeProgressOnLogin('user-1');

    expect(result.synced).toBe(0);
    expect(mockedRpc).not.toHaveBeenCalled();   // nothing uploaded
    expect(mockedFrom).not.toHaveBeenCalled();  // server not even queried
  });
});
