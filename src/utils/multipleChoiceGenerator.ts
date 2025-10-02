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

export function generateMultipleChoiceQuestion(answerSentence: string): MultipleChoiceQuestion | null {
  // Clean the sentence
  const cleanSentence = answerSentence.replace(/["""]/g, '"').trim();

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

      // Create options array
      const allOptions = [correctAnswer, ...wrongAnswers];
      const shuffledOptions = shuffleArray([...allOptions]);

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
  return createAdvancedFallbackQuestion(cleanSentence);
}

function createAdvancedFallbackQuestion(sentence: string): MultipleChoiceQuestion | null {
  const lowerSentence = sentence.toLowerCase();

  // Advanced pattern recognition for better fallbacks

  // Modal verbs - can, could, should, would, must, might
  const modalPattern = /\b(can|could|should|would|must|might)\s+/i;
  const modalMatch = sentence.match(modalPattern);
  if (modalMatch) {
    const modal = modalMatch[1].toLowerCase();
    const wrongModals = ['can', 'could', 'should', 'would', 'must', 'might']
      .filter(m => m !== modal)
      .slice(0, 2);

    return {
      prompt: sentence.replace(modalPattern, '___ '),
      options: shuffleArray([
        { letter: 'A', text: modal, correct: true },
        { letter: 'B', text: wrongModals[0], correct: false },
        { letter: 'C', text: wrongModals[1], correct: false }
      ]).map((option, index) => ({
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
      options: shuffleArray([
        { letter: 'A', text: auxiliary, correct: true },
        { letter: 'B', text: wrongAux[0], correct: false },
        { letter: 'C', text: wrongAux[1], correct: false }
      ]).map((option, index) => ({
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
      options: shuffleArray([
        { letter: 'A', text: pastVerb, correct: true },
        { letter: 'B', text: wrongForms[0], correct: false },
        { letter: 'C', text: wrongForms[1], correct: false }
      ]).map((option, index) => ({
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
      options: shuffleArray([
        { letter: 'A', text: auxiliary, correct: true },
        { letter: 'B', text: wrongAux[0], correct: false },
        { letter: 'C', text: wrongAux[1], correct: false }
      ]).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  // Simple be verb patterns (original fallback, but improved)
  if (lowerSentence.includes(' am ')) {
    return {
      prompt: sentence.replace(/ am /i, ' ___ '),
      options: shuffleArray([
        { letter: 'A', text: 'am', correct: true },
        { letter: 'B', text: 'is', correct: false },
        { letter: 'C', text: 'are', correct: false }
      ]).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  if (lowerSentence.includes(' is ')) {
    return {
      prompt: sentence.replace(/ is /i, ' ___ '),
      options: shuffleArray([
        { letter: 'A', text: 'am', correct: false },
        { letter: 'B', text: 'is', correct: true },
        { letter: 'C', text: 'are', correct: false }
      ]).map((option, index) => ({
        ...option,
        letter: (['A', 'B', 'C'] as const)[index]
      }))
    };
  }

  if (lowerSentence.includes(' are ')) {
    return {
      prompt: sentence.replace(/ are /i, ' ___ '),
      options: shuffleArray([
        { letter: 'A', text: 'am', correct: false },
        { letter: 'B', text: 'is', correct: false },
        { letter: 'C', text: 'are', correct: true }
      ]).map((option, index) => ({
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
