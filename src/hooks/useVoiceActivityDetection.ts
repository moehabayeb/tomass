import { useState, useEffect, useRef, useCallback } from 'react';

export interface VADOptions {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onVolumeChange?: (volume: number) => void;
  silenceThreshold?: number; // Volume threshold below which is considered silence (0-255)
  silenceDuration?: number; // Milliseconds of silence before considering speech ended
  minSpeechDuration?: number; // Minimum speech duration in ms before triggering onSpeechEnd
}

export interface VADState {
  isListening: boolean;
  isSpeaking: boolean;
  volume: number;
  elapsedTime: number;
}

/**
 * Voice Activity Detection Hook
 * Detects when user starts and stops speaking using audio analysis
 */
export function useVoiceActivityDetection(options: VADOptions = {}) {
  const {
    onSpeechStart,
    onSpeechEnd,
    onVolumeChange,
    silenceThreshold = 12, // Lower threshold for quiet speakers/accents (0-255)
    silenceDuration = 4000, // 4 seconds - more tolerant pauses for language learners
    minSpeechDuration = 300, // Capture shorter responses (300ms)
  } = options;

  const [state, setState] = useState<VADState>({
    isListening: false,
    isSpeaking: false,
    volume: 0,
    elapsedTime: 0,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechStartTimeRef = useRef<number | null>(null);
  const isSpeakingRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  /**
   * Analyze audio input and detect voice activity
   */
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    // Calculate average volume
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const volume = Math.floor(average);

    // Update volume in state
    setState(prev => ({ ...prev, volume }));
    onVolumeChange?.(volume);

    // Update elapsed time
    if (startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      setState(prev => ({ ...prev, elapsedTime: elapsed }));
    }

    // Detect speech start
    if (volume > silenceThreshold && !isSpeakingRef.current) {
      isSpeakingRef.current = true;
      speechStartTimeRef.current = Date.now();
      setState(prev => ({ ...prev, isSpeaking: true }));
      onSpeechStart?.();

      // Clear any existing silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    }

    // Detect speech end (silence)
    if (volume <= silenceThreshold && isSpeakingRef.current) {
      // Start silence timer if not already started
      if (!silenceTimerRef.current) {
        silenceTimerRef.current = setTimeout(() => {
          const speechDuration = speechStartTimeRef.current
            ? Date.now() - speechStartTimeRef.current
            : 0;

          // Only trigger onSpeechEnd if speech was long enough
          if (speechDuration >= minSpeechDuration) {
            isSpeakingRef.current = false;
            setState(prev => ({ ...prev, isSpeaking: false }));
            onSpeechEnd?.();
          }

          silenceTimerRef.current = null;
        }, silenceDuration);
      }
    }

    // Continue analyzing
    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  }, [onSpeechStart, onSpeechEnd, onVolumeChange, silenceThreshold, silenceDuration, minSpeechDuration]);

  /**
   * Start listening for voice activity
   */
  const startListening = useCallback(async () => {
    try {
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Create audio context and analyser
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Start analyzing
      startTimeRef.current = Date.now();
      setState(prev => ({ ...prev, isListening: true, elapsedTime: 0 }));
      analyzeAudio();

      return true;
    } catch (error) {
      // Apple Store Compliance: Silent fail - VAD is optional enhancement
      return false;
    }
  }, [analyzeAudio]);

  /**
   * Stop listening for voice activity
   */
  const stopListening = useCallback(() => {
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Clear silence timer
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    // Stop audio stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Close audio context - properly await to prevent memory leaks
    if (audioContextRef.current) {
      const ctx = audioContextRef.current;
      audioContextRef.current = null;
      if (ctx.state !== 'closed') {
        ctx.close().catch(() => {
          // Ignore close errors - context might already be closed
        });
      }
    }

    analyserRef.current = null;
    isSpeakingRef.current = false;
    speechStartTimeRef.current = null;
    startTimeRef.current = null;

    setState({
      isListening: false,
      isSpeaking: false,
      volume: 0,
      elapsedTime: 0,
    });
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    ...state,
    startListening,
    stopListening,
  };
}
