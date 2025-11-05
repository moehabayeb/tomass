/**
 * Subscription Badge
 * Shows user's current subscription tier and trial status
 */

import { Crown, Zap, Sparkles, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const SubscriptionBadge = () => {
  const navigate = useNavigate();
  const { currentTier, isOnTrial, trialDaysRemaining } = useSubscription();

  const getTierConfig = () => {
    switch (currentTier) {
      case 'free':
        return {
          icon: <Sparkles className="w-3 h-3" />,
          label: 'Free',
          className: 'bg-slate-500 hover:bg-slate-600 text-white',
        };
      case 'ai_only':
        return {
          icon: <Zap className="w-3 h-3" />,
          label: 'AI-Only',
          className: 'bg-blue-500 hover:bg-blue-600 text-white',
        };
      case 'ai_plus_live':
        return {
          icon: <Crown className="w-3 h-3" />,
          label: 'AI + Live',
          className: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
        };
    }
  };

  const config = getTierConfig();

  return (
    <div className="flex items-center gap-2">
      <Badge
        className={`${config.className} cursor-pointer transition-all`}
        onClick={() => navigate('/pricing')}
      >
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </Badge>

      {isOnTrial && trialDaysRemaining !== null && (
        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
          <Clock className="w-3 h-3 mr-1" />
          {trialDaysRemaining}d trial
        </Badge>
      )}
    </div>
  );
};

/**
 * Subscription Status Card
 * Detailed subscription info for Profile page
 */
export const SubscriptionStatusCard = () => {
  const navigate = useNavigate();
  const {
    subscription,
    currentTier,
    isOnTrial,
    trialDaysRemaining,
    isGrandfathered,
    liveLessonsRemaining,
    aiDailyLimit,
    aiRemainingToday,
    hasAccessToLiveLessons,
    canUpgrade,
  } = useSubscription();

  if (!subscription) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Loading subscription info...</p>
      </Card>
    );
  }

  const getTierName = () => {
    switch (currentTier) {
      case 'free':
        return 'Free Plan';
      case 'ai_only':
        return 'AI-Only Plan';
      case 'ai_plus_live':
        return 'AI + Live Lessons Plan';
    }
  };

  const getTierIcon = () => {
    switch (currentTier) {
      case 'free':
        return <Sparkles className="w-8 h-8 text-slate-500" />;
      case 'ai_only':
        return <Zap className="w-8 h-8 text-blue-500" />;
      case 'ai_plus_live':
        return <Crown className="w-8 h-8 text-purple-500" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {getTierIcon()}
          <div>
            <h3 className="text-xl font-bold">{getTierName()}</h3>
            <p className="text-sm text-muted-foreground">
              {isOnTrial && 'Free Trial Active'}
              {!isOnTrial && isGrandfathered && 'Grandfathered Access'}
              {!isOnTrial && !isGrandfathered && subscription.status}
            </p>
          </div>
        </div>

        {canUpgrade && (
          <Button variant="outline" size="sm" onClick={() => navigate('/pricing')}>
            <Crown className="w-4 h-4 mr-2" />
            Upgrade
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Trial Info */}
        {isOnTrial && trialDaysRemaining !== null && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-700 dark:text-green-400">
                Trial Active
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining
            </p>
          </div>
        )}

        {/* AI Usage (Free tier only) */}
        {currentTier === 'free' && aiDailyLimit !== null && !isOnTrial && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Daily AI Usage</span>
              <span className="text-sm font-bold">
                {aiRemainingToday} / {aiDailyLimit} left
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{
                  width: `${aiDailyLimit > 0 ? ((aiDailyLimit - (aiRemainingToday || 0)) / aiDailyLimit) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Live Lessons Credits */}
        {hasAccessToLiveLessons && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Live Lessons This Month</span>
              <span className="text-sm font-bold">{liveLessonsRemaining} / 16 left</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${((16 - liveLessonsRemaining) / 16) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Subscription Period */}
        {subscription.current_period_end && (
          <div className="text-sm text-muted-foreground">
            {subscription.status === 'active' && (
              <p>
                Next billing date:{' '}
                {new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-2">
        <Button variant="outline" onClick={() => navigate('/pricing')} className="flex-1">
          View All Plans
        </Button>
        {subscription.status === 'active' && !isOnTrial && (
          <Button variant="ghost" className="flex-1">
            Manage Subscription
          </Button>
        )}
      </div>
    </Card>
  );
};
