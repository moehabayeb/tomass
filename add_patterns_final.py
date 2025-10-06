#!/usr/bin/env python3
"""
Add comprehensive B1/B2/C1 grammar patterns to multipleChoiceGenerator.ts
"""

file_path = "tomass-main/src/utils/multipleChoiceGenerator.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find where to insert (right before the ];)
insertion_point = content.rfind('];')

if insertion_point == -1:
    print("ERROR: Could not find insertion point")
    exit(1)

# Back up to find the closing } of the last pattern
last_brace = content.rfind('}', 0, insertion_point)

if last_brace == -1:
    print("ERROR: Could not find last pattern closing brace")
    exit(1)

# Insert new patterns after the last }
new_patterns = ''',

  // === ADVANCED B1/B2 LEVEL PATTERNS ===

  // Past Perfect - Affirmative
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+had\\s+(been|gone|seen|eaten|drunk|bought|got|made|taken|given|played|worked|visited|finished|left|arrived|studied|cleaned|called|told|said|thought|known|found|lost|won|met|heard|read|written|spoken|driven|sung|swum|run|come|done|had)\\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+had\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Past Perfect - Negative (hadn't)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+hadn't\\s+(been|gone|seen|eaten|drunk|bought|got|made|taken|given|played|worked|visited|finished|left|arrived|studied|cleaned|expected|checked|told|known|heard|prepared)\\b/i,
    correctAnswer: "hadn't",
    wrongAnswers: ["haven't", "hasn't"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+hadn't\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Wish + Past Simple (present regrets) - I wish I had
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+had\\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+had\\b/i, (match, p1, wish, p2) => {
        return `${p1} ${wish} ${p2} ___`;
      });
    }
  },

  // Wish + were (present regrets)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+were\\b/i,
    correctAnswer: "were",
    wrongAnswers: ["was", "are"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+were\\b/i, (match, p1, wish, p2) => {
        return `${p1} ${wish} ${p2} ___`;
      });
    }
  },

  // If only + had/were (present regrets)
  {
    pattern: /\\bIf\\s+only\\s+(I|you|we|they|he|she|it)\\s+(had|were)\\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\bIf\\s+only\\s+(I|you|we|they|he|she|it)\\s+(had|were)\\b/i, (match, pronoun, verb) => {
        return `If only ${pronoun} ___`;
      });
    }
  },

  // Used to (past habits)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+used\\s+to\\s+(be|go|live|play|work|study|eat|drink|watch|read)\\b/i,
    correctAnswer: "used to",
    wrongAnswers: ["use to", "am used to"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+used\\s+to\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Causative - have something done
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+(have|has|had)\\s+(my|your|his|her|its|our|their)\\s+\\w+\\s+(fixed|repaired|cleaned|painted|checked|cut|delivered|installed)\\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+(have|has|had)\\s+(my|your|his|her|its|our|their)\\s+(\\w+)\\s+(\\w+)\\b/i, (match, pronoun, aux, poss, noun, verb) => {
        return `${pronoun} ___ ${poss} ${noun} ${verb}`;
      });
    }
  },

  // Third Conditional - If clause (If I had known)
  {
    pattern: /\\bIf\\s+(I|you|we|they|he|she|it)\\s+had\\s+(been|gone|known|seen|studied|worked)\\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\bIf\\s+(I|you|we|they|he|she|it)\\s+had\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `If ${pronoun} ___ ${verb}`;
      });
    }
  },

  // Third Conditional - Main clause (would have)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+would\\s+have\\s+(been|gone|done|seen|known|passed|succeeded)\\b/i,
    correctAnswer: "would have",
    wrongAnswers: ["will have", "would has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+would\\s+have\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Had better (strong advice)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+had\\s+better\\s+(go|leave|study|stop|start|be)\\b/i,
    correctAnswer: "had better",
    wrongAnswers: ["have better", "has better"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+had\\s+better\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Would rather (preference)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+would\\s+rather\\s+(go|stay|eat|drink|watch|study)\\b/i,
    correctAnswer: "would rather",
    wrongAnswers: ["will rather", "would prefer"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+would\\s+rather\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Relative Pronouns - who (for people)
  {
    pattern: /\\b(The|A|An)\\s+(man|woman|person|teacher|doctor|student|boy|girl)\\s+who\\s+(is|was|has|lives|works|studies)\\b/i,
    correctAnswer: "who",
    wrongAnswers: ["which", "whose"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(The|A|An)\\s+(man|woman|person|teacher|doctor|student|boy|girl)\\s+who\\s+/i, (match, article, noun) => {
        return `${article} ${noun} ___ `;
      });
    }
  },

  // Relative Pronouns - which (for things)
  {
    pattern: /\\b(The|A|An)\\s+(book|car|house|computer|phone|table|chair)\\s+which\\s+(is|was|has|costs|looks)\\b/i,
    correctAnswer: "which",
    wrongAnswers: ["who", "whose"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(The|A|An)\\s+(book|car|house|computer|phone|table|chair)\\s+which\\s+/i, (match, article, noun) => {
        return `${article} ${noun} ___ `;
      });
    }
  },

  // Relative Pronouns - whose (possession)
  {
    pattern: /\\b(The|A|An)\\s+(man|woman|person|teacher|student)\\s+whose\\s+(car|house|book|phone)\\b/i,
    correctAnswer: "whose",
    wrongAnswers: ["who", "which"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(The|A|An)\\s+(man|woman|person|teacher|student)\\s+whose\\s+/i, (match, article, noun) => {
        return `${article} ${noun} ___ `;
      });
    }
  }'''

# Insert the new patterns
content = content[:last_brace + 1] + new_patterns + '\n' + content[last_brace + 1:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Added 14 advanced B1/B2 grammar patterns")
print("Patterns: Past Perfect, Wish/If only, Used to, Causative, Conditionals, Relatives")
