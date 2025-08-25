// Level-specific resume logic
import { Level } from './levelPlacement';
import { getModuleState, resumeLastPointer, Pointer } from './progress';

export interface LevelResume {
  level: Level;
  moduleId: number;
  questionIndex: number;
  hasProgress: boolean;
}

// Get resume position for a specific level
export function getLevelResume(userId: string, level: Level): LevelResume {
  const levelModules = getLevelModules(level);
  
  // Find the most recent incomplete module in this level
  let latestModule: { moduleId: number; questionIndex: number; updatedAt: number } | null = null;
  
  for (const moduleId of levelModules) {
    const state = getModuleState(userId, level, String(moduleId));
    if (state && !state.completed) {
      if (!latestModule || state.updatedAt > latestModule.updatedAt) {
        latestModule = {
          moduleId,
          questionIndex: state.pointer.questionIndex,
          updatedAt: state.updatedAt
        };
      }
    }
  }
  
  if (latestModule) {
    console.log(`🔄 Resume ${level}: Module ${latestModule.moduleId}, Question ${latestModule.questionIndex + 1}`);
    return {
      level,
      moduleId: latestModule.moduleId,
      questionIndex: latestModule.questionIndex,
      hasProgress: true
    };
  }
  
  // No progress in this level - start at first module
  const firstModule = levelModules[0];
  console.log(`🆕 Starting ${level}: Module ${firstModule}, Question 1`);
  return {
    level,
    moduleId: firstModule,
    questionIndex: 0,
    hasProgress: false
  };
}

// Get all modules for a level
export function getLevelModules(level: Level): number[] {
  switch (level) {
    case 'A1': return Array.from({ length: 50 }, (_, i) => i + 1);    // Modules 1-50
    case 'A2': return Array.from({ length: 50 }, (_, i) => i + 51);   // Modules 51-100
    case 'B1': return Array.from({ length: 40 }, (_, i) => i + 101);  // Modules 101-140
    default: return [1];
  }
}

// Check if user has completed any modules in a level
export function hasCompletedModulesInLevel(userId: string, level: Level): boolean {
  const levelModules = getLevelModules(level);
  
  for (const moduleId of levelModules) {
    const state = getModuleState(userId, level, String(moduleId));
    if (state && state.completed) {
      return true;
    }
  }
  
  return false;
}

// Get the most advanced level with progress
export function getHighestLevelWithProgress(userId: string): Level | null {
  const levels: Level[] = ['B1', 'A2', 'A1']; // Check from highest to lowest
  
  for (const level of levels) {
    if (hasCompletedModulesInLevel(userId, level)) {
      return level;
    }
  }
  
  return null;
}

// Routing logic after placement
export function getPostTestRoute(placedLevel: Level, userId: string = 'guest'): {
  level: Level;
  moduleId: number;
  questionIndex: number;
  reasoning: string;
} {
  // Check if user has existing higher progress
  const highestLevel = getHighestLevelWithProgress(userId);
  
  let targetLevel = placedLevel;
  let reasoning = `Placed at ${placedLevel}`;
  
  // Non-regression: don't go below existing progress
  if (highestLevel) {
    const levelOrder = { A1: 1, A2: 2, B1: 3 };
    if (levelOrder[highestLevel] > levelOrder[placedLevel]) {
      targetLevel = highestLevel;
      reasoning = `Kept ${highestLevel} (higher than placed ${placedLevel})`;
      console.log(`⬆️ ${reasoning}`);
    }
  }
  
  // Get resume position for target level
  const resume = getLevelResume(userId, targetLevel);
  
  return {
    level: targetLevel,
    moduleId: resume.moduleId,
    questionIndex: resume.questionIndex,
    reasoning: `${reasoning}, ${resume.hasProgress ? 'resumed' : 'starting fresh'}`
  };
}