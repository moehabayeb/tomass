// Central voice configuration for consistent "Thomas" voice across all TTS
export const VOICE_CONFIG = {
  // Voice provider preference
  PROVIDER: 'did' as const,
  
  // D-ID voice settings
  DID_VOICE_ID: import.meta.env.VITE_DID_VOICE_ID || 'en-US-AriaNeural', // fallback to mature male voice
  
  // Browser TTS settings for fallback
  RATE: 1.0,
  PITCH: 0.9, // Lower pitch for mature ~50 year old male voice
  VOLUME: 1.0,
  
  // Preferred male voices for browser fallback (in order of preference)
  PREFERRED_MALE_VOICES: [
    'Daniel',
    'Alex', 
    'Fred',
    'Microsoft David',
    'Google UK English Male',
    'Google US English',
    'Microsoft Mark',
    'Microsoft Guy',
    'Google US English Male'
  ] as const
} as const;

// Cache for selected browser voice to ensure consistency
let _cachedBrowserVoice: SpeechSynthesisVoice | null = null;

/**
 * Get the best available male voice for browser TTS fallback
 * Caches the selection to ensure consistency across the session
 */
export const getBestMaleVoice = (): SpeechSynthesisVoice | null => {
  // Return cached voice if available
  if (_cachedBrowserVoice) {
    return _cachedBrowserVoice;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = speechSynthesis.getVoices();
  
  // First, try to find voices by preferred names
  for (const preferredName of VOICE_CONFIG.PREFERRED_MALE_VOICES) {
    const voice = voices.find(v => 
      v.name.includes(preferredName) && 
      v.lang.startsWith('en')
    );
    if (voice) {
      _cachedBrowserVoice = voice;
      console.log(`Selected consistent male voice: ${voice.name} (${voice.lang})`);
      return voice;
    }
  }
  
  // Fallback: find any English male voice (look for "Male" in name)
  const maleVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('man'))
  );
  
  if (maleVoice) {
    _cachedBrowserVoice = maleVoice;
    console.log(`Selected fallback male voice: ${maleVoice.name} (${maleVoice.lang})`);
    return maleVoice;
  }
  
  // Last resort: use first English voice available
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    _cachedBrowserVoice = englishVoice;
    console.log(`Selected English voice as last resort: ${englishVoice.name} (${englishVoice.lang})`);
    return englishVoice;
  }
  
  return null;
};

/**
 * Configure a speech synthesis utterance with consistent voice settings
 */
export const configureUtterance = (utterance: SpeechSynthesisUtterance, text: string): void => {
  const voice = getBestMaleVoice();
  if (voice) {
    utterance.voice = voice;
  }
  
  utterance.rate = VOICE_CONFIG.RATE;
  utterance.pitch = VOICE_CONFIG.PITCH;
  utterance.volume = VOICE_CONFIG.VOLUME;
  utterance.lang = 'en-US'; // Always use English
  
  console.log(`Configured utterance for text: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}" with voice: ${voice?.name || 'default'}`);
};

/**
 * Clear the cached voice (useful for testing or if voices change)
 */
export const clearVoiceCache = (): void => {
  _cachedBrowserVoice = null;
};