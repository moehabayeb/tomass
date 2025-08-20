import { useState, useCallback } from 'react';
import { configureUtterance } from '@/config/voice';

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
      
      // Check if this is Turkish content
      const hasTurkishChars = text.match(/[çğıöşüÇĞIİÖŞÜ]/);
      const hasTurkishWords = text.match(/\b(bu|modülde|cümle|fiil|kullan|öğren|İngilizce|tabloya|bakın|lütfen|şimdi|aşağıdaki)\b/i);
      const hasTurkishPatterns = text.includes('Bu modülde') || text.includes('modülde') || text.includes('öğreneceğiz');
      const isTurkish = language === 'tr-TR' || hasTurkishChars || hasTurkishWords || hasTurkishPatterns;
      
      if (isTurkish) {
        // For Turkish content, use Turkish voices and settings
        utterance.lang = 'tr-TR';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        const voices = speechSynthesis.getVoices();
        const turkishVoice = voices.find(voice => 
          voice.lang === 'tr-TR' && (
            voice.name.includes('Google') || 
            voice.name.includes('TTS') || 
            voice.name.includes('Turkish') ||
            voice.name.includes('Filiz') ||
            voice.name.includes('Zeynep')
          )
        ) || voices.find(voice => voice.lang === 'tr-TR') || 
           voices.find(voice => voice.lang?.includes('tr'));
        
        if (turkishVoice) {
          utterance.voice = turkishVoice;
          console.log(`Selected Turkish voice: ${turkishVoice.name} (${turkishVoice.lang})`);
        } else {
          console.warn('No Turkish voice found - using system default');
        }
        
        console.log(`TTS Language set to: tr-TR for text: "${text.substring(0, 50)}..."`);
      } else {
        // For English content, use consistent Thomas voice configuration
        configureUtterance(utterance, text);
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