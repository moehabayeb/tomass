import { describe, it, expect } from 'vitest';
import {
  getLevelForModule,
  isValidModuleId,
  getStartingModule,
  getModulesForLevel,
  MODULE_RANGES,
} from './moduleRanges';

// Regression guard for the C1/C2 boundary unification (findings D1/D2).
// Previously C1=201–216 and C2=217–250, which left modules 251–300 outside
// every range (getLevelForModule → null → defaulted to 'A1') and made the
// unlock system silently fall back to the legacy completedModules array.
describe('moduleRanges — unified C1/C2 boundary', () => {
  it('C1 spans 201–250 and C2 spans 251–300', () => {
    expect(MODULE_RANGES.C1).toEqual({ start: 201, end: 250 });
    expect(MODULE_RANGES.C2).toEqual({ start: 251, end: 300 });
  });

  it('classifies the boundary modules correctly', () => {
    expect(getLevelForModule(216)).toBe('C1');
    expect(getLevelForModule(217)).toBe('C1'); // was wrongly 'C2'
    expect(getLevelForModule(250)).toBe('C1');
    expect(getLevelForModule(251)).toBe('C2'); // was null → 'A1' default
    expect(getLevelForModule(300)).toBe('C2');
  });

  it('treats the whole 1–300 span as valid and rejects beyond it', () => {
    expect(isValidModuleId(251)).toBe(true);
    expect(isValidModuleId(300)).toBe(true);
    expect(isValidModuleId(301)).toBe(false);
    expect(isValidModuleId(0)).toBe(false);
  });

  it('starts each level at the right module (C2 → 251, not 217)', () => {
    expect(getStartingModule('C1')).toBe(201);
    expect(getStartingModule('C2')).toBe(251);
  });

  it('enumerates 50 modules per C-level', () => {
    expect(getModulesForLevel('C1')).toHaveLength(50);
    expect(getModulesForLevel('C2')).toHaveLength(50);
    expect(getModulesForLevel('C2')[0]).toBe(251);
    expect(getModulesForLevel('C2').at(-1)).toBe(300);
  });
});
