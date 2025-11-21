/**
 * Waitlist Modal Component
 * Collects email addresses for subscription launch notifications
 * App Store Compliant - no misleading purchase flows
 */

import { useState } from 'react';
import { Mail, Bell, CheckCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TierCode, PRICING_CONFIG } from '@/types/subscription';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierCode: TierCode;
  userEmail?: string;
}

export function WaitlistModal({ isOpen, onClose, tierCode, userEmail }: WaitlistModalProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState(userEmail || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tierConfig = PRICING_CONFIG[tierCode];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in Supabase waitlist table
      const { error } = await supabase
        .from('waitlist_signups')
        .upsert({
          email: email.toLowerCase().trim(),
          tier_interested: tierCode,
          source: 'pricing_page',
          created_at: new Date().toISOString(),
        }, {
          onConflict: 'email',
        });

      if (error) {
        // If table doesn't exist, store in localStorage as fallback
        if (error.code === '42P01') {
          const existing = JSON.parse(localStorage.getItem('waitlist_signups') || '[]');
          existing.push({
            email: email.toLowerCase().trim(),
            tier_interested: tierCode,
            created_at: new Date().toISOString(),
          });
          localStorage.setItem('waitlist_signups', JSON.stringify(existing));
        } else {
          throw error;
        }
      }

      setIsSuccess(true);
      toast({
        title: 'You\'re on the list!',
        description: 'We\'ll notify you when premium subscriptions launch.',
      });

      // Reset after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
        onClose();
      }, 2000);

    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Get Notified When We Launch
          </DialogTitle>
          <DialogDescription>
            {tierCode === 'free'
              ? 'Join our waitlist to be notified when premium features launch.'
              : `Be the first to know when ${tierConfig.name} becomes available.`}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg font-medium text-center">You're on the list!</p>
            <p className="text-sm text-muted-foreground text-center mt-1">
              We'll email you when subscriptions launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                <strong>What you'll get:</strong>
              </p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Early access to premium features</li>
                <li>• Exclusive launch discount</li>
                <li>• No spam, unsubscribe anytime</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Maybe Later
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
