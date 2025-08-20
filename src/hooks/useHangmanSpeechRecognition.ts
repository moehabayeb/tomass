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

  // Comprehensive letter mapping table - exact matches only
  const letterMap: Record<string, string> = {
    // Direct single letters
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 
    'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 
    'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 
    's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 
    'y': 'y', 'z': 'z',
    
    // Letter names and pronunciations (comprehensive coverage)
    'ay': 'a', 'eh': 'a', 'aye': 'a',
    'bee': 'b', 'be': 'b', 'bea': 'b',
    'see': 'c', 'sea': 'c', 'cee': 'c', 'si': 'c',
    'dee': 'd', 'de': 'd',
    'ee': 'e', 'ea': 'e',
    'ef': 'f', 'eff': 'f', 'eph': 'f',
    'gee': 'g', 'ghee': 'g', 'ji': 'g',
    'aitch': 'h', 'ach': 'h', 'aych': 'h',
    'eye': 'i', 'ai': 'i', 'iy': 'i',
    'jay': 'j', 'jae': 'j', 'jey': 'j',
    'kay': 'k', 'key': 'k', 'kaye': 'k', 'ca': 'k',
    'el': 'l', 'ell': 'l', 'elle': 'l',
    'em': 'm', 'emm': 'm',
    'en': 'n', 'enn': 'n',
    'oh': 'o', 'owe': 'o', 'eau': 'o',
    'pee': 'p', 'pe': 'p', 'pea': 'p',
    'cue': 'q', 'queue': 'q', 'que': 'q', 'kyu': 'q',
    'ar': 'r', 'are': 'r', 'arr': 'r',
    'ess': 's', 'es': 's',
    'tee': 't', 'tea': 't', 'te': 't',
    'you': 'u', 'yu': 'u', 'yuu': 'u',
    'vee': 'v', 've': 'v', 'vea': 'v',
    'double': 'w', 'double-u': 'w', 'double-you': 'w', 'double you': 'w', 'doubleyou': 'w',
    'ex': 'x', 'eks': 'x',
    'why': 'y', 'wye': 'y', 'wi': 'y',
    'zee': 'z', 'zed': 'z', 'ze': 'z',
    
    // NATO phonetic alphabet
    'alpha': 'a', 'bravo': 'b', 'charlie': 'c', 'delta': 'd', 'echo': 'e',
    'foxtrot': 'f', 'golf': 'g', 'hotel': 'h', 'india': 'i', 'juliet': 'j',
    'kilo': 'k', 'lima': 'l', 'mike': 'm', 'november': 'n', 'oscar': 'o',
    'papa': 'p', 'quebec': 'q', 'romeo': 'r', 'sierra': 's', 'tango': 't',
    'uniform': 'u', 'victor': 'v', 'whiskey': 'w', 'xray': 'x', 'x-ray': 'x',
    'yankee': 'y', 'zulu': 'z'
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

  // Extract letter from transcript using exact token matching
  const extractLetter = useCallback((transcript: string, confidence?: number, alternatives?: string[]): SpeechResult => {
    const normalized = transcript.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    const tokens = normalized.split(/\s+/);
    
    // Debug logging
    const debugEnabled = window.location.search.includes('debug=1');
    if (debugEnabled) {
      console.log('Speech Debug:', { 
        raw: transcript, 
        alternatives: alternatives || [],
        normalized,
        tokens,
        confidence 
      });
    }

    // Handle "as in" patterns (e.g., "B as in boy")
    const asInMatch = normalized.match(/([a-z])\s+as\s+in/);
    if (asInMatch) {
      const letter = asInMatch[1];
      if (debugEnabled) {
        console.log('Speech Debug - As in pattern:', { letter });
      }
      return { letter, confidence, transcript };
    }

    // Check multi-word phrases first (e.g., "double you")
    const multiWordPhrases = ['double you', 'double-you', 'double-u', 'x-ray'];
    for (const phrase of multiWordPhrases) {
      if (normalized.includes(phrase) && letterMap[phrase.replace(/\s+/g, ' ')]) {
        const letter = letterMap[phrase.replace(/\s+/g, ' ')];
        if (debugEnabled) {
          console.log('Speech Debug - Multi-word:', { phrase, letter });
        }
        return { letter, confidence, transcript };
      }
    }

    // Check each token for exact matches
    const foundLetters: string[] = [];
    for (const token of tokens) {
      if (letterMap[token]) {
        foundLetters.push(letterMap[token]);
      } else if (/^[a-z]$/.test(token)) {
        foundLetters.push(token);
      }
    }

    // If we found exactly one letter, use it
    if (foundLetters.length === 1) {
      const letter = foundLetters[0];
      if (debugEnabled) {
        console.log('Speech Debug - Resolved:', { letter, chosen: letter });
      }
      return { letter, confidence, transcript };
    }

    // If multiple letters found, this is ambiguous
    if (foundLetters.length > 1) {
      const uniqueLetters = [...new Set(foundLetters)];
      if (uniqueLetters.length === 1) {
        // All tokens mapped to same letter
        const letter = uniqueLetters[0];
        if (debugEnabled) {
          console.log('Speech Debug - Multiple same:', { letter });
        }
        return { letter, confidence, transcript };
      } else {
        // Different letters found - ambiguous
        if (debugEnabled) {
          console.log('Speech Debug - Ambiguous:', { foundLetters: uniqueLetters });
        }
        return { letter: null, confidence, transcript, needsConfirmation: true };
      }
    }

    // No clear letter found
    if (debugEnabled) {
      console.log('Speech Debug - No letter resolved');
    }
    return { letter: null, confidence, transcript };
  }, []);

  // Setup speech grammar for better recognition
  const setupSpeechGrammar = useCallback((recognition: SpeechRecognition) => {
    if ('webkitSpeechGrammarList' in window || 'SpeechGrammarList' in window) {
      try {
        const SpeechGrammarList = (window as any).webkitSpeechGrammarList || (window as any).SpeechGrammarList;
        const grammarList = new SpeechGrammarList();
        
        // JSGF grammar for letters and their variants
        const grammar = `#JSGF V1.0;
grammar letters;
public <letter> = 
  a | ay | eh | alpha |
  b | bee | be | bravo |
  c | see | sea | cee | charlie |
  d | dee | delta |
  e | ee | echo |
  f | ef | eff | foxtrot |
  g | gee | golf |
  h | aitch | ach | hotel |
  i | eye | ai | india |
  j | jay | juliet |
  k | kay | key | kilo |
  l | el | ell | lima |
  m | em | mike |
  n | en | november |
  o | oh | owe | oscar |
  p | pee | papa |
  q | cue | queue | quebec |
  r | ar | are | romeo |
  s | ess | sierra |
  t | tee | tea | tango |
  u | you | yu | uniform |
  v | vee | victor |
  w | double u | double-u | double-you | whiskey |
  x | ex | xray | x-ray |
  y | why | yankee |
  z | zee | zed | zulu ;`;
        
        grammarList.addFromString(grammar, 1);
        (recognition as any).grammars = grammarList;
      } catch (error) {
        console.warn('Speech grammar not supported:', error);
      }
    }
  }, []);

  // Start speech recognition
  const startListening = useCallback((alreadyGuessed: Set<string>): Promise<string | null> => {
    return new Promise((resolve) => {
      if (state.isListening || state.isProcessing) {
        resolve(null);
        return;
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
          
          let hasResult = false;

          setState({
            isListening: true,
            isProcessing: false,
            message: 'Listening...',
            error: false,
            needsConfirmation: false,
            suggestedLetter: null
          });

          recognition.onresult = (event) => {
            if (hasResult) return;
            hasResult = true;

            const results = Array.from(event.results[0]) as SpeechRecognitionResult[];
            const alternatives = results.map(r => r.transcript);
            
            // Try each alternative in confidence order
            for (const result of results) {
              const extractResult = extractLetter(result.transcript, result.confidence, alternatives);
              
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
                  setTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
                  resolve(null);
                  return;
                }
                
                // Check confidence or if it's an ambiguous pair
                const needsConfirmation = result.confidence < 0.6 || 
                  (ambiguousPairs[letter] && result.confidence < 0.8);
                
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
                
                // Success - show brief "Heard: X" message
                setState({
                  isListening: false,
                  isProcessing: false,
                  message: `Heard: ${letter.toUpperCase()}`,
                  error: false,
                  needsConfirmation: false,
                  suggestedLetter: null
                });
                setTimeout(() => setState(prev => ({ ...prev, message: '' })), 800);
                resolve(letter);
                return;
              }
            }
            
            // No letter found
            setState({
              isListening: false,
              isProcessing: false,
              message: "Didn't catch a letter—say just one letter",
              error: true,
              needsConfirmation: false,
              suggestedLetter: null
            });
            setTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
            resolve(null);
          };

          recognition.onerror = () => {
            if (!hasResult) {
              setState({
                isListening: false,
                isProcessing: false,
                message: "Didn't catch that—try again",
                error: true,
                needsConfirmation: false,
                suggestedLetter: null
              });
              setTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
              resolve(null);
            }
          };

          recognition.onend = () => {
            if (!hasResult) {
              setState({
                isListening: false,
                isProcessing: false,
                message: "Didn't catch that—try again",
                error: true,
                needsConfirmation: false,
                suggestedLetter: null
              });
              setTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
              resolve(null);
            }
          };

          recognitionRef.current = recognition;
          recognition.start();

          // Auto-timeout after 4 seconds
          timeoutRef.current = setTimeout(() => {
            if (recognition && !hasResult) {
              recognition.stop();
            }
          }, 4000);
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
  }, [state.isListening, state.isProcessing, extractLetter, setupSpeechGrammar]);

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
    
    setTimeout(() => setState(prev => ({ ...prev, message: '' })), 800);
    return letter;
  }, [state.suggestedLetter]);

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

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setState({
      isListening: false,
      isProcessing: false,
      message: '',
      error: false,
      needsConfirmation: false,
      suggestedLetter: null
    });
  }, []);

  return {
    state,
    startListening,
    stopListening,
    confirmLetter,
    rejectConfirmation
  };
};