import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SpeechResult {
  letter: string | null;
  confidence?: number;
  transcript?: string;
  needsConfirmation?: boolean;
  possibleLetters?: string[];
}

interface SpeechState {
  isListening: boolean;
  isProcessing: boolean;
  message: string;
  error: boolean;
  needsConfirmation: boolean;
  possibleLetters: string[];
}

export const useHangmanSpeech = () => {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isProcessing: false,
    message: '',
    error: false,
    needsConfirmation: false,
    possibleLetters: []
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced letter extraction - comprehensive mapping, no A fallback
  const extractLetter = useCallback((transcript: string, confidence?: number, alternatives?: string[]): SpeechResult => {
    const normalized = transcript.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    
    // Comprehensive letter mappings - covers all phonetic variants
    const letterMappings: Record<string, string> = {
      // Direct letters
      'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h',
      'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p',
      'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
      'y': 'y', 'z': 'z',
      
      // Letter name variants (comprehensive)
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
      'double u': 'w', 'double-u': 'w', 'double you': 'w',
      'ex': 'x',
      'why': 'y',
      'zee': 'z', 'zed': 'z',
      
      // NATO alphabet
      'alpha': 'a', 'bravo': 'b', 'charlie': 'c', 'delta': 'd', 'echo': 'e',
      'foxtrot': 'f', 'golf': 'g', 'hotel': 'h', 'india': 'i', 'juliett': 'j',
      'juliet': 'j', 'kilo': 'k', 'lima': 'l', 'mike': 'm', 'november': 'n',
      'oscar': 'o', 'papa': 'p', 'quebec': 'q', 'romeo': 'r', 'sierra': 's',
      'tango': 't', 'uniform': 'u', 'victor': 'v', 'whiskey': 'w', 'xray': 'x',
      'x-ray': 'x', 'yankee': 'y', 'zulu': 'z'
    };
    
    // Debug logging
    const debugEnabled = window.location.search.includes('debug=1');
    if (debugEnabled) {
      console.log('Speech Debug:', { 
        rawTranscript: transcript, 
        alternatives: alternatives || [],
        confidence 
      });
    }

    // Try exact match first
    if (letterMappings[normalized]) {
      const letter = letterMappings[normalized];
      if (debugEnabled) {
        console.log('Speech Debug - Resolved:', { resolvedLetter: letter });
      }
      return { letter, confidence, transcript };
    }

    // Tokenize and check each token
    const tokens = normalized.split(/\s+/);
    const matchedLetters: string[] = [];
    
    for (const token of tokens) {
      // Check direct mapping
      if (letterMappings[token]) {
        matchedLetters.push(letterMappings[token]);
        continue;
      }
      
      // Check if token contains a mapped phrase
      for (const [key, value] of Object.entries(letterMappings)) {
        if (token.includes(key) && key.length > 1) { // Prefer longer matches
          matchedLetters.push(value);
          break;
        }
      }
    }

    // Handle "as in" phrases (e.g., "B as in boy")
    const asInMatch = normalized.match(/([a-z])\s+as\s+in/);
    if (asInMatch && !matchedLetters.length) {
      matchedLetters.push(asInMatch[1]);
    }

    // Take first matched letter if any
    if (matchedLetters.length > 0) {
      const letter = matchedLetters[0]; // Take first match, ignore rest
      if (debugEnabled) {
        console.log('Speech Debug - Resolved:', { resolvedLetter: letter });
      }
      return { letter, confidence, transcript };
    }

    // No clear letter found
    if (debugEnabled) {
      console.log('Speech Debug - No letter resolved');
    }
    return { letter: null, confidence, transcript };
  }, []);

  // Web Speech API implementation
  const startWebSpeech = useCallback((): Promise<SpeechResult> => {
    return new Promise((resolve) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        resolve({ letter: null });
        return;
      }

      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 5; // More alternatives for better letter detection
      recognition.continuous = false;

      let hasResult = false;

      recognition.onresult = (event) => {
        hasResult = true;
        const results = Array.from(event.results[0]) as SpeechRecognitionResult[];
        const alternatives = results.map(r => r.transcript);
        
        // Try each alternative in order of confidence
        for (const result of results) {
          const extractResult = extractLetter(result.transcript, result.confidence, alternatives);
          if (extractResult.letter) {
            resolve(extractResult);
            return;
          }
        }
        
        // If no letter found in any alternative, return the best transcript for debugging
        resolve({ letter: null, transcript: results[0]?.transcript });
      };

      recognition.onerror = () => {
        if (!hasResult) {
          resolve({ letter: null });
        }
      };

      recognition.onend = () => {
        if (!hasResult) {
          resolve({ letter: null });
        }
      };

      recognitionRef.current = recognition;
      recognition.start();

      // Auto-timeout after 4 seconds
      setTimeout(() => {
        if (recognition && !hasResult) {
          recognition.stop();
          resolve({ letter: null });
        }
      }, 4000);
    });
  }, [extractLetter]);

  // Server STT fallback implementation
  const startServerSTT = useCallback((): Promise<SpeechResult> => {
    return new Promise(async (resolve) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            sampleRate: 16000,
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        });

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        });
        
        audioChunksRef.current = [];
        let hasResult = false;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          if (hasResult) return;
          hasResult = true;

          try {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            if (audioBlob.size < 1000) {
              resolve({ letter: null });
              return;
            }

            // Create proper FormData for the server
            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.webm');

            const { data, error } = await supabase.functions.invoke('transcribe', {
              body: formData
            });

            if (error || !data?.transcript) {
              resolve({ letter: null });
              return;
            }

            const extractResult = extractLetter(data.transcript);
            resolve(extractResult);
          } catch (error) {
            resolve({ letter: null });
          } finally {
            stream.getTracks().forEach(track => track.stop());
          }
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start(250);

        // Auto-stop after 4 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording' && !hasResult) {
            mediaRecorder.stop();
          }
        }, 4000);

      } catch (error) {
        resolve({ letter: null });
      }
    });
  }, [extractLetter]);

  // Main speech recognition function
  const startListening = useCallback(async (alreadyGuessed: Set<string>): Promise<string | null> => {
    if (state.isListening || state.isProcessing) {
      return null;
    }

    // Check microphone permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      setState({
        isListening: false,
        isProcessing: false,
        message: 'Enable microphone to play. Settings → Microphone.',
        error: true,
        needsConfirmation: false,
        possibleLetters: []
      });
      return null;
    }

    setState({
      isListening: true,
      isProcessing: false,
      message: 'Listening...',
      error: false,
      needsConfirmation: false,
      possibleLetters: []
    });

    try {
      // Try Web Speech API first
      let result = await startWebSpeech();
      
      // If Web Speech API failed or not available, try server STT
      if (!result.letter && !result.needsConfirmation) {
        setState(prev => ({ ...prev, isProcessing: true, message: 'Processing...' }));
        result = await startServerSTT();
      }

      // Handle confirmation needed
      if (result.needsConfirmation && result.possibleLetters && result.possibleLetters.length > 0) {
        setState({
          isListening: false,
          isProcessing: false,
          message: `Did you say ${result.possibleLetters[0].toUpperCase()}?`,
          error: false,
          needsConfirmation: true,
          possibleLetters: result.possibleLetters
        });
        return null;
      }

      // Handle results
      if (result.letter) {
        // Check if already guessed
        if (alreadyGuessed.has(result.letter)) {
          setState({
            isListening: false,
            isProcessing: false,
            message: `You already tried ${result.letter.toUpperCase()}.`,
            error: false,
            needsConfirmation: false,
            possibleLetters: []
          });
          
          setTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
          return null;
        }

        // Success - show brief "Heard: X" message
        setState({
          isListening: false,
          isProcessing: false,
          message: `Heard: ${result.letter.toUpperCase()}`,
          error: false,
          needsConfirmation: false,
          possibleLetters: []
        });

        setTimeout(() => setState(prev => ({ ...prev, message: '' })), 1000); // Shorter display
        return result.letter;
      } else {
        // Not understood - show brief retry message
        setState({
          isListening: false,
          isProcessing: false,
          message: "Didn't catch a letter—try again",
          error: true,
          needsConfirmation: false,
          possibleLetters: []
        });

        setTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
        
        return null;
      }
    } catch (error) {
      setState({
        isListening: false,
        isProcessing: false,
        message: "Didn't catch that—try again",
        error: true,
        needsConfirmation: false,
        possibleLetters: []
      });

      setTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
      return null;
    }
  }, [state.isListening, state.isProcessing, startWebSpeech, startServerSTT]);

  // Confirm letter selection
  const confirmLetter = useCallback((letter: string): string | null => {
    setState({
      isListening: false,
      isProcessing: false,
      message: `Heard: ${letter.toUpperCase()}`,
      error: false,
      needsConfirmation: false,
      possibleLetters: []
    });

    setTimeout(() => setState(prev => ({ ...prev, message: '' })), 1000);
    return letter;
  }, []);

  // Reject confirmation and try again
  const rejectConfirmation = useCallback(() => {
    setState({
      isListening: false,
      isProcessing: false,
      message: '',
      error: false,
      needsConfirmation: false,
      possibleLetters: []
    });
  }, []);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
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
      possibleLetters: []
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