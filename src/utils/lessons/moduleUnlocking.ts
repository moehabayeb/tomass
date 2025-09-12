// Enhanced Module unlocking and completion management with 90% accuracy requirement
// Integrates with Progress Tracker Agent for detailed progress analysis

import { ProgressTrackerService } from '../../services/progressTrackerService';

// Level definitions for proper module progression
const LEVEL_RANGES = {
  'A1': { start: 1, end: 50 },
  'A2': { start: 51, end: 100 },
  'B1': { start: 101, end: 140 }
};

// Get level for a given module ID
function getLevelForModule(moduleId: number): string {
  if (moduleId >= 1 && moduleId <= 50) return 'A1';
  if (moduleId >= 51 && moduleId <= 100) return 'A2';
  if (moduleId >= 101 && moduleId <= 140) return 'B1';
  return 'A1'; // Default fallback
}

// Get previous module ID considering level boundaries
function getPreviousModuleId(moduleId: number): number | null {
  if (moduleId === 1 || moduleId === 51 || moduleId === 101) {
    return null; // These are first modules of their levels
  }
  return moduleId - 1;
}

// Legacy function for backward compatibility
export function getCompletedModules(): string[] {
  try {
    const stored = localStorage.getItem('completedModules');
    const parsed = JSON.parse(stored || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// Enhanced module unlocking with accuracy requirements
export function isModuleUnlocked(moduleId: number, completedModules?: string[]): boolean {
  // Always allow access to first modules of each level
  if (moduleId === 1 || moduleId === 51 || moduleId === 101) {
    return true;
  }

  const progressTracker = ProgressTrackerService.getInstance();
  const levelId = getLevelForModule(moduleId);
  const previousModuleId = getPreviousModuleId(moduleId);
  
  if (!previousModuleId) {
    return true; // Shouldn't happen, but safe fallback
  }

  // Check if previous module meets accuracy requirement
  const previousLevelId = getLevelForModule(previousModuleId);
  const canUnlock = progressTracker.canUnlockNextModule(previousLevelId, previousModuleId);
  
  if (canUnlock) {
    return true;
  }

  // Fallback to legacy system for backward compatibility
  if (completedModules) {
    return completedModules.includes(`module-${previousModuleId}`);
  }

  return false;
}

// Enhanced module completion with accuracy tracking
export function markModuleCompleted(moduleId: number, accuracy?: number): void {
  try {
    const levelId = getLevelForModule(moduleId);
    const progressTracker = ProgressTrackerService.getInstance();
    
    // Get current accuracy from progress tracker if not provided
    const currentAccuracy = accuracy ?? progressTracker.getModuleAccuracy(levelId, moduleId);
    const config = progressTracker.getConfig();
    
    // Only mark as completed if accuracy meets threshold
    if (currentAccuracy >= config.accuracyThreshold) {
      // Update legacy system for compatibility
      const completed = getCompletedModules();
      const key = `module-${moduleId}`;
      if (!completed.includes(key)) {
        completed.push(key);
        localStorage.setItem('completedModules', JSON.stringify(completed));
      }

      // The Progress Tracker Service handles detailed progress tracking automatically
      console.log(`Module ${moduleId} completed with ${currentAccuracy.toFixed(1)}% accuracy`);
    } else {
      console.log(`Module ${moduleId} not completed: ${currentAccuracy.toFixed(1)}% accuracy (${config.accuracyThreshold}% required)`);
    }
  } catch (error) {
    console.warn('Failed to mark module as completed:', error);
  }
}

// New functions for enhanced module management

export interface ModuleUnlockStatus {
  moduleId: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  currentAccuracy: number;
  requiredAccuracy: number;
  canUnlockNext: boolean;
  questionsCompleted: number;
  totalQuestions: number;
  needsReview: boolean;
  weakAreas: string[];
  remainingQuestions: number;
  estimatedTimeToComplete: number; // in minutes
}

export function getModuleUnlockStatus(moduleId: number): ModuleUnlockStatus {
  const levelId = getLevelForModule(moduleId);
  const progressTracker = ProgressTrackerService.getInstance();
  const moduleProgress = progressTracker.getModuleProgress(levelId, moduleId);
  const config = progressTracker.getConfig();
  
  const currentAccuracy = progressTracker.getModuleAccuracy(levelId, moduleId);
  const isUnlocked = isModuleUnlocked(moduleId);
  const isCompleted = currentAccuracy >= config.accuracyThreshold;
  const canUnlockNext = isCompleted;
  
  const questionsCompleted = moduleProgress?.questionsCompleted || 0;
  const totalQuestions = moduleProgress?.totalQuestions || 40;
  const remainingQuestions = Math.max(0, totalQuestions - questionsCompleted);
  
  // Estimate time to complete based on average time per question
  const avgTimePerQuestion = moduleProgress?.averageTimePerQuestion || 30000; // 30 seconds default
  const estimatedTimeToComplete = Math.round((remainingQuestions * avgTimePerQuestion) / (1000 * 60)); // Convert to minutes

  return {
    moduleId,
    isUnlocked,
    isCompleted,
    currentAccuracy,
    requiredAccuracy: config.accuracyThreshold,
    canUnlockNext,
    questionsCompleted,
    totalQuestions,
    needsReview: (moduleProgress?.weakAreas.length || 0) > 0,
    weakAreas: moduleProgress?.weakAreas || [],
    remainingQuestions,
    estimatedTimeToComplete
  };
}

export function getAllModuleStatuses(levelId?: string): ModuleUnlockStatus[] {
  const levels = levelId ? [levelId] : ['A1', 'A2', 'B1'];
  const statuses: ModuleUnlockStatus[] = [];
  
  levels.forEach(level => {
    const range = LEVEL_RANGES[level as keyof typeof LEVEL_RANGES];
    for (let moduleId = range.start; moduleId <= range.end; moduleId++) {
      statuses.push(getModuleUnlockStatus(moduleId));
    }
  });
  
  return statuses;
}

export function getUnlockedModules(levelId?: string): number[] {
  const statuses = getAllModuleStatuses(levelId);
  return statuses.filter(status => status.isUnlocked).map(status => status.moduleId);
}

export function getCompletedModulesWithAccuracy(levelId?: string): Array<{ moduleId: number; accuracy: number; completedAt?: number }> {
  const statuses = getAllModuleStatuses(levelId);
  const progressTracker = ProgressTrackerService.getInstance();
  
  return statuses
    .filter(status => status.isCompleted)
    .map(status => ({
      moduleId: status.moduleId,
      accuracy: status.currentAccuracy,
      completedAt: progressTracker.getModuleProgress(getLevelForModule(status.moduleId), status.moduleId)?.completionDate
    }));
}

export function getNextRecommendedModule(currentLevel?: string): { moduleId: number; reason: string } | null {
  const progressTracker = ProgressTrackerService.getInstance();
  const profile = progressTracker.getUserProfile();
  
  // Get current level from profile if not provided
  const targetLevel = currentLevel || profile.currentLevel;
  const range = LEVEL_RANGES[targetLevel as keyof typeof LEVEL_RANGES];
  
  if (!range) return null;
  
  // Find first unlocked but incomplete module
  for (let moduleId = range.start; moduleId <= range.end; moduleId++) {
    const status = getModuleUnlockStatus(moduleId);
    
    if (!status.isUnlocked) {
      const previousModule = moduleId - 1;
      const previousStatus = getModuleUnlockStatus(previousModule);
      
      return {
        moduleId: previousModule,
        reason: `Complete Module ${previousModule} with ${previousStatus.requiredAccuracy}% accuracy to unlock Module ${moduleId}`
      };
    }
    
    if (status.isUnlocked && !status.isCompleted) {
      return {
        moduleId,
        reason: status.questionsCompleted === 0 ? 'Start this module' : 
                `Continue - ${status.questionsCompleted}/${status.totalQuestions} questions completed`
      };
    }
  }
  
  // All modules in level completed, suggest next level
  if (targetLevel === 'A1') {
    return { moduleId: 51, reason: 'Start A2 level' };
  } else if (targetLevel === 'A2') {
    return { moduleId: 101, reason: 'Start B1 level' };
  }
  
  return null; // All modules completed
}

// Migration function to sync legacy data with new system
export function migrateToEnhancedSystem(): void {
  const completedModules = getCompletedModules();
  const progressTracker = ProgressTrackerService.getInstance();
  
  completedModules.forEach(moduleKey => {
    const moduleId = parseInt(moduleKey.replace('module-', ''));
    if (!isNaN(moduleId)) {
      const levelId = getLevelForModule(moduleId);
      const progress = progressTracker.getModuleProgress(levelId, moduleId);
      
      // If no progress data exists, assume 100% accuracy for legacy completed modules
      if (!progress || progress.currentAccuracy === 0) {
        // This would typically involve creating fake progress data, but should be done carefully
        console.log(`Legacy module ${moduleId} needs migration to enhanced system`);
      }
    }
  });
}