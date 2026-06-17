import { describe, it, expect } from 'vitest';
import { evaluateOpenResponse } from './evaluator';

const OPENERS = ['I think', 'I believe'];

describe('evaluateOpenResponse — sentence-starter grading', () => {
  it('accepts a real sentence that uses a required opener', () => {
    expect(evaluateOpenResponse('I think social media is useful.', { requiredOpeners: OPENERS }).isCorrect).toBe(true);
  });

  it('accepts any of the listed openers', () => {
    expect(evaluateOpenResponse('I believe money is important.', { requiredOpeners: OPENERS }).isCorrect).toBe(true);
  });

  it('rejects (gently) when no opener is used, and lists the openers', () => {
    const r = evaluateOpenResponse('Social media is useful.', { requiredOpeners: OPENERS });
    expect(r.isCorrect).toBe(false);
    expect(r.hint).toContain('I think');
  });

  it('rejects a critical subject–verb agreement error', () => {
    const r = evaluateOpenResponse('I think they is great.', { requiredOpeners: OPENERS });
    expect(r.isCorrect).toBe(false);
    expect(r.feedback.toLowerCase()).toContain('they are');
  });

  it('rejects a one-word / empty response', () => {
    expect(evaluateOpenResponse('Yes.', { requiredOpeners: OPENERS }).isCorrect).toBe(false);
    expect(evaluateOpenResponse('', { requiredOpeners: OPENERS }).isCorrect).toBe(false);
  });

  it('with no required openers, any grammatical full sentence passes', () => {
    expect(evaluateOpenResponse('We are going to the park.').isCorrect).toBe(true);
  });
});
