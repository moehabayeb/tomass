/**
 * Memory-safe React hook for the Unified TTS Service
 * Replaces useTextToSpeech, useSpeakingTTS, useAvatarTTS with proper cleanup
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { UnifiedTTS, TTSOptions, TTSResult } from '@/services/UnifiedTTSService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

interface UseUnifiedTTSOptions {
  autoSpeak?: boolean; // Automatically speak new assistant messages
  soundEnabled?: boolean; // Initial sound state
  messages?: Message[]; // Messages to auto-process
}

export const useUnifiedTTS = (options: UseUnifiedTTSOptions = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(options.soundEnabled ?? true);
  
  // Refs for cleanup tracking
  const processedMessageIds = useRef(new Set<string>());
  const isProcessingRef = useRef(false);
  const eventCleanupRef = useRef<(() => void)[]>([]);
  const isMountedRef = useRef(true);

  // Initialize TTS service
  useEffect(() => {
    UnifiedTTS.setSoundEnabled(soundEnabled);
    
    return () => {
      // Cleanup on unmount
      isMountedRef.current = false;
      console.log('[useUnifiedTTS] Unmounting, cleaning up...');
      
      // Run all cleanup functions
      eventCleanupRef.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('[useUnifiedTTS] Cleanup error:', error);
        }
      });
      eventCleanupRef.current = [];
      
      // Reset processed messages
      processedMessageIds.current.clear();
    };
  }, [soundEnabled]);

  // Track speech events with proper cleanup
  useEffect(() => {
    const handleSpeechStart = () => {
      if (isMountedRef.current) {
        setIsSpeaking(true);
      }
    };
    
    const handleSpeechEnd = () => {
      if (isMountedRef.current) {
        setIsSpeaking(false);
      }
    };

    // Add event listeners
    window.addEventListener('speech:start', handleSpeechStart);
    window.addEventListener('speech:end', handleSpeechEnd);
    window.addEventListener('avatar:talking:start', handleSpeechStart);
    window.addEventListener('avatar:talking:end', handleSpeechEnd);

    // Track cleanup functions
    const cleanup = () => {
      window.removeEventListener('speech:start', handleSpeechStart);
      window.removeEventListener('speech:end', handleSpeechEnd);
      window.removeEventListener('avatar:talking:start', handleSpeechStart);
      window.removeEventListener('avatar:talking:end', handleSpeechEnd);
    };
    eventCleanupRef.current.push(cleanup);

    return cleanup;
  }, []);

  // Auto-speak new assistant messages with memory safety
  useEffect(() => {
    if (!options.autoSpeak || !options.messages || isProcessingRef.current) {
      return;
    }

    const processNewMessages = async () => {
      if (!isMountedRef.current) return;
      
      isProcessingRef.current = true;

      try {
        // Find new assistant messages
        const newMessages = options.messages!.filter(msg => 
          msg.role === 'assistant' && 
          msg.content?.trim() && 
          !processedMessageIds.current.has(msg.id)
        );

        if (newMessages.length === 0) {
          isProcessingRef.current = false;
          return;
        }

        console.log(`[useUnifiedTTS] Processing ${newMessages.length} new messages`);

        // Process messages sequentially
        for (const message of newMessages) {
          if (!isMountedRef.current) break;
          
          // Mark as processed immediately to prevent duplicates
          processedMessageIds.current.add(message.id);
          
          try {
            await UnifiedTTS.speakMessage(message.content, message.id);
            
            // Small delay between messages if multiple
            if (newMessages.length > 1) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          } catch (error) {
            console.warn('[useUnifiedTTS] Failed to speak message:', message.id, error);
          }
        }
      } finally {
        isProcessingRef.current = false;
      }
    };

    // Small delay to prevent race conditions
    const timeoutId = setTimeout(processNewMessages, 50);
    
    return () => clearTimeout(timeoutId);
  }, [options.messages, options.autoSpeak]);

  // Speak function with memory safety
  const speak = useCallback(async (text: string, speakOptions?: TTSOptions): Promise<TTSResult | null> => {
    if (!isMountedRef.current) {
      return null;
    }
    
    try {
      return await UnifiedTTS.speak(text, speakOptions);
    } catch (error) {
      console.error('[useUnifiedTTS] Speak error:', error);
      return null;
    }
  }, []);

  // Speak message with deduplication
  const speakMessage = useCallback(async (text: string, messageId?: string): Promise<TTSResult | null> => {
    if (!isMountedRef.current) {
      return null;
    }
    
    try {
      const result = await UnifiedTTS.speakMessage(text, messageId);
      if (messageId) {
        processedMessageIds.current.add(messageId);
      }
      return result;
    } catch (error) {
      console.error('[useUnifiedTTS] Speak message error:', error);
      return null;
    }
  }, []);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    UnifiedTTS.stop();
    isProcessingRef.current = false;
  }, []);

  // Toggle sound with state synchronization
  const toggleSound = useCallback(() => {
    const newEnabled = !soundEnabled;
    setSoundEnabled(newEnabled);
    UnifiedTTS.setSoundEnabled(newEnabled);
    
    if (!newEnabled) {
      stopSpeaking();
    }
    
    return newEnabled;
  }, [soundEnabled, stopSpeaking]);

  // Clear history
  const clearHistory = useCallback(() => {
    processedMessageIds.current.clear();
    UnifiedTTS.clearHistory();
  }, []);

  // Get diagnostics
  const getDiagnostics = useCallback(() => {
    return {
      ...UnifiedTTS.getDiagnostics(),
      hookState: {
        isMounted: isMountedRef.current,
        isProcessing: isProcessingRef.current,
        processedMessages: processedMessageIds.current.size,
        eventCleanups: eventCleanupRef.current.length
      }
    };
  }, []);

  return {
    // Core functionality
    speak,
    speakMessage,
    stopSpeaking,
    toggleSound,
    clearHistory,
    
    // State
    isSpeaking,
    soundEnabled,
    
    // Diagnostics
    getDiagnostics,
    
    // Direct access to service (use with caution)
    service: UnifiedTTS
  };
};

// Convenience hook for simple TTS without auto-speak
export const useSimpleTTS = () => {
  return useUnifiedTTS({ autoSpeak: false });
};

// Convenience hook for message-based TTS with auto-speak
export const useMessageTTS = (messages: Message[], soundEnabled = true) => {
  return useUnifiedTTS({ 
    autoSpeak: true, 
    soundEnabled, 
    messages 
  });
};