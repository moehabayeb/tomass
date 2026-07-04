import { describe, it, expect } from 'vitest';
import {
  getLevelForModule,
  isValidModuleId,
  getStartingModule,
  getModulesForLevel,
  resolvePlacedStartModule,
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

// Regression guard for the placed-level lock bug: handleTestComplete historically
// wrote only recommendedStartLevel (never recommendedStartModule), so the module
// gate defaulted to '1' and every level above A1 rendered locked after placement.
// resolvePlacedStartModule must derive the start module from the LEVEL whenever
// the stored module is missing, stale (below the level start), or garbage.
describe('resolvePlacedStartModule — placed-level unlock derivation', () => {
  it('derives the level start when the module key is missing — every level', () => {
    expect(resolvePlacedStartModule('A1', null)).toBe(1);
    expect(resolvePlacedStartModule('A2', null)).toBe(51);
    expect(resolvePlacedStartModule('B1', null)).toBe(101);
    expect(resolvePlacedStartModule('B2', null)).toBe(151);
    expect(resolvePlacedStartModule('C1', null)).toBe(201);
    expect(resolvePlacedStartModule('C2', null)).toBe(251);
  });

  it("heals the legacy stale value '1' for users placed above A1", () => {
    expect(resolvePlacedStartModule('A2', '1')).toBe(51);
    expect(resolvePlacedStartModule('B1', '1')).toBe(101);
    expect(resolvePlacedStartModule('B2', '1')).toBe(151);
    expect(resolvePlacedStartModule('C1', '1')).toBe(201);
    expect(resolvePlacedStartModule('C2', '1')).toBe(251);
  });

  it('preserves a stored module at/above the level start (user advanced)', () => {
    expect(resolvePlacedStartModule('A2', '51')).toBe(51);
    expect(resolvePlacedStartModule('A2', '60')).toBe(60);
    expect(resolvePlacedStartModule('B1', '120')).toBe(120);
    expect(resolvePlacedStartModule('C2', '300')).toBe(300);
  });

  it('falls back safely on garbage input', () => {
    expect(resolvePlacedStartModule(null, null)).toBe(1);
    // Unknown level falls back to A1 as the floor, but a VALID stored module is
    // preserved (the level only raises the floor when it is known/trustworthy).
    expect(resolvePlacedStartModule('ZZ', '7')).toBe(7);
    expect(resolvePlacedStartModule('ZZ', null)).toBe(1);
    expect(resolvePlacedStartModule('A2', 'abc')).toBe(51);
    expect(resolvePlacedStartModule('C1', '999')).toBe(201); // out of range → level start
    expect(resolvePlacedStartModule('C1', '0')).toBe(201);
    expect(resolvePlacedStartModule('B2', '-5')).toBe(151);
  });
});
