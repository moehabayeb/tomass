/**
 * Unified Text-to-Speech Hook
 *
 * Platform-aware TTS hook that works on:
 * - Android/iOS: Uses native TTS via Capacitor plugin (better quality)
 * - Web browsers: Uses Web Speech API
 *
 * This is the recommended hook for TTS in the app.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { UnifiedTTSService, TTSOptions } from '../services/UnifiedTTSService';

export interface UseUnifiedTextToSpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export interface UseUnifiedTextToSpeechReturn {
  speak: (text: string, options?: Partial<TTSOptions>) => Promise<void>;
  stop: () => Promise<void>;
  isSpeaking: boolean;
  isAvailable: boolean;
  isNative: boolean;
}

export function useUnifiedTextToSpeech(
  options: UseUnifiedTextToSpeechOptions = {}
): UseUnifiedTextToSpeechReturn {
  const {
    lang = 'en-US',
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0,
    onStart,
    onEnd,
    onError
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const mountedRef = useRef(true);

  // Check availability on mount
  useEffect(() => {
    mountedRef.current = true;

    const checkAvailability = async () => {
      try {
        const available = await UnifiedTTSService.isAvailable();
        if (mountedRef.current) {
          setIsAvailable(available);
        }
      } catch (error) {
        console.error('[useUnifiedTextToSpeech] Error checking availability:', error);
        if (mountedRef.current) {
          setIsAvailable(false);
        }
      }
    };

    checkAvailability();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const speak = useCallback(async (text: string, speakOptions?: Partial<TTSOptions>) => {
    if (!text || text.trim().length === 0) {
      return;
    }

    try {
      // Stop any ongoing speech
      await UnifiedTTSService.stop();

      setIsSpeaking(true);
      onStart?.();

      await UnifiedTTSService.speak({
        text,
        lang: speakOptions?.lang || lang,
        rate: speakOptions?.rate || rate,
        pitch: speakOptions?.pitch || pitch,
        volume: speakOptions?.volume || volume,
        voice: speakOptions?.voice
      });

      if (mountedRef.current) {
        setIsSpeaking(false);
        onEnd?.();
      }
    } catch (error) {
      console.error('[useUnifiedTextToSpeech] Speak error:', error);
      if (mountedRef.current) {
        setIsSpeaking(false);
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }, [lang, rate, pitch, volume, onStart, onEnd, onError]);

  const stop = useCallback(async () => {
    try {
      await UnifiedTTSService.stop();
      if (mountedRef.current) {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('[useUnifiedTextToSpeech] Stop error:', error);
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isAvailable,
    isNative: UnifiedTTSService.isNativePlatform()
  };
}

export default useUnifiedTextToSpeech;
