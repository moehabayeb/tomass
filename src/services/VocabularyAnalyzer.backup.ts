interface VocabularyAnalysisResult {
  score: number; // 0-100
  totalWords: number;
  uniqueWords: number;
  lexicalDiversity: number;
  averageWordLevel: string; // A1, A2, B1, B2, C1, C2
  levelBreakdown: Record<string, number>;
  advancedWords: string[];
  repetitiveWords: string[];
  recommendedLevel: string;
  feedback: string[];
}

interface WordLevelData {
  word: string;
  level: string;
  frequency: number;
  category: string;
}

export class VocabularyAnalyzer {
  // CEFR vocabulary database with categories
  private vocabularyDatabase: Record<string, WordLevelData> = {
    // A1 Level - Basic everyday words
    'hello': { word: 'hello', level: 'A1', frequency: 10, category: 'greeting' },
    'good': { word: 'good', level: 'A1', frequency: 10, category: 'adjective' },
    'bad': { word: 'bad', level: 'A1', frequency: 10, category: 'adjective' },
    'yes': { word: 'yes', level: 'A1', frequency: 10, category: 'response' },
    'no': { word: 'no', level: 'A1', frequency: 10, category: 'response' },
    'please': { word: 'please', level: 'A1', frequency: 10, category: 'politeness' },
    'thank': { word: 'thank', level: 'A1', frequency: 10, category: 'politeness' },
    'sorry': { word: 'sorry', level: 'A1', frequency: 10, category: 'politeness' },
    'name': { word: 'name', level: 'A1', frequency: 10, category: 'personal' },
    'age': { word: 'age', level: 'A1', frequency: 9, category: 'personal' },
    'family': { word: 'family', level: 'A1', frequency: 9, category: 'personal' },
    'house': { word: 'house', level: 'A1', frequency: 9, category: 'home' },
    'car': { word: 'car', level: 'A1', frequency: 9, category: 'transport' },
    'food': { word: 'food', level: 'A1', frequency: 9, category: 'basic_needs' },
    'water': { word: 'water', level: 'A1', frequency: 9, category: 'basic_needs' },

    // A2 Level - Familiar topics
    'interesting': { word: 'interesting', level: 'A2', frequency: 8, category: 'opinion' },
    'important': { word: 'important', level: 'A2', frequency: 8, category: 'opinion' },
    'different': { word: 'different', level: 'A2', frequency: 8, category: 'comparison' },
    'similar': { word: 'similar', level: 'A2', frequency: 7, category: 'comparison' },
    'usually': { word: 'usually', level: 'A2', frequency: 7, category: 'frequency' },
    'sometimes': { word: 'sometimes', level: 'A2', frequency: 8, category: 'frequency' },
    'experience': { word: 'experience', level: 'A2', frequency: 7, category: 'abstract' },
    'remember': { word: 'remember', level: 'A2', frequency: 7, category: 'mental' },
    'understand': { word: 'understand', level: 'A2', frequency: 8, category: 'mental' },
    'because': { word: 'because', level: 'A2', frequency: 9, category: 'connector' },

    // B1 Level - Independence
    'opportunity': { word: 'opportunity', level: 'B1', frequency: 6, category: 'abstract' },
    'society': { word: 'society', level: 'B1', frequency: 6, category: 'social' },
    'environment': { word: 'environment', level: 'B1', frequency: 6, category: 'social' },
    'education': { word: 'education', level: 'B1', frequency: 6, category: 'social' },
    'technology': { word: 'technology', level: 'B1', frequency: 6, category: 'modern' },
    'communication': { word: 'communication', level: 'B1', frequency: 5, category: 'social' },
    'relationship': { word: 'relationship', level: 'B1', frequency: 6, category: 'social' },
    'consider': { word: 'consider', level: 'B1', frequency: 6, category: 'mental' },
    'although': { word: 'although', level: 'B1', frequency: 5, category: 'connector' },
    'however': { word: 'however', level: 'B1', frequency: 6, category: 'connector' },

    // B2 Level - Effective operational proficiency
    'significant': { word: 'significant', level: 'B2', frequency: 5, category: 'academic' },
    'consequence': { word: 'consequence', level: 'B2', frequency: 4, category: 'academic' },
    'analyze': { word: 'analyze', level: 'B2', frequency: 4, category: 'academic' },
    'determine': { word: 'determine', level: 'B2', frequency: 4, category: 'academic' },
    'establish': { word: 'establish', level: 'B2', frequency: 4, category: 'academic' },
    'perspective': { word: 'perspective', level: 'B2', frequency: 4, category: 'abstract' },
    'nevertheless': { word: 'nevertheless', level: 'B2', frequency: 3, category: 'connector' },
    'furthermore': { word: 'furthermore', level: 'B2', frequency: 3, category: 'connector' },
    'contemporary': { word: 'contemporary', level: 'B2', frequency: 3, category: 'descriptive' },
    'comprehensive': { word: 'comprehensive', level: 'B2', frequency: 3, category: 'descriptive' },

    // C1 Level - Proficient user
    'sophisticated': { word: 'sophisticated', level: 'C1', frequency: 3, category: 'advanced' },
    'phenomenon': { word: 'phenomenon', level: 'C1', frequency: 2, category: 'academic' },
    'implications': { word: 'implications', level: 'C1', frequency: 3, category: 'academic' },
    'underlying': { word: 'underlying', level: 'C1', frequency: 3, category: 'academic' },
    'substantial': { word: 'substantial', level: 'C1', frequency: 3, category: 'descriptive' },
    'hypothesis': { word: 'hypothesis', level: 'C1', frequency: 2, category: 'academic' },
    'legislation': { word: 'legislation', level: 'C1', frequency: 2, category: 'formal' },
    'preliminary': { word: 'preliminary', level: 'C1', frequency: 2, category: 'formal' },
    'incorporate': { word: 'incorporate', level: 'C1', frequency: 2, category: 'formal' },
    'accumulate': { word: 'accumulate', level: 'C1', frequency: 2, category: 'formal' },

    // C2 Level - Mastery
    'ubiquitous': { word: 'ubiquitous', level: 'C2', frequency: 1, category: 'sophisticated' },
    'paradigm': { word: 'paradigm', level: 'C2', frequency: 1, category: 'sophisticated' },
    'nuanced': { word: 'nuanced', level: 'C2', frequency: 1, category: 'sophisticated' },
    'intrinsic': { word: 'intrinsic', level: 'C2', frequency: 1, category: 'sophisticated' },
    'juxtaposition': { word: 'juxtaposition', level: 'C2', frequency: 1, category: 'sophisticated' },
    'unprecedented': { word: 'unprecedented', level: 'C2', frequency: 1, category: 'sophisticated' },
    'dichotomy': { word: 'dichotomy', level: 'C2', frequency: 1, category: 'sophisticated' },
    'epitome': { word: 'epitome', level: 'C2', frequency: 1, category: 'sophisticated' },
    'quintessential': { word: 'quintessential', level: 'C2', frequency: 1, category: 'sophisticated' },
    'multifaceted': { word: 'multifaceted', level: 'C2', frequency: 1, category: 'sophisticated' }
  };

