export type MultipleChoiceOption = {
  letter: 'A' | 'B' | 'C';
  text: string;
  correct: boolean;
};

export type MultipleChoiceQuestion = {
  prompt: string;
  options: MultipleChoiceOption[];
};

interface GrammarPattern {
  pattern: RegExp;
  correctAnswer: string;
  wrongAnswers: string[];
  gapReplacer: (sentence: string, correctAnswer: string) => string;
}

const grammarPatterns: GrammarPattern[] = [
  // "To be" patterns - am, is, are
  {
    pattern: /\b(I am)\b/i,
    correctAnswer: "am",
    wrongAnswers: ["is", "are"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(I am)\b/i, `I ___`)
  },
  {
    pattern: /\b(You are)\b/i,
    correctAnswer: "are",
    wrongAnswers: ["am", "is"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(You are)\b/i, `You ___`)
  },
  {
    pattern: /\b(He is|She is|It is)\b/i,
    correctAnswer: "is",
    wrongAnswers: ["am", "are"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(He is|She is|It is)\b/i, (match) => {
      const pronoun = match.split(' ')[0];
      return `${pronoun} ___`;
    })
  },
  {
    pattern: /\b(We are|They are)\b/i,
    correctAnswer: "are",
    wrongAnswers: ["am", "is"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(We are|They are)\b/i, (match) => {
      const pronoun = match.split(' ')[0];
      return `${pronoun} ___`;
    })
  },

  // "Have got" patterns
  {
    pattern: /\b(I have got|You have got|We have got|They have got)\b/i,
    correctAnswer: "have got",
    wrongAnswers: ["has got", "had got"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(I have got|You have got|We have got|They have got)\b/i, (match) => {
      const pronoun = match.split(' ')[0];
      return `${pronoun} ___`;
    })
  },
  {
    pattern: /\b(He has got|She has got|It has got)\b/i,
    correctAnswer: "has got",
    wrongAnswers: ["have got", "had got"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(He has got|She has got|It has got)\b/i, (match) => {
      const pronoun = match.split(' ')[0];
      return `${pronoun} ___`;
    })
  },

  // Haven't got / Hasn't got patterns
  {
    pattern: /\b(I haven't got|You haven't got|We haven't got|They haven't got)\b/i,
    correctAnswer: "haven't got",
    wrongAnswers: ["hasn't got", "hadn't got"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(I haven't got|You haven't got|We haven't got|They haven't got)\b/i, (match) => {
      const pronoun = match.split(' ')[0];
      return `${pronoun} ___`;
    })
  },
  {
    pattern: /\b(He hasn't got|She hasn't got|It hasn't got)\b/i,
    correctAnswer: "hasn't got",
    wrongAnswers: ["haven't got", "hadn't got"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(He hasn't got|She hasn't got|It hasn't got)\b/i, (match) => {
      const pronoun = match.split(' ')[0];
      return `${pronoun} ___`;
    })
  },

  // Simple Present with third person -s/-es
  {
    pattern: /\b(He|She|It)\s+(plays|goes|watches|does|has|likes|works|studies)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],   // Will be dynamically determined
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(He|She|It)\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___`;
      });
    }
  },

  // Simple Present without -s for I/You/We/They
  {
    pattern: /\b(I|You|We|They)\s+(play|go|watch|do|have|like|work|study)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],   // Will be dynamically determined
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They)\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___`;
      });
    }
  },

  // This/That/These/Those patterns
  {
    pattern: /\b(This is)\b/i,
    correctAnswer: "This is",
    wrongAnswers: ["That is", "These are"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(This is)\b/i, "___")
  },
  {
    pattern: /\b(That is)\b/i,
    correctAnswer: "That is",
    wrongAnswers: ["This is", "Those are"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(That is)\b/i, "___")
  },
  {
    pattern: /\b(These are)\b/i,
    correctAnswer: "These are",
    wrongAnswers: ["This is", "Those are"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(These are)\b/i, "___")
  },
  {
    pattern: /\b(Those are)\b/i,
    correctAnswer: "Those are",
    wrongAnswers: ["These are", "That is"],
    gapReplacer: (sentence, correct) => sentence.replace(/\b(Those are)\b/i, "___")
  },

  // === A2 LEVEL PATTERNS ===
  // Past Simple - Regular Verbs
  {
    pattern: /\b(I|You|We|They)\s+(played|worked|visited|watched|cooked|studied|called|walked)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They)\s+(\w+ed)\b/i, (match, pronoun) => {
        return `${pronoun} ___`;
      });
    }
  },
  {
    pattern: /\b(He|She|It)\s+(played|worked|visited|watched|cooked|studied|called|walked)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(He|She|It)\s+(\w+ed)\b/i, (match, pronoun) => {
        return `${pronoun} ___`;
      });
    }
  },

  // Past Simple - Irregular Verbs
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+(went|came|saw|ate|drank|bought|got|made|took|gave)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+(went|came|saw|ate|drank|bought|got|made|took|gave)\b/i, (match, pronoun) => {
        return `${pronoun} ___`;
      });
    }
  },

  // Past Simple Questions - Did + base form
  {
    pattern: /\bDid\s+(I|you|we|they|he|she|it)\s+(go|come|see|eat|drink|buy|get|make|take|give|play|work|visit)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bDid\s+(I|you|we|they|he|she|it)\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `Did ${pronoun} ___`;
      });
    }
  },

  // Will Future
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+will\s+(\w+)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+will\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Going to Future
  {
    pattern: /\b(I am|You are|We are|They are)\s+going\s+to\s+(\w+)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I am|You are|We are|They are)\s+going\s+to\s+(\w+)\b/i, (match, pronoun) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___ going to`;
      });
    }
  },
  {
    pattern: /\b(He is|She is|It is)\s+going\s+to\s+(\w+)\b/i,
    correctAnswer: "is",
    wrongAnswers: ["am", "are"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(He is|She is|It is)\s+going\s+to\s+(\w+)\b/i, (match, pronoun) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___ going to`;
      });
    }
  },

  // Present Continuous
  {
    pattern: /\b(I am|You are|We are|They are)\s+(\w+ing)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I am|You are|We are|They are)\s+(\w+ing)\b/i, (match, pronoun) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___`;
      });
    }
  },
  {
    pattern: /\b(He is|She is|It is)\s+(\w+ing)\b/i,
    correctAnswer: "is",
    wrongAnswers: ["am", "are"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(He is|She is|It is)\s+(\w+ing)\b/i, (match, pronoun) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___`;
      });
    }
  },

  // Modal Verbs - Can/Could
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+(can|could)\s+(go|come|see|eat|drink|buy|get|make|take|give|play|work|visit)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+(can|could)\s+(\w+)\b/i, (match, pronoun, modal, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Comparatives
  {
    pattern: /\b(taller|bigger|smaller|faster|slower|better|worse)\s+than\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(taller|bigger|smaller|faster|slower|better|worse)\s+than\b/i, (match, adj) => {
        return `___ than`;
      });
    }
  },

  // === B1 LEVEL PATTERNS ===
  // Present Perfect
  {
    pattern: /\b(I have|You have|We have|They have)\s+(been|gone|seen|eaten|drunk|bought|got|made|taken|given|played|worked|visited)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I have|You have|We have|They have)\s+(\w+)\b/i, (match, pronoun) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___`;
      });
    }
  },
  {
    pattern: /\b(He has|She has|It has)\s+(been|gone|seen|eaten|drunk|bought|got|made|taken|given|played|worked|visited)\b/i,
    correctAnswer: "has",
    wrongAnswers: ["have", "had"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(He has|She has|It has)\s+(\w+)\b/i, (match, pronoun) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___`;
      });
    }
  },

  // Present Perfect Continuous
  {
    pattern: /\b(I have|You have|We have|They have)\s+been\s+(\w+ing)\b/i,
    correctAnswer: "have been",
    wrongAnswers: ["has been", "had been"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I have|You have|We have|They have)\s+been\s+(\w+ing)\b/i, (match, pronoun, verb) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___ ${verb}`;
      });
    }
  },
  {
    pattern: /\b(He has|She has|It has)\s+been\s+(\w+ing)\b/i,
    correctAnswer: "has been",
    wrongAnswers: ["have been", "had been"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(He has|She has|It has)\s+been\s+(\w+ing)\b/i, (match, pronoun, verb) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___ ${verb}`;
      });
    }
  },

  // Past Continuous
  {
    pattern: /\b(I was|He was|She was|It was)\s+(\w+ing)\b/i,
    correctAnswer: "was",
    wrongAnswers: ["were", "am"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I was|He was|She was|It was)\s+(\w+ing)\b/i, (match, pronoun, verb) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___ ${verb}`;
      });
    }
  },
  {
    pattern: /\b(You were|We were|They were)\s+(\w+ing)\b/i,
    correctAnswer: "were",
    wrongAnswers: ["was", "are"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(You were|We were|They were)\s+(\w+ing)\b/i, (match, pronoun, verb) => {
        const shortPronoun = pronoun.split(' ')[0];
        return `${shortPronoun} ___ ${verb}`;
      });
    }
  },

  // Modal Verbs - Should/Would/Must
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+(should|would|must|might|could)\s+(go|come|see|eat|drink|buy|get|make|take|give|play|work|visit)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+(should|would|must|might|could)\s+(\w+)\b/i, (match, pronoun, modal, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Conditional - First Type
  {
    pattern: /\bIf\s+(I|you|we|they|he|she|it)\s+(am|are|is|have|has|go|come|see)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bIf\s+(I|you|we|they|he|she|it)\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `If ${pronoun} ___`;
      });
    }
  },

  // Passive Voice - Simple Present
  {
    pattern: /\b(It is|They are)\s+(made|written|spoken|built|sold|bought|eaten|drunk)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(It is|They are)\s+(\w+)\b/i, (match, subject, verb) => {
        return `${subject.split(' ')[0]} ___ ${verb}`;
      });
    }
  },

  // Reported Speech
  {
    pattern: /\bHe\s+said\s+(he|she|it|they)\s+(was|were|had|would|could)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bHe\s+said\s+(he|she|it|they)\s+(was|were|had|would|could)\b/i, (match, pronoun, verb) => {
        return `He said ${pronoun} ___`;
      });
    }
  },

  // === ADVANCED B1/B2 LEVEL PATTERNS ===

  // Past Perfect - Affirmative
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+had\s+(been|gone|seen|eaten|drunk|bought|got|made|taken|given|played|worked|visited|finished|left|arrived|studied|cleaned|called|told|said|thought|known|found|lost|won|met|heard|read|written|spoken|driven|sung|swum|run|come|done|had)\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+had\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Past Perfect - Negative (hadn't)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+hadn't\s+(been|gone|seen|eaten|drunk|bought|got|made|taken|given|played|worked|visited|finished|left|arrived|studied|cleaned|expected|checked|told|known|heard|prepared)\b/i,
    correctAnswer: "hadn't",
    wrongAnswers: ["haven't", "hasn't"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+hadn't\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Wish + Past Simple (present regrets) - I wish I had
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+(wish|wishes)\s+(I|you|we|they|he|she|it)\s+had\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+(wish|wishes)\s+(I|you|we|they|he|she|it)\s+had\b/i, (match, p1, wish, p2) => {
        return `${p1} ${wish} ${p2} ___`;
      });
    }
  },

  // Wish + were (present regrets)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+(wish|wishes)\s+(I|you|we|they|he|she|it)\s+were\b/i,
    correctAnswer: "were",
    wrongAnswers: ["was", "are"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+(wish|wishes)\s+(I|you|we|they|he|she|it)\s+were\b/i, (match, p1, wish, p2) => {
        return `${p1} ${wish} ${p2} ___`;
      });
    }
  },

  // If only + had/were (present regrets)
  {
    pattern: /\bIf\s+only\s+(I|you|we|they|he|she|it)\s+(had|were)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bIf\s+only\s+(I|you|we|they|he|she|it)\s+(had|were)\b/i, (match, pronoun, verb) => {
        return `If only ${pronoun} ___`;
      });
    }
  },

  // Used to (past habits)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+used\s+to\s+(be|go|live|play|work|study|eat|drink|watch|read)\b/i,
    correctAnswer: "used to",
    wrongAnswers: ["use to", "am used to"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+used\s+to\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Causative - have something done
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+(have|has|had)\s+(my|your|his|her|its|our|their)\s+\w+\s+(fixed|repaired|cleaned|painted|checked|cut|delivered|installed)\b/i,
    correctAnswer: "",  // Will be dynamically determined
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+(have|has|had)\s+(my|your|his|her|its|our|their)\s+(\w+)\s+(\w+)\b/i, (match, pronoun, aux, poss, noun, verb) => {
        return `${pronoun} ___ ${poss} ${noun} ${verb}`;
      });
    }
  },

  // Third Conditional - If clause (If I had known)
  {
    pattern: /\bIf\s+(I|you|we|they|he|she|it)\s+had\s+(been|gone|known|seen|studied|worked)\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bIf\s+(I|you|we|they|he|she|it)\s+had\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `If ${pronoun} ___ ${verb}`;
      });
    }
  },

  // Third Conditional - Main clause (would have)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+would\s+have\s+(been|gone|done|seen|known|passed|succeeded)\b/i,
    correctAnswer: "would have",
    wrongAnswers: ["will have", "would has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+would\s+have\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Had better (strong advice)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+had\s+better\s+(go|leave|study|stop|start|be)\b/i,
    correctAnswer: "had better",
    wrongAnswers: ["have better", "has better"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+had\s+better\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Would rather (preference)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+would\s+rather\s+(go|stay|eat|drink|watch|study)\b/i,
    correctAnswer: "would rather",
    wrongAnswers: ["will rather", "would prefer"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+would\s+rather\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Relative Pronouns - who (for people)
  {
    pattern: /\b(The|A|An)\s+(man|woman|person|teacher|doctor|student|boy|girl)\s+who\s+(is|was|has|lives|works|studies)\b/i,
    correctAnswer: "who",
    wrongAnswers: ["which", "whose"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(The|A|An)\s+(man|woman|person|teacher|doctor|student|boy|girl)\s+who\s+/i, (match, article, noun) => {
        return `${article} ${noun} ___ `;
      });
    }
  },

  // Relative Pronouns - which (for things)
  {
    pattern: /\b(The|A|An)\s+(book|car|house|computer|phone|table|chair)\s+which\s+(is|was|has|costs|looks)\b/i,
    correctAnswer: "which",
    wrongAnswers: ["who", "whose"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(The|A|An)\s+(book|car|house|computer|phone|table|chair)\s+which\s+/i, (match, article, noun) => {
        return `${article} ${noun} ___ `;
      });
    }
  },

  // Relative Pronouns - whose (possession)
  {
    pattern: /\b(The|A|An)\s+(man|woman|person|teacher|student)\s+whose\s+(car|house|book|phone)\b/i,
    correctAnswer: "whose",
    wrongAnswers: ["who", "which"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(The|A|An)\s+(man|woman|person|teacher|student)\s+whose\s+/i, (match, article, noun) => {
        return `${article} ${noun} ___ `;
      });
    }
  },

  // === MODULE 121-132 SPECIFIC PATTERNS ===

  // Module 121: Wish + Past Perfect (Past Regrets)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+wish(es)?\s+(I|you|we|they|he|she|it)\s+had\s+(studied|gone|taken|listened|done|brought|finished|visited|seen|known)\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+wish(es)?\s+(I|you|we|they|he|she|it)\s+had\s+(\w+)\b/i, (match, p1, es, p2, verb) => {
        const wishForm = es ? 'wishes' : 'wish';
        return `${p1} ${wishForm} ${p2} ___ ${verb}`;
      });
    }
  },

  // Module 121: Wish + hadn't (negative regrets)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+wish(es)?\s+(I|you|we|they|he|she|it)\s+hadn't\s+(spent|forgotten|told|left)\b/i,
    correctAnswer: "hadn't",
    wrongAnswers: ["haven't", "hasn't"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+wish(es)?\s+(I|you|we|they|he|she|it)\s+hadn't\s+(\w+)\b/i, (match, p1, es, p2, verb) => {
        const wishForm = es ? 'wishes' : 'wish';
        return `${p1} ${wishForm} ${p2} ___ ${verb}`;
      });
    }
  },

  // Module 122: Used to (past habits)
  {
    pattern: /\b(I|You|We|They|He|She|It)\s+used\s+to\s+(play|live|work|eat|drink|have|go|be)\b/i,
    correctAnswer: "used to",
    wrongAnswers: ["use to", "am used to"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It)\s+used\s+to\s+(\w+)\b/i, (match, pronoun, verb) => {
        return `${pronoun} ___ ${verb}`;
      });
    }
  },

  // Module 122: Be used to + gerund (accustomed)
  {
    pattern: /\b(I am|You are|We are|They are|He is|She is|It is)\s+used\s+to\s+(\w+ing)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I am|You are|We are|They are|He is|She is|It is)\s+used\s+to\s+(\w+ing)\b/i, (match, subject, gerund) => {
        const pronoun = subject.split(' ')[0];
        return `${pronoun} ___ used to ${gerund}`;
      });
    }
  },

  // Module 122: Getting used to + gerund (adaptation process)
  {
    pattern: /\b(I'm|You're|We're|They're|He's|She's|It's)\s+getting\s+used\s+to\s+(\w+ing)\b/i,
    correctAnswer: "getting used to",
    wrongAnswers: ["used to", "am used to"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I'm|You're|We're|They're|He's|She's|It's)\s+getting\s+used\s+to\s+(\w+ing)\b/i, (match, pronoun, gerund) => {
        const shortPronoun = pronoun === "I'm" ? "I" : pronoun === "You're" ? "You" : pronoun === "We're" ? "We" : pronoun === "They're" ? "They" : pronoun === "He's" ? "He" : pronoun === "She's" ? "She" : "It";
        return `${shortPronoun} ___ ${gerund}`;
      });
    }
  },

  // Module 125: Enjoy + gerund
  {
    pattern: /\b(I|You|We|They|He|She)\s+(enjoy|enjoys)\s+(\w+ing)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(enjoy|enjoys)\s+(\w+ing)\b/i, (match, pronoun, verb, gerund) => {
        return `${pronoun} ${verb} ___`;
      });
    }
  },

  // Module 126: Got + adjective/past participle (past state changes) - MOST COMMON (29 questions)
  {
    pattern: /\b(I|You|We|They|He|She|It|The\s+\w+)\s+got\s+(lost|angry|better|sick|married|scared|cold|excited|sleepy|famous|rich|noisy|close|interested|happy|tired|dressed|surprised|bored|confused|home|to\s+\w+)\b/i,
    correctAnswer: "got",
    wrongAnswers: ["get", "getting"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She|It|The\s+\w+)\s+got\s+/i, (match, pronoun) => {
        return `${pronoun} ___ `;
      });
    }
  },

  // Module 126: I'm/You're getting + adjective (progressive state changes) - 10 questions
  {
    pattern: /\b(I'm|I am|You're|You are|We're|We are|They're|They are|He's|He is|She's|She is|It's|It is)\s+getting\s+(ready|dressed|nervous|hungry|excited|better|impatient|cold|tired)\b/i,
    correctAnswer: "getting",
    wrongAnswers: ["get", "got"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I'm|I am|You're|You are|We're|We are|They're|They are|He's|He is|She's|She is|It's|It is)\s+getting\s+/i, (match, pronoun) => {
        const shortPronoun = pronoun.includes("'") ? pronoun.split("'")[0] : pronoun.split(" ")[0];
        return `${shortPronoun} ___ `;
      });
    }
  },

  // Module 126: Get + adjective (present simple state changes) - 2 questions
  {
    pattern: /\b(I|You|We|They)\s+get\s+(tired|hungry|angry|nervous|sick|cold|excited|bored|lost|scared)\b/i,
    correctAnswer: "get",
    wrongAnswers: ["got", "getting"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They)\s+get\s+/i, (match, pronoun) => {
        return `${pronoun} ___ `;
      });
    }
  },

  // Module 126: Need to get + going/ready (necessity) - 1 question
  {
    pattern: /\bneed\s+to\s+get\s+(going|ready|dressed)\b/i,
    correctAnswer: "get",
    wrongAnswers: ["be", "go"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bneed\s+to\s+get\s+/i, "need to ___ ");
    }
  },

  // Module 127: Take expressions - took part in
  {
    pattern: /\b(I|You|We|They|He|She)\s+(take|takes|took)\s+part\s+in\b/i,
    correctAnswer: "take part",
    wrongAnswers: ["make part", "do part"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(take|takes|took)\s+part\s+in\b/i, (match, pronoun, verb) => {
        return `${pronoun} ${verb === 'took' ? 'took' : verb} ___ in`;
      });
    }
  },

  // Module 127: Take expressions - took place
  {
    pattern: /\b(The|A|An)\s+\w+\s+(takes|took)\s+place\b/i,
    correctAnswer: "place",
    wrongAnswers: ["part", "time"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(The|A|An)\s+(\w+)\s+(takes|took)\s+place\b/i, (match, article, noun, verb) => {
        return `${article} ${noun} ${verb} ___`;
      });
    }
  },

  // Module 127: Take care of
  {
    pattern: /\b(I'm|I|You're|You|We're|We|They're|They|He's|He|She's|She)\s+(taking|take|takes|took)\s+care\s+of\b/i,
    correctAnswer: "care",
    wrongAnswers: ["part", "place"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I'm|I|You're|You|We're|We|They're|They|He's|He|She's|She)\s+(taking|take|takes|took)\s+care\s+of\b/i, (match, pronoun, verb) => {
        const cleanPronoun = pronoun.includes("'") ? pronoun.split("'")[0] : pronoun;
        return `${cleanPronoun} ${verb} ___ of`;
      });
    }
  },

  // Module 128-129: Common phrasal verbs - turn off/on
  {
    pattern: /\b(I|You|We|They|He|She)\s+(turn|turned)\s+(off|on)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(turn|turned)\s+(off|on)\b/i, (match, pronoun, verb, particle) => {
        return `${pronoun} ${verb} ___`;
      });
    }
  },

  // Module 128-129: Phrasal verbs - give up
  {
    pattern: /\b(I|You|We|They|He|She)\s+(give|gives|gave)\s+up\b/i,
    correctAnswer: "up",
    wrongAnswers: ["off", "in"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(give|gives|gave)\s+up\b/i, (match, pronoun, verb) => {
        return `${pronoun} ${verb} ___`;
      });
    }
  },

  // Module 128-129: Phrasal verbs - wake up / get up
  {
    pattern: /\b(I|You|We|They|He|She)\s+(wake|woke|get|got)\s+up\b/i,
    correctAnswer: "up",
    wrongAnswers: ["down", "off"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(wake|woke|get|got)\s+up\b/i, (match, pronoun, verb) => {
        return `${pronoun} ${verb} ___`;
      });
    }
  },

  // Module 128-129: Phrasal verbs - look after (inseparable)
  {
    pattern: /\b(I|You|We|They|He|She)\s+(look|looks|looked)\s+after\b/i,
    correctAnswer: "after",
    wrongAnswers: ["for", "at"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(look|looks|looked)\s+after\b/i, (match, pronoun, verb) => {
        return `${pronoun} ${verb} ___`;
      });
    }
  },

  // Module 128-129: Phrasal verbs - come across
  {
    pattern: /\b(I|You|We|They|He|She)\s+(come|comes|came)\s+across\b/i,
    correctAnswer: "across",
    wrongAnswers: ["along", "through"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(come|comes|came)\s+across\b/i, (match, pronoun, verb) => {
        return `${pronoun} ${verb} ___`;
      });
    }
  },

  // Module 130: Make + noun collocations
  {
    pattern: /\b(I|You|We|They|He|She)\s+(make|makes|made)\s+(a decision|a mistake|money|a phone call|an effort|a plan|a list|a cake|a joke|a reservation|a suggestion|a complaint)\b/i,
    correctAnswer: "make",
    wrongAnswers: ["do", "have"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(make|makes|made)\s+/i, (match, pronoun, verb) => {
        return `${pronoun} ___`;
      });
    }
  },

  // Module 130: Do + noun collocations
  {
    pattern: /\b(I|You|We|They|He|She)\s+(do|does|did)\s+(my homework|the dishes|my best|business|the shopping|the cleaning|the project|the laundry|the ironing|yoga)\b/i,
    correctAnswer: "do",
    wrongAnswers: ["make", "have"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+(do|does|did)\s+/i, (match, pronoun, verb) => {
        return `${pronoun} ___`;
      });
    }
  },

  // Module 131: Indirect questions - Could you tell me
  {
    pattern: /\bCould\s+you\s+tell\s+me\s+(where|when|what|how|why)\b/i,
    correctAnswer: "Could you tell me",
    wrongAnswers: ["Can you tell me", "Do you tell me"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bCould\s+you\s+tell\s+me\s+/i, "___");
    }
  },

  // Module 132: Opinion expressions - I think
  {
    pattern: /\bI\s+think\s+(it's|it is|that|they)\b/i,
    correctAnswer: "think",
    wrongAnswers: ["believe", "say"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bI\s+think\s+/i, "I ___ ");
    }
  },

  // Module 132: Opinion expressions - I agree
  {
    pattern: /\bI\s+agree\s+(with|that)\b/i,
    correctAnswer: "agree",
    wrongAnswers: ["disagree", "think"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bI\s+agree\s+/i, "I ___ ");
    }
  },

  // Module 132: Opinion expressions - I believe
  {
    pattern: /\bI\s+believe\s+(it|that|this)\b/i,
    correctAnswer: "believe",
    wrongAnswers: ["think", "agree"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bI\s+believe\s+/i, "I ___ ");
    }
  },

  // === PHASE 1: Module 121 - If only patterns ===

  // Module 121: If only + had (past regrets) - FIX FOR 10 MISSING QUESTIONS
  {
    pattern: /\bIf\s+only\s+(I|you|we|they|he|she|it)\s+had\s+(studied|gone|taken|called|listened|prepared|known|worn|visited|saved|brought|arrived|checked|told|set)\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bIf\s+only\s+(I|you|we|they|he|she|it)\s+had\s+/i, (match, pronoun) => {
        return `If only ${pronoun} ___ `;
      });
    }
  },

  // Module 121: If only + hadn't (negative regrets)
  {
    pattern: /\bIf\s+only\s+(I|you|we|they|he|she|it)\s+hadn't\s+(spent|told|left|done|eaten|said)\b/i,
    correctAnswer: "hadn't",
    wrongAnswers: ["haven't", "hasn't"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bIf\s+only\s+(I|you|we|they|he|she|it)\s+hadn't\s+/i, (match, pronoun) => {
        return `If only ${pronoun} ___ `;
      });
    }
  },

  // === PHASE 2: Module 122 - Past habit context ===

  // Module 122: Past habit without explicit "used to" (context clue)
  {
    pattern: /\b(traveled|travelled|lived|worked|played|studied|went|ate|drank)\s+a\s+lot\s+(in\s+the\s+past|before|when\s+I\s+was\s+younger)\b/i,
    correctAnswer: "used to",
    wrongAnswers: ["use to", "am used to"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(traveled|travelled|lived|worked|played|studied|went|ate|drank)\s+a\s+lot/i, (match, verb) => {
        return `___ ${verb} a lot`;
      });
    }
  },

  // === PHASE 3: Module 123 - Causative patterns ===

  // Module 123: Had + object + past participle
  {
    pattern: /\b(I|You|We|They|He|She)\s+had\s+(my|your|his|her|our|their|the)\s+(\w+)\s+(fixed|repaired|cleaned|painted|checked|cut|delivered|installed|washed|serviced|done)\b/i,
    correctAnswer: "had",
    wrongAnswers: ["have", "has"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+had\s+/i, (match, pronoun) => {
        return `${pronoun} ___ `;
      });
    }
  },

  // Module 123: Got + object + past participle
  {
    pattern: /\b(I|You|We|They|He|She)\s+got\s+(my|your|his|her|our|their|the)\s+(\w+)\s+(fixed|repaired|cut|cleaned|serviced|delivered|installed)\b/i,
    correctAnswer: "got",
    wrongAnswers: ["get", "getting"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They|He|She)\s+got\s+/i, (match, pronoun) => {
        return `${pronoun} ___ `;
      });
    }
  },

  // Module 123: Having + object + past participle (progressive)
  {
    pattern: /\b(I'm|You're|We're|They're|He's|She's)\s+having\s+(my|your|his|her|our|their|the)\s+(\w+)\s+(fixed|painted|repaired|installed|cleaned)\b/i,
    correctAnswer: "having",
    wrongAnswers: ["have", "had"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I'm|You're|We're|They're|He's|She's)\s+having\s+/i, (match, pronoun) => {
        const shortPronoun = pronoun.split("'")[0];
        return `${shortPronoun} ___ `;
      });
    }
  },

  // Module 123: Get + object + past participle (present)
  {
    pattern: /\b(I|You|We|They)\s+get\s+(my|your|our|their|the)\s+(\w+)\s+(fixed|cut|cleaned|delivered)\b/i,
    correctAnswer: "get",
    wrongAnswers: ["got", "getting"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(I|You|We|They)\s+get\s+/i, (match, pronoun) => {
        return `${pronoun} ___ `;
      });
    }
  },

  // === PHASE 4: Module 124 - Relative Clause patterns ===

  // Module 124: Where (for places)
  {
    pattern: /\b(The|A|An|This|That)\s+(restaurant|place|city|house|room|park|school|store|hotel|café|cafe)\s+where\s+/i,
    correctAnswer: "where",
    wrongAnswers: ["which", "that"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\s+where\s+/i, " ___ ");
    }
  },

  // Module 124: That (general relative)
  {
    pattern: /\b(The|A|An|This)\s+(\w+)\s+that\s+(I|you|we|they|he|she)\s+(found|saw|bought|met|told|heard|read|wrote|made)\b/i,
    correctAnswer: "that",
    wrongAnswers: ["which", "who"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\s+that\s+/i, " ___ ");
    }
  },

  // === PHASE 5: Module 125 - Gerund/Infinitive patterns ===

  // Module 125: Enjoy/finish/avoid/stop + gerund
  {
    pattern: /\b(I|You|We|They|He|She)\s+(enjoy|enjoys|finish|finishes|avoid|avoids|stop|stopped|can't\s+stand)\s+(\w+ing)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(enjoy|enjoys|finish|finishes|avoid|avoids|stop|stopped|can't\s+stand)\s+(\w+ing)\b/i, (match, verb, gerund) => {
        return `${verb} ___`;
      });
    }
  },

  // Module 125: Plan/want/need/decide/hope + to infinitive
  {
    pattern: /\b(I|You|We|They|He|She)\s+(plan|plans|want|wants|need|needs|decide|decided|hope|hopes)\s+to\s+(\w+)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(plan|plans|want|wants|need|needs|decide|decided|hope|hopes)\s+to\s+(\w+)\b/i, (match, verb, baseVerb) => {
        return `${verb} ___`;
      });
    }
  },

  // Module 125: Forget/remember + to infinitive or gerund
  {
    pattern: /\b(I|You|We|They|He|She)\s+(forget|forgot|remember|remembered)\s+(to\s+\w+|\w+ing)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(forget|forgot|remember|remembered)\s+(to\s+\w+|\w+ing)\b/i, (match, verb, complement) => {
        return `${verb} ___`;
      });
    }
  },

  // === PHASE 6: Module 127 - Additional Take expressions ===

  // Module 127: Take a + noun (break, look, shower, photo, etc.)
  {
    pattern: /\b(take|takes|took|taking)\s+a\s+(break|look|shower|photo|picture|rest|seat|chance|walk|nap|bath)\b/i,
    correctAnswer: "take a",
    wrongAnswers: ["make a", "do a"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(take|takes|took|taking)\s+a\s+/i, (match, verb) => {
        const tense = verb.toLowerCase() === 'take' || verb.toLowerCase() === 'takes' ? 'take a' :
                      verb.toLowerCase() === 'taking' ? 'taking a' : 'took a';
        return sentence.includes(verb) ? '___ ' : tense + ' ';
      });
    }
  },

  // Module 127: Take advantage of
  {
    pattern: /\b(take|taking|took)\s+advantage\s+of\b/i,
    correctAnswer: "advantage",
    wrongAnswers: ["benefit", "opportunity"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(take|taking|took)\s+advantage\s+of\b/i, (match, verb) => {
        return `${verb} ___ of`;
      });
    }
  },

  // Module 127: Take notes
  {
    pattern: /\b(take|taking|took)\s+notes\b/i,
    correctAnswer: "notes",
    wrongAnswers: ["photos", "pictures"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(take|taking|took)\s+notes\b/i, (match, verb) => {
        return `${verb} ___`;
      });
    }
  },

  // Module 127: Take responsibility/action/time
  {
    pattern: /\b(take|takes|took|taking)\s+(responsibility|action|time)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(take|takes|took|taking)\s+(responsibility|action|time)\b/i);
      if (match) {
        const noun = match[2];
        return sentence.replace(/\b(take|takes|took|taking)\s+(responsibility|action|time)\b/i, (m, verb) => {
          return `${verb} ___`;
        });
      }
      return sentence;
    }
  },

  // === PHASE 7: Modules 128-129 - Additional Phrasal Verbs ===

  // Modules 128-129: Give back (separable)
  {
    pattern: /\b(give|gives|gave|giving)\s+(the|my|your|his|her|it)\s+\w+\s+back\b/i,
    correctAnswer: "back",
    wrongAnswers: ["up", "away"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(give|gives|gave|giving)\s+(the|my|your|his|her|it)\s+(\w+)\s+back\b/i, (match, verb, det, noun) => {
        return `${verb} ${det} ${noun} ___`;
      });
    }
  },

  // Modules 128-129: Look for
  {
    pattern: /\b(look|looking|looked)\s+for\b/i,
    correctAnswer: "for",
    wrongAnswers: ["after", "at"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(look|looking|looked)\s+for\b/i, (match, verb) => {
        return `${verb} ___`;
      });
    }
  },

  // Modules 128-129: Find out
  {
    pattern: /\b(find|finding|found)\s+out\b/i,
    correctAnswer: "out",
    wrongAnswers: ["up", "in"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(find|finding|found)\s+out\b/i, (match, verb) => {
        return `${verb} ___`;
      });
    }
  },

  // Modules 128-129: Check in/out
  {
    pattern: /\b(check|checking|checked)\s+(in|out)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(check|checking|checked)\s+(in|out)\b/i);
      if (match) {
        const verb = match[1];
        return sentence.replace(/\b(check|checking|checked)\s+(in|out)\b/i, `${verb} ___`);
      }
      return sentence;
    }
  },

  // Modules 128-129: Go out / Come back
  {
    pattern: /\b(go|going|went)\s+out\b/i,
    correctAnswer: "out",
    wrongAnswers: ["in", "up"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(go|going|went)\s+out\b/i, (match, verb) => {
        return `${verb} ___`;
      });
    }
  },

  {
    pattern: /\b(come|coming|came)\s+back\b/i,
    correctAnswer: "back",
    wrongAnswers: ["out", "in"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(come|coming|came)\s+back\b/i, (match, verb) => {
        return `${verb} ___`;
      });
    }
  },

  // === PHASE 8: Module 130 - Enhanced Make/Do patterns ===

  // Module 130: Make + a lot of money (specific phrase)
  {
    pattern: /\b(make|makes|made)\s+a\s+lot\s+of\s+money\b/i,
    correctAnswer: "make",
    wrongAnswers: ["do", "earn"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(make|makes|made)\s+/i, (match, verb) => {
        return "___ ";
      });
    }
  },

  // Module 130: Make + noun (comprehensive)
  {
    pattern: /\b(make|makes|made)\s+(a\s+plan|a\s+toast|an\s+excuse|an\s+agreement|a\s+mess|a\s+difference|progress|breakfast)\b/i,
    correctAnswer: "make",
    wrongAnswers: ["do", "have"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(make|makes|made)\s+/i, "___ ");
    }
  },

  // Module 130: Do + the + noun
  {
    pattern: /\b(do|does|did)\s+(the\s+vacuuming|the\s+windows|yoga|exercise|damage)\b/i,
    correctAnswer: "do",
    wrongAnswers: ["make", "have"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(do|does|did)\s+/i, "___ ");
    }
  },

  // === PHASE 9: Module 131 - Indirect Question patterns ===

  // Module 131: Do you know...
  {
    pattern: /\bDo\s+you\s+know\s+(where|when|what|how|why|who)\b/i,
    correctAnswer: "Do you know",
    wrongAnswers: ["Did you know", "Are you knowing"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bDo\s+you\s+know\s+/i, "___ ");
    }
  },

  // Module 131: I was wondering...
  {
    pattern: /\bI\s+was\s+wondering\s+(where|when|what|how|why|who|if)\b/i,
    correctAnswer: "I was wondering",
    wrongAnswers: ["I am wondering", "I wonder"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bI\s+was\s+wondering\s+/i, "___ ");
    }
  },

  // Module 131: Can you tell me...
  {
    pattern: /\bCan\s+you\s+tell\s+me\s+(where|when|what|how|why|who)\b/i,
    correctAnswer: "Can you tell me",
    wrongAnswers: ["Could you tell me", "Do you tell me"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bCan\s+you\s+tell\s+me\s+/i, "___ ");
    }
  },

  // === PHASE 10: Module 132 - Enhanced Opinion patterns ===

  // Module 132: In my opinion / From my point of view
  {
    pattern: /\b(In\s+my\s+opinion|From\s+my\s+point\s+of\s+view|As\s+far\s+as\s+I'm\s+concerned)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(In\s+my\s+opinion|From\s+my\s+point\s+of\s+view|As\s+far\s+as\s+I'm\s+concerned)\b/i);
      if (match) {
        const phrase = match[1];
        return sentence.replace(phrase, "___");
      }
      return sentence;
    }
  },

  // Module 132: Yes, I agree / No, I disagree
  {
    pattern: /\b(Yes,\s+I\s+agree|No,\s+I\s+disagree|I\s+don't\s+agree)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(Yes,\s+I\s+agree|No,\s+I\s+disagree|I\s+don't\s+agree)\b/i, "___");
    }
  },

  // Module 132: Exactly / Absolutely / That's right
  {
    pattern: /\b(Exactly|Absolutely|That's\s+right|You're\s+right)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(Exactly|Absolutely|That's\s+right|You're\s+right)\b/i);
      if (match) {
        return sentence.replace(match[1], "___");
      }
      return sentence;
    }
  },

  // === MODULE 133: Speculating and Expressing Possibility ===

  // Module 133: might/may/could + be (possibility)
  {
    pattern: /\b(might|may|could)\s+(be|have|come|call|forget|rain|snow)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(might|may|could)\s+/i, "___ ");
    }
  },

  // Module 133: must be (strong assumption)
  {
    pattern: /\bmust\s+(be|have)\b/i,
    correctAnswer: "must",
    wrongAnswers: ["might", "could"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bmust\s+/i, "___ ");
    }
  },

  // Module 133: can't be / can't have (impossibility)
  {
    pattern: /\bcan't\s+(be|have)\b/i,
    correctAnswer: "can't",
    wrongAnswers: ["must", "might"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bcan't\s+/i, "___ ");
    }
  },

  // Module 133: Maybe/Perhaps at sentence start
  {
    pattern: /^(Maybe|Perhaps)\s+/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/^(Maybe|Perhaps)\s+/i, "___ ");
    }
  },

  // Module 133: It's possible/likely that
  {
    pattern: /\bIt's\s+(possible|likely|unlikely)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\bIt's\s+(possible|likely|unlikely)\b/i);
      if (match) {
        return sentence.replace(/\bIt's\s+(possible|likely|unlikely)\b/i, "It's ___");
      }
      return sentence;
    }
  },

  // === MODULE 134: Second Conditional (Hypothetical Situations) ===

  // Module 134: would + base verb (second conditional)
  {
    pattern: /\bwould\s+(buy|travel|help|learn|go|fly|say|do|make|take|give|call|live|eat|drink|sleep|work|play|watch|read)\b/i,
    correctAnswer: "would",
    wrongAnswers: ["will", "could"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bwould\s+/i, "___ ");
    }
  },

  // Module 134: If I were you (special subjunctive)
  {
    pattern: /\bIf\s+(I|you|he|she|it|we|they)\s+were\b/i,
    correctAnswer: "were",
    wrongAnswers: ["was", "are"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\b(If\s+(?:I|you|he|she|it|we|they))\s+were\b/i, "$1 ___");
    }
  },

  // Module 134: Second conditional - If + past simple
  {
    pattern: /\bIf\s+(?:I|you|we|they|he|she|it)\s+(had|won|lost|saw|met|found|broke|lived|knew|went)\b/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\bIf\s+(I|you|we|they|he|she|it)\s+(had|won|lost|saw|met|found|broke|lived|knew|went)\b/i);
      if (match) {
        const verb = match[2];
        return sentence.replace(new RegExp(`\\b${verb}\\b`, 'i'), "___");
      }
      return sentence;
    }
  },

  // === MODULE 135: Expressing Preferences ===

  // Module 135: I prefer X to Y
  {
    pattern: /\bI\s+prefer\s+\w+\s+to\b/i,
    correctAnswer: "to",
    wrongAnswers: ["than", "over"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bI\s+prefer\s+(\w+)\s+to\b/i, "I prefer $1 ___");
    }
  },

  // Module 135: I'd rather + base verb
  {
    pattern: /\bI'd\s+rather\b/i,
    correctAnswer: "rather",
    wrongAnswers: ["prefer", "better"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bI'd\s+rather\b/i, "I'd ___");
    }
  },

  // === MODULE 136: Sequencing Words (Narratives) ===

  // Module 136: First, ... (sentence start)
  {
    pattern: /^First,/i,
    correctAnswer: "First",
    wrongAnswers: ["Firstly", "At first"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/^First,/i, "___,");
    }
  },

  // Module 136: Then, ...
  {
    pattern: /\bThen,/i,
    correctAnswer: "Then",
    wrongAnswers: ["Than", "Next"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bThen,/i, "___,");
    }
  },

  // Module 136: After that, ...
  {
    pattern: /\bAfter\s+that,/i,
    correctAnswer: "After that",
    wrongAnswers: ["After this", "Later"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bAfter\s+that,/i, "___,");
    }
  },

  // Module 136: Finally, ...
  {
    pattern: /\bFinally,/i,
    correctAnswer: "Finally",
    wrongAnswers: ["At last", "Lastly"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bFinally,/i, "___,");
    }
  },

  // Module 136: In the end, ...
  {
    pattern: /\bIn\s+the\s+end,/i,
    correctAnswer: "In the end",
    wrongAnswers: ["At the end", "Finally"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bIn\s+the\s+end,/i, "___,");
    }
  },

  // === MODULE 137: Linking Words (Contrast) ===

  // Module 137: although/though/even though + clause
  {
    pattern: /\b(although|though|even\s+though)\s+/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(although|though|even\s+though)\s+/i);
      if (match) {
        return sentence.replace(match[1], "___");
      }
      return sentence;
    }
  },

  // Module 137: despite/in spite of + noun/gerund
  {
    pattern: /\b(despite|in\s+spite\s+of)\s+/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(despite|in\s+spite\s+of)\s+/i);
      if (match) {
        return sentence.replace(match[1], "___");
      }
      return sentence;
    }
  },

  // Module 137: However, ... (sentence connector)
  {
    pattern: /\.\s+However,/i,
    correctAnswer: "However",
    wrongAnswers: ["But", "Although"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\.\s+However,/i, ". ___,");
    }
  },

  // === MODULE 139: Cause and Effect ===

  // Module 139: , so + clause (result)
  {
    pattern: /,\s+so\s+/i,
    correctAnswer: "so",
    wrongAnswers: ["because", "but"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/,\s+so\s+/i, ", ___ ");
    }
  },

  // Module 139: because + clause (reason)
  {
    pattern: /\sbecause\s+(?!of)/i,
    correctAnswer: "because",
    wrongAnswers: ["so", "since"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\sbecause\s+/i, " ___ ");
    }
  },

  // Module 139: because of + noun
  {
    pattern: /\bbecause\s+of\s+/i,
    correctAnswer: "because of",
    wrongAnswers: ["because", "due to"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bbecause\s+of\s+/i, "___ ");
    }
  },

  // Module 139: due to/thanks to + noun
  {
    pattern: /\b(due\s+to|thanks\s+to)\s+/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(due\s+to|thanks\s+to)\s+/i);
      if (match) {
        return sentence.replace(match[1], "___");
      }
      return sentence;
    }
  },

  // === MODULE 140: Purpose ===

  // Module 140: to + infinitive (purpose)
  {
    pattern: /\s+to\s+(get|buy|catch|study|learn|save|improve|avoid|find|help|support|pass|stay|travel|decorate|make|spend|finish|arrive|win|take|lose|understand|remember|wake|see|look|be)\b/i,
    correctAnswer: "to",
    wrongAnswers: ["for", "in order"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\s+to\s+(get|buy|catch|study|learn|save|improve|avoid|find|help|support|pass|stay|travel|decorate|make|spend|finish|arrive|win|take|lose|understand|remember|wake|see|look|be)\b/i, " ___ $1");
    }
  },

  // Module 140: in order to + infinitive
  {
    pattern: /\bin\s+order\s+to\s+/i,
    correctAnswer: "in order to",
    wrongAnswers: ["to", "so that"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bin\s+order\s+to\s+/i, "___ ");
    }
  },

  // Module 140: so that + clause
  {
    pattern: /\bso\s+that\s+/i,
    correctAnswer: "so that",
    wrongAnswers: ["to", "in order to"],
    gapReplacer: (sentence, correct) => {
      return sentence.replace(/\bso\s+that\s+/i, "___ ");
    }
  },

  // === MODULE 141: Work Vocabulary ===

  // Module 141: Workplace (at/in + place)
  {
    pattern: /\b(works?|work)\s+(at|in)\s+a?\s*(school|hospital|restaurant|garage|police\s+station|office|hotel|factory|clinic|library|salon|warehouse|construction\s+site)/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(works?|work)\s+(at|in)\s+a?\s*(school|hospital|restaurant|garage|police\s+station|office|hotel|factory|clinic|library|salon|warehouse|construction\s+site)/i);
      if (match) {
        const workplace = match[3];
        return sentence.replace(new RegExp(`\\b${workplace}\\b`, 'i'), "___");
      }
      return sentence;
    }
  },

  // Module 141: Job action (verb + object)
  {
    pattern: /\b(prepares?|teaches?|helps?|drives?|takes?|answers?|writes?|serves?|fixes?|protects?|builds?|examines?|treats?|sells?|cleans?|cuts?|styles?|delivers?|greets?)\s+(food|students|patients|vehicles?|payments|phones|emails|customers|machines|people|buildings|hair|packages|calls)/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(prepares?|teaches?|helps?|drives?|takes?|answers?|writes?|serves?|fixes?|protects?|builds?|examines?|treats?|sells?|cleans?|cuts?|styles?|delivers?|greets?)\s+(food|students|patients|vehicles?|payments|phones|emails|customers|machines|people|buildings|hair|packages|calls)/i);
      if (match) {
        const action = match[1];
        return sentence.replace(new RegExp(`\\b${action}\\b`, 'i'), "___");
      }
      return sentence;
    }
  },

  // === MODULE 142: Education Vocabulary ===

  // Module 142: Academic terms
  {
    pattern: /\b(curriculum|scholarship|degree|thesis|internship|faculty|assignment|lecture|seminar|campus|tuition\s+fees?)/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(curriculum|scholarship|degree|thesis|internship|faculty|assignment|lecture|seminar|campus|tuition\s+fees?)/i);
      if (match) {
        const term = match[1];
        return sentence.replace(new RegExp(`\\b${term}\\b`, 'i'), "___");
      }
      return sentence;
    }
  },

  // Module 142: Education collocations
  {
    pattern: /\b(undergraduate|postgraduate|graduate|enroll|drop\s+out|academic\s+performance|distance\s+learning|extracurricular\s+activities)/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(undergraduate|postgraduate|graduate|enroll|drop\s+out|academic\s+performance|distance\s+learning|extracurricular\s+activities)/i);
      if (match) {
        const term = match[1];
        return sentence.replace(new RegExp(`\\b${term}\\b`, 'i'), "___");
      }
      return sentence;
    }
  },

  // === MODULE 143: Technology Vocabulary ===

  // Module 143: Tech device names
  {
    pattern: /\b(smartphone|tablet|laptop|USB\s+drive|smartwatch|headphones|wearable\s+technology|smart\s+speaker|fitness\s+tracker)/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(smartphone|tablet|laptop|USB\s+drive|smartwatch|headphones|wearable\s+technology|smart\s+speaker|fitness\s+tracker)/i);
      if (match) {
        const device = match[1];
        return sentence.replace(new RegExp(`\\b${device}\\b`, 'i'), "___");
      }
      return sentence;
    }
  },

  // Module 143: Tech terms and actions
  {
    pattern: /\b(Wi-Fi\s+connection|cloud\s+computing|search\s+engine|social\s+media|cybersecurity|software\s+update|online\s+privacy|streaming|download|upload|Bluetooth)/i,
    correctAnswer: "",
    wrongAnswers: [],
    gapReplacer: (sentence, correct) => {
      const match = sentence.match(/\b(Wi-Fi\s+connection|cloud\s+computing|search\s+engine|social\s+media|cybersecurity|software\s+update|online\s+privacy|streaming|download|upload|Bluetooth)/i);
      if (match) {
        const term = match[1];
        return sentence.replace(new RegExp(`\\b${term}\\b`, 'i'), "___");
      }
      return sentence;
    }
  }

];

// Helper function to add -s/-es to verbs for third person
function addThirdPersonS(verb: string): string {
  // Common irregular verbs
  const irregulars: { [key: string]: string } = {
    'go': 'goes',
    'do': 'does',
    'have': 'has',
    'study': 'studies',
    'try': 'tries',
    'fly': 'flies'
  };

  if (irregulars[verb.toLowerCase()]) {
    return irregulars[verb.toLowerCase()];
  }

  // Regular rules
  if (verb.endsWith('s') || verb.endsWith('sh') || verb.endsWith('ch') ||
      verb.endsWith('x') || verb.endsWith('z')) {
    return verb + 'es';
  } else if (verb.endsWith('y') && !/[aeiou]y$/i.test(verb)) {
    return verb.slice(0, -1) + 'ies';
  } else {
    return verb + 's';
  }
}

// Helper function to remove -s/-es from verbs
function removeThirdPersonS(verb: string): string {
  const irregulars: { [key: string]: string } = {
    'goes': 'go',
    'does': 'do',
    'has': 'have',
    'studies': 'study',
    'tries': 'try',
    'flies': 'fly'
  };

  if (irregulars[verb.toLowerCase()]) {
    return irregulars[verb.toLowerCase()];
  }

  if (verb.endsWith('ies')) {
    return verb.slice(0, -3) + 'y';
  } else if (verb.endsWith('es')) {
    return verb.slice(0, -2);
  } else if (verb.endsWith('s') && verb.length > 1) {
    return verb.slice(0, -1);
  }

  return verb;
}

export function generateMultipleChoiceQuestion(answerSentence: string, seed?: number): MultipleChoiceQuestion | null {
  // Clean the sentence
  const cleanSentence = answerSentence.replace(/["""]/g, '"').trim();

  // Use seed for deterministic shuffle, or default to hash of sentence for consistency
  const questionSeed = seed ?? hashString(cleanSentence);

  for (const pattern of grammarPatterns) {
    const match = cleanSentence.match(pattern.pattern);
    if (match) {
      let correctAnswer = pattern.correctAnswer;
      let wrongAnswers = [...pattern.wrongAnswers];

      // Handle dynamic patterns based on context
      if (pattern.correctAnswer === "" && match.length >= 2) {
        correctAnswer = generateDynamicAnswer(match, cleanSentence);
        wrongAnswers = generateDynamicWrongAnswers(match, cleanSentence, correctAnswer);
      }

      // Generate the gap-fill prompt
      const prompt = pattern.gapReplacer(cleanSentence, correctAnswer);

      // Create options array with deterministic shuffle
      const allOptions = [correctAnswer, ...wrongAnswers];
      const shuffledOptions = seededShuffleArray([...allOptions], questionSeed);

      const options: MultipleChoiceOption[] = shuffledOptions.map((option, index) => ({
        letter: (['A', 'B', 'C'] as const)[index],
        text: option,
        correct: option === correctAnswer
      }));

      return {
        prompt,
        options: options.slice(0, 3) // Ensure only 3 options
      };
    }
  }

  // Fallback: Create a smart question based on advanced patterns
  return createAdvancedFallbackQuestion(cleanSentence, questionSeed);
}

// Simple string hash for deterministic seed from sentence
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Helper function to detect phrasal verbs
function detectPhrasalVerb(sentence: string): boolean {
  const phrasalVerbParticles = ['up', 'down', 'off', 'on', 'in', 'out', 'after', 'for', 'across', 'along', 'through', 'back', 'away', 'over'];
  const lowerSentence = sentence.toLowerCase();

  // Common phrasal verb patterns
  const phrasalPatterns = [
    'wake up', 'get up', 'give up', 'turn off', 'turn on', 'pick up', 'look after',
    'come across', 'check in', 'check out', 'look for', 'go out', 'come back'
  ];

  return phrasalPatterns.some(pv => lowerSentence.includes(pv));
}

// Smart fallback for Get expressions
function createGetExpressionMCQ(sentence: string, seed: number): MultipleChoiceQuestion | null {
  const lowerSentence = sentence.toLowerCase();

  // Detect get/getting/got
  if (lowerSentence.includes('getting')) {
    return {
      prompt: sentence.replace(/\b(I'm|You're|We're|They're|He's|She's|It's)\s+getting\b/i, (match, pronoun) => {
        const shortPronoun = pronoun.includes("'") ? pronoun.split("'")[0] : pronoun;
        return `${shortPronoun} ___`;
      }),
      options: seededShuffleArray([
        { letter: 'A', text: 'getting', correct: true },
        { letter: 'B', text: 'get', correct: false },
        { letter: 'C', text: 'got', correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  if (lowerSentence.includes(' got ')) {
    return {
      prompt: sentence.replace(/\b(I|You|We|They|He|She|It|The\s+\w+)\s+got\b/i, (match, pronoun) => {
        return `${pronoun} ___`;
      }),
      options: seededShuffleArray([
        { letter: 'A', text: 'got', correct: true },
        { letter: 'B', text: 'get', correct: false },
        { letter: 'C', text: 'getting', correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  if (lowerSentence.includes(' get ')) {
    return {
      prompt: sentence.replace(/\b(I|You|We|They)\s+get\b/i, (match, pronoun) => {
        return `${pronoun} ___`;
      }),
      options: seededShuffleArray([
        { letter: 'A', text: 'get', correct: true },
        { letter: 'B', text: 'got', correct: false },
        { letter: 'C', text: 'getting', correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  return null;
}

// Smart fallback for phrasal verbs
function createPhrasalVerbMCQ(sentence: string, seed: number): MultipleChoiceQuestion | null {
  const lowerSentence = sentence.toLowerCase();

  // Common phrasal verb particles to test
  const particleMap: {[key: string]: string[]} = {
    'up': ['down', 'off'],
    'off': ['on', 'out'],
    'on': ['off', 'out'],
    'after': ['for', 'at'],
    'across': ['along', 'through'],
    'in': ['out', 'up'],
    'out': ['in', 'up'],
    'back': ['away', 'up']
  };

  // Try to detect the particle
  for (const [particle, wrongParticles] of Object.entries(particleMap)) {
    const particlePattern = new RegExp(`\\b(\\w+)\\s+${particle}\\b`, 'i');
    const match = sentence.match(particlePattern);

    if (match) {
      const verb = match[1];
      return {
        prompt: sentence.replace(particlePattern, `${verb} ___`),
        options: seededShuffleArray([
          { letter: 'A', text: particle, correct: true },
          { letter: 'B', text: wrongParticles[0], correct: false },
          { letter: 'C', text: wrongParticles[1], correct: false }
        ], seed).map((option, index) => ({
          ...option,
          letter: (['A', 'B', 'C'] as const)[index]
        }))
      };
    }
  }

  return null;
}

function createAdvancedFallbackQuestion(sentence: string, seed: number): MultipleChoiceQuestion | null {
  const lowerSentence = sentence.toLowerCase();

  // Advanced pattern recognition for better fallbacks

  // Priority 1: Get expressions (Module 126)
  if (lowerSentence.includes('get') || lowerSentence.includes('getting') || lowerSentence.includes('got')) {
    const getMCQ = createGetExpressionMCQ(sentence, seed);
    if (getMCQ) return getMCQ;
  }

  // Priority 2: Phrasal verbs (Modules 128-129)
  if (detectPhrasalVerb(lowerSentence)) {
    const phrasalMCQ = createPhrasalVerbMCQ(sentence, seed);
    if (phrasalMCQ) return phrasalMCQ;
  }

  // Priority 3: Modal verbs - can, could, should, would, must, might
  const modalPattern = /\b(can|could|should|would|must|might)\s+/i;
  const modalMatch = sentence.match(modalPattern);
  if (modalMatch) {
    const modal = modalMatch[1].toLowerCase();
    const wrongModals = ['can', 'could', 'should', 'would', 'must', 'might']
      .filter(m => m !== modal)
      .slice(0, 2);

    return {
      prompt: sentence.replace(modalPattern, '___ '),
      options: seededShuffleArray([
        { letter: 'A', text: modal, correct: true },
        { letter: 'B', text: wrongModals[0], correct: false },
        { letter: 'C', text: wrongModals[1], correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  // Present Perfect - have/has + past participle
  const presentPerfectPattern = /\b(have|has)\s+(been|gone|seen|eaten|drunk|made|taken|played|worked)\b/i;
  const ppMatch = sentence.match(presentPerfectPattern);
  if (ppMatch) {
    const auxiliary = ppMatch[1].toLowerCase();
    const wrongAux = auxiliary === 'have' ? ['has', 'had'] : ['have', 'had'];

    return {
      prompt: sentence.replace(presentPerfectPattern, (match, aux, verb) => `___ ${verb}`),
      options: seededShuffleArray([
        { letter: 'A', text: auxiliary, correct: true },
        { letter: 'B', text: wrongAux[0], correct: false },
        { letter: 'C', text: wrongAux[1], correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  // Simple past vs present - analyze verb forms
  const pastVerbPattern = /\b(played|worked|visited|watched|went|came|saw|ate|drank|made|took)\b/i;
  const pastMatch = sentence.match(pastVerbPattern);
  if (pastMatch) {
    const pastVerb = pastMatch[1].toLowerCase();
    let wrongForms;

    // Handle irregular verbs
    const irregularMap: { [key: string]: { base: string; present: string } } = {
      'went': { base: 'go', present: 'goes' },
      'came': { base: 'come', present: 'comes' },
      'saw': { base: 'see', present: 'sees' },
      'ate': { base: 'eat', present: 'eats' },
      'drank': { base: 'drink', present: 'drinks' },
      'made': { base: 'make', present: 'makes' },
      'took': { base: 'take', present: 'takes' }
    };

    if (irregularMap[pastVerb]) {
      wrongForms = [irregularMap[pastVerb].base, irregularMap[pastVerb].present];
    } else {
      // Regular verbs ending in -ed
      const baseVerb = pastVerb.replace(/ed$/, '');
      wrongForms = [baseVerb, baseVerb + 's'];
    }

    return {
      prompt: sentence.replace(pastVerbPattern, '___'),
      options: seededShuffleArray([
        { letter: 'A', text: pastVerb, correct: true },
        { letter: 'B', text: wrongForms[0], correct: false },
        { letter: 'C', text: wrongForms[1], correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  // Present continuous - am/is/are + verb-ing
  const continuousPattern = /\b(am|is|are)\s+(\w+ing)\b/i;
  const contMatch = sentence.match(continuousPattern);
  if (contMatch) {
    const auxiliary = contMatch[1].toLowerCase();
    const wrongAux = auxiliary === 'am' ? ['is', 'are'] :
                    auxiliary === 'is' ? ['am', 'are'] :
                    ['am', 'is'];

    return {
      prompt: sentence.replace(continuousPattern, (match, aux, verb) => `___ ${verb}`),
      options: seededShuffleArray([
        { letter: 'A', text: auxiliary, correct: true },
        { letter: 'B', text: wrongAux[0], correct: false },
        { letter: 'C', text: wrongAux[1], correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  // Simple be verb patterns (original fallback, but improved)
  if (lowerSentence.includes(' am ')) {
    return {
      prompt: sentence.replace(/ am /i, ' ___ '),
      options: seededShuffleArray([
        { letter: 'A', text: 'am', correct: true },
        { letter: 'B', text: 'is', correct: false },
        { letter: 'C', text: 'are', correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  if (lowerSentence.includes(' is ')) {
    return {
      prompt: sentence.replace(/ is /i, ' ___ '),
      options: seededShuffleArray([
        { letter: 'A', text: 'am', correct: false },
        { letter: 'B', text: 'is', correct: true },
        { letter: 'C', text: 'are', correct: false }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  if (lowerSentence.includes(' are ')) {
    return {
      prompt: sentence.replace(/ are /i, ' ___ '),
      options: seededShuffleArray([
        { letter: 'A', text: 'am', correct: false },
        { letter: 'B', text: 'is', correct: false },
        { letter: 'C', text: 'are', correct: true }
      ], seed).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  // If no pattern matches, return null (don't create a random question)
  return null;
}

// Dynamic answer generation for complex patterns
function generateDynamicAnswer(match: RegExpMatchArray, sentence: string): string {
  const fullMatch = match[0];
  const pronoun = match[1]?.toLowerCase();
  const verb = match[2]?.toLowerCase();

  // Module 121: If only + had/were patterns
  if (fullMatch.toLowerCase().includes('if only') && (verb === 'had' || verb === 'were')) {
    return verb;
  }

  // Module 122: Be used to patterns
  if (fullMatch.includes('used to') && (fullMatch.includes(' am ') || fullMatch.includes(' is ') || fullMatch.includes(' are '))) {
    if (pronoun === 'i') return 'am';
    if (['he', 'she', 'it'].includes(pronoun)) return 'is';
    if (['you', 'we', 'they'].includes(pronoun)) return 'are';
  }

  // Module 123: Causative have/get done patterns
  if ((fullMatch.includes('had') || fullMatch.includes('got')) && sentence.toLowerCase().match(/\b(fixed|repaired|cleaned|painted|checked|cut|delivered|installed|washed|serviced|done)\b/)) {
    if (fullMatch.includes('had')) return 'had';
    if (fullMatch.includes('got')) return 'got';
  }

  // Module 124: Relative clause patterns (where/that)
  if (fullMatch.includes('where') || fullMatch.includes('that')) {
    const relativeMatch = sentence.match(/\b(where|that)\b/i);
    return relativeMatch ? relativeMatch[1] : 'where';
  }

  // Module 125: Gerund/Infinitive patterns
  if (fullMatch.includes('enjoy') && verb === 'enjoys') {
    const gerundMatch = sentence.match(/enjoy(?:s)?\s+(\w+ing)/i);
    return gerundMatch ? gerundMatch[1] : 'playing';
  }
  if (fullMatch.includes('decide') || fullMatch.includes('want') || fullMatch.includes('need')) {
    const infinitiveMatch = sentence.match(/\bto\s+(\w+)\b/i);
    return infinitiveMatch ? `to ${infinitiveMatch[1]}` : 'to go';
  }

  // Module 133: Modal verbs for speculation
  if (fullMatch.match(/\b(might|may|could)\s+/i)) {
    const modalMatch = fullMatch.match(/\b(might|may|could)\b/i);
    return modalMatch ? modalMatch[1] : 'might';
  }

  // Module 133: Maybe/Perhaps detection
  if (fullMatch.match(/^(Maybe|Perhaps)\s+/i)) {
    const maybeMatch = fullMatch.match(/^(Maybe|Perhaps)\b/i);
    return maybeMatch ? maybeMatch[1] : 'Maybe';
  }

  // Module 133: It's possible/likely
  if (fullMatch.match(/It's\s+(possible|likely|unlikely)/i)) {
    const possibleMatch = fullMatch.match(/It's\s+(possible|likely|unlikely)/i);
    return possibleMatch ? possibleMatch[1] : 'possible';
  }

  // Module 134: Second conditional patterns
  if (fullMatch.includes('would') && verb) {
    return verb; // The base verb after would
  }

  // Module 136: Sequencing words
  if (fullMatch.match(/^(First|Then|Next|Later|Finally|Eventually)/i)) {
    const seqMatch = fullMatch.match(/^(First|Then|Next|Later|Finally|Eventually)/i);
    return seqMatch ? seqMatch[1] : 'First';
  }

  // Module 137: Linking words
  if (fullMatch.match(/\b(although|though|even though|despite|in spite of)\b/i)) {
    const linkMatch = fullMatch.match(/\b(although|though|even though|despite|in spite of)\b/i);
    return linkMatch ? linkMatch[1] : 'although';
  }

  // Module 139: Cause and effect connectors
  if (fullMatch.match(/,\s+so\s+/i)) return 'so';
  if (fullMatch.match(/\sbecause\s+(?!of)/i)) return 'because';
  if (fullMatch.match(/\bbecause\s+of\s+/i)) return 'because of';
  if (fullMatch.match(/\b(due\s+to|thanks\s+to)\s+/i)) {
    const causeMatch = fullMatch.match(/\b(due\s+to|thanks\s+to)/i);
    return causeMatch ? causeMatch[1] : 'due to';
  }

  // Module 140: Purpose markers
  if (fullMatch.match(/\s+to\s+(get|buy|catch|study|learn|save)/i)) return 'to';
  if (fullMatch.match(/\bin\s+order\s+to\s+/i)) return 'in order to';
  if (fullMatch.match(/\bso\s+that\s+/i)) return 'so that';

  // Module 141: Work vocabulary (workplace/action)
  if (fullMatch.match(/\b(school|hospital|restaurant|garage|office|hotel|library|salon|clinic)/i)) {
    const workplaceMatch = fullMatch.match(/\b(school|hospital|restaurant|garage|office|hotel|library|salon|clinic)/i);
    return workplaceMatch ? workplaceMatch[1] : '';
  }
  if (fullMatch.match(/\b(prepares?|teaches?|helps?|drives?|serves?|answers?)/i)) {
    const actionMatch = fullMatch.match(/\b(prepares?|teaches?|helps?|drives?|serves?|answers?)/i);
    return actionMatch ? actionMatch[1] : '';
  }

  // Module 142: Education vocabulary
  if (fullMatch.match(/\b(curriculum|scholarship|degree|thesis|faculty|campus)/i)) {
    const eduMatch = fullMatch.match(/\b(curriculum|scholarship|degree|thesis|faculty|campus)/i);
    return eduMatch ? eduMatch[1] : '';
  }

  // Module 143: Technology vocabulary
  if (fullMatch.match(/\b(smartphone|laptop|tablet|cloud\s+computing|Wi-Fi)/i)) {
    const techMatch = fullMatch.match(/\b(smartphone|laptop|tablet|cloud\s+computing|Wi-Fi)/i);
    return techMatch ? techMatch[1] : '';
  }

  // Module 126: Get + adjective patterns
  if ((fullMatch.includes('get') || fullMatch.includes('got')) && match[3]) {
    return match[3]; // The adjective (tired, ready, etc.)
  }

  // Module 128-129: Phrasal verb particles
  if (fullMatch.includes('turn') && match[3]) {
    return match[3]; // off or on
  }

  // Past Simple patterns
  if (sentence.includes(' yesterday') || sentence.includes(' last ') || sentence.includes(' ago')) {
    return verb; // Past tense verb is already correct in the match
  }

  // Present Perfect patterns
  if (fullMatch.includes('have') || fullMatch.includes('has')) {
    if (['i', 'you', 'we', 'they'].includes(pronoun)) {
      return 'have';
    } else if (['he', 'she', 'it'].includes(pronoun)) {
      return 'has';
    }
  }

  // Present Perfect Continuous patterns
  if (fullMatch.includes('been') && verb?.endsWith('ing')) {
    if (['i', 'you', 'we', 'they'].includes(pronoun)) {
      return 'have been';
    } else if (['he', 'she', 'it'].includes(pronoun)) {
      return 'has been';
    }
  }

  // Past Continuous patterns
  if (verb?.endsWith('ing') && (fullMatch.includes('was') || fullMatch.includes('were'))) {
    if (['i', 'he', 'she', 'it'].includes(pronoun)) {
      return 'was';
    } else if (['you', 'we', 'they'].includes(pronoun)) {
      return 'were';
    }
  }

  // Will Future patterns
  if (fullMatch.includes('will')) {
    return 'will';
  }

  // Going to patterns
  if (fullMatch.includes('going to')) {
    if (['i'].includes(pronoun)) return 'am';
    if (['he', 'she', 'it'].includes(pronoun)) return 'is';
    if (['you', 'we', 'they'].includes(pronoun)) return 'are';
  }

  // Present Continuous patterns
  if (verb?.endsWith('ing') && !fullMatch.includes('been')) {
    if (['i'].includes(pronoun)) return 'am';
    if (['he', 'she', 'it'].includes(pronoun)) return 'is';
    if (['you', 'we', 'they'].includes(pronoun)) return 'are';
  }

  // Modal verbs
  if (match.length >= 4) {
    const modal = match[2]?.toLowerCase();
    if (['can', 'could', 'should', 'would', 'must', 'might'].includes(modal)) {
      return modal;
    }
  }

  // Simple Present patterns (fallback)
  if (['he', 'she', 'it'].includes(pronoun)) {
    return addThirdPersonS(verb);
  }

  return verb || match[1] || 'am';
}

function generateDynamicWrongAnswers(match: RegExpMatchArray, sentence: string, correctAnswer: string): string[] {
  const pronoun = match[1]?.toLowerCase();
  const verb = match[2]?.toLowerCase();
  const fullMatch = match[0];

  // Module 121: If only + had/were patterns
  if (correctAnswer === 'had') return ['have', 'has'];
  if (correctAnswer === 'were') return ['was', 'are'];

  // Module 123: Causative patterns
  if (correctAnswer === 'had' && sentence.toLowerCase().match(/\b(fixed|repaired|cleaned|painted|checked|cut|delivered|installed|washed|serviced|done)\b/)) {
    return ['have', 'has'];
  }
  if (correctAnswer === 'got' && sentence.toLowerCase().match(/\b(fixed|repaired|cleaned|painted|checked|cut|delivered|installed|washed|serviced|done)\b/)) {
    return ['get', 'gets'];
  }

  // Module 124: Relative clauses
  if (correctAnswer === 'where') return ['which', 'that'];
  if (correctAnswer === 'that') return ['which', 'where'];

  // Module 125: Gerund/Infinitive patterns
  if (correctAnswer.endsWith('ing')) {
    const baseVerb = correctAnswer.replace(/ing$/, '');
    return [`to ${baseVerb}`, baseVerb];
  }
  if (correctAnswer.startsWith('to ')) {
    const baseVerb = correctAnswer.replace(/^to /, '');
    return [`${baseVerb}ing`, baseVerb];
  }

  // Module 133: Modal verbs for speculation
  if (['might', 'may', 'could'].includes(correctAnswer.toLowerCase())) {
    const alternatives = ['might', 'may', 'could', 'must', 'can\'t'].filter(m => m !== correctAnswer.toLowerCase());
    return [alternatives[0], alternatives[1]];
  }
  if (correctAnswer === 'must') return ['might', 'could'];
  if (correctAnswer === 'can\'t') return ['must', 'might'];

  // Module 133: Maybe/Perhaps
  if (correctAnswer === 'Maybe') return ['Perhaps', 'Definitely'];
  if (correctAnswer === 'Perhaps') return ['Maybe', 'Certainly'];

  // Module 133: It's possible/likely
  if (correctAnswer === 'possible') return ['certain', 'impossible'];
  if (correctAnswer === 'likely') return ['unlikely', 'certain'];
  if (correctAnswer === 'unlikely') return ['likely', 'possible'];

  // Module 134: Second conditional
  if (correctAnswer === 'would') return ['will', 'could'];
  if (correctAnswer === 'were' && sentence.match(/\bIf\s+/i)) return ['was', 'are'];

  // Module 136: Sequencing words
  if (correctAnswer === 'First') return ['Firstly', 'At first'];
  if (correctAnswer === 'Then') return ['Than', 'Next'];
  if (correctAnswer === 'After that') return ['After this', 'Later'];
  if (correctAnswer === 'Next') return ['Then', 'After'];
  if (correctAnswer === 'Later') return ['After', 'Next'];
  if (correctAnswer === 'Finally') return ['At last', 'Lastly'];
  if (correctAnswer === 'In the end') return ['At the end', 'Finally'];

  // Module 137: Linking words
  if (correctAnswer === 'although' || correctAnswer === 'though' || correctAnswer === 'even though') {
    return ['despite', 'however'];
  }
  if (correctAnswer === 'despite' || correctAnswer === 'in spite of') {
    return ['although', 'however'];
  }
  if (correctAnswer === 'However') return ['But', 'Although'];

  // Module 139: Cause and effect
  if (correctAnswer === 'so') return ['because', 'but'];
  if (correctAnswer === 'because') return ['so', 'since'];
  if (correctAnswer === 'because of') return ['because', 'due to'];
  if (correctAnswer === 'due to') return ['because of', 'thanks to'];
  if (correctAnswer === 'thanks to') return ['due to', 'because of'];

  // Module 140: Purpose
  if (correctAnswer === 'to') return ['for', 'in order'];
  if (correctAnswer === 'in order to') return ['to', 'so that'];
  if (correctAnswer === 'so that') return ['to', 'in order to'];

  // Module 141: Work vocabulary - workplaces
  const workplaceAlts: {[key: string]: string[]} = {
    'school': ['office', 'hospital'],
    'hospital': ['clinic', 'office'],
    'restaurant': ['hotel', 'cafe'],
    'garage': ['workshop', 'factory'],
    'office': ['building', 'company'],
    'hotel': ['restaurant', 'office'],
    'library': ['school', 'museum'],
    'salon': ['shop', 'store'],
    'clinic': ['hospital', 'office']
  };
  if (workplaceAlts[correctAnswer.toLowerCase()]) {
    return workplaceAlts[correctAnswer.toLowerCase()];
  }

  // Module 141: Work vocabulary - actions
  const actionAlts: {[key: string]: string[]} = {
    'prepares': ['cooks', 'makes'],
    'teaches': ['helps', 'instructs'],
    'helps': ['assists', 'supports'],
    'drives': ['operates', 'controls'],
    'serves': ['helps', 'assists'],
    'answers': ['replies', 'responds']
  };
  if (actionAlts[correctAnswer.toLowerCase()]) {
    return actionAlts[correctAnswer.toLowerCase()];
  }

  // Module 142: Education vocabulary
  const eduAlts: {[key: string]: string[]} = {
    'curriculum': ['syllabus', 'program'],
    'scholarship': ['grant', 'funding'],
    'degree': ['diploma', 'certificate'],
    'thesis': ['dissertation', 'paper'],
    'faculty': ['department', 'school'],
    'campus': ['university', 'grounds']
  };
  if (eduAlts[correctAnswer.toLowerCase()]) {
    return eduAlts[correctAnswer.toLowerCase()];
  }

  // Module 143: Technology vocabulary
  const techAlts: {[key: string]: string[]} = {
    'smartphone': ['phone', 'mobile'],
    'laptop': ['computer', 'notebook'],
    'tablet': ['iPad', 'device'],
    'cloud computing': ['cloud storage', 'online storage'],
    'wi-fi': ['internet', 'wireless']
  };
  if (techAlts[correctAnswer.toLowerCase()]) {
    return techAlts[correctAnswer.toLowerCase()];
  }

  // Module 126: Get + adjective patterns - return similar adjectives
  if (['tired', 'ready', 'angry', 'nervous', 'sick', 'cold', 'excited', 'hungry', 'bored', 'lost', 'scared', 'confused', 'dressed', 'married'].includes(correctAnswer)) {
    const adjAlternatives: {[key: string]: string[]} = {
      'tired': ['sleepy', 'exhausted'],
      'ready': ['prepared', 'set'],
      'angry': ['mad', 'upset'],
      'nervous': ['anxious', 'worried'],
      'sick': ['ill', 'unwell'],
      'cold': ['hot', 'warm'],
      'excited': ['happy', 'thrilled'],
      'hungry': ['thirsty', 'full'],
      'bored': ['tired', 'sleepy'],
      'lost': ['confused', 'found'],
      'scared': ['afraid', 'worried'],
      'confused': ['lost', 'puzzled'],
      'dressed': ['ready', 'changed'],
      'married': ['engaged', 'divorced']
    };
    return adjAlternatives[correctAnswer] || ['happy', 'sad'];
  }

  // Module 127: Take expressions
  if (correctAnswer === 'took part') return ['took place', 'took care'];
  if (correctAnswer === 'took place') return ['took part', 'took over'];
  if (correctAnswer === 'take care') return ['take part', 'take place'];

  // Module 128-129: Phrasal verb particles
  if (['up', 'down', 'off', 'on', 'out', 'in', 'after', 'for', 'across', 'back'].includes(correctAnswer)) {
    const particleAlternatives: {[key: string]: string[]} = {
      'up': ['down', 'off'],
      'down': ['up', 'out'],
      'off': ['on', 'out'],
      'on': ['off', 'in'],
      'out': ['in', 'up'],
      'in': ['out', 'up'],
      'after': ['for', 'at'],
      'for': ['after', 'at'],
      'across': ['along', 'through'],
      'back': ['away', 'up']
    };
    return particleAlternatives[correctAnswer] || ['up', 'down'];
  }

  // Module 130: Make/Do collocations
  if (correctAnswer === 'made') return ['did', 'make'];
  if (correctAnswer === 'did') return ['made', 'do'];

  // Module 131: Indirect questions
  if (correctAnswer === 'Do you know') return ['Did you know', 'Are you knowing'];
  if (correctAnswer === 'Can you tell me') return ['Could you tell me', 'Are you telling me'];
  if (correctAnswer === "I'm not sure") return ["I'm not certain", "I don't know"];

  // Module 132: Opinion expressions
  if (correctAnswer === 'I think') return ['I believe', 'I agree'];
  if (correctAnswer === 'I believe') return ['I think', 'I feel'];
  if (correctAnswer === 'I agree') return ['I disagree', 'I think'];

  // Module 125: Gerund forms - provide infinitive and base form
  if (correctAnswer.endsWith('ing')) {
    const baseVerb = correctAnswer.slice(0, -3);
    return ['to ' + baseVerb, baseVerb];
  }

  // For auxiliary verbs (am/is/are, was/were, have/has)
  if (['am', 'is', 'are'].includes(correctAnswer)) {
    return ['am', 'is', 'are'].filter(v => v !== correctAnswer);
  }

  if (['was', 'were'].includes(correctAnswer)) {
    return correctAnswer === 'was' ? ['were', 'is'] : ['was', 'are'];
  }

  if (['have', 'has'].includes(correctAnswer)) {
    return correctAnswer === 'have' ? ['has', 'had'] : ['have', 'had'];
  }

  if (['have been', 'has been'].includes(correctAnswer)) {
    return correctAnswer === 'have been' ? ['has been', 'had been'] : ['have been', 'had been'];
  }

  // For modal verbs
  if (['can', 'could', 'should', 'would', 'must', 'might'].includes(correctAnswer)) {
    const modals = ['can', 'could', 'should', 'would', 'must', 'might'];
    return modals.filter(m => m !== correctAnswer).slice(0, 2);
  }

  // For will future
  if (correctAnswer === 'will') {
    return ['would', 'will be'];
  }

  // For past tense verbs
  if (sentence.includes(' yesterday') || sentence.includes(' last ') || sentence.includes(' ago')) {
    if (verb?.endsWith('ed')) {
      return [removeThirdPersonS(verb.slice(0, -2)), addThirdPersonS(verb.slice(0, -2))];
    }
    // For irregular verbs, create plausible wrong answers
    return getIrregularVerbAlternatives(correctAnswer);
  }

  // For comparatives
  if (correctAnswer.endsWith('er') || ['better', 'worse', 'more'].includes(correctAnswer)) {
    return getComparativeAlternatives(correctAnswer);
  }

  // Default fallback
  if (['he', 'she', 'it'].includes(pronoun)) {
    return [removeThirdPersonS(correctAnswer), correctAnswer + 'ed'];
  }

  return [addThirdPersonS(correctAnswer), correctAnswer + 'ed'];
}

// Helper functions for specific word types
function getIrregularVerbAlternatives(correctVerb: string): string[] {
  const irregularPairs: { [key: string]: string[] } = {
    'went': ['go', 'goes'],
    'came': ['come', 'comes'],
    'saw': ['see', 'sees'],
    'ate': ['eat', 'eats'],
    'drank': ['drink', 'drinks'],
    'bought': ['buy', 'buys'],
    'got': ['get', 'gets'],
    'made': ['make', 'makes'],
    'took': ['take', 'takes'],
    'gave': ['give', 'gives']
  };

  return irregularPairs[correctVerb] || [correctVerb.slice(0, -2), correctVerb + 's'];
}

function getComparativeAlternatives(correctAnswer: string): string[] {
  if (correctAnswer === 'better') return ['good', 'best'];
  if (correctAnswer === 'worse') return ['bad', 'worst'];
  if (correctAnswer.endsWith('er')) {
    const base = correctAnswer.slice(0, -2);
    return [base, base + 'est'];
  }
  return ['more', 'most'];
}

// Deterministic seeded shuffle - prevents flicker by ensuring same order for same question
function seededShuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentSeed = seed;

  // Simple LCG (Linear Congruential Generator) for deterministic random
  const seededRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Legacy random shuffle (kept for backwards compatibility if needed)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Validation function to ensure exactly 1 correct answer
export function validateMultipleChoiceQuestion(question: MultipleChoiceQuestion): boolean {
  const correctCount = question.options.filter(opt => opt.correct).length;
  const hasAllOptions = question.options.length === 3;
  const hasPrompt = question.prompt.includes('___');

  return correctCount === 1 && hasAllOptions && hasPrompt;
}

// Export the updated type for use in components
export type { MultipleChoiceQuestion, MultipleChoiceOption };
