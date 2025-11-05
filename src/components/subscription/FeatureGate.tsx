/**
 * Feature Gate Component
 * Blocks access to features based on subscription tier
 */

import { ReactNode } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Crown, Lock, Zap } from 'lucide-react';
import { useState } from 'react';

interface FeatureGateProps {
  children: ReactNode;
  feature: 'ai' | 'live_lessons';
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

export const FeatureGate = ({ children, feature, fallback, showUpgradePrompt = true }: FeatureGateProps) => {
  const navigate = useNavigate();
  const {
    hasAccessToAI,
    hasAccessToLiveLessons,
    currentTier,
    aiRemainingToday,
    aiDailyLimit,
    isLoading,
  } = useSubscription();

  const [showDialog, setShowDialog] = useState(false);

  // Check access based on feature
  const hasAccess = feature === 'ai' ? hasAccessToAI : hasAccessToLiveLessons;

  // For AI feature, also check daily limit for free tier
  const isAILimitReached = feature === 'ai' && aiDailyLimit !== null && aiRemainingToday !== null && aiRemainingToday <= 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user has access and no limits reached, show the feature
  if (hasAccess && !isAILimitReached) {
    return <>{children}</>;
  }

  // If fallback provided, show it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Show upgrade prompt dialog
  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  const getUpgradeMessage = () => {
    if (feature === 'ai') {
      if (isAILimitReached) {
        return {
          title: 'Daily AI Limit Reached',
          description: `You've used all ${aiDailyLimit} AI interactions for today. Upgrade to AI-Only or AI + Live Lessons for unlimited access.`,
          icon: <Zap className="w-12 h-12 text-yellow-500" />,
        };
      }
      return {
        title: 'Unlock Unlimited AI Practice',
        description: 'Upgrade to AI-Only or AI + Live Lessons to get unlimited AI-powered speaking practice.',
        icon: <Zap className="w-12 h-12 text-blue-500" />,
      };
    } else {
      return {
        title: 'Unlock Live Lessons',
        description: 'Upgrade to AI + Live Lessons plan to book live online classes with native English teachers.',
        icon: <Crown className="w-12 h-12 text-purple-500" />,
      };
    }
  };

  const message = getUpgradeMessage();

  if (!showUpgradePrompt) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
        <Lock className="w-16 h-16 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Feature Locked</h3>
        <p className="text-muted-foreground max-w-md">
          This feature requires a subscription upgrade.
        </p>
        <Button onClick={handleUpgradeClick}>
          View Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      {message.icon}
      <h3 className="text-xl font-semibold">{message.title}</h3>
      <p className="text-muted-foreground max-w-md">{message.description}</p>
      <Button onClick={handleUpgradeClick} size="lg" className="mt-4">
        <Crown className="w-4 h-4 mr-2" />
        View Upgrade Options
      </Button>
    </div>
  );
};

/**
 * AI Usage Indicator Component
 * Shows AI usage progress for free tier users
 */
export const AIUsageIndicator = () => {
  const { aiUsedToday, aiDailyLimit, aiRemainingToday, currentTier } = useSubscription();
  const navigate = useNavigate();

  // Only show for free tier users
  if (currentTier !== 'free' || aiDailyLimit === null) {
    return null;
  }

  const percentage = aiDailyLimit > 0 ? (aiUsedToday / aiDailyLimit) * 100 : 0;
  const isLow = aiRemainingToday !== null && aiRemainingToday <= 3;
  const isOut = aiRemainingToday === 0;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Daily AI Usage</span>
        <span className={`text-sm font-bold ${isOut ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-green-400'}`}>
          {aiUsedToday} / {aiDailyLimit}
        </span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all ${
            isOut ? 'bg-red-500' : isLow ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isLow && !isOut && (
        <p className="text-xs text-yellow-400">
          Only {aiRemainingToday} interactions left today
        </p>
      )}

      {isOut && (
        <div className="mt-2">
          <p className="text-xs text-red-400 mb-2">Daily limit reached!</p>
          <Button size="sm" variant="outline" onClick={() => navigate('/pricing')} className="w-full">
            Upgrade for Unlimited Access
          </Button>
        </div>
      )}
    </div>
  );
};