  // Level hierarchy for scoring
  private levelHierarchy = {
    'A1': 1,
    'A2': 2,
    'B1': 3,
    'B2': 4,
    'C1': 5,
    'C2': 6
  };

  // Phrasal verbs and idioms by level
  private phrasalVerbs = {
    'A2': ['get up', 'sit down', 'come in', 'go out', 'turn on', 'turn off'],
    'B1': ['look forward to', 'deal with', 'come across', 'bring up', 'put off', 'run out of'],
    'B2': ['come up with', 'put up with', 'get along with', 'look down on', 'catch up on'],
    'C1': ['live up to', 'come down to', 'get away with', 'fall through', 'phase out'],
    'C2': ['zero in on', 'factor in', 'whittle down', 'pan out', 'shore up']
  };

  analyzeVocabulary(text: string): VocabularyAnalysisResult {
    const words = this.extractWords(text);
    const uniqueWords = [...new Set(words)];
    const wordFrequency = this.calculateWordFrequency(words);
    const lexicalDiversity = this.calculateLexicalDiversity(words, uniqueWords);
    const levelBreakdown = this.analyzeLevelBreakdown(uniqueWords);
    const averageWordLevel = this.calculateAverageLevel(uniqueWords);
    const advancedWords = this.findAdvancedWords(uniqueWords);
    const repetitiveWords = this.findRepetitiveWords(wordFrequency);
    const score = this.calculateVocabularyScore(uniqueWords, lexicalDiversity, levelBreakdown);
    const recommendedLevel = this.recommendLevel(averageWordLevel, score);
    const feedback = this.generateFeedback(levelBreakdown, lexicalDiversity, advancedWords, repetitiveWords);

    return {
      score,
      totalWords: words.length,
      uniqueWords: uniqueWords.length,
      lexicalDiversity,
      averageWordLevel,
      levelBreakdown,
      advancedWords,
      repetitiveWords,
      recommendedLevel,
      feedback
    };
  }

