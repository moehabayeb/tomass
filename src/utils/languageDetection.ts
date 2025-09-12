/**
 * 🌐 LANGUAGE DETECTION UTILITY
 * Smart detection of Turkish vs English content for TTS voice switching
 */

export type SupportedLanguage = 'en' | 'tr' | 'mixed';

export interface LanguageSegment {
  text: string;
  language: SupportedLanguage;
  confidence: number;
}

/**
 * Detect language of text content
 */
export function detectLanguage(text: string): SupportedLanguage {
  if (!text || text.trim().length === 0) return 'en';
  
  const cleanText = text.toLowerCase().trim();
  
  // Turkish character detection (most reliable indicator)
  const turkishChars = /[çğıöşüÇĞIİÖŞÜ]/g;
  const turkishCharCount = (cleanText.match(turkishChars) || []).length;
  
  // Turkish-specific words and phrases
  const turkishWords = /\b(bu|bir|ve|ile|için|olan|gibi|kadar|çok|şey|modül|modülde|öğren|kullan|örnek|cümle|fiil|isim|sıfat|zamanı|geçer|gelir|söyle|anlam|açıklama|örnekler|cümleler|türkçe|ingilizce|gramer|öğrenci|öğretmen|ders|sınıf|okul|ev|aile|arkadaş|yemek|içmek|gitmek|gelmek|yapmak|olmak|etmek|demek|vermek|almak|görmek|bilmek|istemek|sevmek|konuşmak|dinlemek|okumak|yazmak|çalışmak|oynamak|uyumak|kalkmak|oturmak|ayakta|durma|başla|bitir|devam|sonra|önce|şimdi|bugün|yarın|dün|hafta|ay|yıl|saat|dakika|saniye|zaman|yer|burada|şurada|orada|nerede|nasıl|ne|kim|hangi|kaç|kime|neden|niçin|niye|evet|hayır|belki|tabii|elbette|kesinlikle|hiç|her|bazı|birkaç|çoğu|hepsi|tüm|bütün|sadece|yalnız|tek|iki|üç|dört|beş|altı|yedi|sekiz|dokuz|on|yirmi|otuz|kırk|elli|yüz|bin|milyon|büyük|küçük|uzun|kısa|yüksek|alçak|geniş|dar|kalın|ince|ağır|hafif|sıcak|soğuk|serin|ılık|güzel|çirkin|iyi|kötü|kolay|zor|hızlı|yavaş|sessiz|gürültülü|temiz|kirli|yeni|eski|genç|yaşlı|zengin|fakir|mutlu|üzgün|kızgın|sakin|yorgun|dinç|hasta|sağlıklı|aç|tok|susuz|dolu|boş|açık|kapalı|parlak|karanlık|renk|kırmızı|mavi|yeşil|sarı|siyah|beyaz|gri|kahverengi|turuncu|mor|pembe|doğa|ağaç|çiçek|yaprak|dalı|kök|meyve|sebze|hayvan|kuş|balık|kedi|köpek|at|inek|koyun|keçi|tavuk|horoz|fare|arı|kelebek|karınca|böcek|orman|dağ|deniz|göl|nehir|çay|su|hava|rüzgar|yağmur|kar|güneş|ay|yıldız|gök|bulut|gökkuşağı)\b/gi;
  const turkishWordMatches = cleanText.match(turkishWords) || [];
  
  // Turkish suffixes (agglutinative language characteristic)
  const turkishSuffixes = /\b\w+(lar|ler|da|de|ta|te|dan|den|tan|ten|ya|ye|a|e|ı|i|u|ü|ın|in|un|ün|nın|nin|nun|nün|sı|si|su|sü|m|n|k|nız|niz|ları|leri|ını|ini|unu|ünü|nda|nde|ntan|nten|mış|miş|muş|müş|dı|di|du|dü|tı|ti|tu|tü|sa|se|ıyor|iyor|uyor|üyor|acak|ecek|ır|ir|ur|ür|ar|er)\b/g;
  const turkishSuffixMatches = cleanText.match(turkishSuffixes) || [];
  
  // Turkish grammar patterns
  const turkishPatterns = [
    /\bbu modül/, // "bu modül"
    /\bfiili?, /, // Turkish grammar terms
    /\böğren/, // "öğren"
    /\bkullan/, // "kullan"
    /\börnek/, // "örnek"
    /\bcümle/, // "cümle"
    /\banlamına gelir/, // "means" in Turkish
    /\biçin kullanılır/, // "used for" in Turkish
    /\bşeklinde/, // "in the form of"
  ];
  const turkishPatternCount = turkishPatterns.filter(pattern => pattern.test(cleanText)).length;
  
  // Calculate Turkish indicators score
  const turkishScore = (turkishCharCount * 3) + (turkishWordMatches.length * 2) + (turkishSuffixMatches.length * 1) + (turkishPatternCount * 4);
  
  // English indicators
  const englishWords = /\b(the|be|to|of|and|a|in|that|have|i|it|for|not|on|with|he|as|you|do|at|this|but|his|by|from|they|she|or|an|will|my|one|all|would|there|their|we|him|been|has|when|who|oil|about|time|if|up|out|many|then|them|what|so|can|into|more|her|two|like|could|way|only|its|said|each|which|where|after|back|other|were|our|just|first|also|any|some|had|how|water|very|what|know|take|than|call|come|may|down|side|been|now|find|long|get|here|between|both|each|those|look|these|see|him|over|such|try|way|too|any|new|sound|no|most|number|who|people|over|know|water|than|call|day|look|work|first|right|might|come|old|see|now|way|could|people|my|than|first|water|been|call|who|oil|sit|now|find|long|get|here|part|hand|high|year|work|want|things|old|see|him|two|how|its|said|each|make|most|over|think|also|back|after|use|her|can|out|would|year|get|may|say|come|could|now|made|can|each|which|she|do|how|their|if|will|up|other|about|out|many|time|very|when|much|new|write|would|like|so|these|her|long|make|thing|see|him|two|more|go|no|way|could|my|than|first|water|been)\b/gi;
  const englishWordMatches = cleanText.match(englishWords) || [];
  
  // English patterns
  const englishPatterns = [
    /\bmodule \d+/i, // "Module 1", "Module 2", etc.
    /\blearn to /i, // "Learn to"
    /\buse .+ to /i, // "Use ... to"
    /\bin this module/i, // "In this module"
    /\bfor example/i, // "For example"
    /\bsentences/i, // "sentences"
    /\bverb/i, // "verb"
    /\bnoun/i, // "noun"
    /\badjective/i, // "adjective"
  ];
  const englishPatternCount = englishPatterns.filter(pattern => pattern.test(cleanText)).length;
  
  const englishScore = (englishWordMatches.length * 1) + (englishPatternCount * 3);
  
  // Mixed content detection (both languages present)
  const hasTurkish = turkishScore > 2;
  const hasEnglish = englishScore > 3;
  
  if (hasTurkish && hasEnglish && Math.abs(turkishScore - englishScore) < 5) {
    return 'mixed';
  }
  
  // Determine primary language
  if (turkishScore > englishScore && turkishScore > 5) {
    return 'tr';
  }
  
  // Default to English for unclear cases
  return 'en';
}

