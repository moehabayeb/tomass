// src/utils/ProgressStore.ts

export type LessonPhase = 'intro' | 'listening' | 'speaking' | 'complete';

export interface ModuleProgress {
  level: string;                 // e.g., "A1", "A2", "B1"
  module: number;                // e.g., 51
  phase: LessonPhase;            // current phase
  listeningIndex: number;        // 0-based
  speakingIndex: number;         // 0-based
  completed: boolean;            // module finished?
  totalListening: number;        // snapshot of content length at save time
  totalSpeaking: number;         // snapshot of content length at save time
  updatedAt: number;             // epoch ms
  v: number;                     // schema version
}

const STORE_KEY = 'll_progress_v1'; // bump if schema changes

type ProgressMap = Record<string, ModuleProgress>; // key = `${level}-${module}`

function readAll(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: ProgressMap) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(map));
  } catch (error) {
    // Phase 2.1: Handle QuotaExceededError by clearing old data and retrying
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      try {
        // Clear old/stale progress entries (keep only recent 20)
        const allEntries = Object.entries(map);
        const sortedByDate = allEntries.sort((a, b) => b[1].updatedAt - a[1].updatedAt);
        const recentEntries = sortedByDate.slice(0, 20);
        const reducedMap: ProgressMap = Object.fromEntries(recentEntries);

        // Clear storage and retry with reduced data
        localStorage.removeItem(STORE_KEY);
        localStorage.setItem(STORE_KEY, JSON.stringify(reducedMap));
      } catch (retryError) {
        // Phase 2.1: If retry also fails, continue silently - Apple Store compliance
        // Progress may be lost but app doesn't crash
      }
    }
    // For other errors, fail silently - Apple Store compliance
  }
}

export function keyFor(level: string | number, module: number) {
  return `${String(level)}-${module}`;
}

export function getProgress(level: string | number, module: number): ModuleProgress | null {
  const map = readAll();
  const k = keyFor(level, module);
  return map[k] ?? null;
}

export function setProgress(p: ModuleProgress) {
  const map = readAll();
  const k = keyFor(p.level, p.module);
  map[k] = { ...p, updatedAt: Date.now(), v: 1 };
  writeAll(map);
}

export function clearProgress(level: string | number, module: number) {
  const map = readAll();
  delete map[keyFor(level, module)];
  writeAll(map);
}

export function getAllProgress(): ModuleProgress[] {
  return Object.values(readAll());
}