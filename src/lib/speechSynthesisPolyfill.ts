import { logger } from '@/lib/logger';
/**
 * Speech Synthesis Polyfill for Android WebView
 *
 * This polyfill MUST be imported at the very top of main.tsx BEFORE any other imports.
 * It provides a no-op stub for speechSynthesis when not available (Android WebView),
 * preventing crashes during module initialization.
 *
 * The actual TTS functionality is provided by UnifiedTTSService which uses
 * native Capacitor TTS on mobile devices.
 */

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  // Check if speechSynthesis is already available
  if (!('speechSynthesis' in window)) {
    logger.log('[TTS Polyfill] speechSynthesis not available, installing polyfill');

    // Create a mock SpeechSynthesisUtterance class
    class MockSpeechSynthesisUtterance {
      text: string = '';
      lang: string = '';
      voice: SpeechSynthesisVoice | null = null;
      volume: number = 1;
      rate: number = 1;
      pitch: number = 1;
      onstart: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;
      onend: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;
      onerror: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisErrorEvent) => void) | null = null;
      onpause: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;
      onresume: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;
      onmark: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;
      onboundary: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => void) | null = null;

      constructor(text?: string) {
        if (text) this.text = text;
      }

      addEventListener(type: string, listener: EventListener): void {
        // No-op for polyfill
      }

      removeEventListener(type: string, listener: EventListener): void {
        // No-op for polyfill
      }

      dispatchEvent(event: Event): boolean {
        return false;
      }
    }

    // Create a mock speechSynthesis object
    const mockSpeechSynthesis = {
      speaking: false,
      pending: false,
      paused: false,

      speak(utterance: SpeechSynthesisUtterance): void {
        // Log for debugging - actual TTS handled by UnifiedTTSService
        logger.log('[TTS Polyfill] speak() called - use UnifiedTTSService for actual TTS');

        // Simulate the speech lifecycle for callbacks
        setTimeout(() => {
          if (utterance.onstart) {
            const event = new Event('start') as SpeechSynthesisEvent;
            utterance.onstart.call(utterance, event);
          }

          // Simulate end after a brief delay
          setTimeout(() => {
            if (utterance.onend) {
              const event = new Event('end') as SpeechSynthesisEvent;
              utterance.onend.call(utterance, event);
            }
          }, 100);
        }, 0);
      },

      cancel(): void {
        // No-op
      },

      pause(): void {
        // No-op
      },

      resume(): void {
        // No-op
      },

      getVoices(): SpeechSynthesisVoice[] {
        // Return empty array - native voices handled by Capacitor plugin
        return [];
      },

      addEventListener(type: string, listener: EventListener): void {
        // For voiceschanged event, call immediately with empty voices
        if (type === 'voiceschanged') {
          setTimeout(() => {
            listener(new Event('voiceschanged'));
          }, 0);
        }
      },

      removeEventListener(type: string, listener: EventListener): void {
        // No-op
      },

      dispatchEvent(event: Event): boolean {
        return false;
      },

      onvoiceschanged: null as ((this: SpeechSynthesis, ev: Event) => void) | null
    };

    // Install the polyfill
    Object.defineProperty(window, 'speechSynthesis', {
      value: mockSpeechSynthesis,
      writable: false,
      configurable: true
    });

    // Also provide SpeechSynthesisUtterance if not available
    if (!('SpeechSynthesisUtterance' in window)) {
      (window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
    }

    logger.log('[TTS Polyfill] Polyfill installed successfully');
  } else {
    logger.log('[TTS Polyfill] Native speechSynthesis available');
  }
}

// Export utility functions
export function isSpeechSynthesisAvailable(): boolean {
  return typeof window !== 'undefined' &&
         'speechSynthesis' in window &&
         typeof window.speechSynthesis.getVoices === 'function' &&
         // Check if it's our polyfill (returns empty array immediately) or real API
         window.speechSynthesis.getVoices().length > 0;
}

export function isPolyfillActive(): boolean {
  return typeof window !== 'undefined' &&
         'speechSynthesis' in window &&
         window.speechSynthesis.getVoices().length === 0;
}
