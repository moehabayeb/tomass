import { useEffect, useRef } from 'react';
import { speakAssistantMessage } from '@/voice/TomasVoice';

interface Message {
  id: string;
  role: string;
  content: string;
  timestamp?: number;
}

/**
 * Hook that automatically speaks assistant messages
 * Prevents duplicate speaking and handles message updates
 */
export const useAutoSpeech = (messages: Message[], enabled: boolean = true) => {
  const lastProcessedRef = useRef<Set<string>>(new Set());
  const processingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled || processingRef.current) return;

    processingRef.current = true;

    // Find new assistant messages that haven't been spoken
    const newAssistantMessages = messages.filter(message => 
      message.role === 'assistant' && 
      message.content.trim() &&
      !lastProcessedRef.current.has(message.id)
    );

    // Process each new message
    newAssistantMessages.forEach(async (message) => {
      try {
        // Mark as processed immediately to prevent duplicates
        lastProcessedRef.current.add(message.id);
        
        // Speak the message
        await speakAssistantMessage(message.content, message.id);
      } catch (error) {
        console.warn('🎙️ Auto-speech failed for message:', message.id, error);
      }
    });

    processingRef.current = false;
  }, [messages, enabled]);

  // Method to speak a single message manually
  const speakMessage = async (message: Message) => {
    if (message.role === 'assistant' && message.content.trim()) {
      try {
        await speakAssistantMessage(message.content, message.id);
        lastProcessedRef.current.add(message.id);
      } catch (error) {
        console.warn('🎙️ Manual speech failed:', error);
      }
    }
  };

  // Clear history (useful for new conversations)
  const clearHistory = () => {
    lastProcessedRef.current.clear();
  };

  return {
    speakMessage,
    clearHistory
  };
};