// 🎯 ZERO-TOLERANCE VOICE CONSISTENCY CONFIGURATION
export const VOICE_CONFIG = {
  // MANDATORY: Voice consistency enforcement
  VOICE_CONSISTENCY_ENABLED: true,
  VOICE_LOCKING_ENABLED: true,
  
  // Feature flag for voice upgrade
  UPGRADE_ENABLED: true, // tts_voice_upgrade flag
  
  // Voice provider preference
  PROVIDER: 'browser' as const,
  
  // D-ID voice settings (for avatar)
  DID_VOICE_ID: import.meta.env.VITE_DID_VOICE_ID || 'en-US-DavisNeural',
  
  // CRITICAL: Enhanced TTS settings for mature male voice (50+ years)
  ENGLISH: {
    RATE: 0.95,  // Slightly slower for mature authenticity
    PITCH: 0.80, // Lower pitch for mature male (was 0.85)
    VOLUME: 1.0,
    LANG: 'en-US'
  },
  
  TURKISH: {
    RATE: 0.95,
    PITCH: 0.9, // Natural Turkish male pitch
    VOLUME: 1.0,
    LANG: 'tr-TR'
  },
  
  // 🎯 CURATED MATURE MALE VOICES (50+ years old sound) - PRIORITY ORDER
  PREFERRED_ENGLISH_VOICES: [
    // Azure Premium voices (mature male, highest quality)
    'Microsoft Davis Desktop - English (United States)',  // Mature, authoritative
    'Microsoft Guy Desktop - English (United States)',    // Deep, mature tone
    'Microsoft DavisNeural',    // Neural version of Davis
    'Microsoft GuyNeural',      // Neural version of Guy
    'Davis',                    // Short name version
    'Guy',                      // Short name version
    
    // System voices with mature characteristics
    'Microsoft David Desktop',  // Classic mature male
    'Microsoft Mark Desktop',   // Deep, professional
    'David',                    // Short name
    'Mark',                     // Short name
    
    // Google Neural (mature male variants)
    'Google UK English Male',   // British mature sound
    'Google US English Male',   // American mature sound
    'en-US-Neural2-J',         // Deep male neural
    'en-US-Neural2-D',         // Mature male neural
    'en-US-Wavenet-J',         // Premium mature male
    'en-US-Wavenet-D',         // Deep male wavenet
    'en-US-Wavenet-I',         // Professional male
    
    // Amazon Polly mature voices
    'Matthew',                  // Mature American male
    'Joey',                     // Young adult (fallback)
    
    // macOS voices (mature options first)
    'Daniel',                   // British mature male
    'Alex',                     // Classic mature American
    'Fred',                     // Mature character voice
    
    // Additional mature male indicators
    'Male',                     // Generic male voice
    'Man'                       // Generic mature voice
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
  } catch (error) {
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
    return neuralVoice;
  }
  
  // Last resort: Any English voice
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    _cachedEnglishVoice = englishVoice;
    return englishVoice;
  }
  
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
    return neuralTurkish;
  }
  
  // Last resort: Any Turkish voice
  const turkishVoice = voices.find(v => v.lang.startsWith('tr') || v.lang.includes('Turkish'));
  if (turkishVoice) {
    _cachedTurkishVoice = turkishVoice;
    return turkishVoice;
  }
  
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
 * 🎯 IMPORTANT: This is now a fallback function. Use VoiceConsistencyManager for guaranteed consistency.
 */
