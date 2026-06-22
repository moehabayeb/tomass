import { describe, it, expect } from 'vitest';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateMcqStrict, mcqGateReport } from './contentValidation';

const good = {
  prompt: 'I ___ my grandparents.',
  options: [
    { letter: 'A', text: 'visited', correct: true },
    { letter: 'B', text: 'visit', correct: false },
    { letter: 'C', text: 'visiting', correct: false },
  ],
};

describe('validateMcqStrict — the no-bullshit gate', () => {
  it('passes a clean, faithful MCQ', () => {
    expect(validateMcqStrict(good, 'I visited my grandparents.').ok).toBe(true);
  });

  it('rejects generic filler distractors (other/another)', () => {
    const v = validateMcqStrict(
      { prompt: 'I ___ my grandparents.', options: [
        { text: 'visited', correct: true }, { text: 'other', correct: false }, { text: 'another', correct: false },
      ] }, 'I visited my grandparents.');
    expect(v.ok).toBe(false);
    expect(v.reasons.join(' ')).toMatch(/filler/);
  });

  it('rejects a word-order scramble prompt (no blank)', () => {
    const v = validateMcqStrict(
      { prompt: 'Put these words in order: "I" "visited" ...', options: [
        { text: 'a', correct: true }, { text: 'b', correct: false }, { text: 'c', correct: false },
      ] }, 'I visited my grandparents.');
    expect(v.ok).toBe(false);
  });

  it('rejects when reconstruction != source answer', () => {
    const v = validateMcqStrict(
      { prompt: 'She ___ home.', options: [
        { text: 'went', correct: true }, { text: 'go', correct: false }, { text: 'goes', correct: false },
      ] }, 'She went to school.');
    expect(v.ok).toBe(false);
    expect(v.reasons.join(' ')).toMatch(/reconstruction/);
  });

  it('rejects duplicate and empty options', () => {
    expect(validateMcqStrict({ prompt: 'I ___ it.', options: [
      { text: 'did', correct: true }, { text: 'did', correct: false }, { text: '', correct: false },
    ] }, 'I did it.').ok).toBe(false);
  });

  it('rejects blanking the conjunction "and" (never a grammar target)', () => {
    const v = validateMcqStrict({ prompt: 'I like tea ___ coffee.', options: [
      { text: 'and', correct: true }, { text: 'or', correct: false }, { text: 'but', correct: false },
    ] }, 'I like tea and coffee.');
    expect(v.ok).toBe(false);
  });

  // Articles (a/an/the) and prepositions (in/on/at) ARE legitimate A1 grammar
  // targets in their own modules, so blanking them with same-category distractors
  // is allowed (BLOCKED_BLANK was deliberately narrowed to just "and").
  it('allows blanking an article — the grammar target in article modules', () => {
    const v = validateMcqStrict({ prompt: "It's ___ elephant.", options: [
      { text: 'an', correct: true }, { text: 'a', correct: false }, { text: 'is', correct: false },
    ] }, "It's an elephant.");
    expect(v.ok).toBe(true);
  });

  it('allows blanking a preposition of time — the grammar target in prepositions modules', () => {
    const v = validateMcqStrict({ prompt: 'I eat lunch ___ noon.', options: [
      { text: 'at', correct: true }, { text: 'in', correct: false }, { text: 'on', correct: false },
    ] }, 'I eat lunch at noon.');
    expect(v.ok).toBe(true);
  });
});

describe('mcqGateReport — A1/A2 baseline (auto-gen today)', () => {
  it('reports how many current A1/A2 MCQs would FAIL the gate', () => {
    const report = mcqGateReport(id => id >= 1 && id <= 100);
    const totals = report.reduce(
      (a, m) => ({ total: a.total + (m.total || 0), pass: a.pass + m.pass, fail: a.fail + m.fail, authored: a.authored + m.authored }),
      { total: 0, pass: 0, fail: 0, authored: 0 },
    );
    const lines = [
      `A1/A2 MCQ gate baseline (current content, auto-generated):`,
      `items=${totals.total} authored=${totals.authored} PASS=${totals.pass} FAIL=${totals.fail}`,
      '',
      ...report.filter(m => m.fail > 0).map(m => `#${m.moduleId}: ${m.fail}/${m.total} fail`),
    ];
    writeFileSync(resolve(process.cwd(), 'mcq-gate-baseline.txt'), lines.join('\n'), 'utf8');
    // eslint-disable-next-line no-console
    console.log(`\nA1/A2: items=${totals.total} PASS=${totals.pass} FAIL=${totals.fail} (authored=${totals.authored})\n`);
    expect(totals.total).toBeGreaterThan(0);
  });
});
