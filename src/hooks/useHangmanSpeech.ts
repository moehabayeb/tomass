import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SpeechResult {
  letter: string | null;
  confidence?: number;
  transcript?: string;
}

interface SpeechState {
  isListening: boolean;
  isProcessing: boolean;
  message: string;
  error: boolean;
}

export const useHangmanSpeech = () => {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isProcessing: false,
    message: '',
    error: false
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Comprehensive letter extraction with phonetics and NATO alphabet
  const extractLetter = useCallback((transcript: string, confidence?: number): SpeechResult => {
    if (confidence && confidence < 0.6) {
      return { letter: null };
    }

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
      'double u': 'w', 'double you': 'w',
      
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

    // Extract first alphabetic character from tokens
    const tokens = normalized.split(/\s+/);
    for (const token of tokens) {
      const match = token.match(/[a-z]/);
      if (match) {
        return { letter: match[0], confidence, transcript };
      }
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

      // Auto-timeout after 3 seconds
      setTimeout(() => {
        if (recognition && !hasResult) {
          recognition.stop();
          resolve({ letter: null });
        }
      }, 3000);
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

        // Auto-stop after 3 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording' && !hasResult) {
            mediaRecorder.stop();
          }
        }, 3000);

      } catch (error) {
        resolve({ letter: null });
      }
    });
  }, [extractLetter]);

  // Main speech recognition function
  const startListening = useCallback(async (alreadyGuessed: string[] = []): Promise<string | null> => {
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
        error: true
      });
      return null;
    }

    setState({
      isListening: true,
      isProcessing: false,
      message: 'Listening...',
      error: false
    });

    try {
      // Try Web Speech API first
      let result = await startWebSpeech();
      
      // If Web Speech API failed or not available, try server STT
      if (!result.letter) {
        setState(prev => ({ ...prev, isProcessing: true, message: 'Processing...' }));
        result = await startServerSTT();
      }

      // Handle results
      if (result.letter) {
        // Check if already guessed
        if (alreadyGuessed.includes(result.letter)) {
          setState({
            isListening: false,
            isProcessing: false,
            message: 'Already guessed',
            error: false
          });
          
          setTimeout(() => setState(prev => ({ ...prev, message: '' })), 2000);
          return null;
        }

        // Success
        setState({
          isListening: false,
          isProcessing: false,
          message: result.letter.toUpperCase(),
          error: false
        });

        setTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
        return result.letter;
      } else {
        // Not understood
        setState({
          isListening: false,
          isProcessing: false,
          message: '❌ Speech not understood',
          error: true
        });

        setTimeout(() => {
          setState({
            isListening: false,
            isProcessing: false,
            message: 'Say just the letter. You can also say "Alpha, Bravo..."',
            error: false
          });
          
          setTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
        }, 1500);
        
        return null;
      }
    } catch (error) {
      setState({
        isListening: false,
        isProcessing: false,
        message: '❌ Speech not understood',
        error: true
      });

      setTimeout(() => setState(prev => ({ ...prev, message: '' })), 3000);
      return null;
    }
  }, [state.isListening, state.isProcessing, startWebSpeech, startServerSTT]);

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
      error: false
    });
  }, []);

  return {
    state,
    startListening,
    stopListening
  };
};