  private extractWords(text: string): string[] {
    // Remove punctuation and convert to lowercase
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');

    // Split into words and filter out empty strings and very short words
    return cleanText
      .split(/\s+/)
      .filter(word => word.length > 1)
      .map(word => word.trim());
  }

  private calculateWordFrequency(words: string[]): Record<string, number> {
    return words.reduce((freq, word) => {
      freq[word] = (freq[word] || 0) + 1;
      return freq;
    }, {} as Record<string, number>);
  }

  private calculateLexicalDiversity(words: string[], uniqueWords: string[]): number {
    if (words.length === 0) return 0;

    // Type-Token Ratio (TTR) - ratio of unique words to total words
    const basicTTR = uniqueWords.length / words.length;

    // Adjusted TTR for longer texts (more forgiving for longer responses)
    const adjustedTTR = uniqueWords.length / Math.sqrt(words.length);

    // Return percentage (0-100)
    return Math.min(100, adjustedTTR * 100);
  }

  private analyzeLevelBreakdown(words: string[]): Record<string, number> {
    const breakdown: Record<string, number> = {
      'A1': 0, 'A2': 0, 'B1': 0, 'B2': 0, 'C1': 0, 'C2': 0, 'Unknown': 0
    };

    words.forEach(word => {
      const wordData = this.vocabularyDatabase[word];
      if (wordData) {
        breakdown[wordData.level]++;
      } else {
        // Try to estimate level based on word characteristics
        const estimatedLevel = this.estimateWordLevel(word);
        breakdown[estimatedLevel]++;
      }
    });

    return breakdown;
  }

  private estimateWordLevel(word: string): string {
    const length = word.length;

    // Very basic heuristics for unknown words
    if (length <= 3) return 'A1';
    if (length <= 5) return 'A2';
    if (length <= 7) return 'B1';
    if (length <= 9) return 'B2';
    if (length <= 12) return 'C1';
    return 'C2';
  }

  private calculateAverageLevel(words: string[]): string {
    if (words.length === 0) return 'A1';

    let totalLevelScore = 0;
    let recognizedWords = 0;

    words.forEach(word => {
      const wordData = this.vocabularyDatabase[word];
      if (wordData) {
        totalLevelScore += this.levelHierarchy[wordData.level];
        recognizedWords++;
      } else {
        // Assign estimated level score
        const estimatedLevel = this.estimateWordLevel(word);
        totalLevelScore += this.levelHierarchy[estimatedLevel];
        recognizedWords++;
      }
    });

    if (recognizedWords === 0) return 'A1';

    const averageScore = totalLevelScore / recognizedWords;

    // Convert average score back to level
    if (averageScore <= 1.5) return 'A1';
    if (averageScore <= 2.5) return 'A2';
    if (averageScore <= 3.5) return 'B1';
    if (averageScore <= 4.5) return 'B2';
    if (averageScore <= 5.5) return 'C1';
    return 'C2';
  }

  private findAdvancedWords(words: string[]): string[] {
    return words.filter(word => {
      const wordData = this.vocabularyDatabase[word];
      return wordData && (wordData.level === 'C1' || wordData.level === 'C2');
    });
  }

  private findRepetitiveWords(wordFrequency: Record<string, number>): string[] {
    const repetitiveThreshold = 3; // Words used 3+ times
    return Object.entries(wordFrequency)
      .filter(([word, count]) => count >= repetitiveThreshold && word.length > 3)
      .map(([word]) => word)
      .slice(0, 10); // Limit to top 10 most repetitive
  }

  private calculateVocabularyScore(words: string[], lexicalDiversity: number, levelBreakdown: Record<string, number>): number {
    if (words.length === 0) return 0;

    let score = 50; // Base score

    // Lexical diversity component (0-25 points)
    score += (lexicalDiversity / 100) * 25;

    // Level distribution component (0-25 points)
    const totalRecognized = Object.values(levelBreakdown).reduce((sum, count) => sum + count, 0) - levelBreakdown['Unknown'];
    if (totalRecognized > 0) {
      const levelScore = (
        (levelBreakdown['A1'] * 1) +
        (levelBreakdown['A2'] * 2) +
        (levelBreakdown['B1'] * 3) +
        (levelBreakdown['B2'] * 4) +
        (levelBreakdown['C1'] * 5) +
        (levelBreakdown['C2'] * 6)
      ) / totalRecognized;

      score += (levelScore / 6) * 25;
    }

    // Bonus for advanced vocabulary usage
    const advancedWordCount = levelBreakdown['C1'] + levelBreakdown['C2'];
    const advancedBonus = Math.min(10, advancedWordCount * 2);
    score += advancedBonus;

    // Penalty for too many unknown words
    const unknownPenalty = Math.min(15, (levelBreakdown['Unknown'] / words.length) * 30);
    score -= unknownPenalty;

    return Math.max(0, Math.min(100, score));
  }