/**
 * ENHANCED: Advanced mixed content segmentation with word-level language detection
 */
export function segmentMixedContent(text: string): LanguageSegment[] {
  if (!text || text.trim().length === 0) {
    return [{ text, language: 'en', confidence: 1 }];
  }
  
  // Handle quoted English in Turkish content first
  const quotedSegments = handleQuotedContent(text);
  if (quotedSegments.length > 1) {
    return quotedSegments;
  }
  
  // First detect if the entire text is single language
  const overallLanguage = detectLanguage(text);
  
  // For short text or clearly single language, return as one segment
  if (text.length < 30 || (overallLanguage !== 'mixed' && !hasMixedLanguageIndicators(text))) {
    return [{ text: text.trim(), language: overallLanguage, confidence: 0.95 }];
  }
  
  // Enhanced segmentation for mixed content
  return segmentByLanguageBoundaries(text);
}

/**
 * Handle quoted English content within Turkish text
 */
function handleQuotedContent(text: string): LanguageSegment[] {
  // Match quoted content like: Bu modülde 'am, is, are' kullanarak
  const quotedPattern = /([^'"`]*)(["'`])([^"'`]+)\2([^'"`]*)/g;
  const segments: LanguageSegment[] = [];
  let lastIndex = 0;
  let match;

  while ((match = quotedPattern.exec(text)) !== null) {
    const [fullMatch, beforeQuote, quoteChar, quotedContent, afterQuote] = match;
    
    // Add text before quote
    if (beforeQuote.trim()) {
      segments.push({
        text: beforeQuote.trim(),
        language: detectLanguage(beforeQuote),
        confidence: 0.9
      });
    }
    
    // Add quoted content (likely English)
    if (quotedContent.trim()) {
      // Check if quoted content is English terms in Turkish context
      const isEnglishTerms = /^[a-zA-Z\s,]+$/.test(quotedContent) && 
                            quotedContent.split(/\s+/).every(word => 
                              /^[a-zA-Z]+$/.test(word) && word.length > 1
                            );
      
      segments.push({
        text: quotedContent.trim(),
        language: isEnglishTerms ? 'en' : detectLanguage(quotedContent),
        confidence: 0.95
      });
    }
    
    lastIndex = match.index + fullMatch.length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex).trim();
    if (remaining) {
      segments.push({
        text: remaining,
        language: detectLanguage(remaining),
        confidence: 0.9
      });
    }
  }
  
  return segments.length > 1 ? segments : [];
}

/**
 * Advanced language boundary detection
 */
function segmentByLanguageBoundaries(text: string): LanguageSegment[] {
  const segments: LanguageSegment[] = [];
  
  // Split by natural boundaries and analyze each part
  const parts = text.split(/(\s*[.!?:]\s*|\n\s*|\s*-\s*|\s+→\s+)/).filter(part => part.trim().length > 0);
  
  let currentSegment = '';
  let currentLanguage: SupportedLanguage = 'en';
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    // Handle separators
    if (/^\s*[.!?:→-]\s*$|^\n\s*$/.test(part)) {
      currentSegment += part;
      continue;
    }
    
    const partLang = detectLanguage(part);
    
    // If language changes significantly, create new segment
    if (partLang !== currentLanguage && currentSegment.trim().length > 5) {
      if (currentSegment.trim()) {
        segments.push({
          text: currentSegment.trim(),
          language: currentLanguage,
          confidence: 0.85
        });
      }
      currentSegment = part;
      currentLanguage = partLang;
    } else {
      currentSegment += part;
      // Update language if we have enough context
      if (currentSegment.trim().length > 10) {
        const segmentLang = detectLanguage(currentSegment);
        if (segmentLang !== 'mixed') {
          currentLanguage = segmentLang;
        }
      }
    }
    
    // Break long segments for better voice switching
    if (currentSegment.length > 120) {
      if (currentSegment.trim()) {
        segments.push({
          text: currentSegment.trim(),
          language: currentLanguage,
          confidence: 0.85
        });
      }
      currentSegment = '';
    }
  }
  
  // Add final segment
  if (currentSegment.trim()) {
    segments.push({
      text: currentSegment.trim(),
      language: currentLanguage,
      confidence: 0.85
    });
  }
  
  return segments.length > 0 ? segments : [{ text: text.trim(), language: detectLanguage(text), confidence: 0.7 }];
}

