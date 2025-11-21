// Enhanced Module unlocking and completion management with 90% accuracy requirement
// Integrates with Progress Tracker Agent for detailed progress analysis
// 🔧 FIX #26: Now uses centralized MODULE_RANGES constants

import { ProgressTrackerService } from '../../services/progressTrackerService';
import { MODULE_RANGES, getLevelForModule as getCentralizedLevel, type Level } from '@/constants/moduleRanges';

// Re-export centralized constants for backward compatibility
const LEVEL_RANGES = MODULE_RANGES;

// Wrapper function for backward compatibility - returns string instead of Level | null
function getLevelForModule(moduleId: number): string {
  const level = getCentralizedLevel(moduleId);
  return level || 'A1'; // Default fallback
}

// Get previous module ID considering level boundaries
function getPreviousModuleId(moduleId: number): number | null {
  // 🔧 FIX #26: Use centralized constants for level boundaries
  const levelStarts = Object.values(MODULE_RANGES).map(r => r.start);
  if (levelStarts.includes(moduleId)) {
    return null; // This is first module of its level
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
  // 🔧 FIX #26: Use centralized constants for level boundaries
  const levelStarts = Object.values(MODULE_RANGES).map(r => r.start);
  if (levelStarts.includes(moduleId)) {
    return true; // First modules of each level are always unlocked
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
      // Apple Store Compliance: Silent operation
    } else {
      // Apple Store Compliance: Silent operation
    }
  } catch (error) {
    // Apple Store Compliance: Silent operation
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
  const levels = levelId ? [levelId] : ['A1', 'A2', 'B1', 'B2', 'C1'];
  const statuses: ModuleUnlockStatus[] = [];

  levels.forEach(level => {
    const range = LEVEL_RANGES[level as keyof typeof LEVEL_RANGES];
    if (range) {
      for (let moduleId = range.start; moduleId <= range.end; moduleId++) {
        statuses.push(getModuleUnlockStatus(moduleId));
      }
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
  } else if (targetLevel === 'B1') {
    return { moduleId: 151, reason: 'Start B2 level' };
  } else if (targetLevel === 'B2') {
    return { moduleId: 201, reason: 'Start C1 level' };
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
        // Apple Store Compliance: Silent operation
      }
    }
  });
}