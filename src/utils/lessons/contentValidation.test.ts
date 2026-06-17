import { describe, it, expect } from 'vitest';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateAllModules, formatReport, EXPECTED_ITEM_COUNT } from './contentValidation';

describe('lesson content validation harness', () => {
  const report = validateAllModules();
  const text = formatReport(report);

  it('emits a full report (written to lesson-content-report.txt)', () => {
    // Persist for inspection / CI artifact.
    writeFileSync(resolve(process.cwd(), 'lesson-content-report.txt'), text, 'utf8');
    writeFileSync(
      resolve(process.cwd(), 'lesson-content-report.json'),
      JSON.stringify(report, null, 2),
      'utf8',
    );
    // eslint-disable-next-line no-console
    console.log('\n' + text + '\n');
    expect(report.totalModules).toBeGreaterThan(0);
  });

  // --- Invariants we will ENFORCE once Phases 1–3 land. ---
  // They are expected to FAIL today; kept as documentation of the target state.
  // Flip `.skip` to `.only`-free once fixed so CI gates future regressions.
  it.skip('every module ships exactly the expected item count', () => {
    const bad = report.modules.filter(m => m.itemCount !== EXPECTED_ITEM_COUNT);
    expect(bad.map(m => `${m.moduleId}:${m.itemCount}`)).toEqual([]);
  });

  it.skip('no empty/stub modules', () => {
    const bad = report.modules.filter(m =>
      m.issues.some(i => i.code === 'EMPTY_SPEAKING_PRACTICE' || i.code === 'EMPTY_INTRO'),
    );
    expect(bad.map(m => m.moduleId)).toEqual([]);
  });

  it.skip('no duplicate items within a module', () => {
    const bad = report.modules.filter(m => m.issues.some(i => i.code === 'DUPLICATE_ITEM'));
    expect(bad.map(m => m.moduleId)).toEqual([]);
  });

  it.skip('no degenerate generated MCQs (author them instead)', () => {
    const bad = report.modules.filter(m => m.degenerateMcqCount > 0);
    expect(bad.map(m => `${m.moduleId}:${m.degenerateMcqCount}`)).toEqual([]);
  });
});
