interface SpeechAnalysisResult {
  transcript: string;
  confidence: number;
  wordsPerMinute: number;
  pauseCount: number;
  pronunciationScore: number;
  fluencyScore: number;
  words: string[];
  timestamps: number[];
  pronunciationIssues: PronunciationIssue[];
}

interface PronunciationIssue {
  word: string;
  position: number;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
}

interface SpeechMetrics {
  totalSpeakingTime: number;
  totalPauses: number;
  averagePauseLength: number;
  fillerWords: string[];
  repetitions: string[];
  selfCorrections: number;
}

export class SpeechAnalyzer {
  private recognition: SpeechRecognition | null = null;
  private isRecording = false;
  private startTime = 0;
  private transcript = '';
  private confidenceScores: number[] = [];
  private wordTimestamps: { word: string; timestamp: number; confidence: number }[] = [];

  constructor() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition();
    }

    if (this.recognition) {
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 3;

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence || 0.5;

        if (result.isFinal) {
          finalTranscript += transcript;
          this.addWordTimestamps(transcript, confidence);
          this.confidenceScores.push(confidence);
        } else {
          interimTranscript += transcript;
        }
      }

      this.transcript += finalTranscript;
    };
  }

  private addWordTimestamps(transcript: string, confidence: number) {
    const words = transcript.trim().split(/\s+/);
    const currentTime = Date.now() - this.startTime;

    words.forEach((word) => {
      this.wordTimestamps.push({
        word: word.toLowerCase().replace(/[^\w]/g, ''),
        timestamp: currentTime,
        confidence
      });
    });
  }

  async startRecording(): Promise<void> {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported');
    }

    // 🔧 FIX BUG #17: Prevent multiple recognition instances - check if already running
    if (this.isRecording) {
      throw new Error('Recognition already in progress');
    }

    this.isRecording = true;
    this.startTime = Date.now();
    this.transcript = '';
    this.confidenceScores = [];
    this.wordTimestamps = [];

    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not available'));
        return;
      }

      this.recognition.onstart = () => {
        resolve();
      };

      this.recognition.onerror = (event) => {
        this.isRecording = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      // 🔧 FIX BUG #17: Wrap start() in try-catch to handle "already started" errors
      try {
        this.recognition.start();
      } catch (error: unknown) {
        // Phase 3.1: Use 'unknown' instead of 'any' for better type safety
        this.isRecording = false;
        if (error instanceof Error && error.message?.includes('already started')) {
          reject(new Error('Recognition already running. Please wait.'));
        } else {
          reject(error);
        }
      }
    });
  }

  stopRecording(): Promise<SpeechAnalysisResult> {
    return new Promise((resolve) => {
      if (!this.recognition || !this.isRecording) {
        resolve(this.getEmptyResult());
        return;
      }

      this.recognition.onend = () => {
        this.isRecording = false;
        const result = this.analyzeRecording();
        resolve(result);
      };

      this.recognition.stop();
    });
  }

  private getEmptyResult(): SpeechAnalysisResult {
    return {
      transcript: '',
      confidence: 0,
      wordsPerMinute: 0,
      pauseCount: 0,
      pronunciationScore: 0,
      fluencyScore: 0,
      words: [],
      timestamps: [],
      pronunciationIssues: []
    };
  }

  private analyzeRecording(): SpeechAnalysisResult {
    const totalTime = (Date.now() - this.startTime) / 1000; // seconds
    const words = this.transcript.trim().split(/\s+/).filter(w => w.length > 0);
    const wordsPerMinute = words.length > 0 ? (words.length / totalTime) * 60 : 0;

    const metrics = this.calculateSpeechMetrics();
    const pronunciationScore = this.calculatePronunciationScore();
    const fluencyScore = this.calculateFluencyScore(metrics, wordsPerMinute);
    const pronunciationIssues = this.identifyPronunciationIssues();

    const averageConfidence = this.confidenceScores.length > 0
      ? this.confidenceScores.reduce((sum, score) => sum + score, 0) / this.confidenceScores.length
      : 0;

    return {
      transcript: this.transcript,
      confidence: averageConfidence,
      wordsPerMinute,
      pauseCount: metrics.totalPauses,
      pronunciationScore,
      fluencyScore,
      words: words.map(w => w.toLowerCase().replace(/[^\w]/g, '')),
      timestamps: this.wordTimestamps.map(w => w.timestamp),
      pronunciationIssues
    };
  }

  private calculateSpeechMetrics(): SpeechMetrics {
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally'];
    const foundFillers: string[] = [];
    const words = this.transcript.toLowerCase().split(/\s+/);

    // Count filler words
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (fillerWords.includes(cleanWord)) {
        foundFillers.push(cleanWord);
      }
    });

    // Detect repetitions (same word repeated within 3 words)
    const repetitions: string[] = [];
    for (let i = 0; i < words.length - 1; i++) {
      const word = words[i].replace(/[^\w]/g, '');
      for (let j = i + 1; j <= Math.min(i + 3, words.length - 1); j++) {
        const nextWord = words[j].replace(/[^\w]/g, '');
        if (word === nextWord && word.length > 2) {
          repetitions.push(word);
          break;
        }
      }
    }

    // Estimate pauses from timestamp gaps
    let pauseCount = 0;
    for (let i = 1; i < this.wordTimestamps.length; i++) {
      const gap = this.wordTimestamps[i].timestamp - this.wordTimestamps[i - 1].timestamp;
      if (gap > 1000) { // More than 1 second gap
        pauseCount++;
      }
    }

    return {
      totalSpeakingTime: (Date.now() - this.startTime) / 1000,
      totalPauses: pauseCount,
      averagePauseLength: pauseCount > 0 ? 1.5 : 0, // Estimated
      fillerWords: foundFillers,
      repetitions: [...new Set(repetitions)],
      selfCorrections: this.detectSelfCorrections()
    };
  }

  private detectSelfCorrections(): number {
    const correctionPatterns = [
      /I mean/gi,
      /or rather/gi,
      /what I meant/gi,
      /sorry,?\s*(I|let me)/gi,
      /no,?\s*(wait|actually)/gi
    ];

    let corrections = 0;
    correctionPatterns.forEach(pattern => {
      const matches = this.transcript.match(pattern);
      if (matches) {
        corrections += matches.length;
      }
    });

    return corrections;
  }

  private calculatePronunciationScore(): number {
    if (this.confidenceScores.length === 0) return 0;

    // Start from perfect score and deduct for issues
    let score = 100;

    // Confidence-based deductions
    const averageConfidence = this.confidenceScores.reduce((sum, score) => sum + score, 0) / this.confidenceScores.length;

    // Much stricter confidence thresholds
    if (averageConfidence < 0.3) {
      score -= 50; // Very poor pronunciation
    } else if (averageConfidence < 0.5) {
      score -= 35; // Poor pronunciation
    } else if (averageConfidence < 0.7) {
      score -= 20; // Below average
    } else if (averageConfidence < 0.8) {
      score -= 10; // Slightly below average
    }

    // Individual word confidence penalties
    const lowConfidenceWords = this.confidenceScores.filter(score => score < 0.6).length;
    const veryLowConfidenceWords = this.confidenceScores.filter(score => score < 0.4).length;

    score -= lowConfidenceWords * 3; // 3 points per unclear word
    score -= veryLowConfidenceWords * 7; // Additional 7 points for very unclear words

    // Pronunciation issues analysis
    const issues = this.identifyPronunciationIssues();
    const issueDeduction = issues.reduce((total, issue) => {
      switch (issue.severity) {
        case 'high': return total + 15; // Major pronunciation problems
        case 'medium': return total + 8; // Noticeable issues
        case 'low': return total + 3; // Minor issues
        default: return total;
      }
    }, 0);

    score -= issueDeduction;

    // Word clarity ratio penalty
    const totalWords = this.wordTimestamps.length;
    if (totalWords > 0) {
      const unclearWordsRatio = (lowConfidenceWords / totalWords);
      if (unclearWordsRatio > 0.5) {
        score -= 25; // More than half unclear
      } else if (unclearWordsRatio > 0.3) {
        score -= 15; // Many unclear words
      } else if (unclearWordsRatio > 0.1) {
        score -= 5; // Some unclear words
      }
    }

    // Apply CEFR level caps for pronunciation
    score = this.applyPronunciationCEFRCaps(score, averageConfidence, issues.length);

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private applyPronunciationCEFRCaps(score: number, averageConfidence: number, issueCount: number): number {
    // A1 level cap (max 25%) - very poor pronunciation
    if (averageConfidence < 0.4 || issueCount >= 8) {
      return Math.min(score, 25);
    }

    // A2 level cap (max 40%) - poor pronunciation
    if (averageConfidence < 0.5 || issueCount >= 6) {
      return Math.min(score, 40);
    }

    // B1 level cap (max 55%) - below average pronunciation
    if (averageConfidence < 0.65 || issueCount >= 4) {
      return Math.min(score, 55);
    }

    // B2 level cap (max 70%) - acceptable pronunciation
    if (averageConfidence < 0.75 || issueCount >= 3) {
      return Math.min(score, 70);
    }

    // C1+ requires very clear pronunciation
    if (averageConfidence < 0.85 && score > 85) {
      return Math.min(score, 85);
    }

    return score;
  }

  private calculateFluencyScore(metrics: SpeechMetrics, wordsPerMinute: number): number {
    let score = 100;

    // Much stricter WPM evaluation
    if (wordsPerMinute < 60) {
      score -= 40; // Very slow speech
    } else if (wordsPerMinute < 90) {
      score -= 25; // Slow speech
    } else if (wordsPerMinute < 120) {
      score -= 10; // Below average
    } else if (wordsPerMinute > 200) {
      score -= 15; // Too fast, unclear
    }

    // Severe penalties for pauses
    const pausesPenalty = Math.min(35, metrics.totalPauses * 4);
    score -= pausesPenalty;

    // Heavy penalty for filler words
    const fillerPenalty = Math.min(25, metrics.fillerWords.length * 3);
    score -= fillerPenalty;

    // Repetition penalty
    const repetitionPenalty = Math.min(20, metrics.repetitions.length * 4);
    score -= repetitionPenalty;

    // Self-correction penalty (natural corrections are ok, but too many indicate struggle)
    const correctionPenalty = Math.min(15, Math.max(0, metrics.selfCorrections - 2) * 5);
    score -= correctionPenalty;

    // Speaking time ratio (should speak more than pause)
    const speakingTimeRatio = metrics.totalSpeakingTime > 0 ?
      (metrics.totalSpeakingTime - (metrics.totalPauses * metrics.averagePauseLength)) / metrics.totalSpeakingTime : 0;

    if (speakingTimeRatio < 0.6) {
      score -= 20; // Too much pausing relative to speaking
    } else if (speakingTimeRatio < 0.8) {
      score -= 10; // Some hesitation
    }

    // Apply CEFR fluency caps
    score = this.applyFluencyCEFRCaps(score, wordsPerMinute, metrics);

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private applyFluencyCEFRCaps(score: number, wpm: number, metrics: SpeechMetrics): number {
    // A1 level cap (max 25%) - very hesitant speech
    if (wpm < 60 || metrics.totalPauses >= 8 || metrics.fillerWords.length >= 6) {
      return Math.min(score, 25);
    }

    // A2 level cap (max 40%) - hesitant speech
    if (wpm < 80 || metrics.totalPauses >= 6 || metrics.fillerWords.length >= 4) {
      return Math.min(score, 40);
    }

    // B1 level cap (max 55%) - somewhat fluent
    if (wpm < 100 || metrics.totalPauses >= 4 || metrics.fillerWords.length >= 3) {
      return Math.min(score, 55);
    }

    // B2 level cap (max 70%) - generally fluent
    if (wpm < 120 || metrics.totalPauses >= 3 || metrics.fillerWords.length >= 2) {
      return Math.min(score, 70);
    }

    // C1+ requires very fluent speech
    if (wpm < 140 && score > 85) {
      return Math.min(score, 85);
    }

    return score;
  }

  private identifyPronunciationIssues(): PronunciationIssue[] {
    const issues: PronunciationIssue[] = [];
    const lowConfidenceThreshold = 0.6;

    // Identify words with low confidence scores
    this.wordTimestamps.forEach((wordData, index) => {
      if (wordData.confidence < lowConfidenceThreshold) {
        issues.push({
          word: wordData.word,
          position: index,
          issue: 'Low pronunciation confidence',
          severity: wordData.confidence < 0.4 ? 'high' : 'medium',
          suggestion: `Try speaking "${wordData.word}" more clearly`
        });
      }
    });

    // Common pronunciation problems for non-native speakers
    const commonIssues = [
      { pattern: /th/g, issue: 'TH sound', suggestion: 'Practice the TH sound by placing tongue between teeth' },
      { pattern: /r/g, issue: 'R sound', suggestion: 'Practice rolling or retroflex R sound' },
      { pattern: /v/g, issue: 'V sound', suggestion: 'V sound: bite lower lip lightly with upper teeth' },
      { pattern: /w/g, issue: 'W sound', suggestion: 'W sound: round lips like saying "oo"' }
    ];

    const words = this.transcript.toLowerCase().split(/\s+/);
    words.forEach((word, index) => {
      commonIssues.forEach(({ pattern, issue, suggestion }) => {
        if (pattern.test(word)) {
          const severity = this.wordTimestamps[index]?.confidence < 0.5 ? 'medium' : 'low';
          issues.push({
            word,
            position: index,
            issue,
            severity,
            suggestion
          });
        }
      });
    });

    return issues;
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }

  getRecordingState(): boolean {
    return this.isRecording;
  }
}