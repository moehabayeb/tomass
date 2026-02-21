/**
 * Storage Migration Service
 *
 * Handles migration of legacy localStorage keys to the new unified system.
 * This ensures backwards compatibility while moving to a cleaner architecture.
 *
 * CRITICAL FOR PRODUCTION:
 * - Never lose user data during migration
 * - Keep local backup until cloud sync is verified
 * - Log all migrations for debugging
 */

import {
  STORAGE_KEYS,
  LEGACY_PLACEMENT_KEYS,
  getProgressKey,
  getLegacyProgressKey
} from '@/constants/storageKeys';
import { logger } from '@/lib/logger';

export interface PlacementTestData {
  level?: string;
  score?: number;
  scores?: Record<string, number>;
  completedAt?: string;
  transcript?: string;
  feedback?: string;
  [key: string]: any;
}

export interface ModuleProgress {
  total: number;
  correct: number;
  completed: boolean;
  pointer: number;
  updatedAt: string;
}

export interface ProgressData {
  [moduleKey: string]: ModuleProgress;
}

class StorageMigrationServiceClass {
  private migrationLog: string[] = [];

  /**
   * Migrate all legacy placement test keys to the unified key
   * Returns the placement data if found, null otherwise
   */
  migratePlacementTest(): PlacementTestData | null {
    logger.log('[Migration] Checking for legacy placement test keys...');

    for (const key of LEGACY_PLACEMENT_KEYS) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          logger.log(`[Migration] Found placement data in legacy key: ${key}`);

          // Parse the data
          let parsed: PlacementTestData;
          try {
            parsed = JSON.parse(data);
          } catch {
            // If not JSON, treat as string level
            parsed = { level: data };
          }

          // Save to new unified key
          localStorage.setItem(STORAGE_KEYS.PLACEMENT_TEST, JSON.stringify(parsed));
          this.migrationLog.push(`Migrated placement test from ${key}`);

          // Clean up ALL legacy keys (not just this one)
          LEGACY_PLACEMENT_KEYS.forEach(legacyKey => {
            if (localStorage.getItem(legacyKey)) {
              localStorage.removeItem(legacyKey);
              logger.log(`[Migration] Removed legacy key: ${legacyKey}`);
            }
          });

          logger.log('[Migration] Placement test migrated successfully');
          return parsed;
        }
      } catch (err) {
        logger.error(`[Migration] Error processing key ${key}:`, err);
      }
    }

    // Also check the new unified key
    const unifiedData = localStorage.getItem(STORAGE_KEYS.PLACEMENT_TEST);
    if (unifiedData) {
      try {
        return JSON.parse(unifiedData);
      } catch {
        return { level: unifiedData };
      }
    }

    logger.log('[Migration] No placement test data found');
    return null;
  }

  /**
   * Migrate guest progress to user-specific progress
   * Called when a guest user signs in
   */
  migrateGuestProgress(userId: string): ProgressData | null {
    logger.log(`[Migration] Migrating guest progress for user: ${userId}`);

    const guestKey = getLegacyProgressKey(null); // speakflow:v2:guest
    const legacyUserKey = getLegacyProgressKey(userId); // speakflow:v2:{userId}
    const newUserKey = getProgressKey(userId); // tomashoca:progress:{userId}

    let migratedData: ProgressData | null = null;

    try {
      // Check for guest data first
      const guestData = localStorage.getItem(guestKey);
      if (guestData) {
        logger.log('[Migration] Found guest progress data');
        migratedData = JSON.parse(guestData);

        // Check if user already has data (from previous login)
        const existingUserData = localStorage.getItem(newUserKey) ||
                                 localStorage.getItem(legacyUserKey);

        if (existingUserData) {
          // Merge: keep higher progress for each module
          const existing = JSON.parse(existingUserData);
          migratedData = this.mergeProgress(existing, migratedData!);
          logger.log('[Migration] Merged guest progress with existing user progress');
        }

        // Save to new unified key
        localStorage.setItem(newUserKey, JSON.stringify(migratedData));

        // Remove guest key
        localStorage.removeItem(guestKey);
        this.migrationLog.push(`Migrated guest progress to user ${userId}`);

        logger.log('[Migration] Guest progress migrated successfully');
      }

      // Also migrate from legacy user key to new key if exists
      const legacyData = localStorage.getItem(legacyUserKey);
      if (legacyData && !localStorage.getItem(newUserKey)) {
        localStorage.setItem(newUserKey, legacyData);
        localStorage.removeItem(legacyUserKey);
        this.migrationLog.push(`Migrated legacy user progress to new key`);
        logger.log('[Migration] Legacy user progress migrated to new key');

        if (!migratedData) {
          migratedData = JSON.parse(legacyData);
        }
      }

    } catch (err) {
      logger.error('[Migration] Error migrating guest progress:', err);
    }

    return migratedData;
  }

  /**
   * Merge two progress objects, keeping the best result for each module
   */
  private mergeProgress(existing: ProgressData, incoming: ProgressData): ProgressData {
    const merged = { ...existing };

    for (const [key, value] of Object.entries(incoming)) {
      if (!merged[key]) {
        // Module doesn't exist in existing, add it
        merged[key] = value;
      } else {
        // Module exists, keep the one with more progress
        const existingProgress = merged[key];
        if (value.completed && !existingProgress.completed) {
          merged[key] = value;
        } else if (value.pointer > existingProgress.pointer) {
          merged[key] = value;
        } else if (value.correct > existingProgress.correct) {
          merged[key] = value;
        }
        // Update timestamp to most recent
        merged[key].updatedAt = new Date().toISOString();
      }
    }

    return merged;
  }

  /**
   * Get current progress for a user (checks both legacy and new keys)
   */
  getProgress(userId: string | null): ProgressData | null {
    const newKey = getProgressKey(userId);
    const legacyKey = getLegacyProgressKey(userId);

    // Check new key first
    let data = localStorage.getItem(newKey);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }

    // Fall back to legacy key
    data = localStorage.getItem(legacyKey);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }

    return null;
  }

  /**
   * Save progress (to new unified key)
   */
  saveProgress(userId: string | null, progress: ProgressData): void {
    const key = getProgressKey(userId);
    localStorage.setItem(key, JSON.stringify(progress));
  }

  /**
   * Full migration: run all migrations for a user
   */
  runFullMigration(userId: string | null): {
    placementTest: PlacementTestData | null;
    progress: ProgressData | null;
  } {
    logger.log('[Migration] Running full migration...');
    this.migrationLog = [];

    const placementTest = this.migratePlacementTest();
    const progress = userId ? this.migrateGuestProgress(userId) : this.getProgress(null);

    logger.log('[Migration] Full migration complete. Log:', this.migrationLog);

    return { placementTest, progress };
  }

  /**
   * Get migration log for debugging
   */
  getMigrationLog(): string[] {
    return [...this.migrationLog];
  }

  /**
   * Clear all user data (for logout)
   */
  clearUserData(userId: string): void {
    const newKey = getProgressKey(userId);
    const legacyKey = getLegacyProgressKey(userId);

    localStorage.removeItem(newKey);
    localStorage.removeItem(legacyKey);

    logger.log(`[Migration] Cleared data for user: ${userId}`);
  }
}

// Export singleton instance
export const StorageMigrationService = new StorageMigrationServiceClass();
