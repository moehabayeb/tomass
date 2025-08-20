import { useEffect, useRef, useState } from 'react';
import { SimpleTTS, speakAssistantMessage } from '@/voice/SimpleTTS';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Hook for automatically speaking assistant messages in the Speaking app
 */
export const useSpeakingTTS = (messages: Message[], soundEnabled: boolean) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const processedIds = useRef(new Set<string>());
  const isProcessing = useRef(false);

  // Listen for avatar events
  useEffect(() => {
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    
    window.addEventListener('avatar:talking:start', handleSpeechStart);
    window.addEventListener('avatar:talking:end', handleSpeechEnd);
    
    return () => {
      window.removeEventListener('avatar:talking:start', handleSpeechStart);
      window.removeEventListener('avatar:talking:end', handleSpeechEnd);
    };
  }, []);

  // Update TTS sound setting
  useEffect(() => {
    SimpleTTS.setSoundEnabled(soundEnabled);
    console.log('🎙️ TTS sound enabled set to:', soundEnabled);
  }, [soundEnabled]);

  // Process new assistant messages
  useEffect(() => {
    if (!soundEnabled || isProcessing.current) {
      return;
    }

    const newAssistantMessages = messages.filter(msg => 
      msg.role === 'assistant' && 
      msg.content.trim() && 
      !processedIds.current.has(msg.id)
    );

    if (newAssistantMessages.length === 0) {
      return;
    }

    console.log('🎙️ Found new assistant messages to speak:', newAssistantMessages.length);

    const processMessages = async () => {
      isProcessing.current = true;
      
      for (const message of newAssistantMessages) {
        // Mark as processed immediately
        processedIds.current.add(message.id);
        
        try {
          console.log('🎙️ Speaking message:', message.id, message.content.substring(0, 50));
          await speakAssistantMessage(message.content, message.id);
        } catch (error) {
          console.warn('🎙️ Failed to speak message:', message.id, error);
        }
        
        // Small delay between messages
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      isProcessing.current = false;
    };

    // Small delay to prevent race conditions
    setTimeout(processMessages, 50);
  }, [messages, soundEnabled]);

  const toggleSound = () => {
    const newEnabled = !soundEnabled;
    SimpleTTS.setSoundEnabled(newEnabled);
    
    if (!newEnabled) {
      SimpleTTS.stop();
    }
    
    return newEnabled;
  };

  const stopSpeaking = () => {
    SimpleTTS.stop();
  };

  const clearHistory = () => {
    processedIds.current.clear();
    SimpleTTS.clearHistory();
  };

  return {
    isSpeaking,
    soundEnabled: SimpleTTS.getSoundEnabled(),
    toggleSound,
    stopSpeaking,
    clearHistory
  };
};