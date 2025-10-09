import { useState, useCallback, useRef } from 'react';

interface SpeechResult {
  letter: string | null;
  confidence?: number;
  transcript?: string;
  needsConfirmation?: boolean;
}

interface SpeechState {
  isListening: boolean;
  isProcessing: boolean;
  message: string;
  error: boolean;
  needsConfirmation: boolean;
  suggestedLetter: string | null;
}

export const useHangmanSpeechRecognition = () => {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isProcessing: false,
    message: '',
    error: false,
    needsConfirmation: false,
    suggestedLetter: null
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasResultRef = useRef(false);
  const messageTimeoutsRef = useRef<NodeJS.Timeout[]>([]); // Track all message timeouts

  // Helper function to set message timeout and track it
  const setMessageTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    messageTimeoutsRef.current.push(timeoutId);
    return timeoutId;
  }, []);

  // Helper function to clear all message timeouts
  const clearAllMessageTimeouts = useCallback(() => {
    messageTimeoutsRef.current.forEach(id => clearTimeout(id));
    messageTimeoutsRef.current = [];
  }, []);

  // Cleanup all resources on unmount
  useEffect(() => {
    return () => {
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

  // Comprehensive letter mapping table - exact matches only
  const letterMap: Record<string, string> = {
    // Direct single letters
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f',
    'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l',
    'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r',
    's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
    'y': 'y', 'z': 'z',

    // Letter names and pronunciations (comprehensive coverage)
    'ay': 'a', 'eh': 'a', 'aye': 'a', 'hey': 'a',
    'bee': 'b', 'be': 'b', 'bea': 'b', 'bi': 'b',
    'see': 'c', 'sea': 'c', 'cee': 'c', 'si': 'c', 'ci': 'c',
    'dee': 'd', 'de': 'd', 'di': 'd',
    'ee': 'e', 'ea': 'e', 'ei': 'e',
    'ef': 'f', 'eff': 'f', 'eph': 'f', 'aff': 'f',
    'gee': 'g', 'ghee': 'g', 'ji': 'g', 'ge': 'g',
    'aitch': 'h', 'ach': 'h', 'aych': 'h', 'eich': 'h', 'atch': 'h',
    'eye': 'i', 'ai': 'i', 'iy': 'i', 'aye': 'i',
    'jay': 'j', 'jae': 'j', 'jey': 'j', 'je': 'j',
    'kay': 'k', 'key': 'k', 'kaye': 'k', 'ca': 'k', 'ke': 'k',
    'el': 'l', 'ell': 'l', 'elle': 'l', 'le': 'l',
    'em': 'm', 'emm': 'm', 'me': 'm',
    'en': 'n', 'enn': 'n', 'ne': 'n',
    'oh': 'o', 'owe': 'o', 'eau': 'o', 'oe': 'o',
    'pee': 'p', 'pe': 'p', 'pea': 'p', 'pi': 'p',
    'cue': 'q', 'queue': 'q', 'que': 'q', 'kyu': 'q', 'cu': 'q',
    'ar': 'r', 'are': 'r', 'arr': 'r', 're': 'r',
    'ess': 's', 'es': 's', 'ass': 's',
    'tee': 't', 'tea': 't', 'te': 't', 'ti': 't',
    'you': 'u', 'yu': 'u', 'yuu': 'u', 'oo': 'u',
    'vee': 'v', 've': 'v', 'vea': 'v', 'vi': 'v',
    'double': 'w', 'double-u': 'w', 'double-you': 'w', 'double you': 'w', 'doubleyou': 'w', 'doubleu': 'w',
    'ex': 'x', 'eks': 'x', 'ecks': 'x',
    'why': 'y', 'wye': 'y', 'wi': 'y', 'ye': 'y',
    'zee': 'z', 'zed': 'z', 'ze': 'z', 'zea': 'z',

    // NATO phonetic alphabet
    'alpha': 'a', 'bravo': 'b', 'charlie': 'c', 'delta': 'd', 'echo': 'e',
    'foxtrot': 'f', 'golf': 'g', 'hotel': 'h', 'india': 'i', 'juliet': 'j',
    'kilo': 'k', 'lima': 'l', 'mike': 'm', 'november': 'n', 'oscar': 'o',
    'papa': 'p', 'quebec': 'q', 'romeo': 'r', 'sierra': 's', 'tango': 't',
    'uniform': 'u', 'victor': 'v', 'whiskey': 'w', 'xray': 'x', 'x-ray': 'x',
    'yankee': 'y', 'zulu': 'z',

    // Common misheard variations
    'the': 't', 'for': 'f', 'too': 't', 'to': 't', 'two': 't',
    'sea': 'c', 'letter': '', 'number': ''
  };

  // Problematic letter pairs that need disambiguation
  const ambiguousPairs: Record<string, string[]> = {
    'b': ['p', 'v'], 'p': ['b'],
    'm': ['n'], 'n': ['m'],
    'f': ['s'], 's': ['f'],
    'c': ['k'], 'k': ['c'],
    'g': ['j'], 'j': ['g'],
    'd': ['t'], 't': ['d'],
    'v': ['b']
  };

  // Simplified letter extraction - direct and reliable
  const extractLetter = useCallback((transcript: string, confidence?: number): SpeechResult => {
    const normalized = transcript.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    
    // Debug logging
    const debugEnabled = window.location.search.includes('debug=1');
    if (debugEnabled) {
      // Processing speech - raw: ${transcript}, normalized: ${normalized}, confidence: ${confidence}
    }

    // Handle "as in" patterns (e.g., "B as in boy")
    const asInMatch = normalized.match(/([a-z])\s+as\s+in/);
    if (asInMatch) {
      const letter = asInMatch[1];
      if (debugEnabled) {
      }
      return { letter, confidence, transcript };
    }

    // Handle multi-word phrases like "double you"
    if (normalized.includes('double you') || normalized.includes('double-you') || normalized.includes('double u')) {
      return { letter: 'w', confidence, transcript };
    }
    if (normalized.includes('x-ray') || normalized.includes('xray')) {
      return { letter: 'x', confidence, transcript };
    }

    // Split into tokens and check each one
    const tokens = normalized.split(/\s+/);
    
    for (const token of tokens) {
      // Direct letter mapping
      if (letterMap[token]) {
        const letter = letterMap[token];
        if (debugEnabled) {
        }
        return { letter, confidence, transcript };
      }
      
      // Single alphabetic character
      if (/^[a-z]$/.test(token)) {
        if (debugEnabled) {
        }
        return { letter: token, confidence, transcript };
      }
    }

    // Check if the whole transcript is just a single letter
    if (/^[a-z]$/.test(normalized)) {
      return { letter: normalized, confidence, transcript };
    }

    // No letter found
    if (debugEnabled) {
    }
    return { letter: null, confidence, transcript };
  }, []);

  // Simple speech grammar setup
  const setupSpeechGrammar = useCallback((recognition: SpeechRecognition) => {
    try {
      // Try to set up grammar but don't fail if unsupported
      const SpeechGrammarList = (window as any).webkitSpeechGrammarList || (window as any).SpeechGrammarList;
      if (SpeechGrammarList) {
        const grammarList = new SpeechGrammarList();
        
        // Simple JSGF grammar focusing on common letter pronunciations
        const grammar = `#JSGF V1.0;
grammar letters;
public <letter> = a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z |
                  ay | bee | see | dee | ee | ef | gee | aitch | eye | jay | kay | el | em | en | oh | pee | cue | ar | ess | tee | you | vee | double you | ex | why | zee |  
                  alpha | bravo | charlie | delta | echo | foxtrot | golf | hotel | india | juliet | kilo | lima | mike | november | oscar | papa | quebec | romeo | sierra | tango | uniform | victor | whiskey | xray | yankee | zulu ;`;
        
        grammarList.addFromString(grammar, 1);
        (recognition as any).grammars = grammarList;
      }
    } catch (error) {
      // Grammar setup failed, continue without it
    }
  }, []);

  // Cleanup function to prevent memory leaks - uses stop() not abort()
  const cleanup = useCallback(() => {
    // Clear timeout first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Stop recognition gracefully (not abort - abort is too aggressive)
    if (recognitionRef.current) {
      try {
        // Use stop() for graceful shutdown - triggers onend event
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors during cleanup (might already be stopped)
      }
      recognitionRef.current = null;
    }

    hasResultRef.current = false;
  }, []);

  // Start speech recognition
  const startListening = useCallback((alreadyGuessed: Set<string>): Promise<string | null> => {
    return new Promise((resolve) => {
      // Prevent multiple concurrent listeners
      if (state.isListening || state.isProcessing) {
        resolve(null);
        return;
      }

      // Stop any existing recognition (but don't abort the new one we're about to create!)
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
          suggestedLetter: null
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
          recognition.maxAlternatives = 10;

          setupSpeechGrammar(recognition);

          hasResultRef.current = false;

          setState({
            isListening: true,
            isProcessing: false,
            message: 'Listening...',
            error: false,
            needsConfirmation: false,
            suggestedLetter: null
          });

          recognition.onresult = (event) => {
            if (hasResultRef.current) return;
            hasResultRef.current = true;

            // Get all alternatives from the speech recognition result
            const results = event.results[0];
            const alternatives: Array<{transcript: string, confidence: number}> = [];
            
            // Collect all alternatives
            for (let i = 0; i < results.length; i++) {
              alternatives.push({
                transcript: results[i].transcript,
                confidence: results[i].confidence
              });
            }
            
            // Sort by confidence (highest first)
            alternatives.sort((a, b) => b.confidence - a.confidence);
            
            const debugEnabled = window.location.search.includes('debug=1');
            if (debugEnabled) {
            }
            
            // Try each alternative
            for (const alt of alternatives) {
              const extractResult = extractLetter(alt.transcript, alt.confidence);
              
              if (extractResult.letter) {
                const letter = extractResult.letter.toLowerCase();
                
                // Check if already guessed
                if (alreadyGuessed.has(letter)) {
                  setState({
                    isListening: false,
                    isProcessing: false,
                    message: `Already tried ${letter.toUpperCase()}`,
                    error: false,
                    needsConfirmation: false,
                    suggestedLetter: null
                  });
                  setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
                  resolve(null);
                  return;
                }
                
                // Lower confidence threshold for better UX (0.2 instead of 0.3)
                const needsConfirmation = alt.confidence < 0.2;
                
                if (needsConfirmation) {
                  setState({
                    isListening: false,
                    isProcessing: false,
                    message: `Did you say ${letter.toUpperCase()}?`,
                    error: false,
                    needsConfirmation: true,
                    suggestedLetter: letter
                  });
                  resolve(null);
                  return;
                }
                
                // Success - clear timeout and show brief "Heard: X" message
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }

                setState({
                  isListening: false,
                  isProcessing: false,
                  message: `Heard: ${letter.toUpperCase()}`,
                  error: false,
                  needsConfirmation: false,
                  suggestedLetter: null
                });
                setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 800);
                resolve(letter);
                return;
              }
            }
            
            // No letter found in any alternative
            setState({
              isListening: false,
              isProcessing: false,
              message: "Didn't catch a letter—say just one letter",
              error: true,
              needsConfirmation: false,
              suggestedLetter: null
            });
            setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
            resolve(null);
          };

          recognition.onerror = (event) => {
            if (!hasResultRef.current) {
              hasResultRef.current = true;

              // Log error details for debugging
              console.error('[Hangman Speech] Error:', event.error, event.message);

              // User-friendly error messages based on error type
              let errorMessage = "Didn't catch that—try again";
              if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                errorMessage = 'Enable microphone to play. Settings → Microphone.';
              } else if (event.error === 'no-speech') {
                errorMessage = 'No speech detected—try speaking louder';
              } else if (event.error === 'audio-capture') {
                errorMessage = 'Microphone not working—check your device';
              } else if (event.error === 'network') {
                errorMessage = 'Network error—check your connection';
              }

              setState({
                isListening: false,
                isProcessing: false,
                message: errorMessage,
                error: true,
                needsConfirmation: false,
                suggestedLetter: null
              });
              setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
              resolve(null);
            }
          };

          recognition.onend = () => {
            // DON'T call cleanup() here - causes recursive loop!
            // Just clear the ref since recognition ended naturally
            recognitionRef.current = null;

            if (!hasResultRef.current) {
              hasResultRef.current = true;
              setState({
                isListening: false,
                isProcessing: false,
                message: "Didn't catch that—try again",
                error: true,
                needsConfirmation: false,
                suggestedLetter: null
              });
              setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
              resolve(null);
            }
          };

          recognitionRef.current = recognition;

          // Try to start recognition with error handling
          try {
            recognition.start();
            console.log('[Hangman Speech] Recognition started successfully');
          } catch (error) {
            console.error('[Hangman Speech] Failed to start recognition:', error);
            setState({
              isListening: false,
              isProcessing: false,
              message: 'Failed to start microphone—try again',
              error: true,
              needsConfirmation: false,
              suggestedLetter: null
            });
            resolve(null);
            return;
          }

          // Auto-timeout after 5 seconds (increased from 4 for better UX)
          timeoutRef.current = setTimeout(() => {
            if (recognition && !hasResultRef.current) {
              try {
                recognition.stop();
              } catch (e) {
                // Ignore errors if already stopped
              }
            }
          }, 5000);
        })
        .catch(() => {
          setState({
            isListening: false,
            isProcessing: false,
            message: 'Enable microphone to play. Settings → Microphone.',
            error: true,
            needsConfirmation: false,
            suggestedLetter: null
          });
          resolve(null);
        });
    });
  }, [state.isListening, state.isProcessing, extractLetter, setupSpeechGrammar, setMessageTimeout]);

  // Confirm suggested letter
  const confirmLetter = useCallback((): string | null => {
    if (!state.suggestedLetter) return null;
    
    const letter = state.suggestedLetter;
    setState({
      isListening: false,
      isProcessing: false,
      message: `Heard: ${letter.toUpperCase()}`,
      error: false,
      needsConfirmation: false,
      suggestedLetter: null
    });
    
    setMessageTimeout(() => setState(prev => ({ ...prev, message: '' })), 800);
    return letter;
  }, [state.suggestedLetter, setMessageTimeout]);

  // Reject confirmation
  const rejectConfirmation = useCallback(() => {
    setState({
      isListening: false,
      isProcessing: false,
      message: '',
      error: false,
      needsConfirmation: false,
      suggestedLetter: null
    });
  }, []);

  // Stop listening - now uses cleanup
  const stopListening = useCallback(() => {
    cleanup();
    setState({
      isListening: false,
      isProcessing: false,
      message: '',
      error: false,
      needsConfirmation: false,
      suggestedLetter: null
    });
  }, [cleanup]);

  return {
    state,
    startListening,
    stopListening,
    confirmLetter,
    rejectConfirmation
  };
};