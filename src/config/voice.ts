// Enhanced voice configuration with curated natural male voices
export const VOICE_CONFIG = {
  // Feature flag for voice upgrade
  UPGRADE_ENABLED: true, // tts_voice_upgrade flag
  
  // Voice provider preference
  PROVIDER: 'browser' as const,
  
  // D-ID voice settings (for avatar)
  DID_VOICE_ID: import.meta.env.VITE_DID_VOICE_ID || 'en-US-DavisNeural',
  
  // Enhanced TTS settings for natural speech
  ENGLISH: {
    RATE: 1.0,
    PITCH: 0.85, // Natural male pitch
    VOLUME: 1.0,
    LANG: 'en-US'
  },
  
  TURKISH: {
    RATE: 0.95,
    PITCH: 0.9, // Natural Turkish male pitch
    VOLUME: 1.0,
    LANG: 'tr-TR'
  },
  
  // Curated male voice preferences (priority order)
  PREFERRED_ENGLISH_VOICES: [
    // Azure voices (highest quality)
    'Microsoft Guy Desktop - English (United States)',
    'Microsoft Davis Desktop - English (United States)', 
    'Microsoft GuyNeural',
    'Microsoft DavisNeural',
    'Guy',
    'Davis',
    
    // Google Neural voices
    'Google UK English Male',
    'Google US English Male',
    'en-US-Neural2-J',
    'en-US-Wavenet-D',
    'en-US-Wavenet-I',
    'en-US-Wavenet-J',
    
    // Amazon Polly
    'Matthew',
    'Joey',
    
    // System defaults
    'Microsoft David Desktop',
    'Microsoft Mark Desktop',
    'Daniel', // macOS
    'Alex',   // macOS
    'Fred'    // macOS
  ] as const,
  
  PREFERRED_TURKISH_VOICES: [
    // Azure Turkish voices
    'Microsoft Ahmet Desktop - Turkish (Turkey)',
    'Microsoft Tolga Desktop - Turkish (Turkey)',
    'Microsoft AhmetNeural',
    'Microsoft TolgaNeural',
    'Ahmet',
    'Tolga',
    
    // Google Turkish voices
    'tr-TR-Wavenet-B', // Male
    'tr-TR-Wavenet-C', // Male
    'tr-TR-Wavenet-E', // Male
    'Google tr-TR',
    
    // Fallback Turkish voices
    'Turkish Male',
    'tr-TR'
  ] as const,
  
  // Keywords for voice detection
  MALE_VOICE_KEYWORDS: [
    'guy', 'davis', 'ahmet', 'tolga', 'matthew', 'joey',
    'male', 'man', 'neural2-j', 'wavenet-d', 'wavenet-i', 'wavenet-j',
    'wavenet-b', 'wavenet-c', 'wavenet-e', 'daniel', 'alex', 'david', 'mark'
  ] as const,
  
  NEURAL_KEYWORDS: [
    'neural', 'wavenet', 'premium', 'enhanced', 'natural'
  ] as const
} as const;

// Enhanced voice persistence and selection system
interface VoicePins {
  en?: string;
  tr?: string;
}

const VOICE_STORAGE_KEY = 'preferredVoices';
let _pinnedVoices: VoicePins = {};
let _cachedEnglishVoice: SpeechSynthesisVoice | null = null;
let _cachedTurkishVoice: SpeechSynthesisVoice | null = null;

