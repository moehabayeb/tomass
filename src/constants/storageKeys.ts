/**
 * Unified Storage Keys for Tomas Hoca
 *
 * CRITICAL: All localStorage keys should be defined here to prevent
 * the chaos of multiple keys for the same data (which caused the
 * placement test bug where 4 different keys existed).
 */

export const STORAGE_KEYS = {
  // Placement test result - unified key
  PLACEMENT_TEST: 'tomashoca:placement_test',

  // Lesson progress prefix (append userId)
  LESSON_PROGRESS_PREFIX: 'tomashoca:progress:',

  // User profile cache
  USER_PROFILE: 'tomashoca:user_profile',

  // Sync status tracking
  SYNC_STATUS: 'tomashoca:sync_status',

  // Auth state
  AUTH_STATE: 'tomashoca:auth_state',
} as const;

/**
 * Legacy keys that need to be migrated
 * These were used inconsistently across the app
 */
export const LEGACY_PLACEMENT_KEYS = [
  'userPlacement',
  'placement',
  'guestPlacementTest',
  'lastTestResult'
] as const;

/**
 * Legacy progress keys
 */
export const LEGACY_PROGRESS_KEYS = [
  'speakflow:v2:guest',
  'speakflow:v2:'  // prefix for user-specific keys
] as const;

/**
 * Helper to get user-specific progress key
 */
export function getProgressKey(userId: string | null): string {
  return userId
    ? `${STORAGE_KEYS.LESSON_PROGRESS_PREFIX}${userId}`
    : `${STORAGE_KEYS.LESSON_PROGRESS_PREFIX}guest`;
}

/**
 * Helper to get legacy progress key for migration
 */
export function getLegacyProgressKey(userId: string | null): string {
  return userId
    ? `speakflow:v2:${userId}`
    : 'speakflow:v2:guest';
}
