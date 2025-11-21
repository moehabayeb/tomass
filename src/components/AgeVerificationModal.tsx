/**
 * Age Verification Modal
 * COPPA Compliance - Required for Apple App Store
 * Verifies user is 13 years or older before using the app
 */

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle } from 'lucide-react';

const AGE_VERIFICATION_KEY = 'tomass_age_verified';

export function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    try {
      const verified = localStorage.getItem(AGE_VERIFICATION_KEY);
      if (!verified) {
        setIsOpen(true);
      }
    } catch {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
      // Show verification anyway if localStorage fails
      setIsOpen(true);
    }
  }, []);

  const handleConfirmAge = () => {
    try {
      localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
    } catch {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
    }
    setIsOpen(false);
  };

  const handleUnderAge = () => {
    setShowBlocked(true);
  };

  if (showBlocked) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md bg-gradient-to-b from-slate-900 to-slate-800 border-red-500/30">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <DialogTitle className="text-xl text-white">Age Requirement Not Met</DialogTitle>
            </div>
            <DialogDescription className="text-slate-300">
              We're sorry, but Tomas English is designed for users aged 13 and older.
              This is to comply with children's privacy protection laws (COPPA).
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-slate-300">
              If you believe this is an error, please ask a parent or guardian to contact us at{' '}
              <a href="mailto:support@tomashoca.com" className="text-blue-400 hover:underline">
                support@tomashoca.com
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-slate-900 to-slate-800 border-white/10" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <DialogTitle className="text-xl text-white">Age Verification</DialogTitle>
          </div>
          <DialogDescription className="text-slate-300">
            To use Tomas English, you must confirm that you are 13 years of age or older.
            This is required to comply with privacy regulations.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-3">
          <Button
            onClick={handleConfirmAge}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3"
          >
            Yes, I am 13 or older
          </Button>

          <Button
            onClick={handleUnderAge}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            No, I am under 13
          </Button>
        </div>

        <p className="mt-4 text-xs text-slate-500 text-center">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
        </p>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook to check if age verification is complete
 */
export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const verified = localStorage.getItem(AGE_VERIFICATION_KEY);
      setIsVerified(!!verified);
    } catch {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
      setIsVerified(false);
    }
  }, []);

  return isVerified;
}

/**
 * Reset age verification (for testing or account reset)
 */
export function resetAgeVerification() {
  try {
    localStorage.removeItem(AGE_VERIFICATION_KEY);
  } catch {
    // Apple Store Compliance: Silent fail - Safari Private Mode support
  }
}
