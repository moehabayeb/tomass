/**
 * Analytics Consent Manager
 * Manages user consent for analytics tracking (GDPR & ATT compliance)
 */

const CONSENT_KEY = 'analytics_consent';
const CONSENT_TIMESTAMP_KEY = 'analytics_consent_timestamp';

export interface ConsentState {
  analytics: boolean;
  errorTracking: boolean;
  timestamp: number;
}

/**
 * Check if user has given consent
 */
export function hasConsent(): boolean {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    return consent === 'granted';
  } catch {
    return false;
  }
}

/**
 * Check if consent dialog needs to be shown
 */
export function needsConsentDialog(): boolean {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    // Show dialog if no decision has been made
    return consent === null;
  } catch {
    return true;
  }
}

/**
 * Grant analytics consent
 */
export function grantConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, 'granted');
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString());
  } catch {
    // Silent fail for localStorage errors
  }
}

/**
 * Deny analytics consent
 */
export function denyConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, 'denied');
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString());
  } catch {
    // Silent fail for localStorage errors
  }
}

/**
 * Revoke consent (for settings page)
 */
export function revokeConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
  } catch {
    // Silent fail for localStorage errors
  }
}

/**
 * Get detailed consent state
 */
export function getConsentState(): ConsentState | null {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    const timestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);

    if (!consent) return null;

    return {
      analytics: consent === 'granted',
      errorTracking: consent === 'granted',
      timestamp: timestamp ? parseInt(timestamp, 10) : 0,
    };
  } catch {
    return null;
  }
}
