import { useTextToSpeech } from './useTextToSpeech';
import { useAvatarState } from './useAvatarState';

/**
 * Unified hook that coordinates TTS with avatar animation
 * Ensures Thomas always speaks with consistent voice while avatar animates
 */
export const useAvatarTTS = () => {
  const { speak, stopSpeaking, toggleSound, isSpeaking, soundEnabled } = useTextToSpeech();
  const { avatarState, setAvatarState, triggerState } = useAvatarState({ 
    isSpeaking 
  });

  // Enhanced speak function that coordinates with avatar
  const speakWithAvatar = (text: string, onComplete?: () => void) => {
    if (!soundEnabled || !text.trim()) {
      onComplete?.();
      return;
    }

    console.log('🎙️ Thomas speaking with avatar animation:', text.substring(0, 50) + '...');
    
    // Start avatar talking animation
    setAvatarState('talking');
    
    // Speak with TTS
    speak(text, () => {
      // When speech completes, return avatar to idle
      setAvatarState('idle');
      onComplete?.();
    });
  };

  // Stop both TTS and avatar animation
  const stopAll = () => {
    stopSpeaking();
    setAvatarState('idle');
  };

  // Toggle sound affects both TTS and avatar
  const toggleSoundAndAvatar = () => {
    toggleSound();
    if (isSpeaking) {
      stopAll();
    }
  };

  return {
    // Main function to use everywhere
    speakWithAvatar,
    
    // Individual controls
    speak,
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