/**
 * Content + MCQ validation harness.
 *
 * Imports every module-data file, enumerates the `MODULE_<n>_DATA` exports, and
 * validates each module's structure. For every speaking-practice item that does
 * NOT ship an authored `multipleChoice`, it runs the runtime MCQ generator and
 * flags results that fall through to the degenerate "universal fallback".
 *
 * This is both the acceptance gate for incoming content swaps and a CI guard
 * against structural regressions. Pure data in → structured report out (no I/O),
 * so it can run under Vitest or be imported anywhere.
 */

import * as A1 from '@/components/A1ModulesData';
import * as A2 from '@/components/A2ModulesData';
import * as B1 from '@/components/B1ModulesData';
import * as B2 from '@/components/B2ModulesData';
import * as C1 from '@/components/C1ModulesData';
import * as C1Extended from '@/components/C1ModulesData_Extended';
import * as C1Advanced from '@/components/C1ModulesData_Advanced';
import * as C1Final from '@/components/C1ModulesData_Final';
import * as C2 from '@/components/C2ModulesData';
import { generateMultipleChoiceQuestion } from '@/utils/multipleChoiceGenerator';

/** Target item count every module is expected to ship. */
export const EXPECTED_ITEM_COUNT = 40;

export interface ModuleIssue {
  code:
    | 'ITEM_COUNT'
    | 'EMPTY_SPEAKING_PRACTICE'
    | 'EMPTY_QUESTION'
    | 'EMPTY_ANSWER'
    | 'EMPTY_TITLE'
    | 'EMPTY_INTRO'
    | 'DUPLICATE_ITEM'
    | 'TABLE_SHAPE'
    | 'PLACEHOLDER'
    | 'DEGENERATE_MCQ';
  detail: string;
  /** speakingPractice index when the issue is item-scoped. */
  index?: number;
}

export interface ModuleReport {
  moduleId: number;
  exportKey: string;
  title: string;
  itemCount: number;
  authoredMcqCount: number;
  generatedMcqCount: number;
  degenerateMcqCount: number;
  tableShape: 'array' | 'object' | 'none' | 'invalid';
  issues: ModuleIssue[];
}

export interface ValidationReport {
  totalModules: number;
  modulesWithIssues: number;
  totalIssues: number;
  byCode: Record<string, number>;
  modules: ModuleReport[];
}

type AnyModule = Record<string, unknown>;

const SOURCES: AnyModule[] = [A1, A2, B1, B2, C1, C1Extended, C1Advanced, C1Final, C2];

const PLACEHOLDER_RE = /\b(todo|lorem|content is being loaded|loading\.\.\.|xxx)\b/i;
/** "intro: 'Content'" stub used by the empty 218–224 modules. */
const STUB_INTRO_RE = /^content$/i;

/** Collect all MODULE_<n>_DATA exports across every source file, sorted by id. */
export function collectModules(): Array<{ moduleId: number; exportKey: string; data: any }> {
  const out: Array<{ moduleId: number; exportKey: string; data: any }> = [];
  const seen = new Set<number>();
  for (const src of SOURCES) {
    for (const [key, value] of Object.entries(src)) {
      const m = /^MODULE_(\d+)_DATA$/.exec(key);
      if (m && value && typeof value === 'object') {
        const id = Number(m[1]);
        // Re-export barrels (e.g. C1ModulesData re-exports Extended, which
        // re-exports Final) surface the same module object from several files.
        // Dedupe by id so the report reflects 300 distinct modules, not the
        // ~340 raw symbols.
        if (seen.has(id)) continue;
        seen.add(id);
        out.push({ moduleId: id, exportKey: key, data: value });
      }
    }
  }
  return out.sort((a, b) => a.moduleId - b.moduleId);
}

function classifyTable(table: unknown): ModuleReport['tableShape'] {
  if (table === undefined || table === null) return 'none';
  if (Array.isArray(table)) return 'array';
  if (typeof table === 'object') {
    return Array.isArray((table as any).data) ? 'object' : 'invalid';
  }
  return 'invalid';
}

/** A generated MCQ is "degenerate" when it betrays the universal fallback. */
function isDegenerateMcq(mcq: ReturnType<typeof generateMultipleChoiceQuestion>): boolean {
  if (!mcq) return true;
  const prompt = mcq.prompt ?? '';
  if (/put these words in order/i.test(prompt)) return true;
  if (!prompt.includes('___')) return true;
  const texts = mcq.options.map(o => (o.text ?? '').trim().toLowerCase());
  if (texts.some(t => t.length === 0)) return true;
  if (new Set(texts).size !== texts.length) return true; // duplicate options
  // Generic last-resort distractors emitted by createUniversalFallback.
  if (texts.includes('other') && texts.includes('another')) return true;
  return false;
}

function normalizeItem(item: any): { question: string; answer: string; authored: boolean } {
  if (typeof item === 'string') return { question: item, answer: item, authored: false };
  return {
    question: String(item?.question ?? ''),
    answer: String(item?.answer ?? ''),
    authored: !!item?.multipleChoice,
  };
}

