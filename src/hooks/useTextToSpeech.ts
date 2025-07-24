import { useState, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const speak = useCallback((text: string, onComplete?: () => void, language?: 'en-US' | 'tr-TR') => {
    if (!soundEnabled || !text.trim()) {
      onComplete?.();
      return;
    }

    // Cancel any ongoing speech to prevent overlapping
    speechSynthesis.cancel();

    // Wait a moment for cancellation to complete
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Auto-detect language if not specified
      const detectedLang = language || (text.match(/[çğıöşüÇĞIİÖŞÜ]/) ? 'tr-TR' : 'en-US');
      utterance.lang = detectedLang;
      utterance.rate = 0.85; // Slightly slower for better clarity
      utterance.pitch = 1;
      utterance.volume = 1.0; // Maximum volume
      
      // Choose appropriate voice based on language
      const voices = speechSynthesis.getVoices();
      let preferredVoice;
      
      if (detectedLang === 'tr-TR') {
        preferredVoice = voices.find(voice => 
          voice.lang?.includes('tr') || voice.lang?.includes('TR')
        );
      } else {
        preferredVoice = voices.find(voice => 
          voice.lang?.includes('en') && 
          (voice.name?.includes('Female') || voice.name?.includes('Google') || voice.name?.includes('US'))
        );
      }
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        console.log('TTS started for:', text.substring(0, 50) + '...');
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        console.log('TTS completed for:', text.substring(0, 50) + '...');
        setIsSpeaking(false);
        // Add small delay before calling completion callback
        setTimeout(() => {
          onComplete?.();
        }, 500);
      };
      
      utterance.onerror = (event) => {
        console.error('TTS error:', event.error, 'for text:', text.substring(0, 50) + '...');
        setIsSpeaking(false);
        onComplete?.();
      };

      console.log('Starting TTS for text:', text);
      speechSynthesis.speak(utterance);
    }, 100);
  }, [soundEnabled]);

  const stopSpeaking = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
    if (!soundEnabled) {
      stopSpeaking();
    }
  }, [soundEnabled, stopSpeaking]);

  return {
    speak,
    stopSpeaking,
    toggleSound,
    isSpeaking,
    soundEnabled
  };
};