// Load pinned voices from localStorage
const loadPinnedVoices = (): VoicePins => {
  try {
    const stored = localStorage.getItem(VOICE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save pinned voices to localStorage
const savePinnedVoices = (pins: VoicePins): void => {
  try {
    localStorage.setItem(VOICE_STORAGE_KEY, JSON.stringify(pins));
    console.log(`[TTS] pinned en=${pins.en || 'none'}, tr=${pins.tr || 'none'}`);
  } catch (error) {
    console.warn('[TTS] Failed to save voice preferences:', error);
  }
};

// Initialize voice pins
_pinnedVoices = loadPinnedVoices();

/**
 * Get the best available English male voice using curated preferences
 */
export const getBestEnglishVoice = (): SpeechSynthesisVoice | null => {
  if (!VOICE_CONFIG.UPGRADE_ENABLED) {
    return getBestMaleVoiceLegacy();
  }

  // Return cached voice if available and still valid
  if (_cachedEnglishVoice) {
    const currentVoices = speechSynthesis.getVoices();
    if (currentVoices.some(v => v.name === _cachedEnglishVoice!.name)) {
      return _cachedEnglishVoice;
    } else {
      _cachedEnglishVoice = null;
    }
  }

  // Try to restore pinned voice
  if (_pinnedVoices.en) {
    const pinnedVoice = speechSynthesis.getVoices()
      .find(v => v.name === _pinnedVoices.en);
    if (pinnedVoice) {
      _cachedEnglishVoice = pinnedVoice;
      return pinnedVoice;
    }
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = speechSynthesis.getVoices();
  
  // Priority 1: Curated preferences
  for (const preferredName of VOICE_CONFIG.PREFERRED_ENGLISH_VOICES) {
    const voice = voices.find(v => 
      v.name.toLowerCase().includes(preferredName.toLowerCase()) && 
      v.lang.startsWith('en')
    );
    if (voice) {
      _cachedEnglishVoice = voice;
      _pinnedVoices.en = voice.name;
      savePinnedVoices(_pinnedVoices);
      console.log(`🎙️ Enhanced English voice selected: ${voice.name} (${voice.lang})`);
      return voice;
    }
  }
  
  // Priority 2: Male voice indicators
  const maleVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    VOICE_CONFIG.MALE_VOICE_KEYWORDS.some(keyword => 
      v.name.toLowerCase().includes(keyword)
    )
  );
  
  if (maleVoice) {
    _cachedEnglishVoice = maleVoice;
    _pinnedVoices.en = maleVoice.name;
    savePinnedVoices(_pinnedVoices);
    console.log(`🎙️ Enhanced English voice selected (male): ${maleVoice.name} (${maleVoice.lang})`);
    return maleVoice;
  }
  
  // Priority 3: Neural/premium voices
  const neuralVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    VOICE_CONFIG.NEURAL_KEYWORDS.some(keyword => 
      v.name.toLowerCase().includes(keyword)
    )
  );
  
  if (neuralVoice) {
    _cachedEnglishVoice = neuralVoice;
    _pinnedVoices.en = neuralVoice.name;
    savePinnedVoices(_pinnedVoices);
    console.log(`🎙️ Enhanced English voice selected (neural): ${neuralVoice.name} (${neuralVoice.lang})`);
    return neuralVoice;
  }
  
  // Last resort: Any English voice
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    _cachedEnglishVoice = englishVoice;
    console.log(`[TTS] fallback en → ${englishVoice.name}`);
    return englishVoice;
  }
  
  console.warn('[TTS] unavailable en → skipped');
  return null;
};

/**
 * Get the best available Turkish male voice using curated preferences  
 */
export const getBestTurkishVoice = (): SpeechSynthesisVoice | null => {
  if (!VOICE_CONFIG.UPGRADE_ENABLED) {
    return null; // Legacy system doesn't handle Turkish
  }

  // Return cached voice if available and still valid
  if (_cachedTurkishVoice) {
    const currentVoices = speechSynthesis.getVoices();
    if (currentVoices.some(v => v.name === _cachedTurkishVoice!.name)) {
      return _cachedTurkishVoice;
    } else {
      _cachedTurkishVoice = null;
    }
  }

  // Try to restore pinned voice
  if (_pinnedVoices.tr) {
    const pinnedVoice = speechSynthesis.getVoices()
      .find(v => v.name === _pinnedVoices.tr);
    if (pinnedVoice) {
      _cachedTurkishVoice = pinnedVoice;
      return pinnedVoice;
    }
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = speechSynthesis.getVoices();
  
  // Priority 1: Curated Turkish preferences
  for (const preferredName of VOICE_CONFIG.PREFERRED_TURKISH_VOICES) {
    const voice = voices.find(v => 
      v.name.toLowerCase().includes(preferredName.toLowerCase()) && 
      (v.lang.startsWith('tr') || v.lang.includes('Turkish'))
    );
    if (voice) {
      _cachedTurkishVoice = voice;
      _pinnedVoices.tr = voice.name;
      savePinnedVoices(_pinnedVoices);
      console.log(`🎙️ Enhanced Turkish voice selected: ${voice.name} (${voice.lang})`);
      return voice;
    }
  }
  
  // Priority 2: Any Turkish neural/premium voice
  const neuralTurkish = voices.find(v => 
    (v.lang.startsWith('tr') || v.lang.includes('Turkish')) &&
    VOICE_CONFIG.NEURAL_KEYWORDS.some(keyword => 
      v.name.toLowerCase().includes(keyword)
    )
  );
  
  if (neuralTurkish) {
    _cachedTurkishVoice = neuralTurkish;
    _pinnedVoices.tr = neuralTurkish.name;
    savePinnedVoices(_pinnedVoices);
    console.log(`🎙️ Enhanced Turkish voice selected (neural): ${neuralTurkish.name} (${neuralTurkish.lang})`);
    return neuralTurkish;
  }
  
  // Last resort: Any Turkish voice
  const turkishVoice = voices.find(v => v.lang.startsWith('tr') || v.lang.includes('Turkish'));
  if (turkishVoice) {
    _cachedTurkishVoice = turkishVoice;
    console.log(`[TTS] fallback tr → ${turkishVoice.name}`);
    return turkishVoice;
  }
  
  console.warn('[TTS] unavailable tr → skipped');
  return null;
};

// Legacy function for backward compatibility
export const getBestMaleVoice = (): SpeechSynthesisVoice | null => {
  return getBestEnglishVoice();
};

// Legacy function for when upgrade is disabled
const getBestMaleVoiceLegacy = (): SpeechSynthesisVoice | null => {
  const voices = speechSynthesis.getVoices();
  
  // Use original fallback logic
  const maleVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    (v.name.toLowerCase().includes('male') || 
     v.name.toLowerCase().includes('david') ||
     v.name.toLowerCase().includes('daniel'))
  );
  
  return maleVoice || voices.find(v => v.lang.startsWith('en')) || null;
};

/**
 * Configure utterance with enhanced voice settings
 */
export const configureUtterance = (utterance: SpeechSynthesisUtterance, text: string, language?: 'en' | 'tr'): void => {
  if (!VOICE_CONFIG.UPGRADE_ENABLED) {
    // Legacy configuration
    const voice = getBestMaleVoiceLegacy();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.pitch = 0.8;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';
    return;
  }

  // Enhanced configuration
  const isTurkish = language === 'tr' || text.match(/[çğıöşüÇĞIİÖŞÜ]/);
  
  if (isTurkish) {
    const voice = getBestTurkishVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.rate = VOICE_CONFIG.TURKISH.RATE;
      utterance.pitch = VOICE_CONFIG.TURKISH.PITCH;
      utterance.volume = VOICE_CONFIG.TURKISH.VOLUME;
      utterance.lang = VOICE_CONFIG.TURKISH.LANG;
      console.log(`[TTS] speak lang=tr voice=${voice.name} len=${text.length} "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
    } else {
      console.log(`[TTS] unavailable tr → skipped "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
      return; // Don't speak Turkish text without Turkish voice
    }
  } else {
    const voice = getBestEnglishVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.rate = VOICE_CONFIG.ENGLISH.RATE;
      utterance.pitch = VOICE_CONFIG.ENGLISH.PITCH;
      utterance.volume = VOICE_CONFIG.ENGLISH.VOLUME;
      utterance.lang = VOICE_CONFIG.ENGLISH.LANG;
      console.log(`[TTS] speak lang=en voice=${voice.name} len=${text.length} "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
    } else {
      console.log(`[TTS] unavailable en → skipped "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
      return; // Don't speak without voice
    }
  }
};

/**
 * Clear voice caches (for testing or voice changes)
 */
export const clearVoiceCache = (): void => {
  _cachedEnglishVoice = null;
  _cachedTurkishVoice = null;
  _pinnedVoices = {};
  localStorage.removeItem(VOICE_STORAGE_KEY);
};