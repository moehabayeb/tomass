/**
 * Updated useSpeakingTTS hook using UnifiedTTS
 * Memory-safe implementation with proper cleanup
 */

import { useMessageTTS } from './useUnifiedTTS';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Hook for automatically speaking assistant messages in the Speaking app
 */
export const useSpeakingTTS = (messages: Message[], soundEnabled: boolean) => {
  // Use the new unified message TTS system
  const {
    isSpeaking,
    soundEnabled: currentSoundEnabled,
    stopSpeaking,
    clearHistory,
    service
  } = useMessageTTS(messages, soundEnabled);

  const toggleSound = () => {
    const newEnabled = !currentSoundEnabled;
    service.setSoundEnabled(newEnabled);
    
    if (!newEnabled) {
      stopSpeaking();
    }
    
    return newEnabled;
  };

  return {
    isSpeaking,
    soundEnabled: currentSoundEnabled,
    toggleSound,
    stopSpeaking,
    clearHistory
  };
};