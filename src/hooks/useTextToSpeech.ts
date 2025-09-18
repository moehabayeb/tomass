/**
 * Updated useTextToSpeech hook using UnifiedTTS
 * Maintains backward compatibility while using memory-safe implementation
 */

import { useCallback, useRef } from 'react';
import { useUnifiedTTS } from './useUnifiedTTS';
import { TTSOptions } from '@/services/UnifiedTTSService';

interface QueuedMessage {
  text: string;
  onComplete?: () => void;
  language?: 'en-US' | 'tr-TR';
  id: string;
}

export const useTextToSpeech = () => {
  // Use the new unified TTS system
  const {
    speak: unifiedSpeak,
    speakMessage: unifiedSpeakMessage,
    stopSpeaking,
    toggleSound,
    isSpeaking,
    soundEnabled
  } = useUnifiedTTS({ autoSpeak: false });
  
  // Legacy queue for backward compatibility
  const speechQueue = useRef<QueuedMessage[]>([]);
  const isProcessingQueue = useRef(false);

  const processQueue = useCallback(async () => {
    if (isProcessingQueue.current || speechQueue.current.length === 0 || !soundEnabled) {
      return;
    }

    isProcessingQueue.current = true;
    
    while (speechQueue.current.length > 0 && soundEnabled) {
      const message = speechQueue.current.shift();
      if (!message) break;

      try {
        const options: TTSOptions = {
          language: message.language || 'auto'
        };
        
        await unifiedSpeakMessage(message.text, message.id);
        message.onComplete?.();
        
        // Small delay between messages
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('🎙️ Thomas TTS error:', error);
        message.onComplete?.(); // Still call to prevent hanging
      }
    }
    
    isProcessingQueue.current = false;
  }, [soundEnabled, unifiedSpeakMessage]);

  const speak = useCallback((text: string, onComplete?: () => void, language?: 'en-US' | 'tr-TR') => {
    if (!soundEnabled || !text.trim()) {
      onComplete?.();
      return;
    }

    // Add to queue with unique ID
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    speechQueue.current.push({
      text,
      onComplete,
      language,
      id: messageId
    });

    // Start processing if not already running
    processQueue();
  }, [soundEnabled, processQueue]);

  const stopSpeakingLegacy = useCallback(() => {
    console.log('🎙️ Thomas stopping speech');
    stopSpeaking(); // Use unified service
    speechQueue.current = []; // Clear legacy queue
    isProcessingQueue.current = false;
  }, [stopSpeaking]);

  const toggleSoundLegacy = useCallback(() => {
    const newSoundEnabled = toggleSound();
    if (!newSoundEnabled) {
      console.log('🎙️ Thomas sound disabled - stopping speech');
      speechQueue.current = [];
      isProcessingQueue.current = false;
    } else {
      console.log('🎙️ Thomas sound enabled');
    }
    return newSoundEnabled;
  }, [toggleSound]);

  return {
    speak,
    stopSpeaking: stopSpeakingLegacy,
    toggleSound: toggleSoundLegacy,
    isSpeaking,
    soundEnabled
  };
};