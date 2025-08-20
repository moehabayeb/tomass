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

  // Enhanced letter extraction with ambiguity detection
  const extractLetter = useCallback((transcript: string, confidence?: number): SpeechResult => {
    const normalized = transcript.toLowerCase().trim().replace(/[^\w\s]/g, '');
    
    // Direct letter mappings including phonetics
    const letterMappings: Record<string, string> = {
      // Single letters
      'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h',
      'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p',
      'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
      'y': 'y', 'z': 'z',
      
      // Common phonetic mishears
      'why': 'y', 'are': 'r', 'see': 'c', 'sea': 'c', 'bee': 'b', 'be': 'b',
      'tea': 't', 'tee': 't', 'cue': 'q', 'queue': 'q', 'you': 'u', 'jay': 'j',
      'kay': 'k', 'key': 'k', 'ell': 'l', 'em': 'm', 'en': 'n', 'pee': 'p',
      'ess': 's', 'ex': 'x', 'zed': 'z', 'zee': 'z',
      
      // Letter names
      'ay': 'a', 'eh': 'a', 'dee': 'd', 'ef': 'f', 'eff': 'f', 'gee': 'g',
      'aitch': 'h', 'ach': 'h', 'eye': 'i', 'ai': 'i', 'oh': 'o', 'ar': 'r',
      'double u': 'w', 'double you': 'w', 'vee': 'v', 'el': 'l',
      
      // NATO alphabet
      'alpha': 'a', 'bravo': 'b', 'charlie': 'c', 'delta': 'd', 'echo': 'e',
      'foxtrot': 'f', 'golf': 'g', 'hotel': 'h', 'india': 'i', 'juliett': 'j',
      'juliet': 'j', 'kilo': 'k', 'lima': 'l', 'mike': 'm', 'november': 'n',
      'oscar': 'o', 'papa': 'p', 'quebec': 'q', 'romeo': 'r', 'sierra': 's',
      'tango': 't', 'uniform': 'u', 'victor': 'v', 'whiskey': 'w', 'xray': 'x',
      'x-ray': 'x', 'yankee': 'y', 'zulu': 'z'
    };

    // Try exact match first
    if (letterMappings[normalized]) {
      return { letter: letterMappings[normalized], confidence, transcript };
    }

    // Try partial matches in the transcript
    for (const [key, value] of Object.entries(letterMappings)) {
      if (normalized.includes(key)) {
        return { letter: value, confidence, transcript };
      }
    }

    // Handle "as in" phrases (e.g., "B as in boy")
    const asInMatch = normalized.match(/([a-z])\s+as\s+in/);
    if (asInMatch) {
      return { letter: asInMatch[1], confidence, transcript };
    }

    // Extract from longer words (e.g., "equality" -> "e")
    const tokens = normalized.split(/\s+/);
    const possibleLetters: string[] = [];
    
    for (const token of tokens) {
      if (token.length > 3) {
        // For longer words, extract first letter and check confidence
        const firstLetter = token[0];
        if (firstLetter.match(/[a-z]/)) {
          possibleLetters.push(firstLetter);
        }
      } else {
        // For shorter tokens, try to extract any letter
        const match = token.match(/[a-z]/);
        if (match) {
          possibleLetters.push(match[0]);
        }
      }
    }

    if (possibleLetters.length === 1) {
      const letter = possibleLetters[0];
      // Check if we need confirmation for low confidence or ambiguous cases
      if (confidence && confidence < 0.6) {
        return { 
          letter: null, 
          needsConfirmation: true, 
          possibleLetters: [letter], 
          confidence, 
          transcript 
        };
      }
      return { letter, confidence, transcript };
    } else if (possibleLetters.length > 1) {
      // Multiple possible letters - need confirmation
      return { 
        letter: null, 
        needsConfirmation: true, 
        possibleLetters: possibleLetters.slice(0, 3), // Max 3 options
        confidence, 
        transcript 
      };
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
      recognition.maxAlternatives = 3;
      recognition.continuous = false;

      let hasResult = false;

      recognition.onresult = (event) => {
        hasResult = true;
        const results = Array.from(event.results[0]) as SpeechRecognitionResult[];
        
        // Try each alternative in order of confidence
        for (const result of results) {
          const extractResult = extractLetter(result.transcript, result.confidence);
          if (extractResult.letter) {
            resolve(extractResult);
            return;
          }
        }
        
        // If no letter found in any alternative
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

        // Success
        setState({
          isListening: false,
          isProcessing: false,
          message: `We heard: ${result.letter.toUpperCase()}`,
          error: false,
          needsConfirmation: false,
          possibleLetters: []
        });

        setTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
        return result.letter;
      } else {
        // Not understood
        setState({
          isListening: false,
          isProcessing: false,
          message: "Didn't catch that—try again",
          error: true,
          needsConfirmation: false,
          possibleLetters: []
        });

        setTimeout(() => {
          setState({
            isListening: false,
            isProcessing: false,
            message: 'Say just the letter. You can also say "Alpha, Bravo..."',
            error: false,
            needsConfirmation: false,
            possibleLetters: []
          });
          
          setTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
        }, 1500);
        
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
      message: `We heard: ${letter.toUpperCase()}`,
      error: false,
      needsConfirmation: false,
      possibleLetters: []
    });

    setTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
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