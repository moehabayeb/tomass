/**
 * Analytics Consent Banner
 * GDPR and ATT compliant consent dialog
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, BarChart3 } from 'lucide-react';
import { needsConsentDialog, grantConsent, denyConsent } from '@/lib/analyticsConsent';
import { initAmplitude } from '@/lib/amplitude';
import { initSentry } from '@/lib/sentry';

interface ConsentBannerProps {
  onConsentGiven?: () => void;
}

export function ConsentBanner({ onConsentGiven }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if we need to show the consent dialog
    if (needsConsentDialog()) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    grantConsent();
    // Initialize analytics after consent
    initSentry();
    initAmplitude();
    setShowBanner(false);
    onConsentGiven?.();
  };

  const handleDecline = () => {
    denyConsent();
    setShowBanner(false);
    onConsentGiven?.();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Your Privacy Matters</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            We use analytics to improve your learning experience and fix bugs.
            This data helps us understand how you use the app and make it better.
          </p>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg mb-4">
            <BarChart3 className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">What we collect:</p>
              <ul className="text-muted-foreground mt-1 space-y-1">
                <li>App usage and feature interactions</li>
                <li>Error reports to fix crashes</li>
                <li>No personal data or lesson content</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              className="flex-1"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            You can change this in Settings anytime
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
