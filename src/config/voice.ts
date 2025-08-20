// Central voice configuration for consistent "Thomas" voice across all TTS
export const VOICE_CONFIG = {
  // Voice provider preference
  PROVIDER: 'browser' as const,
  
  // D-ID voice settings (for avatar)
  DID_VOICE_ID: import.meta.env.VITE_DID_VOICE_ID || 'en-US-DavisNeural', // Deep male voice
  
  // Browser TTS settings - optimized for 50-year-old male voice
  RATE: 0.95, // Slightly slower for mature speech
  PITCH: 0.8, // Lower pitch for mature ~50 year old male voice
  VOLUME: 1.0,
  
  // Preferred male voices for browser fallback (prioritized for mature sound)
  PREFERRED_MALE_VOICES: [
    'Microsoft David Desktop', // Windows mature male
    'Microsoft Mark Desktop',  // Windows mature male
    'Google UK English Male',  // Natural British male
    'Daniel',                  // macOS mature male
    'Alex',                    // macOS default male
    'Fred',                    // macOS character male
    'Microsoft Guy Desktop',
    'Google US English Male',
    'Microsoft David',
    'Microsoft Mark'
  ] as const,
  
  // Voice selection keywords for mature male voices
  MATURE_MALE_KEYWORDS: [
    'david', 'mark', 'daniel', 'guy', 'male', 'man',
    'deep', 'low', 'bass', 'mature'
  ] as const
} as const;

// Cache for selected browser voice to ensure consistency
let _cachedBrowserVoice: SpeechSynthesisVoice | null = null;

/**
 * Get the best available mature male voice for consistent Thomas TTS
 * Caches the selection to ensure consistency across the session
 */
export const getBestMaleVoice = (): SpeechSynthesisVoice | null => {
  // Return cached voice if available and still valid
  if (_cachedBrowserVoice) {
    const currentVoices = speechSynthesis.getVoices();
    if (currentVoices.some(v => v.name === _cachedBrowserVoice!.name)) {
      return _cachedBrowserVoice;
    } else {
      // Voice no longer available, clear cache
      _cachedBrowserVoice = null;
    }
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = speechSynthesis.getVoices();
  
  // Priority 1: Find voices by exact preferred names (case insensitive)
  for (const preferredName of VOICE_CONFIG.PREFERRED_MALE_VOICES) {
    const voice = voices.find(v => 
      v.name.toLowerCase().includes(preferredName.toLowerCase()) && 
      v.lang.startsWith('en')
    );
    if (voice) {
      _cachedBrowserVoice = voice;
      console.log(`🎙️ Thomas voice selected: ${voice.name} (${voice.lang})`);
      return voice;
    }
  }
  
  // Priority 2: Look for mature male voice indicators
  const matureVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    VOICE_CONFIG.MATURE_MALE_KEYWORDS.some(keyword => 
      v.name.toLowerCase().includes(keyword)
    )
  );
  
  if (matureVoice) {
    _cachedBrowserVoice = matureVoice;
    console.log(`🎙️ Thomas voice selected (mature): ${matureVoice.name} (${matureVoice.lang})`);
    return matureVoice;
  }
  
  // Priority 3: Any English male voice
  const anyMaleVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('man'))
  );
  
  if (anyMaleVoice) {
    _cachedBrowserVoice = anyMaleVoice;
    console.log(`🎙️ Thomas voice selected (generic male): ${anyMaleVoice.name} (${anyMaleVoice.lang})`);
    return anyMaleVoice;
  }
  
  // Last resort: First English voice with adjusted pitch
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    _cachedBrowserVoice = englishVoice;
    console.log(`🎙️ Thomas voice selected (fallback): ${englishVoice.name} (${englishVoice.lang}) - will adjust pitch`);
    return englishVoice;
  }
  
  console.warn('🎙️ No suitable voice found for Thomas');
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