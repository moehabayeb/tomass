interface GrammarError {
  type: string;
  position: number;
  word: string;
  context: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
  rule: string;
}

interface GrammarAnalysisResult {
  score: number; // 0-100
  totalErrors: number;
  errorsByType: Record<string, number>;
  errors: GrammarError[];
  complexityScore: number;
  tenseConsistency: number;
}

interface TensePattern {
  present: number;
  past: number;
  future: number;
  presentPerfect: number;
  pastPerfect: number;
  continuous: number;
}

export class GrammarChecker {
  // Grammar patterns and rules
  private grammarRules = {
    subjectVerbAgreement: [
      { pattern: /\b(I|you|we|they)\s+(is|was)\b/gi, correction: 'are/were', severity: 'high' as const },
      { pattern: /\b(he|she|it)\s+(are|were)\b/gi, correction: 'is/was', severity: 'high' as const },
      { pattern: /\bthere\s+is\s+\w+\s+(and|,)/gi, correction: 'there are', severity: 'medium' as const }
    ],

    verbTenses: [
      { pattern: /\bI\s+go\s+yesterday\b/gi, correction: 'I went yesterday', severity: 'high' as const },
      { pattern: /\bI\s+will\s+went\b/gi, correction: 'I will go', severity: 'high' as const },
      { pattern: /\bI\s+have\s+go\b/gi, correction: 'I have gone', severity: 'high' as const },
      { pattern: /\bhave\s+\w+ed\s+\w+ed\b/gi, correction: 'Check past participle', severity: 'medium' as const }
    ],

    articleUsage: [
      { pattern: /\ba\s+[aeiou]/gi, correction: 'an', severity: 'medium' as const },
      { pattern: /\ban\s+[bcdfghjklmnpqrstvwxyz]/gi, correction: 'a', severity: 'medium' as const },
      { pattern: /\bthe\s+\w+\s+are\s+good\b/gi, correction: 'Consider removing "the"', severity: 'low' as const }
    ],

    prepositions: [
      { pattern: /\bdepends\s+of\b/gi, correction: 'depends on', severity: 'medium' as const },
      { pattern: /\blisten\s+music\b/gi, correction: 'listen to music', severity: 'medium' as const },
      { pattern: /\bwait\s+you\b/gi, correction: 'wait for you', severity: 'medium' as const },
      { pattern: /\bthink\s+about\s+to\b/gi, correction: 'think about doing', severity: 'low' as const }
    ],

    wordOrder: [
      { pattern: /\balways\s+I\b/gi, correction: 'I always', severity: 'medium' as const },
      { pattern: /\bvery\s+much\s+I\s+like\b/gi, correction: 'I like very much', severity: 'high' as const },
      { pattern: /\bhow\s+you\s+are\?\b/gi, correction: 'how are you?', severity: 'medium' as const }
    ],

    plurals: [
      { pattern: /\bmany\s+\w+(?<!s)\b/gi, correction: 'Use plural form', severity: 'medium' as const },
      { pattern: /\bchilds\b/gi, correction: 'children', severity: 'high' as const },
      { pattern: /\bpeoples\b/gi, correction: 'people', severity: 'medium' as const },
      { pattern: /\binformations\b/gi, correction: 'information', severity: 'medium' as const }
    ]
  };

  // Common words by CEFR level for complexity scoring
  private wordComplexity = {
    A1: ['be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see', 'come', 'think', 'look', 'want', 'give'],
    A2: ['become', 'leave', 'put', 'mean', 'keep', 'let', 'begin', 'seem', 'help', 'talk', 'turn', 'start', 'might', 'show', 'hear'],
    B1: ['believe', 'bring', 'happen', 'must', 'world', 'still', 'should', 'develop', 'carry', 'break', 'receive', 'decide', 'usually', 'explain', 'hope'],
    B2: ['achieve', 'appropriate', 'benefit', 'concept', 'consequence', 'create', 'design', 'establish', 'factor', 'identify', 'individual', 'interpret', 'maintain', 'obtain', 'participate'],
    C1: ['accumulate', 'comprehensive', 'demonstrate', 'differentiate', 'eliminate', 'furthermore', 'hypothesis', 'incorporate', 'legislation', 'nevertheless', 'obvious', 'preliminary', 'sophisticated', 'substantial', 'underlying'],
    C2: ['accommodate', 'contradict', 'differentiate', 'explicit', 'fluctuate', 'guarantee', 'inevitable', 'jurisdiction', 'magnificent', 'negligible', 'perpetual', 'requisite', 'synthesis', 'unprecedented', 'vulnerable']
  };