export const configureUtterance = (utterance: SpeechSynthesisUtterance, text: string, language?: 'en' | 'tr'): void => {
  // 🎯 PRIMARY: Try to use VoiceConsistencyManager first for guaranteed consistency
  if (VOICE_CONFIG.VOICE_CONSISTENCY_ENABLED) {
    const success = VoiceConsistencyManager.configureUtterance(utterance, text);
    if (success) {
      console.log('✅ Utterance configured with locked voice via VoiceConsistencyManager');
      return;
    }
    console.warn('⚠️ VoiceConsistencyManager failed, falling back to legacy method');
  }

  // FALLBACK: Legacy configuration
  if (!VOICE_CONFIG.UPGRADE_ENABLED) {
    const voice = getBestMaleVoiceLegacy();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.pitch = 0.8;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';
    return;
  }

  // Enhanced fallback configuration
  const isTurkish = language === 'tr' || text.match(/[çğıöşüÇĞIİÖŞÜ]/);
  
  if (isTurkish) {
    const voice = getBestTurkishVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.rate = VOICE_CONFIG.TURKISH.RATE;
      utterance.pitch = VOICE_CONFIG.TURKISH.PITCH;
      utterance.volume = VOICE_CONFIG.TURKISH.VOLUME;
      utterance.lang = VOICE_CONFIG.TURKISH.LANG;
    } else {
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
    } else {
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
  // Also clear the VoiceConsistencyManager cache
  VoiceConsistencyManager.clearCache();
};

/**
 * 🎯 VOICE CONSISTENCY MANAGER - SINGLETON PATTERN
 * Guarantees the same mature male voice across ALL TTS calls
 */
class VoiceConsistencyManagerClass {
  private static instance: VoiceConsistencyManagerClass | null = null;
  private lockedVoice: SpeechSynthesisVoice | null = null;
  private isInitialized = false;
  private initializationPromise: Promise<SpeechSynthesisVoice | null> | null = null;
  
  // Storage key for persisting locked voice
  private readonly LOCKED_VOICE_KEY = 'tts_locked_voice_name';

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): VoiceConsistencyManagerClass {
    if (!VoiceConsistencyManagerClass.instance) {
      VoiceConsistencyManagerClass.instance = new VoiceConsistencyManagerClass();
    }
    return VoiceConsistencyManagerClass.instance;
  }

  /**
   * Initialize and lock the voice - CRITICAL FOR CONSISTENCY
   */
  async initialize(): Promise<SpeechSynthesisVoice | null> {
    if (this.isInitialized && this.lockedVoice) {
      return this.lockedVoice;
    }

    // Prevent multiple simultaneous initializations
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this._performInitialization();
    const result = await this.initializationPromise;
    this.initializationPromise = null;
    
    return result;
  }

  private async _performInitialization(): Promise<SpeechSynthesisVoice | null> {
    console.log('🎯 VoiceConsistencyManager: Initializing voice lock...');

    // First try to restore previously locked voice
    const restoredVoice = await this._restorePreviousVoice();
    if (restoredVoice) {
      this.lockedVoice = restoredVoice;
      this.isInitialized = true;
      console.log(`🔒 VOICE LOCKED (RESTORED): ${this.lockedVoice.name}`);
      return this.lockedVoice;
    }

    // Wait for voices to be available
    await this._waitForVoices();

    // Select and lock the best mature male voice
    const selectedVoice = this._selectBestMatureVoice();
    
    if (selectedVoice) {
      this.lockedVoice = selectedVoice;
      this.isInitialized = true;
      
      // Persist the locked voice for future sessions
      this._persistLockedVoice(selectedVoice);
      
      console.log(`🔒 VOICE LOCKED (NEW): ${this.lockedVoice.name}`);
      console.log(`📊 Voice Details:`, {
        name: selectedVoice.name,
        lang: selectedVoice.lang,
        localService: selectedVoice.localService,
        voiceURI: selectedVoice.voiceURI
      });
      
      return this.lockedVoice;
    }

    console.error('❌ CRITICAL: No suitable mature male voice found!');
    return null;
  }

  private async _waitForVoices(): Promise<void> {
    return new Promise((resolve) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve();
        return;
      }

      const checkVoices = () => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          speechSynthesis.removeEventListener('voiceschanged', checkVoices);
          resolve();
        }
      };

      speechSynthesis.addEventListener('voiceschanged', checkVoices);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        speechSynthesis.removeEventListener('voiceschanged', checkVoices);
        resolve();
      }, 5000);
    });
  }

  private _selectBestMatureVoice(): SpeechSynthesisVoice | null {
    const voices = speechSynthesis.getVoices();
    console.log(`🔍 Analyzing ${voices.length} available voices...`);

    // Priority 1: Exact matches from curated mature voice list
    for (const preferredName of VOICE_CONFIG.PREFERRED_ENGLISH_VOICES) {
      const exactMatch = voices.find(v => 
        v.name === preferredName && v.lang.startsWith('en')
      );
      if (exactMatch) {
        console.log(`✅ Found exact mature voice match: ${exactMatch.name}`);
        return exactMatch;
      }
    }

    // Priority 2: Partial matches from curated list
    for (const preferredName of VOICE_CONFIG.PREFERRED_ENGLISH_VOICES) {
      const partialMatch = voices.find(v => 
        v.name.toLowerCase().includes(preferredName.toLowerCase()) && 
        v.lang.startsWith('en')
      );
      if (partialMatch) {
        console.log(`✅ Found partial mature voice match: ${partialMatch.name}`);
        return partialMatch;
      }
    }

    // Priority 3: Male voice keywords (mature characteristics)
    const matureKeywords = ['davis', 'guy', 'david', 'mark', 'daniel', 'alex', 'matthew'];
    for (const keyword of matureKeywords) {
      const keywordMatch = voices.find(v => 
        v.name.toLowerCase().includes(keyword) && v.lang.startsWith('en')
      );
      if (keywordMatch) {
        console.log(`✅ Found mature keyword match: ${keywordMatch.name}`);
        return keywordMatch;
      }
    }

    // Priority 4: Any male voice indicator
    const maleVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.toLowerCase().includes('male') || 
       v.name.toLowerCase().includes('man'))
    );
    if (maleVoice) {
      console.log(`⚠️ Using generic male voice: ${maleVoice.name}`);
      return maleVoice;
    }

    // Last resort: First English voice
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      console.log(`⚠️ FALLBACK: Using first English voice: ${englishVoice.name}`);
      return englishVoice;
    }

    return null;
  }

  private async _restorePreviousVoice(): Promise<SpeechSynthesisVoice | null> {
    try {
      const storedVoiceName = localStorage.getItem(this.LOCKED_VOICE_KEY);
      if (!storedVoiceName) return null;

      await this._waitForVoices();
      const voices = speechSynthesis.getVoices();
      const restoredVoice = voices.find(v => v.name === storedVoiceName);
      
      if (restoredVoice) {
        console.log(`♻️ Restored previously locked voice: ${restoredVoice.name}`);
        return restoredVoice;
      } else {
        console.log(`⚠️ Previously locked voice '${storedVoiceName}' no longer available`);
        localStorage.removeItem(this.LOCKED_VOICE_KEY);
        return null;
      }
    } catch (error) {
      console.error('Error restoring previous voice:', error);
      return null;
    }
  }

  private _persistLockedVoice(voice: SpeechSynthesisVoice): void {
    try {
      localStorage.setItem(this.LOCKED_VOICE_KEY, voice.name);
    } catch (error) {
      console.error('Failed to persist locked voice:', error);
    }
  }

  /**
   * Get the locked voice - GUARANTEED CONSISTENCY
   */
  getLockedVoice(): SpeechSynthesisVoice | null {
    if (!this.isInitialized) {
      console.error('❌ CRITICAL: VoiceConsistencyManager not initialized! Call initialize() first.');
      return null;
    }
    return this.lockedVoice;
  }

  /**
   * Configure utterance with locked voice - ZERO TOLERANCE FOR VOICE SWITCHING
   * 🌐 ENHANCED: Now supports Turkish voice detection and switching
   */
  configureUtterance(utterance: SpeechSynthesisUtterance, text?: string, forceLanguage?: 'en' | 'tr'): boolean {
    // Determine language - explicit override or auto-detect
    let targetLanguage: 'en' | 'tr' = 'en';
    
    if (forceLanguage) {
      targetLanguage = forceLanguage;
    } else if (text) {
      // Auto-detect language from text
      import('../utils/languageDetection').then(({ detectLanguage }) => {
        const detectedLang = detectLanguage(text);
        if (detectedLang === 'tr') {
          targetLanguage = 'tr';
        }
      });
      
      // Quick detection for immediate use
      const hasTurkishChars = /[çğıöşüÇĞIİÖŞÜ]/.test(text);
      const hasTurkishWords = /\b(bu|bir|ve|modül|öğren|kullan)\b/i.test(text);
      if (hasTurkishChars || hasTurkishWords) {
        targetLanguage = 'tr';
      }
    }

    if (targetLanguage === 'tr') {
      // Use Turkish voice configuration
      const turkishVoice = getBestTurkishVoice();
      if (turkishVoice) {
        utterance.voice = turkishVoice;
        utterance.rate = VOICE_CONFIG.TURKISH.RATE;
        utterance.pitch = VOICE_CONFIG.TURKISH.PITCH;
        utterance.volume = VOICE_CONFIG.TURKISH.VOLUME;
        utterance.lang = VOICE_CONFIG.TURKISH.LANG;
        console.log('🇹🇷 Using Turkish voice for Turkish content:', turkishVoice.name);
        return true;
      } else {
        console.warn('⚠️ Turkish voice not available, falling back to English voice');
      }
    }

    // Default: Use locked English voice
    const voice = this.getLockedVoice();
    if (!voice) {
      console.error('❌ CRITICAL: No locked voice available for utterance configuration!');
      return false;
    }

    // MANDATORY: Use locked English voice
    utterance.voice = voice;
    
    // Apply mature male voice characteristics
    utterance.rate = VOICE_CONFIG.ENGLISH.RATE;
    utterance.pitch = VOICE_CONFIG.ENGLISH.PITCH;
    utterance.volume = VOICE_CONFIG.ENGLISH.VOLUME;
    utterance.lang = VOICE_CONFIG.ENGLISH.LANG;
    console.log('🇺🇸 Using English voice for English content:', voice.name);

    return true;
  }

  /**
   * 🌐 NEW: Smart language-aware TTS with automatic voice switching
   */
  async speakWithLanguageDetection(text: string): Promise<void> {
    if (!text || text.trim().length === 0) return;

    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure with language detection
        const success = this.configureUtterance(utterance, text);
        if (!success) {
          reject(new Error('Failed to configure utterance'));
          return;
        }

        // Set up event handlers
        utterance.onend = () => {
          console.log('🎤 Speech completed for text:', text.substring(0, 50) + '...');
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('🚫 Speech error:', event.error);
          reject(new Error(event.error));
        };

        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        // Speak with appropriate voice
        speechSynthesis.speak(utterance);

      } catch (error) {
        console.error('❌ Speech synthesis error:', error);
        reject(error);
      }
    });
  }

  /**
   * Validation: Check if utterance uses locked voice
   */
  validateUtterance(utterance: SpeechSynthesisUtterance): boolean {
    const lockedVoice = this.getLockedVoice();
    if (!lockedVoice) return false;

    const isCorrectVoice = utterance.voice?.name === lockedVoice.name;
    if (!isCorrectVoice) {
      console.error(`❌ VOICE VALIDATION FAILED! Expected: ${lockedVoice.name}, Got: ${utterance.voice?.name || 'null'}`);
    }
    return isCorrectVoice;
  }

  /**
   * Get voice information for debugging
   */
  getVoiceInfo(): { name: string; lang: string; isLocked: boolean; isInitialized: boolean } {
    return {
      name: this.lockedVoice?.name || 'None',
      lang: this.lockedVoice?.lang || 'Unknown',
      isLocked: !!this.lockedVoice,
      isInitialized: this.isInitialized
    };
  }

  /**
   * Clear cache for testing
   */
  static clearCache(): void {
    if (VoiceConsistencyManagerClass.instance) {
      VoiceConsistencyManagerClass.instance.lockedVoice = null;
      VoiceConsistencyManagerClass.instance.isInitialized = false;
      VoiceConsistencyManagerClass.instance.initializationPromise = null;
      localStorage.removeItem(VoiceConsistencyManagerClass.instance.LOCKED_VOICE_KEY);
    }
    VoiceConsistencyManagerClass.instance = null;
  }
}

// Export singleton instance
export const VoiceConsistencyManager = VoiceConsistencyManagerClass.getInstance();