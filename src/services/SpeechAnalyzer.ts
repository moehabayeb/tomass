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

      this.recognition.start();
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

    const averageConfidence = this.confidenceScores.reduce((sum, score) => sum + score, 0) / this.confidenceScores.length;

    // Convert confidence to pronunciation score (0-100)
    let score = averageConfidence * 100;

    // Adjust based on pronunciation issues
    const issues = this.identifyPronunciationIssues();
    const deduction = issues.reduce((total, issue) => {
      switch (issue.severity) {
        case 'high': return total + 10;
        case 'medium': return total + 5;
        case 'low': return total + 2;
        default: return total;
      }
    }, 0);

    return Math.max(0, Math.min(100, score - deduction));
  }

  private calculateFluencyScore(metrics: SpeechMetrics, wordsPerMinute: number): number {
    let score = 100;

    // Ideal WPM is 140-160, adjust score based on deviation
    const idealWPM = 150;
    const wpmDeviation = Math.abs(wordsPerMinute - idealWPM);
    score -= Math.min(30, wpmDeviation / 2);

    // Penalize excessive pauses
    const pausesPenalty = Math.min(20, metrics.totalPauses * 2);
    score -= pausesPenalty;

    // Penalize filler words
    const fillerPenalty = Math.min(15, metrics.fillerWords.length * 1.5);
    score -= fillerPenalty;

    // Penalize repetitions
    const repetitionPenalty = Math.min(10, metrics.repetitions.length * 2);
    score -= repetitionPenalty;

    // Slight penalty for excessive self-corrections
    const correctionPenalty = Math.min(5, Math.max(0, metrics.selfCorrections - 1) * 2);
    score -= correctionPenalty;

    return Math.max(0, Math.min(100, score));
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