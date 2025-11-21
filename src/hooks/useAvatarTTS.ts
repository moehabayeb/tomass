import { useEffect, useState } from 'react';
import { TomasVoice, speakAssistantMessage } from '@/voice/TomasVoice';
import { useAvatarState } from './useAvatarState';

/**
 * Unified hook that coordinates TTS with avatar animation
 * Uses the central TomasVoice service for consistent speech
 */
export const useAvatarTTS = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => TomasVoice.getSoundEnabled());
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const { avatarState, setAvatarState, triggerState } = useAvatarState({ 
    isSpeaking 
  });

  // Listen for speech events from TomasVoice
  useEffect(() => {
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    
    window.addEventListener('speech:start', handleSpeechStart);
    window.addEventListener('speech:end', handleSpeechEnd);
    
    return () => {
      window.removeEventListener('speech:start', handleSpeechStart);
      window.removeEventListener('speech:end', handleSpeechEnd);
    };
  }, []);

  // Enhanced speak function that coordinates with avatar
  const speakWithAvatar = async (text: string, messageId?: string): Promise<void> => {
    if (!soundEnabled || !text.trim()) {
      return;
    }

    try {
      await speakAssistantMessage(text, messageId);
    } catch (error) {
      // Apple Store Compliance: Silent fail - User experience preservation
    }
  };

  // Stop both TTS and avatar animation
  const stopAll = () => {
    TomasVoice.stop();
    setAvatarState('idle');
  };

  // Toggle sound affects both TTS and avatar
  const toggleSoundAndAvatar = () => {
    const newEnabled = !soundEnabled;
    setSoundEnabled(newEnabled);
    TomasVoice.setSoundEnabled(newEnabled);
    
    if (!newEnabled && isSpeaking) {
      stopAll();
    }
  };

  return {
    // Main function to use everywhere
    speakWithAvatar,
    
    // Individual controls
    speak: speakAssistantMessage,
    stopSpeaking: stopAll,
    toggleSound: toggleSoundAndAvatar,
    
    // State
    isSpeaking,
    soundEnabled,
    avatarState,
    
    // Avatar controls
    setAvatarState,
    triggerState
  };
};