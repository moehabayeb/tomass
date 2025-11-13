import { useState, useCallback, useRef, useEffect } from 'react';

interface WordResult {
  word: string | null;
  confidence: number;
  transcript: string;
  matchType: 'exact' | 'close' | 'partial' | 'none';
}

interface SpeechState {
  isListening: boolean;
  isProcessing: boolean;
  message: string;
  error: boolean;
  needsConfirmation: boolean;
  suggestedWord: string | null;
}

// Calculate Levenshtein distance (edit distance) between two strings
const calculateEditDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

// Calculate similarity score (0-1, where 1 is perfect match)
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const editDistance = calculateEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

export const useFlashcardSpeechRecognition = () => {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isProcessing: false,
    message: '',
    error: false,
    needsConfirmation: false,
    suggestedWord: null
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasResultRef = useRef(false);
  const messageTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  // Phase 2.1: Track mount state to prevent setState on unmounted component
  const isMountedRef = useRef(true);

  // Helper to set and track message timeouts
  const setMessageTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = setTimeout(() => {
      // Phase 2.1: Only execute callback if still mounted
      if (isMountedRef.current) {
        callback();
      }
    }, delay);
    messageTimeoutsRef.current.push(timeoutId);
    return timeoutId;
  }, []);

  // Clear all message timeouts
  const clearAllMessageTimeouts = useCallback(() => {
    messageTimeoutsRef.current.forEach(id => clearTimeout(id));
    messageTimeoutsRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true; // Phase 2.1: Set mounted on mount
    return () => {
      isMountedRef.current = false; // Phase 2.1: Prevent setState after unmount
      clearAllMessageTimeouts();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [clearAllMessageTimeouts]);

  // Match spoken word against expected word with fuzzy matching
  const matchWord = useCallback((spoken: string, expected: string): WordResult => {
    const spokenClean = spoken.toLowerCase().trim().replace(/[^\w\s]/g, '');
    const expectedClean = expected.toLowerCase().trim();

    // Apple Store Compliance: Silent operation

    // 1. Exact match (100% confidence)
    if (spokenClean === expectedClean) {
      // Apple Store Compliance: Silent operation
      return { word: expected, confidence: 1.0, transcript: spoken, matchType: 'exact' };
    }

    // 2. Check if full expected word appears in the spoken phrase
    if (spokenClean.includes(expectedClean) || spokenClean.includes(' ' + expectedClean) || spokenClean.includes(expectedClean + ' ')) {
      // Apple Store Compliance: Silent operation
      return { word: expected, confidence: 0.9, transcript: spoken, matchType: 'partial' };
    }

    // 3. Fuzzy matching for typos/mispronunciations
    const words = spokenClean.split(/\s+/);
    let bestMatch: WordResult | null = null;

    for (const word of words) {
      const similarity = calculateSimilarity(word, expectedClean);
      // Apple Store Compliance: Silent operation

      if (similarity >= 0.85) { // 85% or higher similarity
        const matchResult = {
          word: expected,
          confidence: similarity,
          transcript: spoken,
          matchType: 'close' as const
        };

        if (!bestMatch || similarity > bestMatch.confidence) {
          bestMatch = matchResult;
        }
      }
    }

    if (bestMatch) {
      // Apple Store Compliance: Silent operation
      return bestMatch;
    }

    // 4. No match - Apple Store Compliance: Silent operation
    return { word: null, confidence: 0, transcript: spoken, matchType: 'none' };
  }, []);

  // Start listening for the expected word
  const startListening = useCallback((expectedWord: string): Promise<string | null> => {
    return new Promise((resolve) => {
      // Prevent multiple concurrent listeners
      if (state.isListening || state.isProcessing) {
        resolve(null);
        return;
      }

      // Stop any existing recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Already stopped
        }
      }

      // Check for speech recognition support
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setState({
          isListening: false,
          isProcessing: false,
          message: 'Speech recognition not supported in this browser',
          error: true,
          needsConfirmation: false,
          suggestedWord: null
        });
        resolve(null);
        return;
      }

      // Check microphone permission
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
          const recognition = new SpeechRecognition();

          recognition.lang = 'en-US';
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.maxAlternatives = 5;

          hasResultRef.current = false;

          // Phase 2.1: Check if still mounted before setState
          if (!isMountedRef.current) return;

          setState({
            isListening: true,
            isProcessing: false,
            message: 'Listening... Speak now!',
            error: false,
            needsConfirmation: false,
            suggestedWord: null
          });

          recognition.onresult = (event) => {
            if (hasResultRef.current) return;
            hasResultRef.current = true;

            // Clear timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }

            // Get all alternatives
            const results = event.results[0];
            const alternatives: Array<{transcript: string, confidence: number}> = [];

            for (let i = 0; i < results.length; i++) {
              alternatives.push({
                transcript: results[i].transcript,
                confidence: results[i].confidence
              });
            }

            // Apple Store Compliance: Silent operation

            // Try to match against expected word
            let bestResult: WordResult | null = null;

            for (const alt of alternatives) {
              const matchResult = matchWord(alt.transcript, expectedWord);

              if (matchResult.word) {
                if (!bestResult || matchResult.confidence > bestResult.confidence) {
                  bestResult = matchResult;
                }
              }
            }

            if (bestResult && bestResult.word) {
              const confidence = bestResult.confidence;

              if (confidence >= 0.95) {
                // High confidence - auto-accept - Apple Store Compliance: Silent operation
                // Phase 2.1: Check if still mounted before setState
                if (!isMountedRef.current) return;
                setState({
                  isListening: false,
                  isProcessing: false,
                  message: `Perfect! You said "${bestResult.transcript}"`,
                  error: false,
                  needsConfirmation: false,
                  suggestedWord: null
                });
                setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 1500);
                resolve(bestResult.word);
              } else if (confidence >= 0.75) {
                // Medium confidence - ask for confirmation - Apple Store Compliance: Silent operation
                // Phase 2.1: Check if still mounted before setState
                if (!isMountedRef.current) return;
                setState({
                  isListening: false,
                  isProcessing: false,
                  message: `Did you say "${expectedWord}"?`,
                  error: false,
                  needsConfirmation: true,
                  suggestedWord: expectedWord
                });
                resolve(null); // Will be handled by confirm/reject
              } else {
                // Low confidence - not sure - Apple Store Compliance: Silent operation
                // Phase 2.1: Check if still mounted before setState
                if (!isMountedRef.current) return;
                setState({
                  isListening: false,
                  isProcessing: false,
                  message: `I heard "${bestResult.transcript}". Try again or type the answer.`,
                  error: true,
                  needsConfirmation: false,
                  suggestedWord: null
                });
                setMessageTimeout(() => setState(prev => ({ ...prev, message: '', error: false })), 3000);
                resolve(null);
              }
            } else {
              // No match found - Apple Store Compliance: Silent operation
              const transcript = alternatives[0]?.transcript || 'nothing';
              // Phase 2.1: Check if still mounted before setState
              if (!isMountedRef.current) return;
              setState({
                isListening: false,
                isProcessing: false,
                message: `I heard "${transcript}". Expected "${expectedWord}". Try again or type it!`,
                error: true,
                needsConfirmation: false,
                suggestedWord: null
              });
              setMessageTimeout(() => setState(prev => ({ ...prev, message: '', error: false })), 3000);
              resolve(null);
            }
          };

          recognition.onerror = (event) => {
            if (!hasResultRef.current) {
              hasResultRef.current = true;

              // Apple Store Compliance: Silent fail - operation continues

              let errorMessage = "Didn't catch that—try again or type your answer";
              if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                errorMessage = 'Microphone access denied. Please enable it or type your answer.';
              } else if (event.error === 'no-speech') {
                errorMessage = 'No speech detected. Speak louder or type your answer.';
              } else if (event.error === 'audio-capture') {
                errorMessage = 'Microphone not working. Please type your answer.';
              }

              // Phase 2.1: Check if still mounted before setState
              if (!isMountedRef.current) return;
              setState({
                isListening: false,
                isProcessing: false,
                message: errorMessage,
                error: true,
                needsConfirmation: false,
                suggestedWord: null
              });
              setMessageTimeout(() => setState(prev => ({ ...prev, message: '', error: false })), 3000);
              resolve(null);
            }
          };

          recognition.onend = () => {
            recognitionRef.current = null;

            if (!hasResultRef.current) {
              hasResultRef.current = true;
              // Phase 2.1: Check if still mounted before setState
              if (!isMountedRef.current) return;
              setState({
                isListening: false,
                isProcessing: false,
                message: "Didn't catch that—try again or type your answer",
                error: true,
                needsConfirmation: false,
                suggestedWord: null
              });
              setMessageTimeout(() => setState(prev => ({ ...prev, message: '', error: false })), 2000);
              resolve(null);
            }
          };

          recognitionRef.current = recognition;

          // Try to start recognition
          try {
            recognition.start();
            // Apple Store Compliance: Silent operation
          } catch (error) {
            // Apple Store Compliance: Silent fail - operation continues
            // Phase 2.1: Check if still mounted before setState
            if (!isMountedRef.current) return;
            setState({
              isListening: false,
              isProcessing: false,
              message: 'Failed to start microphone. Please type your answer.',
              error: true,
              needsConfirmation: false,
              suggestedWord: null
            });
            resolve(null);
            return;
          }

          // Auto-timeout after 5 seconds
          timeoutRef.current = setTimeout(() => {
            if (recognition && !hasResultRef.current) {
              try {
                recognition.stop();
              } catch (e) {
                // Ignore
              }
            }
          }, 5000);

        })
        .catch(() => {
          // Phase 2.1: Check if still mounted before setState
          if (!isMountedRef.current) return;
          setState({
            isListening: false,
            isProcessing: false,
            message: 'Microphone access denied. Please type your answer.',
            error: true,
            needsConfirmation: false,
            suggestedWord: null
          });
          resolve(null);
        });
    });
  }, [state.isListening, state.isProcessing, matchWord, setMessageTimeout]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Already stopped
      }
    }
    setState(prev => ({ ...prev, isListening: false }));
  }, []);

  // Confirm the suggested word
  const confirmWord = useCallback((): string | null => {
    if (!state.suggestedWord) return null;

    const word = state.suggestedWord;
    setState({
      isListening: false,
      isProcessing: false,
      message: `Correct! You said "${word}"`,
      error: false,
      needsConfirmation: false,
      suggestedWord: null
    });
    setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 1500);
    return word;
  }, [state.suggestedWord, setMessageTimeout]);

  // Reject the suggested word
  const rejectConfirmation = useCallback(() => {
    setState({
      isListening: false,
      isProcessing: false,
      message: 'Try saying the word again or type it instead.',
      error: false,
      needsConfirmation: false,
      suggestedWord: null
    });
    setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
  }, [setMessageTimeout]);

  return {
    state,
    startListening,
    stopListening,
    confirmWord,
    rejectConfirmation
  };
};
