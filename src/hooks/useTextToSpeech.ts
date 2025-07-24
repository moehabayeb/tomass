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
      
      // Improved Turkish language detection
      let detectedLang = language;
      if (!detectedLang) {
        // Check for Turkish characters, common Turkish words, or Turkish-specific patterns
        const hasTurkishChars = text.match(/[çğıöşüÇĞIİÖŞÜ]/);
        const hasTurkishWords = text.match(/\b(bu|modülde|cümle|fiil|kullan|öğren|İngilizce|tabloya|bakın|lütfen|şimdi|aşağıdaki)\b/i);
        const hasTurkishPatterns = text.includes('Bu modülde') || text.includes('modülde') || text.includes('öğreneceğiz');
        
        detectedLang = (hasTurkishChars || hasTurkishWords || hasTurkishPatterns) ? 'tr-TR' : 'en-US';
      }
      
      utterance.lang = detectedLang;
      console.log(`TTS Language set to: ${detectedLang} for text: "${text.substring(0, 50)}..."`)
      utterance.rate = 0.85; // Slightly slower for better clarity
      utterance.pitch = 1;
      utterance.volume = 1.0; // Maximum volume
      
      // Explicitly select voice based on language with fallback logic
      const voices = speechSynthesis.getVoices();
      let selectedVoice = null;
      
      if (detectedLang === 'tr-TR') {
        // Priority order for Turkish voices
        selectedVoice = voices.find(voice => 
          voice.lang === 'tr-TR' && (
            voice.name.includes('Google') || 
            voice.name.includes('TTS') || 
            voice.name.includes('Turkish') ||
            voice.name.includes('Filiz') ||
            voice.name.includes('Zeynep')
          )
        ) || voices.find(voice => voice.lang === 'tr-TR') || 
           voices.find(voice => voice.lang?.includes('tr'));
        
        if (!selectedVoice) {
          console.warn('No Turkish voice found - using system default');
          // Could add toast notification here if needed
        }
      } else {
        // Priority order for English voices
        selectedVoice = voices.find(voice => 
          voice.lang === 'en-US' && (
            voice.name.includes('Google') || 
            voice.name.includes('Female') || 
            voice.name.includes('Samantha') ||
            voice.name.includes('Karen')
          )
        ) || voices.find(voice => voice.lang === 'en-US') ||
           voices.find(voice => voice.lang?.includes('en'));
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`Selected voice: ${selectedVoice.name} (${selectedVoice.lang})`);
      } else {
        console.warn(`No suitable voice found for ${detectedLang}`);
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