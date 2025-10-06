#!/usr/bin/env python3
"""
Add comprehensive B1/B2/C1 grammar patterns to multipleChoiceGenerator.ts
"""
import re

file_path = "tomass-main/src/utils/multipleChoiceGenerator.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the closing bracket of grammarPatterns array and insert new patterns before it
# Look for the Reported Speech pattern (last one) and add after it

new_patterns = '''
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

  // Past Perfect - Alternative form (had not)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+had\\s+not\\s+(been|gone|seen|eaten)\\b/i,
    correctAnswer: "had not",
    wrongAnswers: ["have not", "has not"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+had\\s+not\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Wish + Past Simple (present regrets)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+(had|were|was|could|lived|knew|spoke|understood|didn't|weren't|wasn't)\\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+(\\w+)\\b/i, (match, pronoun1, wish, pronoun2, verb) => {
        return `${pronoun1} ${wish} ${pronoun2} ___`;
      });
    }
  },

  // If only + Past Simple (present regrets)
  {
    pattern: /\\bIf\\s+only\\s+(I|you|we|they|he|she|it)\\s+(had|were|was|could|lived|knew|spoke|understood|didn't|weren't|wasn't)\\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\bIf\\s+only\\s+(I|you|we|they|he|she|it)\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `If only ${pronoun} ___`;
      });
    }
  },

  // Wish + Past Perfect (past regrets)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+had\\s+(been|gone|seen|known|done|said|told|listened|studied)\\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+(wish|wishes)\\s+(I|you|we|they|he|she|it)\\s+had\\s+(\\w+)\\b/i, (match, p1, wish, p2, verb) => {
        return `${p1} ${wish} ${p2} ___ ${verb}`;
      });
    }
  },

  // If only + Past Perfect (past regrets)
  {
    pattern: /\\bIf\\s+only\\s+(I|you|we|they|he|she|it)\\s+had\\s+(been|gone|seen|known|done|said|told|listened|studied)\\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\bIf\\s+only\\s+(I|you|we|they|he|she|it)\\s+had\\s+(\\w+)\\b/i, (match, pronoun, verb) => {
        return `If only ${pronoun} ___ ${verb}`;
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

  // Be used to (accustomed to)
  {
    pattern: /\\b(I am|You are|We are|They are|He is|She is|It is)\\s+used\\s+to\\s+(living|working|eating|driving|walking)\\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I am|You are|We are|They are|He is|She is|It is)\\s+used\\s+to\\s+(\\w+ing)\\b/i, (match, subject, verb) => {
        const pronoun = subject.split(' ')[0];
        return `${pronoun} ___ used to ${verb}`;
      });
    }
  },

  // Get used to (becoming accustomed)
  {
    pattern: /\\b(I|You|We|They|He|She|It)\\s+(get|gets|got|will get)\\s+used\\s+to\\s+(living|working|eating|driving|walking)\\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\\b(I|You|We|They|He|She|It)\\s+(get|gets|got|will get)\\s+used\\s+to\\s+(\\w+ing)\\b/i, (match, pronoun, getForm, verb) => {
        return `${pronoun} ___ used to ${verb}`;
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

  // Third Conditional - If clause
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
  },'''

# Replace the closing of reported speech pattern with reported speech + new patterns + closing
pattern_to_find = r'(  // Reported Speech\n  \{\n.*?return `He said \${pronoun} ___`;\n      \}\);\n    \}\n  \}\n)\];'

replacement = r'\1,' + new_patterns + '\n];'

content = re.sub(pattern_to_find, replacement, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Successfully added advanced B1/B2 grammar patterns")
print("📊 Added 18 new patterns for comprehensive grammar coverage")
