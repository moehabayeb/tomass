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
    if (!enabled) {
      return;
    }

    if (processingRef.current) {
      return;
    }

    const processNewMessages = async () => {
      processingRef.current = true;

      // Find new assistant messages that haven't been spoken
      const newAssistantMessages = messages.filter(message => {
        const isAssistant = message.role === 'assistant';
        const hasContent = message.content && message.content.trim();
        const notProcessed = !lastProcessedRef.current.has(message.id);
        
          id: message.id,
          role: message.role,
          isAssistant,
          hasContent: !!hasContent,
          notProcessed,
          contentPreview: message.content?.substring(0, 30)
        });
        
        return isAssistant && hasContent && notProcessed;
      });

      // Process each new message sequentially to avoid race conditions
      for (const message of newAssistantMessages) {
        try {
          // Mark as processed immediately to prevent duplicates
          lastProcessedRef.current.add(message.id);

          // Small delay to prevent race conditions with initialization
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Speak the message
          await speakAssistantMessage(message.content, message.id);
          
        } catch (error) {
        }
      }

      processingRef.current = false;
    };

    // Small delay to ensure components are ready
    const timeoutId = setTimeout(processNewMessages, 50);
    return () => clearTimeout(timeoutId);
  }, [messages, enabled]);

  // Method to speak a single message manually
  const speakMessage = async (message: Message) => {
    if (message.role === 'assistant' && message.content.trim()) {
      try {
        await speakAssistantMessage(message.content, message.id);
        lastProcessedRef.current.add(message.id);
      } catch (error) {
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