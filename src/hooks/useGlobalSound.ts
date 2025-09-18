import { useState, useEffect } from 'react';
import { SimpleTTS } from '@/voice/SimpleTTS';

const STORAGE_KEY = 'app.sound.enabled';

/**
 * Global sound control hook with localStorage persistence
 * Manages TTS sound state across the entire app
 */
export const useGlobalSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    // Default to true, override with localStorage if available
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [audioContextResumed, setAudioContextResumed] = useState(false);

  // Sync with SimpleTTS and persist to localStorage
  useEffect(() => {
    SimpleTTS.setSoundEnabled(soundEnabled);
    
    try {
      localStorage.setItem(STORAGE_KEY, soundEnabled.toString());
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.warn('Failed to persist sound setting:', error);
    }
  }, [soundEnabled]);

  // Resume AudioContext on first user interaction (autoplay policy)
  const resumeAudioContext = async () => {
    if (audioContextResumed) return;

    try {
      // Resume any suspended AudioContext
      if (typeof window !== 'undefined' && window.AudioContext) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
          if (process.env.NODE_ENV === 'development') console.log('🔊 AudioContext resumed for autoplay policy');
        }
        audioContext.close(); // Clean up test context
      }
      
      setAudioContextResumed(true);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.warn('Failed to resume AudioContext:', error);
    }
  };

  const toggleSound = async () => {
    // Resume AudioContext on first interaction
    if (!audioContextResumed) {
      await resumeAudioContext();
    }

    const newEnabled = !soundEnabled;
    setSoundEnabled(newEnabled);
    
    if (!newEnabled) {
      // Stop any current speech when disabling
      SimpleTTS.stop();
    }
    
    return newEnabled;
  };

  const enableSound = async () => {
    if (!audioContextResumed) {
      await resumeAudioContext();
    }
    setSoundEnabled(true);
  };

  const disableSound = () => {
    setSoundEnabled(false);
    SimpleTTS.stop();
  };

  return {
    soundEnabled,
    toggleSound,
    enableSound,
    disableSound,
    audioContextResumed
  };
};