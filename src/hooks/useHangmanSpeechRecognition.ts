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

  // Letter mapping table - exact matches only
  const letterMap: Record<string, string> = {
    // Direct letters
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 
    'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 
    'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 
    's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 
    'y': 'y', 'z': 'z',
    
    // Letter names and common pronunciations
    'ay': 'a', 'eh': 'a',
    'bee': 'b', 'be': 'b',
    'see': 'c', 'sea': 'c', 'cee': 'c',
    'dee': 'd',
    'ee': 'e',
    'ef': 'f', 'eff': 'f',
    'gee': 'g',
    'aitch': 'h', 'ach': 'h',
    'eye': 'i', 'ai': 'i',
    'jay': 'j',
    'kay': 'k', 'key': 'k',
    'el': 'l', 'ell': 'l',
    'em': 'm',
    'en': 'n',
    'oh': 'o', 'owe': 'o',
    'pee': 'p',
    'cue': 'q', 'queue': 'q',
    'ar': 'r', 'are': 'r',
    'ess': 's',
    'tee': 't', 'tea': 't',
    'you': 'u', 'yu': 'u',
    'vee': 'v',
    'double': 'w', 'double-u': 'w', 'double-you': 'w',
    'ex': 'x',
    'why': 'y',
    'zee': 'z', 'zed': 'z',
    
    // NATO alphabet
    'alpha': 'a', 'bravo': 'b', 'charlie': 'c', 'delta': 'd', 'echo': 'e',
    'foxtrot': 'f', 'golf': 'g', 'hotel': 'h', 'india': 'i', 'juliet': 'j',
    'kilo': 'k', 'lima': 'l', 'mike': 'm', 'november': 'n', 'oscar': 'o',
    'papa': 'p', 'quebec': 'q', 'romeo': 'r', 'sierra': 's', 'tango': 't',
    'uniform': 'u', 'victor': 'v', 'whiskey': 'w', 'xray': 'x', 'x-ray': 'x',
    'yankee': 'y', 'zulu': 'z'
  };

  // Extract letter from transcript using exact token matching
  const extractLetter = useCallback((transcript: string, confidence?: number): SpeechResult => {
    const normalized = transcript.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    const tokens = normalized.split(/\s+/);
    
    // Debug logging
    const debugEnabled = window.location.search.includes('debug=1');
    if (debugEnabled) {
      console.log('Speech Debug:', { 
        rawTranscript: transcript, 
        normalized,
        tokens,
        confidence 
      });
    }

    // Check each token for exact matches
    for (const token of tokens) {
      if (letterMap[token]) {
        const letter = letterMap[token];
        if (debugEnabled) {
          console.log('Speech Debug - Resolved:', { token, resolvedLetter: letter });
        }
        return { letter, confidence, transcript };
      }
    }

    // Check for single alphabetic characters
    for (const token of tokens) {
      if (/^[a-z]$/.test(token)) {
        if (debugEnabled) {
          console.log('Speech Debug - Single char:', { token });
        }
        return { letter: token, confidence, transcript };
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
          recognition.maxAlternatives = 8;
          
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
            
            // Try each alternative in confidence order
            for (const result of results) {
              const extractResult = extractLetter(result.transcript, result.confidence);
              
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
                
                // Check confidence
                if (result.confidence < 0.6) {
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
                
                // Success
                setState({
                  isListening: false,
                  isProcessing: false,
                  message: `Heard: ${letter.toUpperCase()}`,
                  error: false,
                  needsConfirmation: false,
                  suggestedLetter: null
                });
                setTimeout(() => setState(prev => ({ ...prev, message: '' })), 1000);
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
    
    setTimeout(() => setState(prev => ({ ...prev, message: '' })), 1000);
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