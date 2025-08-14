// Module order per level
const ORDER_A1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
const ORDER_A2 = [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
const ORDER_B1 = [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129];

function getOrderForLevel(level: 'A1'|'A2'|'B1'): number[] {
  if (level === 'A1') return ORDER_A1;
  if (level === 'A2') return ORDER_A2;
  return ORDER_B1;
}

export function getNextModuleId(level: 'A1'|'A2'|'B1', current: number): number | null {
  const order = getOrderForLevel(level);
  const idx = order.indexOf(current);
  if (idx === -1) return null;
  return idx < order.length - 1 ? order[idx + 1] : null;
}

// Module completion progress
type ModuleProgress = {
  lastIndex: number;
  completed: boolean;
  completedAt?: number;
};

type UserProgress = {
  [level: string]: {
    [moduleId: number]: ModuleProgress
  },
  lastVisited?: { level: string; moduleId: number };
};

export function saveModuleProgress(level: string, moduleId: number, patch: Partial<ModuleProgress>) {
  const key = `progress-v2`;
  const raw = localStorage.getItem(key);
  const data: UserProgress = raw ? JSON.parse(raw) : {};
  const levelBag = data[level] ?? {};
  const cur: ModuleProgress = levelBag[moduleId] ?? { lastIndex: 0, completed: false };
  levelBag[moduleId] = { ...cur, ...patch };
  data[level] = levelBag;
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadModuleProgress(level: string, moduleId: number): ModuleProgress | null {
  const raw = localStorage.getItem(`progress-v2`);
  if (!raw) return null;
  const data: UserProgress = JSON.parse(raw);
  return data[level]?.[moduleId] ?? null;
}