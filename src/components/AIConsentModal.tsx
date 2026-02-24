/**
 * AI Data Processing Consent Modal
 * Shown before first AI interaction (speaking practice / transcription)
 * Apple Guidelines 5.1.1 & 5.1.2 compliance
 */

import { Brain, Shield, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { grantAIConsent, denyAIConsent } from '@/lib/aiConsent';

interface AIConsentModalProps {
  isOpen: boolean;
  onConsent: (granted: boolean) => void;
}

export function AIConsentModal({ isOpen, onConsent }: AIConsentModalProps) {
  const handleAccept = () => {
    grantAIConsent();
    onConsent(true);
  };

  const handleDecline = () => {
    denyAIConsent();
    onConsent(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Powered Learning
          </DialogTitle>
          <DialogDescription>
            Your speaking practice is powered by AI technology
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To provide real-time feedback on your English speaking, we use OpenAI's
            language technology to process your responses.
          </p>

          <div className="bg-muted/50 rounded-lg p-3 space-y-3">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">What is processed by OpenAI:</p>
                <ul className="text-muted-foreground mt-1 space-y-1">
                  <li>- Your transcribed speech responses (text only)</li>
                  <li>- Your English proficiency level</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">What is NOT sent:</p>
                <ul className="text-muted-foreground mt-1 space-y-1">
                  <li>- Your email, name, or account info</li>
                  <li>- Audio recordings (only text transcripts)</li>
                </ul>
              </div>
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
              Accept & Continue
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Read our{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            {' '}for full details. You can change this in Settings anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
