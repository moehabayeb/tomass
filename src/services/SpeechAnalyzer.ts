import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as CapacitorSpeechRecognition } from '@capacitor-community/speech-recognition';

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

  // 🔧 GOD-TIER v18: Use Capacitor plugin on Android for reliable first-try speech recognition
  private isNativeAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';

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
    // 🔧 GOD-TIER v18: Route to Capacitor on Android for first-try reliability
    if (this.isNativeAndroid) {
      return this.startCapacitorRecording();
    }

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

  // 🔧 GOD-TIER v19: Capacitor-based recording for Android - FIXED word timestamps
  private async startCapacitorRecording(): Promise<void> {
    // Check availability
    const { available } = await CapacitorSpeechRecognition.available();
    if (!available) {
      throw new Error('Speech recognition not available on this device');
    }

    // Request permissions
    const permResult = await CapacitorSpeechRecognition.requestPermissions();
    if (permResult.speechRecognition !== 'granted') {
      throw new Error('Microphone access denied');
    }

    // Prevent multiple instances
    if (this.isRecording) {
      throw new Error('Recognition already in progress');
    }

    // Reset state
    this.isRecording = true;
    this.startTime = Date.now();
    this.transcript = '';
    this.confidenceScores = [];
    this.wordTimestamps = [];

    // 🔧 v19: Track previous word count to avoid duplicate timestamps
    let previousWordCount = 0;

    // Add listener for partial results
    await CapacitorSpeechRecognition.addListener('partialResults', (data: any) => {
      let newTranscript = '';
      if (data.matches) {
        newTranscript = Array.isArray(data.matches) ? data.matches[0] : data.matches;
      } else if (data.value) {
        newTranscript = Array.isArray(data.value) ? data.value[0] : data.value;
      }
      if (newTranscript) {
        this.transcript = newTranscript;

        // 🔧 v19: Only add timestamps for NEW words (avoid duplicates)
        const words = newTranscript.trim().split(/\s+/).filter((w: string) => w.length > 0);
        const newWordCount = words.length;

        if (newWordCount > previousWordCount) {
          // Only process the NEW words
          const newWords = words.slice(previousWordCount);
          const currentTime = Date.now() - this.startTime;

          newWords.forEach((word: string) => {
            this.wordTimestamps.push({
              word: word.toLowerCase().replace(/[^\w]/g, ''),
              timestamp: currentTime,
              confidence: 0.85 // Higher default confidence for Capacitor (more reliable)
            });
            this.confidenceScores.push(0.85);
          });

          previousWordCount = newWordCount;
        }
      }
    });

    // Start recognition
    await CapacitorSpeechRecognition.start({
      language: 'en-US',
      maxResults: 5,
      partialResults: true,
      popup: false
    });

    console.log('[SpeechAnalyzer] ✅ v19: Capacitor speech recognition started');
  }

  stopRecording(): Promise<SpeechAnalysisResult> {
    // 🔧 GOD-TIER v18: Route to Capacitor on Android
    if (this.isNativeAndroid) {
      return this.stopCapacitorRecording();
    }

    return new Promise((resolve) => {
      if (!this.recognition || !this.isRecording) {
        resolve(this.getEmptyResult());
        return;
      }

      // 🎯 ANDROID FIX: Add timeout protection
      // Android Web Speech API often doesn't fire onend event
      const STOP_TIMEOUT_MS = 3000;
      let resolved = false;

      const resolveOnce = (result: SpeechAnalysisResult) => {
        if (resolved) return;
        resolved = true;
        this.isRecording = false;
        resolve(result);
      };

      // Timeout fallback - resolve with current data after 3 seconds
      const timeoutId = setTimeout(() => {
        if (!resolved) {
          console.warn('[SpeechAnalyzer] onend timeout - resolving with current transcript');
          resolveOnce(this.analyzeRecording());
        }
      }, STOP_TIMEOUT_MS);

      // Normal completion handler
      this.recognition.onend = () => {
        clearTimeout(timeoutId);
        resolveOnce(this.analyzeRecording());
      };

      // Error handler - also should resolve to prevent hang
      this.recognition.onerror = (event) => {
        clearTimeout(timeoutId);
        if (event.error !== 'aborted') {
          console.warn('[SpeechAnalyzer] recognition error:', event.error);
        }
        resolveOnce(this.analyzeRecording());
      };

      // Attempt to stop recognition
      try {
        this.recognition.stop();
      } catch (error) {
        // If stop() throws, still resolve after timeout
        console.warn('[SpeechAnalyzer] stop() error:', error);
      }
    });
  }

  // 🔧 GOD-TIER v19: Capacitor stop recording with TIMEOUT protection
  private async stopCapacitorRecording(): Promise<SpeechAnalysisResult> {
    if (!this.isRecording) {
      return this.getEmptyResult();
    }

    // 🔧 v19: Timeout protection - don't hang forever
    const STOP_TIMEOUT_MS = 3000;

    const stopWithTimeout = async () => {
      try {
        // Race between stop and timeout
        await Promise.race([
          CapacitorSpeechRecognition.stop(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Stop timeout')), STOP_TIMEOUT_MS))
        ]);
      } catch (e) {
        console.warn('[SpeechAnalyzer] v19: Capacitor stop timeout/error:', e);
      }

      // Wait a moment for any final results to arrive
      await new Promise(r => setTimeout(r, 300));

      // Cleanup listeners with timeout
      try {
        await Promise.race([
          CapacitorSpeechRecognition.removeAllListeners(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Cleanup timeout')), 1000))
        ]);
      } catch (e) {
        console.warn('[SpeechAnalyzer] v19: Cleanup timeout/error:', e);
      }
    };

    await stopWithTimeout();

    this.isRecording = false;
    console.log('[SpeechAnalyzer] ✅ v19: Capacitor recording stopped, transcript:', this.transcript.substring(0, 50));
    return this.analyzeRecording();
  }

  // 🔧 FIX #9: Cleanup method to remove event listeners and prevent memory leaks
  cleanup(): void {
    if (this.recognition) {
      // Stop any active recording
      if (this.isRecording) {
        try {
          this.recognition.stop();
        } catch {
          // Ignore errors during cleanup
        }
      }

      // Remove all event listeners to prevent memory leaks
      this.recognition.onresult = null;
      this.recognition.onstart = null;
      this.recognition.onerror = null;
      this.recognition.onend = null;
      this.recognition.onspeechend = null;
      this.recognition.onnomatch = null;
      this.recognition.onaudiostart = null;
      this.recognition.onaudioend = null;

      this.isRecording = false;
    }

    // Reset internal state
    this.transcript = '';
    this.confidenceScores = [];
    this.wordTimestamps = [];
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
    // 🔧 v19: If no confidence scores, give a fair default instead of 0
    if (this.confidenceScores.length === 0) return 70;

    // Start from perfect score and deduct for issues
    let score = 100;

    // Confidence-based deductions
    const averageConfidence = this.confidenceScores.reduce((sum, score) => sum + score, 0) / this.confidenceScores.length;

    // 🔧 v19: More generous confidence thresholds
    if (averageConfidence < 0.3) {
      score -= 30; // Very poor pronunciation
    } else if (averageConfidence < 0.5) {
      score -= 20; // Poor pronunciation
    } else if (averageConfidence < 0.7) {
      score -= 10; // Below average
    } else if (averageConfidence < 0.8) {
      score -= 5; // Slightly below average
    }

    // 🔧 v19: Lighter individual word confidence penalties
    const lowConfidenceWords = this.confidenceScores.filter(score => score < 0.5).length;
    const veryLowConfidenceWords = this.confidenceScores.filter(score => score < 0.3).length;

    score -= lowConfidenceWords * 1; // 1 point per unclear word
    score -= veryLowConfidenceWords * 2; // Additional 2 points for very unclear words

    // Pronunciation issues analysis - lighter penalties
    const issues = this.identifyPronunciationIssues();
    const issueDeduction = issues.reduce((total, issue) => {
      switch (issue.severity) {
        case 'high': return total + 5; // Major issues
        case 'medium': return total + 3; // Noticeable issues
        case 'low': return total + 1; // Minor issues
        default: return total;
      }
    }, 0);

    score -= Math.min(20, issueDeduction); // Cap total issue deduction

    // Word clarity ratio penalty - lighter
    const totalWords = this.wordTimestamps.length;
    if (totalWords > 0) {
      const unclearWordsRatio = (lowConfidenceWords / totalWords);
      if (unclearWordsRatio > 0.7) {
        score -= 15; // Most words unclear
      } else if (unclearWordsRatio > 0.5) {
        score -= 10; // Many unclear words
      } else if (unclearWordsRatio > 0.3) {
        score -= 5; // Some unclear words
      }
    }

    // Apply CEFR level caps for pronunciation
    score = this.applyPronunciationCEFRCaps(score, averageConfidence, issues.length);

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private applyPronunciationCEFRCaps(score: number, averageConfidence: number, issueCount: number): number {
    // 🔧 v19: Made CEFR caps more generous for language learners
    // The old caps were too strict and unfair

    // A1 level cap (max 40%) - only for VERY poor pronunciation
    if (averageConfidence < 0.3 || issueCount >= 12) {
      return Math.min(score, 40);
    }

    // A2 level cap (max 55%) - poor pronunciation
    if (averageConfidence < 0.4 || issueCount >= 10) {
      return Math.min(score, 55);
    }

    // B1 level cap (max 70%) - below average pronunciation
    if (averageConfidence < 0.5 || issueCount >= 8) {
      return Math.min(score, 70);
    }

    // B2 level cap (max 85%) - acceptable pronunciation
    if (averageConfidence < 0.6 || issueCount >= 6) {
      return Math.min(score, 85);
    }

    // No cap for good pronunciation - let the score through
    return score;
  }

  private calculateFluencyScore(metrics: SpeechMetrics, wordsPerMinute: number): number {
    let score = 100;

    // 🔧 v19: More generous WPM evaluation for language learners
    // Slow speech is OK for learners - they're thinking in a second language!
    if (wordsPerMinute < 40) {
      score -= 20; // Very slow speech - still acceptable
    } else if (wordsPerMinute < 70) {
      score -= 10; // Slow but thoughtful
    } else if (wordsPerMinute < 100) {
      score -= 5; // Slightly below average
    } else if (wordsPerMinute > 200) {
      score -= 10; // Too fast
    }

    // 🔧 v19: Gentler penalties for pauses (language learners pause to think)
    const pausesPenalty = Math.min(20, metrics.totalPauses * 2);
    score -= pausesPenalty;

    // 🔧 v19: Lighter penalty for filler words (natural in conversation)
    const fillerPenalty = Math.min(15, metrics.fillerWords.length * 2);
    score -= fillerPenalty;

    // Repetition penalty (minimal)
    const repetitionPenalty = Math.min(10, metrics.repetitions.length * 2);
    score -= repetitionPenalty;

    // Self-correction penalty (self-correction is actually GOOD - shows awareness!)
    const correctionPenalty = Math.min(5, Math.max(0, metrics.selfCorrections - 3) * 2);
    score -= correctionPenalty;

    // Speaking time ratio (should speak more than pause)
    const speakingTimeRatio = metrics.totalSpeakingTime > 0 ?
      (metrics.totalSpeakingTime - (metrics.totalPauses * metrics.averagePauseLength)) / metrics.totalSpeakingTime : 0;

    if (speakingTimeRatio < 0.4) {
      score -= 15; // Too much pausing
    } else if (speakingTimeRatio < 0.6) {
      score -= 8; // Some hesitation
    }

    // Apply CEFR fluency caps
    score = this.applyFluencyCEFRCaps(score, wordsPerMinute, metrics);

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private applyFluencyCEFRCaps(score: number, wpm: number, metrics: SpeechMetrics): number {
    // 🔧 v19: Made fluency caps MUCH more generous
    // Language learners often speak slowly but correctly - that's OK!

    // A1 level cap (max 50%) - only for EXTREMELY hesitant speech
    if (wpm < 30 || metrics.totalPauses >= 15 || metrics.fillerWords.length >= 10) {
      return Math.min(score, 50);
    }

    // A2 level cap (max 65%) - very hesitant speech
    if (wpm < 50 || metrics.totalPauses >= 12 || metrics.fillerWords.length >= 8) {
      return Math.min(score, 65);
    }

    // B1 level cap (max 80%) - somewhat hesitant
    if (wpm < 70 || metrics.totalPauses >= 10 || metrics.fillerWords.length >= 6) {
      return Math.min(score, 80);
    }

    // No more strict caps - let the natural score through
    // Language learners deserve fair scores even if they speak slowly
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
    // 🔧 GOD-TIER v18: On Android, we use Capacitor plugin which is always supported
    if (this.isNativeAndroid) {
      return true;
    }
    return this.recognition !== null;
  }

  getRecordingState(): boolean {
    return this.isRecording;
  }
}