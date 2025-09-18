/**
 * Memory-safe Speech Recognition hook
 * Replaces useHangmanSpeechRecognition with proper resource management
 */

import { useState, useCallback, useRef, useEffect } from 'react';

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

interface UseMemorySafeSpeechRecognitionOptions {
  language?: string;
  timeout?: number;
  confidenceThreshold?: number;
}

export const useMemorySafeSpeechRecognition = (options: UseMemorySafeSpeechRecognitionOptions = {}) => {
  const {
    language = 'en-US',
    timeout = 4000,
    confidenceThreshold = 0.4
  } = options;

  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isProcessing: false,
    message: '',
    error: false,
    needsConfirmation: false,
    suggestedLetter: null
  });

  // Refs for resource management
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef(true);
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);

  // Letter mapping for speech recognition
  const letterMap: Record<string, string> = {
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f',
    'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l',
    'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r',
    's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
    'y': 'y', 'z': 'z',
    'ay': 'a', 'bee': 'b', 'see': 'c', 'dee': 'd', 'ee': 'e',
    'ef': 'f', 'gee': 'g', 'aitch': 'h', 'eye': 'i', 'jay': 'j',
    'kay': 'k', 'el': 'l', 'em': 'm', 'en': 'n', 'oh': 'o',
    'pee': 'p', 'cue': 'q', 'ar': 'r', 'ess': 's', 'tee': 't',
    'you': 'u', 'vee': 'v', 'double you': 'w', 'ex': 'x',
    'why': 'y', 'zee': 'z', 'zed': 'z'
  };

  // Cleanup function
  const cleanup = useCallback(() => {
    console.log('[MemorySafeSpeechRecognition] Cleaning up resources...');

    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Stop and cleanup recognition
    if (recognitionRef.current) {
      try {
        // Remove all event listeners before stopping
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onspeechstart = null;
        recognitionRef.current.onspeechend = null;
        recognitionRef.current.onsoundstart = null;
        recognitionRef.current.onsoundend = null;
        recognitionRef.current.onaudiostart = null;
        recognitionRef.current.onaudioend = null;
        recognitionRef.current.onnomatch = null;

        recognitionRef.current.stop();
        console.log('[MemorySafeSpeechRecognition] Recognition stopped');
      } catch (error) {
        console.warn('[MemorySafeSpeechRecognition] Recognition cleanup error:', error);
      } finally {
        recognitionRef.current = null;
      }
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log('[MemorySafeSpeechRecognition] Track stopped:', track.kind);
        });
        mediaStreamRef.current = null;
      } catch (error) {
        console.warn('[MemorySafeSpeechRecognition] Media stream cleanup error:', error);
      }
    }

    // Run additional cleanup functions
    cleanupFunctionsRef.current.forEach(cleanupFn => {
      try {
        cleanupFn();
      } catch (error) {
        console.warn('[MemorySafeSpeechRecognition] Additional cleanup error:', error);
      }
    });
    cleanupFunctionsRef.current = [];

    // Reset state if component is still mounted
    if (isMountedRef.current) {
      setState({
        isListening: false,
        isProcessing: false,
        message: '',
        error: false,
        needsConfirmation: false,
        suggestedLetter: null
      });
    }
  }, []);

  // Setup cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  // Extract letter from speech transcript
  const extractLetter = useCallback((transcript: string, confidence?: number): SpeechResult => {
    const normalized = transcript.toLowerCase().trim().replace(/[^\w\s-]/g, '');
    
    // Handle "as in" patterns (e.g., "B as in boy")
    const asInMatch = normalized.match(/([a-z])\s+as\s+in/);
    if (asInMatch) {
      return { letter: asInMatch[1], confidence, transcript };
    }

    // Handle multi-word phrases
    if (normalized.includes('double you') || normalized.includes('double-you')) {
      return { letter: 'w', confidence, transcript };
    }
    if (normalized.includes('x-ray') || normalized.includes('xray')) {
      return { letter: 'x', confidence, transcript };
    }

    // Check letter mappings
    const tokens = normalized.split(/\s+/);
    for (const token of tokens) {
      if (letterMap[token]) {
        return { letter: letterMap[token], confidence, transcript };
      }
      if (/^[a-z]$/.test(token)) {
        return { letter: token, confidence, transcript };
      }
    }

    // Check if whole transcript is a single letter
    if (/^[a-z]$/.test(normalized)) {
      return { letter: normalized, confidence, transcript };
    }

    return { letter: null, confidence, transcript };
  }, []);

  // Start listening with proper resource management
  const startListening = useCallback((alreadyGuessed: Set<string> = new Set()): Promise<string | null> => {
    return new Promise((resolve) => {
      if (state.isListening || state.isProcessing) {
        resolve(null);
        return;
      }

      // Check for speech recognition support
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setState(prev => ({
          ...prev,
          message: 'Speech recognition not supported in this browser',
          error: true
        }));
        resolve(null);
        return;
      }

      // Request microphone permission first
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          if (!isMountedRef.current) {
            // Component unmounted, cleanup immediately
            stream.getTracks().forEach(track => track.stop());
            resolve(null);
            return;
          }

          // Store stream reference for cleanup
          mediaStreamRef.current = stream;

          const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
          const recognition = new SpeechRecognition();
          recognitionRef.current = recognition;

          recognition.lang = language;
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.maxAlternatives = 10;

          let hasResult = false;
          let isFinished = false;

          const finishRecognition = (result: string | null) => {
            if (isFinished || !isMountedRef.current) return;
            isFinished = true;

            cleanup();
            resolve(result);
          };

          // Set up event handlers
          recognition.onstart = () => {
            if (!isMountedRef.current) return;
            console.log('[MemorySafeSpeechRecognition] Recognition started');
            setState(prev => ({
              ...prev,
              isListening: true,
              message: 'Listening...',
              error: false
            }));
          };

          recognition.onresult = (event) => {
            if (hasResult || !isMountedRef.current) return;
            hasResult = true;

            const alternatives: Array<{transcript: string, confidence: number}> = [];
            const results = event.results[0];
            
            for (let i = 0; i < results.length; i++) {
              alternatives.push({
                transcript: results[i].transcript,
                confidence: results[i].confidence
              });
            }

            alternatives.sort((a, b) => b.confidence - a.confidence);

            for (const alt of alternatives) {
              const extractResult = extractLetter(alt.transcript, alt.confidence);
              
              if (extractResult.letter) {
                const letter = extractResult.letter.toLowerCase();
                
                if (alreadyGuessed.has(letter)) {
                  setState(prev => ({
                    ...prev,
                    isListening: false,
                    message: `Already tried ${letter.toUpperCase()}`,
                    error: false
                  }));
                  setTimeout(() => {
                    if (isMountedRef.current) {
                      setState(prev => ({ ...prev, message: '' }));
                    }
                  }, 2000);
                  finishRecognition(null);
                  return;
                }

                if (alt.confidence < confidenceThreshold) {
                  setState(prev => ({
                    ...prev,
                    isListening: false,
                    message: `Did you say ${letter.toUpperCase()}?`,
                    needsConfirmation: true,
                    suggestedLetter: letter
                  }));
                  finishRecognition(null);
                  return;
                }

                setState(prev => ({
                  ...prev,
                  isListening: false,
                  message: `Heard: ${letter.toUpperCase()}`,
                  error: false
                }));
                setTimeout(() => {
                  if (isMountedRef.current) {
                    setState(prev => ({ ...prev, message: '' }));
                  }
                }, 800);
                finishRecognition(letter);
                return;
              }
            }

            setState(prev => ({
              ...prev,
              isListening: false,
              message: "Didn't catch a letter—say just one letter",
              error: true
            }));
            setTimeout(() => {
              if (isMountedRef.current) {
                setState(prev => ({ ...prev, message: '' }));
              }
            }, 2000);
            finishRecognition(null);
          };

          recognition.onerror = (event) => {
            if (hasResult || !isMountedRef.current) return;
            console.error('[MemorySafeSpeechRecognition] Recognition error:', event.error);
            
            setState(prev => ({
              ...prev,
              isListening: false,
              message: "Didn't catch that—try again",
              error: true
            }));
            setTimeout(() => {
              if (isMountedRef.current) {
                setState(prev => ({ ...prev, message: '' }));
              }
            }, 2000);
            finishRecognition(null);
          };

          recognition.onend = () => {
            if (hasResult || !isMountedRef.current) return;
            console.log('[MemorySafeSpeechRecognition] Recognition ended');
            
            setState(prev => ({
              ...prev,
              isListening: false,
              message: "Didn't catch that—try again",
              error: true
            }));
            setTimeout(() => {
              if (isMountedRef.current) {
                setState(prev => ({ ...prev, message: '' }));
              }
            }, 2000);
            finishRecognition(null);
          };

          // Start recognition
          try {
            recognition.start();
            
            // Set timeout
            timeoutRef.current = setTimeout(() => {
              if (!hasResult && recognition && isMountedRef.current) {
                console.log('[MemorySafeSpeechRecognition] Recognition timeout');
                recognition.stop();
              }
            }, timeout);
            
          } catch (error) {
            console.error('[MemorySafeSpeechRecognition] Failed to start recognition:', error);
            finishRecognition(null);
          }
        })
        .catch((error) => {
          console.error('[MemorySafeSpeechRecognition] Microphone permission denied:', error);
          setState(prev => ({
            ...prev,
            message: 'Enable microphone to play. Settings → Microphone.',
            error: true
          }));
          resolve(null);
        });
    });
  }, [state.isListening, state.isProcessing, language, timeout, confidenceThreshold, extractLetter, cleanup]);

  // Confirm suggested letter
  const confirmLetter = useCallback((): string | null => {
    if (!state.suggestedLetter) return null;
    
    const letter = state.suggestedLetter;
    setState(prev => ({
      ...prev,
      message: `Heard: ${letter.toUpperCase()}`,
      needsConfirmation: false,
      suggestedLetter: null
    }));
    
    setTimeout(() => {
      if (isMountedRef.current) {
        setState(prev => ({ ...prev, message: '' }));
      }
    }, 800);
    
    return letter;
  }, [state.suggestedLetter]);

  // Reject confirmation
  const rejectConfirmation = useCallback(() => {
    setState(prev => ({
      ...prev,
      message: '',
      needsConfirmation: false,
      suggestedLetter: null
    }));
  }, []);

  // Stop listening
  const stopListening = useCallback(() => {
    cleanup();
  }, [cleanup]);

  return {
    state,
    startListening,
    stopListening,
    confirmLetter,
    rejectConfirmation,
    cleanup
  };
};