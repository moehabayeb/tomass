import { useState, useCallback, useRef, useEffect } from 'react';

interface SpeechResult {
  letter: string | null;
  confidence?: number;
  transcript?: string;
  needsConfirmation?: boolean;
}

interface SpeechState {
  isListening: boolean;
  isProcessing: boolean;
  message: string;
  error: boolean;
  needsConfirmation: boolean;
  suggestedLetter: string | null;
  audioLevel: number;
  microphoneActive: boolean;
}

export const useHangmanSpeechRecognition = () => {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isProcessing: false,
    message: '',
    error: false,
    needsConfirmation: false,
    suggestedLetter: null,
    audioLevel: 0,
    microphoneActive: false
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isActiveRef = useRef<boolean>(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ULTRA-COMPREHENSIVE letter mapping table - PHONETIC ALPHABET PRIORITY
  const letterMap: Record<string, string> = {
    // === NATO PHONETIC ALPHABET (HIGHEST PRIORITY - 99% ACCURACY) ===
    'alpha': 'a', 'bravo': 'b', 'charlie': 'c', 'delta': 'd', 'echo': 'e',
    'foxtrot': 'f', 'golf': 'g', 'hotel': 'h', 'india': 'i', 'juliet': 'j',
    'kilo': 'k', 'lima': 'l', 'mike': 'm', 'november': 'n', 'oscar': 'o',
    'papa': 'p', 'quebec': 'q', 'romeo': 'r', 'sierra': 's', 'tango': 't',
    'uniform': 'u', 'victor': 'v', 'whiskey': 'w', 'xray': 'x', 'x-ray': 'x',
    'yankee': 'y', 'zulu': 'z',

    // === WORD ASSOCIATION PATTERNS (HIGH ACCURACY) ===
    'a for apple': 'a', 'a as in apple': 'a', 'apple': 'a',
    'b for boy': 'b', 'b as in boy': 'b', 'boy': 'b',
    'c for cat': 'c', 'c as in cat': 'c', 'cat': 'c',
    'd for dog': 'd', 'd as in dog': 'd', 'dog': 'd',
    'e for elephant': 'e', 'e as in elephant': 'e', 'elephant': 'e',
    'f for fox': 'f', 'f as in fox': 'f', 'fox': 'f',
    'g for goat': 'g', 'g as in goat': 'g', 'goat': 'g',
    'h for house': 'h', 'h as in house': 'h', 'house': 'h',
    'i for ice': 'i', 'i as in ice': 'i', 'ice': 'i',
    'j for jump': 'j', 'j as in jump': 'j', 'jump': 'j',
    'k for kite': 'k', 'k as in kite': 'k', 'kite': 'k',
    'l for lion': 'l', 'l as in lion': 'l', 'lion': 'l',
    'm for mouse': 'm', 'm as in mouse': 'm', 'mouse': 'm',
    'n for nose': 'n', 'n as in nose': 'n', 'nose': 'n',
    'o for orange': 'o', 'o as in orange': 'o', 'orange': 'o',
    'p for pig': 'p', 'p as in pig': 'p', 'pig': 'p',
    'q for queen': 'q', 'q as in queen': 'q', 'queen': 'q',
    'r for rabbit': 'r', 'r as in rabbit': 'r', 'rabbit': 'r',
    's for snake': 's', 's as in snake': 's', 'snake': 's',
    't for tree': 't', 't as in tree': 't', 'tree': 't',
    'u for umbrella': 'u', 'u as in umbrella': 'u', 'umbrella': 'u',
    'v for van': 'v', 'v as in van': 'v', 'van': 'v',
    'w for water': 'w', 'w as in water': 'w', 'water': 'w',
    'x for box': 'x', 'x as in box': 'x', 'box': 'x',
    'y for yes': 'y', 'y as in yes': 'y', 'yes': 'y',
    'z for zebra': 'z', 'z as in zebra': 'z', 'zebra': 'z',

    // === A PRONUNCIATIONS ===
    'a': 'a', 'ay': 'a', 'eh': 'a', 'aye': 'a', 'aaa': 'a', 'aa': 'a', 'aie': 'a',
    'hey': 'a', 'heh': 'a', 'eeh': 'a', 'ahh': 'a', 'aeh': 'a', 'eay': 'a', 'aay': 'a',

    // === B PRONUNCIATIONS ===
    'b': 'b', 'bee': 'b', 'be': 'b', 'bea': 'b', 'bie': 'b', 'baa': 'b',
    'beh': 'b', 'bay': 'b', 'bii': 'b', 'beeh': 'b',

    // === C PRONUNCIATIONS ===
    'c': 'c', 'see': 'c', 'sea': 'c', 'cee': 'c', 'si': 'c', 'cie': 'c', 'cea': 'c',
    'seh': 'c', 'say': 'c', 'seeh': 'c', 'sii': 'c', 'ceh': 'c',

    // === D PRONUNCIATIONS ===
    'd': 'd', 'dee': 'd', 'de': 'd', 'die': 'd', 'dea': 'd',
    'deh': 'd', 'day': 'd', 'dii': 'd', 'deeh': 'd',

    // === E PRONUNCIATIONS ===
    'e': 'e', 'ee': 'e', 'ea': 'e', 'eee': 'e', 'eh': 'e', 'eie': 'e',
    'eeh': 'e', 'ih': 'e', 'ey': 'e', 'ay': 'e', 'hey': 'e', 'eay': 'e',

    // === F PRONUNCIATIONS ===
    'f': 'f', 'ef': 'f', 'eff': 'f', 'eph': 'f', 'efe': 'f', 'aff': 'f',
    'feh': 'f', 'fee': 'f', 'fii': 'f', 'aaf': 'f',

    // === G PRONUNCIATIONS ===
    'g': 'g', 'gee': 'g', 'ghee': 'g', 'ji': 'g', 'gie': 'g', 'jee': 'g',
    'geh': 'g', 'gay': 'g', 'gii': 'g', 'jeeh': 'g',

    // === H PRONUNCIATIONS ===
    'h': 'h', 'aitch': 'h', 'ach': 'h', 'aych': 'h', 'haitch': 'h', 'eitch': 'h',
    'heh': 'h', 'etch': 'h', 'itch': 'h', 'aysh': 'h', 'hash': 'h',

    // === I PRONUNCIATIONS (CRITICAL - MOST PROBLEMATIC) ===
    'i': 'i',
    // Standard pronunciations
    'eye': 'i', 'ai': 'i', 'iy': 'i', 'ih': 'i', 'aye': 'i', 'aie': 'i',
    // Compound sounds
    'ay-ee': 'i', 'ah-ee': 'i', 'ie': 'i', 'iii': 'i', 'ii': 'i', 'iee': 'i',
    'aye-aye': 'i', 'i-eye': 'i', 'eyy': 'i', 'aii': 'i',
    // Unclear/mumbled versions
    'ahh': 'i', 'uhh': 'i', 'eh': 'i', 'ah': 'i', 'ee': 'i', 'ay': 'i',
    // Phonetic variations
    'ahh-eh': 'i', 'ee-ah': 'i', 'ih-eh': 'i', 'ay-eh': 'i', 'uh-ee': 'i',
    // Extended sounds
    'aaahhh': 'i', 'eeeyyyy': 'i', 'ahhhhh': 'i', 'iiiiii': 'i',
    // Accented versions
    'ah-yee': 'i', 'eh-yee': 'i', 'oy': 'i', 'oi': 'i', 'ui': 'i',
    // Natural speech patterns
    'uh-huh': 'i', 'mm-hm': 'i', 'yah': 'i', 'yeah': 'i',

    // === J PRONUNCIATIONS ===
    'j': 'j', 'jay': 'j', 'jae': 'j', 'jey': 'j', 'jai': 'j', 'jaa': 'j',
    'jeh': 'j', 'jii': 'j', 'jeeh': 'j',

    // === K PRONUNCIATIONS ===
    'k': 'k', 'kay': 'k', 'key': 'k', 'kaye': 'k', 'ca': 'k', 'kie': 'k', 'kaa': 'k',
    'keh': 'k', 'kii': 'k', 'keeh': 'k', 'cay': 'k',

    // === L PRONUNCIATIONS ===
    'l': 'l', 'el': 'l', 'ell': 'l', 'elle': 'l', 'lie': 'l', 'lea': 'l',
    'leh': 'l', 'lay': 'l', 'lii': 'l', 'leeh': 'l',

    // === M PRONUNCIATIONS ===
    'm': 'm', 'em': 'm', 'emm': 'm', 'emma': 'm', 'mie': 'm',
    'meh': 'm', 'may': 'm', 'mii': 'm', 'meeh': 'm', 'mmm': 'm',

    // === N PRONUNCIATIONS ===
    'n': 'n', 'en': 'n', 'enn': 'n', 'enie': 'n', 'nee': 'n',
    'neh': 'n', 'nay': 'n', 'nii': 'n', 'neeh': 'n', 'nnn': 'n',

    // === O PRONUNCIATIONS ===
    'o': 'o', 'oh': 'o', 'owe': 'o', 'eau': 'o', 'ooo': 'o', 'oo': 'o', 'oie': 'o',
    'oeh': 'o', 'oay': 'o', 'oii': 'o', 'oooh': 'o', 'oww': 'o',

    // === P PRONUNCIATIONS ===
    'p': 'p', 'pee': 'p', 'pe': 'p', 'pea': 'p', 'pie': 'p', 'paa': 'p',
    'peh': 'p', 'pay': 'p', 'pii': 'p', 'peeh': 'p',

    // === Q PRONUNCIATIONS ===
    'q': 'q', 'cue': 'q', 'queue': 'q', 'que': 'q', 'kyu': 'q', 'kyuu': 'q', 'qie': 'q',
    'qeh': 'q', 'qay': 'q', 'qii': 'q', 'queeh': 'q', 'kyoo': 'q',

    // === R PRONUNCIATIONS ===
    'r': 'r', 'ar': 'r', 'are': 'r', 'arr': 'r', 'aar': 'r', 'rie': 'r',
    'reh': 'r', 'ray': 'r', 'rii': 'r', 'reeh': 'r', 'rrr': 'r',

    // === S PRONUNCIATIONS ===
    's': 's', 'ess': 's', 'es': 's', 'esse': 's', 'sie': 's',
    'seh': 's', 'say': 's', 'sii': 's', 'seeh': 's', 'sss': 's',

    // === T PRONUNCIATIONS ===
    't': 't', 'tee': 't', 'tea': 't', 'te': 't', 'tie': 't', 'taa': 't',
    'teh': 't', 'tay': 't', 'tii': 't', 'teeh': 't',

    // === U PRONUNCIATIONS ===
    'u': 'u', 'you': 'u', 'yu': 'u', 'yuu': 'u', 'uu': 'u', 'uuu': 'u', 'uie': 'u',
    'ueh': 'u', 'uay': 'u', 'uii': 'u', 'ueeh': 'u', 'yoo': 'u', 'ooo': 'u',

    // === V PRONUNCIATIONS ===
    'v': 'v', 'vee': 'v', 've': 'v', 'vea': 'v', 'vie': 'v', 'vaa': 'v',
    'veh': 'v', 'vay': 'v', 'vii': 'v', 'veeh': 'v',

    // === W PRONUNCIATIONS ===
    'w': 'w', 'double': 'w', 'double-u': 'w', 'double-you': 'w', 'double you': 'w',
    'doubleyou': 'w', 'double u': 'w', 'doubleu': 'w', 'dub': 'w', 'dubbayou': 'w',
    'dubya': 'w', 'dub-u': 'w', 'dub-you': 'w', 'double-uu': 'w',

    // === X PRONUNCIATIONS ===
    'x': 'x', 'ex': 'x', 'eks': 'x', 'exx': 'x', 'xie': 'x',
    'xeh': 'x', 'xay': 'x', 'xii': 'x', 'xeeh': 'x', 'ecks': 'x',

    // === Y PRONUNCIATIONS ===
    'y': 'y', 'why': 'y', 'wye': 'y', 'wi': 'y', 'wie': 'y', 'yaa': 'y', 'yie': 'y',
    'yeh': 'y', 'yay': 'y', 'yii': 'y', 'yeeh': 'y', 'wai': 'y',

    // === Z PRONUNCIATIONS ===
    'z': 'z', 'zee': 'z', 'zed': 'z', 'ze': 'z', 'zie': 'z', 'zaa': 'z',
    'zeh': 'z', 'zay': 'z', 'zii': 'z', 'zeeh': 'z',

    // NATO phonetic alphabet (military standard)
    'alpha': 'a', 'bravo': 'b', 'charlie': 'c', 'delta': 'd', 'echo': 'e',
    'foxtrot': 'f', 'golf': 'g', 'hotel': 'h', 'india': 'i', 'juliet': 'j',
    'kilo': 'k', 'lima': 'l', 'mike': 'm', 'november': 'n', 'oscar': 'o',
    'papa': 'p', 'quebec': 'q', 'romeo': 'r', 'sierra': 's', 'tango': 't',
    'uniform': 'u', 'victor': 'v', 'whiskey': 'w', 'xray': 'x', 'x-ray': 'x',
    'yankee': 'y', 'zulu': 'z',

    // "Letter X" patterns with articles
    'letter a': 'a', 'letter b': 'b', 'letter c': 'c', 'letter d': 'd', 'letter e': 'e',
    'letter f': 'f', 'letter g': 'g', 'letter h': 'h', 'letter i': 'i', 'letter j': 'j',
    'letter k': 'k', 'letter l': 'l', 'letter m': 'm', 'letter n': 'n', 'letter o': 'o',
    'letter p': 'p', 'letter q': 'q', 'letter r': 'r', 'letter s': 's', 'letter t': 't',
    'letter u': 'u', 'letter v': 'v', 'letter w': 'w', 'letter x': 'x', 'letter y': 'y',
    'letter z': 'z',

    // Alternative "the letter X" patterns
    'the letter a': 'a', 'the letter b': 'b', 'the letter c': 'c', 'the letter d': 'd',
    'the letter e': 'e', 'the letter f': 'f', 'the letter g': 'g', 'the letter h': 'h',
    'the letter i': 'i', 'the letter j': 'j', 'the letter k': 'k', 'the letter l': 'l',
    'the letter m': 'm', 'the letter n': 'n', 'the letter o': 'o', 'the letter p': 'p',
    'the letter q': 'q', 'the letter r': 'r', 'the letter s': 's', 'the letter t': 't',
    'the letter u': 'u', 'the letter v': 'v', 'the letter w': 'w', 'the letter x': 'x',
    'the letter y': 'y', 'the letter z': 'z'
  };

  // Enhanced phonetic similarity mapping for fuzzy matching
  const phoneticGroups: Record<string, string[]> = {
    // Similar sounding consonants
    'b': ['p', 'v', 'd'], 'p': ['b', 't'], 'v': ['b', 'f'],
    'm': ['n'], 'n': ['m'],
    'f': ['v', 's'], 's': ['f', 'z'], 'z': ['s'],
    'c': ['k', 's'], 'k': ['c', 'g'], 'g': ['k', 'j'], 'j': ['g', 'y'],
    'd': ['t', 'b'], 't': ['d', 'p'],
    'l': ['r'], 'r': ['l'],

    // Similar sounding vowels
    'a': ['e', 'i'], 'e': ['a', 'i'], 'i': ['e', 'a'],
    'o': ['u'], 'u': ['o', 'w'], 'w': ['u'],
    'y': ['i', 'j'], 'x': ['z', 's']
  };

  // Smart fuzzy letter matching
  const fuzzyLetterMatch = useCallback((transcript: string, confidence: number): string | null => {
    if (confidence < 0.3) return null; // Too low confidence for fuzzy matching

    const normalized = transcript.toLowerCase().trim();

    // Check if transcript sounds like any letter combination
    for (const [letter, sounds] of Object.entries(letterMap)) {
      if (sounds === letter) continue; // Skip self-references

      // Calculate phonetic similarity
      const similarity = calculatePhoneticSimilarity(normalized, letter);
      if (similarity > 0.6) {
        return sounds;
      }
    }

    // Try phonetic group matching for unclear letters
    const tokens = normalized.split(/\s+/);
    for (const token of tokens) {
      if (token.length === 1 && /[a-z]/.test(token)) {
        return token; // Direct single letter
      }

      // Check if token is phonetically similar to any letter name
      for (const [mappedLetter, variations] of Object.entries(letterMap)) {
        if (variations.includes(token)) {
          return mappedLetter;
        }
      }
    }

    return null;
  }, []);

  // Calculate phonetic similarity between two strings
  const calculatePhoneticSimilarity = (str1: string, str2: string): number => {
    if (str1 === str2) return 1.0;

    // Simple Levenshtein distance ratio
    const maxLength = Math.max(str1.length, str2.length);
    const distance = levenshteinDistance(str1, str2);
    return 1 - (distance / maxLength);
  };

  // Simple Levenshtein distance calculation
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  // ADVANCED MULTI-STAGE letter extraction with comprehensive fallbacks
  const extractLetter = useCallback((transcript: string, confidence?: number): SpeechResult => {
    const raw = transcript.toLowerCase().trim();
    const normalized = raw.replace(/[^\w\s-]/g, '');

    // Debug logging
    const debugEnabled = window.location.search.includes('debug=1');
    if (debugEnabled) {
      console.log('🎤 Speech Debug:', {
        raw: transcript,
        normalized,
        confidence: confidence?.toFixed(2)
      });
    }

    // === STAGE 1: EXACT DIRECT MAPPING (HIGHEST PRIORITY) ===

    // Handle "as in" patterns (e.g., "B as in boy", "I as in ice")
    const asInMatch = normalized.match(/([a-z])\s+as\s+in/);
    if (asInMatch) {
      const letter = asInMatch[1];
      if (debugEnabled) {
        console.log('✅ Stage 1: As-in pattern found:', letter.toUpperCase());
      }
      return { letter, confidence, transcript };
    }

    // Direct whole-string lookup in comprehensive map
    if (letterMap[normalized]) {
      const letter = letterMap[normalized];
      if (debugEnabled) {
        console.log('✅ Stage 1: Direct whole match:', letter.toUpperCase());
      }
      return { letter, confidence, transcript };
    }

    // === STAGE 2: TOKEN-BASED MAPPING ===
    const tokens = normalized.split(/\s+/).filter(t => t.length > 0);

    for (const token of tokens) {
      // Direct token mapping from comprehensive table
      if (letterMap[token]) {
        const letter = letterMap[token];
        if (debugEnabled) {
          console.log('✅ Stage 2: Token match:', { token, letter: letter.toUpperCase() });
        }
        return { letter, confidence, transcript };
      }

      // Single alphabetic character
      if (/^[a-z]$/.test(token)) {
        if (debugEnabled) {
          console.log('✅ Stage 2: Single letter token:', token.toUpperCase());
        }
        return { letter: token, confidence, transcript };
      }
    }

    // === STAGE 3: PHONETIC SIMILARITY MATCHING ===
    for (const token of tokens) {
      const bestMatch = findBestPhoneticMatch(token);
      if (bestMatch && bestMatch.score > 0.7) {
        if (debugEnabled) {
          console.log('✅ Stage 3: Phonetic match:', {
            token,
            letter: bestMatch.letter.toUpperCase(),
            score: bestMatch.score.toFixed(2)
          });
        }
        return {
          letter: bestMatch.letter,
          confidence,
          transcript,
          needsConfirmation: bestMatch.score < 0.9
        };
      }
    }

    // === STAGE 4: SUBSTRING MATCHING ===
    for (const token of tokens) {
      for (const [sound, letter] of Object.entries(letterMap)) {
        if (sound.length >= 2 && token.includes(sound)) {
          if (debugEnabled) {
            console.log('✅ Stage 4: Substring match:', {
              token,
              sound,
              letter: letter.toUpperCase()
            });
          }
          return {
            letter,
            confidence,
            transcript,
            needsConfirmation: true
          };
        }
      }
    }

    // === STAGE 5: LEVENSHTEIN DISTANCE MATCHING ===
    const levenshteinMatch = findLevenshteinMatch(normalized);
    if (levenshteinMatch && levenshteinMatch.distance <= 2) {
      if (debugEnabled) {
        console.log('✅ Stage 5: Levenshtein match:', {
          input: normalized,
          match: levenshteinMatch.sound,
          letter: levenshteinMatch.letter.toUpperCase(),
          distance: levenshteinMatch.distance
        });
      }
      return {
        letter: levenshteinMatch.letter,
        confidence,
        transcript,
        needsConfirmation: true
      };
    }

    // === STAGE 6: FALLBACK - SOUNDS-LIKE DETECTION ===
    const soundsLike = detectSoundsLike(normalized);
    if (soundsLike) {
      if (debugEnabled) {
        console.log('✅ Stage 6: Sounds-like match:', {
          input: normalized,
          letter: soundsLike.toUpperCase()
        });
      }
      return {
        letter: soundsLike,
        confidence,
        transcript,
        needsConfirmation: true
      };
    }

    // No letter found after all stages
    if (debugEnabled) {
      console.log('❌ No match found in any stage:', { tokens, normalized });
    }
    return { letter: null, confidence, transcript };
  }, []);

  // Find best phonetic match for a given token
  const findBestPhoneticMatch = useCallback((token: string): { letter: string, score: number } | null => {
    let bestMatch: { letter: string, score: number } | null = null;

    for (const [sound, letter] of Object.entries(letterMap)) {
      const score = calculatePhoneticSimilarity(token, sound);
      if (score > 0.6 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { letter, score };
      }
    }

    return bestMatch;
  }, []);

  // Find closest match using Levenshtein distance
  const findLevenshteinMatch = useCallback((input: string): { sound: string, letter: string, distance: number } | null => {
    let bestMatch: { sound: string, letter: string, distance: number } | null = null;

    for (const [sound, letter] of Object.entries(letterMap)) {
      if (sound.length < 2) continue; // Skip single letters for this stage

      const distance = levenshteinDistance(input, sound);
      const maxAllowedDistance = Math.ceil(sound.length * 0.4); // Allow 40% difference

      if (distance <= maxAllowedDistance && (!bestMatch || distance < bestMatch.distance)) {
        bestMatch = { sound, letter, distance };
      }
    }

    return bestMatch;
  }, []);

  // Detect if input sounds like a letter (simple heuristics)
  const detectSoundsLike = useCallback((input: string): string | null => {
    // Letter I special cases (most problematic)
    if (input.match(/^(ah|eh|uh|oh|mm|hm|yah|yeah)$/)) {
      return 'i';
    }

    // Letter A sounds
    if (input.match(/^(hey|heh|eah)$/)) {
      return 'a';
    }

    // Letter E sounds
    if (input.match(/^(eeh|ih|ey)$/)) {
      return 'e';
    }

    // Letter O sounds
    if (input.match(/^(ohh|owe|oww)$/)) {
      return 'o';
    }

    // Letter U sounds
    if (input.match(/^(yoo|ooo)$/)) {
      return 'u';
    }

    return null;
  }, []);

  // Generate smart suggestions based on what was heard
  const generateSmartSuggestions = useCallback((alternatives: Array<{transcript: string, confidence: number}>): string[] => {
    const suggestions = new Set<string>();

    for (const alt of alternatives.slice(0, 3)) { // Only check top 3 alternatives
      const normalized = alt.transcript.toLowerCase().trim();

      // Find close matches in our letter map
      for (const [sound, letter] of Object.entries(letterMap)) {
        if (sound.length < 2) continue;

        const similarity = calculatePhoneticSimilarity(normalized, sound);
        if (similarity > 0.5) {
          suggestions.add(`"${sound.charAt(0).toUpperCase() + sound.slice(1)}"`);
          if (suggestions.size >= 3) break;
        }
      }

      if (suggestions.size >= 3) break;
    }

    // Add common fallback suggestions if we don't have enough
    if (suggestions.size < 2) {
      suggestions.add('"Eye" for I');
      suggestions.add('"Bee" for B');
      suggestions.add('"See" for C');
    }

    return Array.from(suggestions).slice(0, 3);
  }, []);

  // Audio level monitoring for microphone feedback
  const startAudioMonitoring = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const microphone = audioContext.createMediaStreamSource(stream);
      microphoneRef.current = microphone;
      microphone.connect(analyser);

      setState(prev => ({ ...prev, microphoneActive: true }));

      // Monitor audio levels
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateAudioLevel = () => {
        if (analyserRef.current && isActiveRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          setState(prev => ({ ...prev, audioLevel: average }));
          requestAnimationFrame(updateAudioLevel);
        }
      };
      updateAudioLevel();

      return stream;
    } catch (error) {
      setState(prev => ({
        ...prev,
        microphoneActive: false,
        error: true,
        message: 'Microphone access denied - check browser permissions'
      }));
      throw error;
    }
  }, []);

  // Cleanup audio monitoring
  const stopAudioMonitoring = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    analyserRef.current = null;
    setState(prev => ({ ...prev, microphoneActive: false, audioLevel: 0 }));
  }, []);

  // Simple speech grammar setup
  const setupSpeechGrammar = useCallback((recognition: SpeechRecognition) => {
    try {
      // Try to set up grammar but don't fail if unsupported
      const SpeechGrammarList = (window as any).webkitSpeechGrammarList || (window as any).SpeechGrammarList;
      if (SpeechGrammarList) {
        const grammarList = new SpeechGrammarList();
        
        // Simple JSGF grammar focusing on common letter pronunciations
        const grammar = `#JSGF V1.0;
grammar letters;
public <letter> = a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z |
                  ay | bee | see | dee | ee | ef | gee | aitch | eye | jay | kay | el | em | en | oh | pee | cue | ar | ess | tee | you | vee | double you | ex | why | zee |  
                  alpha | bravo | charlie | delta | echo | foxtrot | golf | hotel | india | juliet | kilo | lima | mike | november | oscar | papa | quebec | romeo | sierra | tango | uniform | victor | whiskey | xray | yankee | zulu ;`;
        
        grammarList.addFromString(grammar, 1);
        (recognition as any).grammars = grammarList;
      }
    } catch (error) {
      // Grammar setup failed, continue without it
      console.warn('Speech grammar setup failed, continuing without grammar:', error);
    }
  }, []);

  // Start CONTINUOUS speech recognition with auto-restart
  const startListening = useCallback((
    alreadyGuessed: Set<string>,
    onLetterRecognized?: (letter: string) => void
  ): Promise<string | null> => {
    return new Promise(async (resolve) => {
      if (state.isListening) {
        resolve(null);
        return;
      }

      // Check for speech recognition support
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setState(prev => ({
          ...prev,
          message: 'Speech recognition not supported in this browser',
          error: true
        }));
        resolve(null);
        return;
      }

      try {
        // Start audio monitoring first
        await startAudioMonitoring();

        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognition = new SpeechRecognition();

        // BULLETPROOF CONTINUOUS SETTINGS
        recognition.lang = 'en-US';
        recognition.continuous = true;        // Keep listening continuously
        recognition.interimResults = true;    // Get results faster
        recognition.maxAlternatives = 20;     // More alternatives for better matching

        setupSpeechGrammar(recognition);

        isActiveRef.current = true;
        let resultResolver: ((value: string | null) => void) | null = resolve;

        setState(prev => ({
          ...prev,
          isListening: true,
          isProcessing: false,
          message: 'Listening... Say "Alpha", "Bravo", or any letter',
          error: false,
          needsConfirmation: false,
          suggestedLetter: null
        }));

        recognition.onresult = (event) => {
          // Process all results (interim and final)
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const alternatives: Array<{transcript: string, confidence: number}> = [];

            // Collect all alternatives for this result
            for (let j = 0; j < result.length; j++) {
              alternatives.push({
                transcript: result[j].transcript,
                confidence: result[j].confidence
              });
            }

            // Sort by confidence (highest first)
            alternatives.sort((a, b) => b.confidence - a.confidence);

            const debugEnabled = window.location.search.includes('debug=1');
            if (debugEnabled) {
              console.log('🎤 Speech result:', {
                isFinal: result.isFinal,
                alternatives: alternatives.map(alt => ({
                  text: alt.transcript,
                  confidence: alt.confidence.toFixed(2)
                }))
              });
            }

            // Process each alternative to find a letter
            for (const alt of alternatives) {
              const extractResult = extractLetter(alt.transcript, alt.confidence);

              if (extractResult.letter) {
                const letter = extractResult.letter.toLowerCase();

                // Check if already guessed
                if (alreadyGuessed.has(letter)) {
                  setState(prev => ({
                    ...prev,
                    message: `Already tried ${letter.toUpperCase()}`,
                    error: false
                  }));
                  setTimeout(() => setState(prev => ({ ...prev, message: 'Listening... Say "Alpha", "Bravo", or any letter' })), 1500);
                  continue; // Continue listening for new input
                }

                // Lower confidence threshold for continuous mode
                const needsConfirmation = alt.confidence < 0.3;

                if (needsConfirmation && result.isFinal) {
                  setState(prev => ({
                    ...prev,
                    message: `Did you say ${letter.toUpperCase()}?`,
                    needsConfirmation: true,
                    suggestedLetter: letter
                  }));

                  // Store callback for confirmation handling
                  if (onLetterRecognized) {
                    // Store the callback to use when confirmed
                    (globalThis as any).tempLetterCallback = onLetterRecognized;
                  }

                  if (resultResolver) {
                    resultResolver(null);
                    resultResolver = null;
                  }
                  return;
                }

                // Success - return the letter and continue listening
                if (result.isFinal || alt.confidence > 0.7) {
                  setState(prev => ({
                    ...prev,
                    message: `✅ Heard: ${letter.toUpperCase()}`,
                    error: false
                  }));

                  // CRITICAL: Call the callback for EVERY letter recognized
                  if (onLetterRecognized) {
                    onLetterRecognized(letter);
                  }

                  // Auto-restart listening after brief pause
                  setTimeout(() => {
                    setState(prev => ({
                      ...prev,
                      message: 'Listening... Say "Alpha", "Bravo", or any letter'
                    }));
                  }, 800);

                  // Only resolve promise for first letter (backward compatibility)
                  if (resultResolver) {
                    resultResolver(letter);
                    resultResolver = null;
                  }
                  return;
                }
              }
            }
          }
        };

        // Auto-restart on end (continuous listening)
        recognition.onend = () => {
          if (isActiveRef.current && recognitionRef.current) {
            // Auto-restart after brief delay to prevent rapid restarts
            restartTimeoutRef.current = setTimeout(() => {
              if (isActiveRef.current) {
                try {
                  recognitionRef.current?.start();
                } catch (error) {
                  console.warn('Recognition restart failed:', error);
                }
              }
            }, 100);
          }
        };

        recognition.onerror = (event) => {
          const debugEnabled = window.location.search.includes('debug=1');
          if (debugEnabled) {
            console.error('Speech recognition error:', event.error);
          }

          let shouldRestart = true;
          let errorMessage = "Listening... Try 'Alpha', 'Bravo', or any letter";

          switch (event.error) {
            case 'no-speech':
              // This is normal in continuous mode - just continue
              break;
            case 'audio-capture':
              errorMessage = "Microphone issue - check device";
              shouldRestart = false;
              break;
            case 'not-allowed':
              errorMessage = "Microphone access denied - check browser permissions";
              shouldRestart = false;
              break;
            case 'network':
              errorMessage = "Network error - check connection";
              break;
            case 'aborted':
              // Recognition was manually stopped
              shouldRestart = false;
              break;
            default:
              if (debugEnabled) {
                errorMessage = `Error: ${event.error} - continuing to listen`;
              }
          }

          if (shouldRestart && isActiveRef.current) {
            setState(prev => ({
              ...prev,
              message: errorMessage,
              error: false
            }));
          } else {
            setState(prev => ({
              ...prev,
              message: errorMessage,
              error: true,
              isListening: false
            }));
            isActiveRef.current = false;
            if (resultResolver) {
              resultResolver(null);
              resultResolver = null;
            }
          }
        };

        recognitionRef.current = recognition;
        recognition.start();

        // Set up 58-second restart timer (Chrome limit is ~60 seconds)
        timeoutRef.current = setTimeout(() => {
          if (recognition && isActiveRef.current) {
            try {
              recognition.stop();
              // The onend handler will restart it
            } catch (error) {
              console.warn('Recognition stop failed:', error);
            }
          }
        }, 58000);

      } catch (error) {
        setState(prev => ({
          ...prev,
          isListening: false,
          message: 'Microphone setup failed - check permissions',
          error: true
        }));
        resolve(null);
      }
    });
  }, [startAudioMonitoring, extractLetter, setupSpeechGrammar, generateSmartSuggestions]);

  // Confirm suggested letter
  const confirmLetter = useCallback((): string | null => {
    if (!state.suggestedLetter) return null;

    const letter = state.suggestedLetter;
    setState(prev => ({
      ...prev,
      message: `✅ Heard: ${letter.toUpperCase()}`,
      error: false,
      needsConfirmation: false,
      suggestedLetter: null
    }));

    // Call the stored callback if available
    const callback = (globalThis as any).tempLetterCallback;
    if (callback) {
      callback(letter);
      // Clean up
      (globalThis as any).tempLetterCallback = null;
    }

    // Auto-restart listening after brief pause
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        message: 'Listening... Say "Alpha", "Bravo", or any letter'
      }));
    }, 800);

    return letter;
  }, [state.suggestedLetter]);

  // Stop listening completely
  const stopListening = useCallback(() => {
    isActiveRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.warn('Recognition stop failed:', error);
      }
      recognitionRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    stopAudioMonitoring();

    setState(prev => ({
      ...prev,
      isListening: false,
      isProcessing: false,
      message: '',
      error: false,
      needsConfirmation: false,
      suggestedLetter: null
    }));
  }, [stopAudioMonitoring]);

  // Reject confirmation and continue listening
  const rejectConfirmation = useCallback(() => {
    setState(prev => ({
      ...prev,
      message: 'Listening... Say "Alpha", "Bravo", or any letter',
      error: false,
      needsConfirmation: false,
      suggestedLetter: null
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      stopListening();
    };
  }, [stopListening]);

  return {
    state,
    startListening,
    stopListening,
    confirmLetter,
    rejectConfirmation
  };
};