  analyzeGrammar(text: string): GrammarAnalysisResult {
    const errors: GrammarError[] = [];

    // Check each grammar rule category
    Object.entries(this.grammarRules).forEach(([category, rules]) => {
      rules.forEach(rule => {
        const matches = text.matchAll(rule.pattern);
        for (const match of matches) {
          if (match.index !== undefined) {
            errors.push({
              type: category,
              position: match.index,
              word: match[0],
              context: this.getContext(text, match.index, match[0].length),
              suggestion: rule.correction,
              severity: rule.severity,
              rule: category
            });
          }
        }
      });
    });

    const errorsByType = this.groupErrorsByType(errors);
    const complexityScore = this.calculateComplexityScore(text);
    const tenseConsistency = this.analyzeTenseConsistency(text);
    const score = this.calculateGrammarScore(errors, complexityScore, tenseConsistency);

    return {
      score,
      totalErrors: errors.length,
      errorsByType,
      errors,
      complexityScore,
      tenseConsistency
    };
  }

  private getContext(text: string, position: number, length: number): string {
    const start = Math.max(0, position - 20);
    const end = Math.min(text.length, position + length + 20);
    return text.substring(start, end);
  }

  private groupErrorsByType(errors: GrammarError[]): Record<string, number> {
    return errors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private calculateComplexityScore(text: string): number {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (words.length === 0) return 0;

    // Calculate average sentence length
    const avgSentenceLength = words.length / sentences.length;

    // Count complex words (3+ syllables approximation)
    const complexWords = words.filter(word => this.estimateSyllables(word) >= 3).length;
    const complexWordRatio = complexWords / words.length;

    // Count word complexity by CEFR level
    let totalLevelScore = 0;
    let recognizedWords = 0;

    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      const level = this.getWordLevel(cleanWord);
      if (level) {
        recognizedWords++;
        switch (level) {
          case 'A1': totalLevelScore += 1; break;
          case 'A2': totalLevelScore += 2; break;
          case 'B1': totalLevelScore += 3; break;
          case 'B2': totalLevelScore += 4; break;
          case 'C1': totalLevelScore += 5; break;
          case 'C2': totalLevelScore += 6; break;
        }
      }
    });

    const avgWordLevel = recognizedWords > 0 ? totalLevelScore / recognizedWords : 2;

    // Combine metrics for overall complexity score (0-100)
    let complexityScore = 0;

    // Sentence length score (0-30)
    complexityScore += Math.min(30, avgSentenceLength * 2);

    // Complex word ratio score (0-30)
    complexityScore += complexWordRatio * 30;

    // Word level score (0-40)
    complexityScore += ((avgWordLevel - 1) / 5) * 40;

