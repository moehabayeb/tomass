/**
 * Module ID ranges for each proficiency level
 * Centralized constants to prevent hardcoding magic numbers
 */

export const MODULE_RANGES = {
  A1: { start: 1, end: 50 },
  A2: { start: 51, end: 100 },
  B1: { start: 101, end: 150 },
  B2: { start: 151, end: 200 },
  C1: { start: 201, end: 216 },
  C2: { start: 217, end: 250 }  // Future expansion
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
