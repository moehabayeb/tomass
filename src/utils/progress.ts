// Progress tracking system for exact resume functionality

export type Pointer = { levelId: string; moduleId: string; questionIndex: number };
export type ModuleState = { 
  total: number; 
  correct: number; 
  pointer: Pointer; 
  completed: boolean; 
  updatedAt: number 
};

const KEY = (userId: string) => `speakflow:v2:${userId || "guest"}`;

export function loadAll(userId: string): Record<string, ModuleState> { 
  try { 
    const data = localStorage.getItem(KEY(userId));
    return data ? JSON.parse(data) : {};
  }
  catch { 
    return {}; 
  }
}

export function save(
  userId: string, 
  levelId: string, 
  moduleId: string, 
  questionIndex: number, 
  total: number, 
  correct: number, 
  completed: boolean
) {
  const all = loadAll(userId);
  const key = `${levelId}:${moduleId}`;
  
  all[key] = {
    total, 
    correct, 
    completed, 
    updatedAt: Date.now(),
    pointer: { levelId, moduleId, questionIndex }
  };
  
  try {
    localStorage.setItem(KEY(userId), JSON.stringify(all));
  } catch (error) {
    // Apple Store Compliance: Silent fail - Safari Private Mode support
  }
}

export function getModuleState(userId: string, levelId: string, moduleId: string): ModuleState | null {
  const all = loadAll(userId);
  const key = `${levelId}:${moduleId}`;
  return all[key] || null;
}

export function resumeLastPointer(userId: string): Pointer | null {
  const all = loadAll(userId);
  
  // find the most recent (by updatedAt) incomplete module
  const incompleteModules = Object.values(all as Record<string, ModuleState>)
    .filter(state => !state.completed)
    .sort((a, b) => b.updatedAt - a.updatedAt);
  
  if (incompleteModules.length > 0) {
    const lastModule = incompleteModules[0];
    return lastModule.pointer;
  }
  
  return null;
}

export function clearProgress(userId: string, levelId?: string, moduleId?: string) {
  if (!levelId || !moduleId) {
    // Clear all progress
    try {
      localStorage.removeItem(KEY(userId));
    } catch (error) {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
    }
    return;
  }
  
  // Clear specific module
  const all = loadAll(userId);
  const key = `${levelId}:${moduleId}`;
  delete all[key];
  
  try {
    localStorage.setItem(KEY(userId), JSON.stringify(all));
  } catch (error) {
    // Apple Store Compliance: Silent fail - Safari Private Mode support
  }
}

export function getAllCompletedModules(userId: string): string[] {
  const all = loadAll(userId);
  return Object.entries(all)
    .filter(([_, state]) => state.completed)
    .map(([key, _]) => key);
}

export function getProgressSummary(userId: string): {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  lastActiveModule?: string;
} {
  const all = loadAll(userId);
  const states = Object.values(all as Record<string, ModuleState>);
  
  const completed = states.filter(s => s.completed);
  const inProgress = states.filter(s => !s.completed);
  
  const lastActive = inProgress
    .sort((a, b) => b.updatedAt - a.updatedAt)[0];
  
  return {
    totalModules: states.length,
    completedModules: completed.length,
    inProgressModules: inProgress.length,
    lastActiveModule: lastActive ? `${lastActive.pointer.levelId}:${lastActive.pointer.moduleId}` : undefined
  };
}