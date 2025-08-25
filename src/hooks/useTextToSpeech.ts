import { useState, useCallback, useRef } from 'react';
import { configureUtterance } from '@/config/voice';
import { BilingualTTS } from '@/voice/BilingualTTS';

interface QueuedMessage {
  text: string;
  onComplete?: () => void;
  language?: 'en-US' | 'tr-TR';
  id: string;
}

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const speechQueue = useRef<QueuedMessage[]>([]);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const isProcessingQueue = useRef(false);

  const processQueue = useCallback(async () => {
    if (isProcessingQueue.current || speechQueue.current.length === 0 || !soundEnabled) {
      return;
    }

    isProcessingQueue.current = true;
    const message = speechQueue.current.shift();
    
    if (!message) {
      isProcessingQueue.current = false;
      return;
    }

    try {
      await speakMessage(message);
    } catch (error) {
      console.error('🎙️ Thomas TTS error:', error);
    } finally {
      isProcessingQueue.current = false;
      // Process next message in queue
      if (speechQueue.current.length > 0) {
        setTimeout(() => processQueue(), 100);
      }
    }
  }, [soundEnabled]);

  const speakMessage = useCallback(async (message: QueuedMessage): Promise<void> => {
    const { text, onComplete, language } = message;
    
    if (!text.trim()) {
      onComplete?.();
      return;
    }

    console.log(`🎙️ Thomas speaking: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

    try {
      // Try bilingual TTS first
      const result = await BilingualTTS.speak(text, { interrupt: false });
      if (result.segmentsSpoken > 0) {
        onComplete?.();
        return;
      }
    } catch (error) {
      console.warn('🎙️ Bilingual TTS failed, falling back to legacy TTS:', error);
    }

    // Fallback to legacy TTS logic
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance.current = utterance;
      
      // Check if this is Turkish content (legacy detection)
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
          console.log(`🎙️ Turkish voice: ${turkishVoice.name}`);
        }
      } else {
        // For English content, use consistent Thomas voice configuration
        configureUtterance(utterance, text);
      }

      let hasEnded = false;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        if (hasEnded) return;
        hasEnded = true;
        
        setIsSpeaking(false);
        currentUtterance.current = null;
        onComplete?.();
        resolve();
      };
      
      utterance.onerror = (event) => {
        if (hasEnded) return;
        hasEnded = true;
        
        console.error('🎙️ Thomas TTS error:', event.error);
        setIsSpeaking(false);
        currentUtterance.current = null;
        
        // Retry once on error
        if (event.error !== 'interrupted') {
          setTimeout(() => {
            console.log('🎙️ Retrying Thomas TTS...');
            speechSynthesis.speak(utterance);
          }, 500);
        } else {
          onComplete?.();
          resolve();
        }
      };

      speechSynthesis.speak(utterance);
    });
  }, []);

  const speak = useCallback((text: string, onComplete?: () => void, language?: 'en-US' | 'tr-TR') => {
    if (!soundEnabled || !text.trim()) {
      onComplete?.();
      return;
    }

    // Add to queue with unique ID
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    speechQueue.current.push({
      text,
      onComplete,
      language,
      id: messageId
    });

    // Start processing if not already running
    processQueue();
  }, [soundEnabled, processQueue]);

  const stopSpeaking = useCallback(() => {
    console.log('🎙️ Thomas stopping speech');
    BilingualTTS.stop(); // Stop bilingual TTS too
    speechSynthesis.cancel();
    speechQueue.current = []; // Clear queue
    currentUtterance.current = null;
    isProcessingQueue.current = false;
    setIsSpeaking(false);
  }, []);

  const toggleSound = useCallback(() => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    BilingualTTS.setSoundEnabled(newSoundEnabled); // Sync with bilingual TTS
    
    if (!newSoundEnabled) {
      console.log('🎙️ Thomas sound disabled - stopping speech');
      stopSpeaking();
    } else {
      console.log('🎙️ Thomas sound enabled');
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