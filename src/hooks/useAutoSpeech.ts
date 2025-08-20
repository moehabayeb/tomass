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

    const processNewMessages = async () => {
      processingRef.current = true;

      // Find new assistant messages that haven't been spoken
      const newAssistantMessages = messages.filter(message => 
        message.role === 'assistant' && 
        message.content.trim() &&
        !lastProcessedRef.current.has(message.id)
      );

      // Process each new message sequentially to avoid race conditions
      for (const message of newAssistantMessages) {
        try {
          // Mark as processed immediately to prevent duplicates
          lastProcessedRef.current.add(message.id);
          
          console.log('🎙️ Auto-speech processing message:', message.id, message.content.substring(0, 50) + '...');
          
          // Speak the message
          await speakAssistantMessage(message.content, message.id);
        } catch (error) {
          console.warn('🎙️ Auto-speech failed for message:', message.id, error);
        }
      }

      processingRef.current = false;
    };

    processNewMessages();
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