/**
 * AI Data Processing Consent Manager
 * Manages user consent for AI data processing (Apple 5.1.1 & 5.1.2 compliance)
 * Pattern follows analyticsConsent.ts
 */

const AI_CONSENT_KEY = 'ai_data_consent';
const AI_CONSENT_TIMESTAMP_KEY = 'ai_data_consent_timestamp';

/**
 * Check if user has given AI data processing consent
 */
export function hasAIConsent(): boolean {
  try {
    return localStorage.getItem(AI_CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

/**
 * Check if AI consent dialog needs to be shown
 */
export function needsAIConsentDialog(): boolean {
  try {
    return localStorage.getItem(AI_CONSENT_KEY) === null;
  } catch {
    return true;
  }
}

/**
 * Grant AI data processing consent
 */
export function grantAIConsent(): void {
  try {
    localStorage.setItem(AI_CONSENT_KEY, 'granted');
    localStorage.setItem(AI_CONSENT_TIMESTAMP_KEY, Date.now().toString());
  } catch {
    // Silent fail for localStorage errors (Safari Private Mode)
  }
}

/**
 * Deny AI data processing consent
 */
export function denyAIConsent(): void {
  try {
    localStorage.setItem(AI_CONSENT_KEY, 'denied');
    localStorage.setItem(AI_CONSENT_TIMESTAMP_KEY, Date.now().toString());
  } catch {
    // Silent fail
  }
}

/**
 * Revoke AI consent (for settings page)
 */
export function revokeAIConsent(): void {
  try {
    localStorage.removeItem(AI_CONSENT_KEY);
    localStorage.removeItem(AI_CONSENT_TIMESTAMP_KEY);
  } catch {
    // Silent fail
  }
}