    return Math.min(100, complexityScore);
  }

  private estimateSyllables(word: string): number {
    // Simple syllable estimation
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    const vowels = cleanWord.match(/[aeiouy]+/g);
    let syllables = vowels ? vowels.length : 0;

    // Adjust for silent e
    if (cleanWord.endsWith('e') && syllables > 1) {
      syllables--;
    }

    // Minimum of 1 syllable
    return Math.max(1, syllables);
  }

  private getWordLevel(word: string): string | null {
    for (const [level, words] of Object.entries(this.wordComplexity)) {
      if (words.includes(word)) {
        return level;
      }
    }
    return null;
  }

  private analyzeTenseConsistency(text: string): number {
    const tensePatterns: TensePattern = {
      present: 0,
      past: 0,
      future: 0,
      presentPerfect: 0,
      pastPerfect: 0,
      continuous: 0
    };

    // Present tense patterns
    const presentMatches = text.match(/\b(am|is|are|do|does|go|goes|have|has)\b/gi);
    tensePatterns.present = presentMatches?.length || 0;

    // Past tense patterns
    const pastMatches = text.match(/\b(was|were|did|went|had|said|came|took)\b/gi);
    tensePatterns.past = pastMatches?.length || 0;

    // Future tense patterns
    const futureMatches = text.match(/\b(will|shall|going to)\b/gi);
    tensePatterns.future = futureMatches?.length || 0;

    // Perfect tense patterns
    const perfectMatches = text.match(/\b(have|has|had)\s+\w+ed\b/gi);
    tensePatterns.presentPerfect = perfectMatches?.length || 0;

    // Continuous tense patterns
    const continuousMatches = text.match(/\b(am|is|are|was|were)\s+\w+ing\b/gi);
    tensePatterns.continuous = continuousMatches?.length || 0;

    const totalTenseMarkers = Object.values(tensePatterns).reduce((sum, count) => sum + count, 0);

    if (totalTenseMarkers === 0) return 100; // No tense markers to analyze

    // Calculate consistency - penalize mixing too many tenses inappropriately
    const usedTenses = Object.values(tensePatterns).filter(count => count > 0).length;

    if (usedTenses <= 2) {
      return 100; // Good consistency
    } else if (usedTenses === 3) {
      return 80; // Acceptable
    } else {
      return Math.max(50, 100 - (usedTenses - 2) * 15); // Decreasing score for too many tenses
    }
  }

  private calculateGrammarScore(errors: GrammarError[], complexityScore: number, tenseConsistency: number): number {
    let score = 100;

    // Deduct points for errors based on severity
    errors.forEach(error => {
      switch (error.severity) {
        case 'high':
          score -= 8;
          break;
        case 'medium':
          score -= 5;
          break;
        case 'low':
          score -= 2;
          break;
      }
    });

    // Bonus for complexity (up to 10 points)
    const complexityBonus = Math.min(10, (complexityScore / 100) * 10);
    score += complexityBonus;

    // Adjust for tense consistency
    const consistencyFactor = tenseConsistency / 100;
    score *= consistencyFactor;

    return Math.max(0, Math.min(100, score));
  }

  // Additional methods for specific grammar checks
  checkSubjectVerbAgreement(text: string): GrammarError[] {
    const errors: GrammarError[] = [];

    // More specific subject-verb agreement patterns
    const patterns = [
      { pattern: /\b(I)\s+(doesn't|don't)\b/gi, suggestion: "I don't", severity: 'high' as const },
      { pattern: /\b(he|she|it)\s+(don't)\b/gi, suggestion: "doesn't", severity: 'high' as const },
      { pattern: /\b(they|we|you)\s+(doesn't)\b/gi, suggestion: "don't", severity: 'high' as const }
    ];

    patterns.forEach(({ pattern, suggestion, severity }) => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match.index !== undefined) {
          errors.push({
            type: 'subjectVerbAgreement',
            position: match.index,
            word: match[0],
            context: this.getContext(text, match.index, match[0].length),
            suggestion,
            severity,
            rule: 'Subject-verb agreement'
          });
        }
      }
    });

    return errors;
  }

  checkVerbTenses(text: string): GrammarError[] {
    const errors: GrammarError[] = [];

    // Detect tense mixing issues
    const sentences = text.split(/[.!?]+/);

    sentences.forEach((sentence, index) => {
      const hasPast = /\b(yesterday|ago|last|was|were|did|went|came|took)\b/i.test(sentence);
      const hasPresent = /\b(now|today|currently|am|is|are|do|does|go|goes)\b/i.test(sentence);
      const hasFuture = /\b(tomorrow|will|shall|going to|next)\b/i.test(sentence);

      const tenseCount = [hasPast, hasPresent, hasFuture].filter(Boolean).length;

      if (tenseCount > 1) {
        errors.push({
          type: 'verbTenses',
          position: text.indexOf(sentence),
          word: sentence.trim(),
          context: sentence.trim(),
          suggestion: 'Check tense consistency within the sentence',
          severity: 'medium',
          rule: 'Tense consistency'
        });
      }
    });

    return errors;
  }

  // Public method to get detailed feedback
  getDetailedFeedback(analysisResult: GrammarAnalysisResult): string[] {
    const feedback: string[] = [];

    if (analysisResult.score >= 90) {
      feedback.push("Excellent grammar! Your sentence structure and word usage are very strong.");
    } else if (analysisResult.score >= 70) {
      feedback.push("Good grammar overall with room for minor improvements.");
    } else if (analysisResult.score >= 50) {
      feedback.push("Your grammar is developing. Focus on the areas highlighted below.");
    } else {
      feedback.push("Grammar needs significant improvement. Practice the basics first.");
    }

    // Specific feedback based on error types
    Object.entries(analysisResult.errorsByType).forEach(([errorType, count]) => {
      if (count > 0) {
        switch (errorType) {
          case 'subjectVerbAgreement':
            feedback.push(`Work on subject-verb agreement (${count} error${count > 1 ? 's' : ''})`);
            break;
          case 'verbTenses':
            feedback.push(`Practice verb tenses and consistency (${count} error${count > 1 ? 's' : ''})`);
            break;
          case 'articleUsage':
            feedback.push(`Review article usage (a/an/the) (${count} error${count > 1 ? 's' : ''})`);
            break;
          case 'prepositions':
            feedback.push(`Study preposition usage (${count} error${count > 1 ? 's' : ''})`);
            break;
          case 'wordOrder':
            feedback.push(`Practice English word order (${count} error${count > 1 ? 's' : ''})`);
            break;
          case 'plurals':
            feedback.push(`Review plural forms (${count} error${count > 1 ? 's' : ''})`);
            break;
        }
      }
    });

    // Complexity feedback
    if (analysisResult.complexityScore < 30) {
      feedback.push("Try using more varied vocabulary and longer sentences.");
    } else if (analysisResult.complexityScore > 80) {
      feedback.push("Great use of complex vocabulary and sentence structures!");
    }

    return feedback;
  }
}