export function validateModule(moduleId: number, exportKey: string, data: any): ModuleReport {
  const issues: ModuleIssue[] = [];
  const sp: any[] = Array.isArray(data?.speakingPractice) ? data.speakingPractice : [];
  const itemCount = sp.length;

  if (!Array.isArray(data?.speakingPractice) || itemCount === 0) {
    issues.push({ code: 'EMPTY_SPEAKING_PRACTICE', detail: 'No speaking-practice items' });
  } else if (itemCount !== EXPECTED_ITEM_COUNT) {
    issues.push({ code: 'ITEM_COUNT', detail: `${itemCount} items (expected ${EXPECTED_ITEM_COUNT})` });
  }

  if (!data?.title || !String(data.title).trim()) {
    issues.push({ code: 'EMPTY_TITLE', detail: 'Missing title' });
  }
  if (!data?.intro || !String(data.intro).trim() || STUB_INTRO_RE.test(String(data.intro).trim())) {
    issues.push({ code: 'EMPTY_INTRO', detail: `intro="${String(data?.intro ?? '')}"` });
  }
  if (PLACEHOLDER_RE.test(String(data?.intro ?? '')) || PLACEHOLDER_RE.test(String(data?.description ?? ''))) {
    issues.push({ code: 'PLACEHOLDER', detail: 'Placeholder text in intro/description' });
  }

  const tableShape = classifyTable(data?.table);
  if (tableShape === 'invalid') {
    issues.push({ code: 'TABLE_SHAPE', detail: 'table is neither array nor {data:[]} object' });
  }

  let authoredMcqCount = 0;
  let generatedMcqCount = 0;
  let degenerateMcqCount = 0;
  const seen = new Set<string>();

  sp.forEach((raw, index) => {
    const { question, answer, authored } = normalizeItem(raw);
    if (!question.trim()) issues.push({ code: 'EMPTY_QUESTION', detail: 'Empty question', index });
    if (!answer.trim()) issues.push({ code: 'EMPTY_ANSWER', detail: 'Empty answer', index });

    const sig = `${question.trim().toLowerCase()}|${answer.trim().toLowerCase()}`;
    if (question.trim() && seen.has(sig)) {
      issues.push({ code: 'DUPLICATE_ITEM', detail: `Duplicate of an earlier item: "${question}"`, index });
    }
    seen.add(sig);

    if (authored) {
      authoredMcqCount++;
    } else if (answer.trim()) {
      generatedMcqCount++;
      const mcq = generateMultipleChoiceQuestion(answer, index);
      if (isDegenerateMcq(mcq)) {
        degenerateMcqCount++;
        issues.push({ code: 'DEGENERATE_MCQ', detail: `Fallback MCQ for answer: "${answer}"`, index });
      }
    }
  });

  return {
    moduleId,
    exportKey,
    title: String(data?.title ?? ''),
    itemCount,
    authoredMcqCount,
    generatedMcqCount,
    degenerateMcqCount,
    tableShape,
    issues,
  };
}

export function validateAllModules(): ValidationReport {
  const modules = collectModules().map(({ moduleId, exportKey, data }) =>
    validateModule(moduleId, exportKey, data),
  );

  const byCode: Record<string, number> = {};
  let totalIssues = 0;
  let modulesWithIssues = 0;
  for (const m of modules) {
    if (m.issues.length) modulesWithIssues++;
    for (const i of m.issues) {
      byCode[i.code] = (byCode[i.code] ?? 0) + 1;
      totalIssues++;
    }
  }

  return {
    totalModules: modules.length,
    modulesWithIssues,
    totalIssues,
    byCode,
    modules,
  };
}

/** Human-readable one-line-per-module summary for console / CI logs. */
export function formatReport(report: ValidationReport): string {
  const lines: string[] = [];
  lines.push(
    `Modules: ${report.totalModules} | with issues: ${report.modulesWithIssues} | total issues: ${report.totalIssues}`,
  );
  lines.push(`By code: ${JSON.stringify(report.byCode)}`);
  lines.push('');
  for (const m of report.modules) {
    if (!m.issues.length) continue;
    const codes = m.issues.map(i => (i.index !== undefined ? `${i.code}@${i.index}` : i.code));
    lines.push(
      `#${m.moduleId} "${m.title}" items=${m.itemCount} authoredMCQ=${m.authoredMcqCount} degenMCQ=${m.degenerateMcqCount} :: ${codes.join(', ')}`,
    );
  }
  return lines.join('\n');
}

// ============================================================================
// Strict MCQ quality gate (Phase 4B) — "no-bullshit" guarantee.
// An MCQ ships only if it passes ALL checks below. Far stricter than the
// existing `validateMultipleChoiceQuestion` (which only checks 1-correct /
// 3-options / has-blank and so passes generic-filler garbage).
// ============================================================================

export interface McqVerdict {
  ok: boolean;
  reasons: string[];
}