/**
 * Check if text has mixed language indicators
 */
function hasMixedLanguageIndicators(text: string): boolean {
  const turkishChars = /[çğıöşüÇĞIİÖŞÜ]/g;
  const hasTurkishChars = turkishChars.test(text);
  
  const englishPatterns = /\b(module|lesson|example|grammar|verb|noun|adjective|sentence)\b/i;
  const hasEnglishTerms = englishPatterns.test(text);
  
  const turkishPatterns = /\b(modül|ders|örnek|gramer|fiil|isim|sıfat|cümle|kullan|öğren)\b/i;
  const hasTurkishTerms = turkishPatterns.test(text);
  
  return (hasTurkishChars && hasEnglishTerms) || (hasTurkishTerms && hasEnglishTerms);
}

/**
 * Get language statistics for debugging
 */
export function getLanguageStats(text: string) {
  const segments = segmentMixedContent(text);
  const stats = {
    totalSegments: segments.length,
    englishSegments: segments.filter(s => s.language === 'en').length,
    turkishSegments: segments.filter(s => s.language === 'tr').length,
    mixedSegments: segments.filter(s => s.language === 'mixed').length,
    primaryLanguage: detectLanguage(text),
    segments
  };
  
  return stats;
}

/**
 * Test the language detection with common examples
 */
export function testLanguageDetection() {
  const tests = [
    { text: "Module 1: Verb To Be (am, is, are) - Positive Sentences", expected: 'en' },
    { text: "Modül 12 - Plural Nouns – Regular and Irregular", expected: 'tr' },
    { text: "Bu modülde İngilizcede 'am, is, are' kullanarak olumlu cümleler kurmayı öğreneceğiz.", expected: 'tr' },
    { text: "Learn to form and use affirmative sentences in the past simple tense", expected: 'en' },
    { text: "I am a teacher. She is happy. They are students.", expected: 'en' },
    { text: "Ben bir öğretmenim. O mutlu. Onlar öğrenci.", expected: 'tr' },
    { text: "Use 'am' with I, 'is' with he/she/it, and 'are' with we/you/they", expected: 'en' },
    { text: "Sıklık zarfları 'to be' fiilinden sonra, diğer fiillerden önce gelir", expected: 'tr' }
  ];
  
  console.log('🧪 Language Detection Test Results:');
  tests.forEach(test => {
    const detected = detectLanguage(test.text);
    const status = detected === test.expected ? '✅' : '❌';
    console.log(`${status} "${test.text.substring(0, 50)}..." → Expected: ${test.expected}, Got: ${detected}`);
  });
}

// Export test function for browser console access
if (typeof window !== 'undefined') {
  (window as any).testLanguageDetection = testLanguageDetection;
}