  private recommendLevel(averageWordLevel: string, score: number): string {
    const levelScore = this.levelHierarchy[averageWordLevel];

    // Adjust recommendation based on overall vocabulary score
    if (score >= 90) {
      return this.getLevelFromScore(Math.min(6, levelScore + 1));
    } else if (score >= 70) {
      return averageWordLevel;
    } else if (score >= 50) {
      return this.getLevelFromScore(Math.max(1, levelScore - 1));
    } else {
      return this.getLevelFromScore(Math.max(1, levelScore - 2));
    }
  }

  private getLevelFromScore(score: number): string {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    return levels[Math.min(5, Math.max(0, Math.round(score) - 1))];
  }

  private generateFeedback(
    levelBreakdown: Record<string, number>,
    lexicalDiversity: number,
    advancedWords: string[],
    repetitiveWords: string[]
  ): string[] {
    const feedback: string[] = [];

    // Overall vocabulary assessment
    const totalWords = Object.values(levelBreakdown).reduce((sum, count) => sum + count, 0);
    const advancedWordCount = levelBreakdown['C1'] + levelBreakdown['C2'];
    const basicWordCount = levelBreakdown['A1'] + levelBreakdown['A2'];

    if (advancedWordCount > totalWords * 0.1) {
      feedback.push("Excellent use of advanced vocabulary! Your word choice demonstrates strong language proficiency.");
    } else if (advancedWordCount > 0) {
      feedback.push("Good attempt at using some advanced vocabulary. Try to incorporate more sophisticated words.");
    } else if (basicWordCount > totalWords * 0.7) {
      feedback.push("Your vocabulary is quite basic. Try to expand your word choice with more intermediate and advanced terms.");
    }

    // Lexical diversity feedback
    if (lexicalDiversity >= 80) {
      feedback.push("Excellent lexical diversity! You use a wide variety of words effectively.");
    } else if (lexicalDiversity >= 60) {
      feedback.push("Good word variety. Try to avoid repeating the same words too often.");
    } else if (lexicalDiversity >= 40) {
      feedback.push("Your word choice could be more varied. Practice using synonyms and different expressions.");
    } else {
      feedback.push("Work on expanding your vocabulary range. You tend to repeat the same words frequently.");
    }

    // Specific advanced words praise
    if (advancedWords.length > 0) {
      feedback.push(`Great use of advanced words: ${advancedWords.slice(0, 3).join(', ')}`);
    }

    // Repetitive words warning
    if (repetitiveWords.length > 0) {
      feedback.push(`Avoid overusing: ${repetitiveWords.slice(0, 3).join(', ')}. Try to find synonyms.`);
    }

    // Recommendations for improvement
    const intermediateWords = levelBreakdown['B1'] + levelBreakdown['B2'];
    if (intermediateWords < totalWords * 0.3) {
      feedback.push("Focus on learning more intermediate-level vocabulary to improve your expression.");
    }

    return feedback;
  }

  // Public helper methods
  public checkPhrasalVerbs(text: string): { level: string; phrases: string[] }[] {
    const results: { level: string; phrases: string[] }[] = [];

    Object.entries(this.phrasalVerbs).forEach(([level, phrases]) => {
      const foundPhrases = phrases.filter(phrase => {
        return text.toLowerCase().includes(phrase);
      });

      if (foundPhrases.length > 0) {
        results.push({ level, phrases: foundPhrases });
      }
    });

    return results;
  }

  public getWordLevel(word: string): string | null {
    const wordData = this.vocabularyDatabase[word.toLowerCase()];
    return wordData ? wordData.level : null;
  }

  public getSynonyms(word: string): string[] {
    // Basic synonym suggestions based on word categories
    const wordData = this.vocabularyDatabase[word.toLowerCase()];
    if (!wordData) return [];

    // Find words in the same category
    const synonyms = Object.values(this.vocabularyDatabase)
      .filter(data =>
        data.category === wordData.category &&
        data.word !== word.toLowerCase() &&
        Math.abs(this.levelHierarchy[data.level] - this.levelHierarchy[wordData.level]) <= 1
      )
      .map(data => data.word)
      .slice(0, 3);

    return synonyms;
  }

  public expandVocabularyDatabase(newWords: Record<string, WordLevelData>): void {
    this.vocabularyDatabase = { ...this.vocabularyDatabase, ...newWords };
  }
}