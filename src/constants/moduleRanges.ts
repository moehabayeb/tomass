/**
 * Module ID ranges for each proficiency level
 * Centralized constants to prevent hardcoding magic numbers
 */

export const MODULE_RANGES = {
  A1: { start: 1, end: 50 },
  A2: { start: 51, end: 100 },
  B1: { start: 101, end: 150 },
  B2: { start: 151, end: 200 },
  C1: { start: 201, end: 250 },
  C2: { start: 251, end: 300 }
} as const;

export type Level = keyof typeof MODULE_RANGES;

/**
 * Get the level for a given module ID
 */
export function getLevelForModule(moduleId: number): Level | null {
  for (const [level, range] of Object.entries(MODULE_RANGES)) {
    if (moduleId >= range.start && moduleId <= range.end) {
      return level as Level;
    }
  }
  return null;
}

/**
 * Get the starting module ID for a level
 */
export function getStartingModule(level: Level): number {
  return MODULE_RANGES[level].start;
}

/**
 * Check if a module ID is valid
 */
export function isValidModuleId(moduleId: number): boolean {
  return moduleId >= MODULE_RANGES.A1.start && moduleId <= MODULE_RANGES.C2.end;
}

/**
 * Get all modules for a level as an array
 */
export function getModulesForLevel(level: Level): number[] {
  const range = MODULE_RANGES[level];
  return Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i);
}

/**
 * Resolve the effective placed start-module from possibly-missing/inconsistent storage.
 *
 * The placement flow stores `recommendedStartLevel` and (ideally) `recommendedStartModule`
 * in localStorage, but historically some completion paths only wrote the level — leaving
 * the module key missing (defaulting to '1') and locking the placed level's start module
 * for every level above A1. This helper derives the correct start module from the level,
 * so a missing or stale module key can never re-lock a placed user.
 *
 * Rules:
 * - Invalid/unknown level → treated as 'A1'.
 * - Missing/unparseable/out-of-range stored module → the level's start module.
 * - A stored module BELOW the placed level's start (legacy bug: '1' for A2) is corrected
 *   upward to the level start; a stored module at/above it is preserved (user advanced).
 */
export function resolvePlacedStartModule(level: string | null, storedModule: string | null): number {
  const levelKey = (level && level in MODULE_RANGES ? level : 'A1') as Level;
  const levelStart = MODULE_RANGES[levelKey].start;
  const parsed = storedModule ? parseInt(storedModule, 10) : NaN;
  if (!Number.isFinite(parsed) || !isValidModuleId(parsed)) return levelStart;
  return Math.max(parsed, levelStart);
}
