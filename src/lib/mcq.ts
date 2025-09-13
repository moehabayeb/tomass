// src/lib/mcq.ts
type MCQ = {
  cloze: string;
  options: string[];
  correct: string;
};

/**
 * Build a cloze line and three options from a Q/A pair.
 * If we can't infer a blank cleanly, we still return null and skip MCQ.
 */
export function buildClozeAndChoices(question: string, answer: string): MCQ | null {
  if (!question || !answer) return null;

  // Try simple "to be" completion and common gaps
  const lowerA = answer.toLowerCase().trim();

  // Pull a target token from the answer to blank out, prefer am/is/are/was/were/have/has/do/does/did
  const tokens = lowerA.split(/\s+/);
  const targetIdx = tokens.findIndex(t =>
    ["am","is","are","was","were","have","has","do","does","did","can","will","would","could","should"].includes(t.replace(/[^\w]/g, ""))
  );

  if (targetIdx === -1) return null;

  const correct = tokens[targetIdx].replace(/[^\w]/g, "");
  // Build cloze by replacing that token with ___ in a short confirm sentence
  const cloze = lowerA
    .replace(tokens[targetIdx], "___")
    .replace(/\s+/g, " ")
    .trim();

  // Build distractors
  const pool: Record<string,string[]> = {
    am: ["is","are"], is: ["am","are"], are: ["is","am"],
    was: ["were","is"], were: ["was","are"],
    have: ["has","do"], has: ["have","is"],
    do: ["does","did"], does: ["do","did"], did: ["does","do"],
    can: ["is","are"], will: ["is","are"], would: ["will","could"],
    could: ["can","would"], should: ["could","would"]
  };
  const distractors = (pool[correct] ?? ["is","are"]).slice(0,2);

  const options = [correct, ...distractors]
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0,3);

  // If less than 3, pad with common confusers
  while (options.length < 3) {
    const pad = ["is","are","am","do","does","did","has","have","was","were"].find(x => !options.includes(x));
    if (!pad) break;
    options.push(pad);
  }

  // Shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { cloze, options, correct };
}