// Generic last-resort distractors emitted by createUniversalFallback.
const FILLER_DISTRACTORS = new Set([
  'other', 'another', 'none', 'none of the above', 'all of the above',
  'word', 'something', 'anything', 'none of these',
]);
// Pure function words that must never be the (sole) blanked token for A1/A2.
// NOTE: grammar targets like is/are/was/were/do/does/did/have/has/had are
// intentionally NOT blocked — blanking them is the whole point at this level.
// Articles (a/an/the) and prepositions (in/on/at/to/of/for) are A1 grammar
// targets in their own modules — a cloze blanking them WITH same-category
// distractors (e.g. "I watch TV ___ night." [at|in|on]) is a valid MCQ, so they
// are not blocked here. Distractor quality is enforced by the distinctness +
// FILLER_DISTRACTORS checks and the per-item linguistic audit. Only "and" (never
// a grammar-choice target) stays blocked.
const BLOCKED_BLANK = new Set(['and']);
const EMOJI_MARKUP_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]|<[^>]+>/u;

function normText(s: string): string {
  return (s ?? '')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,!?;:"'’“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Distinctness normalizer for OPTIONS only: case/quote/space-insensitive but
// KEEPS the apostrophe so a contraction vs possessive (e.g. "It's" vs "Its",
// "friend's" vs "friends") counts as two genuinely-different options. The
// fully-stripped normText is still used for reconstruction (STT-tolerant).
function normOption(s: string): string {
  return (s ?? '')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Validate one MCQ against its source answer. Returns every failure reason. */
export function validateMcqStrict(mcq: any, sourceAnswer: string): McqVerdict {
  const reasons: string[] = [];
  if (!mcq || typeof mcq !== 'object') return { ok: false, reasons: ['no mcq object'] };

  const prompt: string = typeof mcq.prompt === 'string' ? mcq.prompt : '';
  const options: Array<{ text?: string; correct?: boolean }> = Array.isArray(mcq.options) ? mcq.options : [];

  const blanks = (prompt.match(/___/g) || []).length;
  if (blanks !== 1) reasons.push(`prompt has ${blanks} blanks (need exactly 1)`);
  if (/put these words in order/i.test(prompt)) reasons.push('word-order scramble prompt');
  if (EMOJI_MARKUP_RE.test(prompt)) reasons.push('emoji/markup in prompt');

  if (options.length !== 3) reasons.push(`${options.length} options (need 3)`);
  const correctOpts = options.filter(o => o && o.correct);
  if (correctOpts.length !== 1) reasons.push(`${correctOpts.length} correct options (need 1)`);

  const texts = options.map(o => (o?.text ?? '').trim());
  texts.forEach((t, i) => {
    if (!t) reasons.push(`option ${i} empty`);
    else if (t.length > 40) reasons.push(`option ${i} too long (${t.length})`);
    if (t && EMOJI_MARKUP_RE.test(t)) reasons.push(`option ${i} emoji/markup`);
    if (t && FILLER_DISTRACTORS.has(normText(t))) reasons.push(`option ${i} generic filler "${t}"`);
  });
  const normed = texts.map(normOption);
  if (new Set(normed).size !== normed.length) reasons.push('duplicate options');

  const correct = correctOpts[0]?.text ?? '';
  if (correct) {
    if (BLOCKED_BLANK.has(normText(correct))) reasons.push(`blanked token is a stopword ("${correct}")`);
    // Reconstruction: filling the blank with the correct option must rebuild
    // the source answer — proves the MCQ actually tests THIS answer.
    if (blanks === 1) {
      const filled = normText(prompt.replace('___', correct));
      if (filled !== normText(sourceAnswer)) reasons.push('reconstruction != source answer');
    }
  }

  return { ok: reasons.length === 0, reasons };
}

export interface ModuleMcqReport {
  moduleId: number;
  total: number;
  authored: number;
  pass: number;
  fail: number;
  fails: Array<{ index: number; answer: string; reasons: string[] }>;
}

/**
 * Dry-run the MCQ gate over modules: for each item use its authored
 * `multipleChoice` if present, else the runtime generator, then strict-validate.
 * Used both as the pre-authoring discovery report and as the CI gate.
 */
export function mcqGateReport(includeModule?: (moduleId: number) => boolean): ModuleMcqReport[] {
  return collectModules()
    .filter(({ moduleId }) => (includeModule ? includeModule(moduleId) : true))
    .map(({ moduleId, data }) => {
      const sp: any[] = Array.isArray(data?.speakingPractice) ? data.speakingPractice : [];
      const rep: ModuleMcqReport = { moduleId, total: sp.length, authored: 0, pass: 0, fail: 0, fails: [] };
      sp.forEach((raw, index) => {
        const item = typeof raw === 'string' ? { question: raw, answer: raw } : raw;
        const answer = String(item?.answer ?? '');
        if (!answer.trim()) return;
        const authored = item?.multipleChoice;
        if (authored) rep.authored++;
        const mcq = authored ?? generateMultipleChoiceQuestion(answer, index);
        const v = validateMcqStrict(mcq, answer);
        if (v.ok) rep.pass++;
        else { rep.fail++; rep.fails.push({ index, answer, reasons: v.reasons }); }
      });
      return rep;
    });
}
