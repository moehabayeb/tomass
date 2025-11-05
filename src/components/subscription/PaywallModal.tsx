/**
 * Paywall Modal
 * Shows upgrade prompts when users hit feature limits
 */

import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Users, Check, Sparkles } from 'lucide-react';
import { PRICING_CONFIG, type TierCode } from '@/types/subscription';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: 'ai_limit' | 'no_ai_access' | 'no_live_lessons' | 'no_credits';
  currentTier?: TierCode;
}

export const PaywallModal = ({ isOpen, onClose, reason, currentTier = 'free' }: PaywallModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate('/pricing');
  };

  const getContent = () => {
    switch (reason) {
      case 'ai_limit':
        return {
          icon: <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-4" />,
          title: 'Daily AI Limit Reached',
          description: "You've used all your AI interactions for today. Upgrade for unlimited access!",
          suggestedTier: 'ai_only' as TierCode,
          benefits: [
            'Unlimited AI practice sessions',
            'No daily limits',
            'Practice anytime, anywhere',
            'Advanced speech analysis',
          ],
        };

      case 'no_ai_access':
        return {
          icon: <Zap className="w-16 h-16 text-blue-500 mx-auto mb-4" />,
          title: 'Unlock AI Speaking Practice',
          description: 'Get unlimited AI-powered conversations to improve your English speaking skills.',
          suggestedTier: 'ai_only' as TierCode,
          benefits: [
            'Unlimited AI conversations',
            'Real-time feedback',
            'Personalized learning path',
            'Track your progress',
          ],
        };

      case 'no_live_lessons':
        return {
          icon: <Users className="w-16 h-16 text-purple-500 mx-auto mb-4" />,
          title: 'Unlock Live Lessons',
          description: 'Join live classes with native English teachers for personalized instruction.',
          suggestedTier: 'ai_plus_live' as TierCode,
          benefits: [
            '16 live classes per month',
            'Native English teachers',
            'Small group sessions',
            'Flexible scheduling',
            'Unlimited AI practice included',
          ],
        };

      case 'no_credits':
        return {
          icon: <Crown className="w-16 h-16 text-orange-500 mx-auto mb-4" />,
          title: 'No Live Lesson Credits',
          description: "You've used all your live lesson credits for this month. They'll reset on your renewal date.",
          suggestedTier: currentTier === 'ai_plus_live' ? null : ('ai_plus_live' as TierCode),
          benefits: [],
        };

      default:
        return {
          icon: <Sparkles className="w-16 h-16 text-indigo-500 mx-auto mb-4" />,
          title: 'Upgrade Your Plan',
          description: 'Unlock more features and accelerate your English learning journey.',
          suggestedTier: 'ai_only' as TierCode,
          benefits: [],
        };
    }
  };

  const content = getContent();
  const suggestedPlan = content.suggestedTier ? PRICING_CONFIG[content.suggestedTier] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          {content.icon}
          <DialogTitle className="text-2xl text-center">{content.title}</DialogTitle>
          <DialogDescription className="text-center text-base">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        {content.benefits.length > 0 && (
          <div className="space-y-3 my-4">
            {content.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        )}

        {suggestedPlan && (
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">{suggestedPlan.name}</span>
              <span className="text-2xl font-bold">₺{suggestedPlan.monthlyPrice}/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Start with a 7-day free trial
            </p>
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button onClick={handleUpgrade} size="lg" className="w-full">
            {reason === 'no_credits' && currentTier === 'ai_plus_live' ? 'View My Plan' : 'View Pricing Plans'}
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Trial Expiring Banner
 * Shows when trial is about to expire
 */
interface TrialExpiringBannerProps {
  daysRemaining: number;
  onUpgradeClick: () => void;
  onDismiss?: () => void;
}

export const TrialExpiringBanner = ({ daysRemaining, onUpgradeClick, onDismiss }: TrialExpiringBannerProps) => {
  if (daysRemaining > 3) {
    return null; // Only show when 3 or fewer days remaining
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <div>
            <p className="font-semibold">
              {daysRemaining === 0
                ? 'Your trial ends today!'
                : `Only ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left in your trial`}
            </p>
            <p className="text-sm opacity-90">
              Upgrade now to keep unlimited access
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onUpgradeClick}>
            Upgrade Now
          </Button>
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss} className="text-white hover:bg-white/20">
              ✕
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
