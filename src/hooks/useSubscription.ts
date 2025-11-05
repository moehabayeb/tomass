/**
 * useSubscription Hook
 * Provides subscription state and actions throughout the app
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuthReady } from './useAuthReady';
import { SubscriptionService } from '@/services/subscriptionService';
import type {
  UserSubscription,
  SubscriptionCheck,
  SubscriptionTier,
  TierCode,
} from '@/types/subscription';

interface UseSubscriptionReturn {
  // Subscription data
  subscription: UserSubscription | null;
  subscriptionCheck: SubscriptionCheck | null;
  tiers: SubscriptionTier[];

  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;

  // Convenience flags
  isSubscribed: boolean;
  hasAccessToAI: boolean;
  hasAccessToLiveLessons: boolean;
  isOnTrial: boolean;
  trialDaysRemaining: number | null;
  canUpgrade: boolean;
  currentTier: TierCode;

  // AI usage tracking
  aiUsedToday: number;
  aiRemainingToday: number | null; // null = unlimited
  aiDailyLimit: number | null; // null = unlimited

  // Live lessons
  liveLessonsRemaining: number;

  // Actions
  refreshSubscription: () => Promise<void>;
  trackAIUsage: () => Promise<void>;
  upgradeTier: (tierCode: TierCode, paymentIntentId?: string) => Promise<boolean>;
  startTrial: () => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  bookLiveLesson: (meetingId: string) => Promise<boolean>;
  cancelLessonBooking: (bookingId: string) => Promise<boolean>;

  // Error handling
  error: string | null;
}

export const useSubscription = (): UseSubscriptionReturn => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthReady();

  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [subscriptionCheck, setSubscriptionCheck] = useState<SubscriptionCheck | null>(null);
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscription data
  const fetchSubscriptionData = useCallback(async () => {
    if (!user?.id || !isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setError(null);

      // Fetch all subscription data in parallel
      const [subscriptionData, checkData, tiersData] = await Promise.all([
        SubscriptionService.getUserSubscription(user.id),
        SubscriptionService.checkSubscription(user.id),
        SubscriptionService.getSubscriptionTiers(),
      ]);

      setSubscription(subscriptionData);
      setSubscriptionCheck(checkData);
      setTiers(tiersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isAuthenticated]);

  // Refresh subscription data
  const refreshSubscription = useCallback(async () => {
    if (!user?.id || !isAuthenticated) {
      return;
    }

    try {
      setIsRefreshing(true);
      setError(null);

      const [subscriptionData, checkData] = await Promise.all([
        SubscriptionService.getUserSubscription(user.id),
        SubscriptionService.checkSubscription(user.id),
      ]);

      setSubscription(subscriptionData);
      setSubscriptionCheck(checkData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh subscription');
    } finally {
      setIsRefreshing(false);
    }
  }, [user?.id, isAuthenticated]);

  // Track AI usage
  const trackAIUsage = useCallback(async () => {
    if (!user?.id) return;

    try {
      await SubscriptionService.trackAIInteraction(user.id);
      // Refresh check to update AI usage counters
      await refreshSubscription();
    } catch (err) {
      // Silent fail - don't block user interaction
    }
  }, [user?.id, refreshSubscription]);

  // Upgrade tier
  const upgradeTier = useCallback(
    async (tierCode: TierCode, paymentIntentId?: string): Promise<boolean> => {
      if (!user?.id) return false;

      try {
        setError(null);
        const result = await SubscriptionService.upgradeTier(user.id, tierCode, paymentIntentId);

        if (result.success) {
          await refreshSubscription();
          return true;
        } else {
          setError(result.message);
          return false;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upgrade subscription');
        return false;
      }
    },
    [user?.id, refreshSubscription]
  );

  // Start trial
  const startTrial = useCallback(async (): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      setError(null);
      const result = await SubscriptionService.startTrial(user.id);

      if (result.success) {
        await refreshSubscription();
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start trial');
      return false;
    }
  }, [user?.id, refreshSubscription]);

  // Cancel subscription
  const cancelSubscription = useCallback(async (): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      setError(null);
      const result = await SubscriptionService.cancelSubscription(user.id);

      if (result.success) {
        await refreshSubscription();
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      return false;
    }
  }, [user?.id, refreshSubscription]);

  // Book live lesson
  const bookLiveLesson = useCallback(
    async (meetingId: string): Promise<boolean> => {
      if (!user?.id) return false;

      try {
        setError(null);
        const result = await SubscriptionService.bookLiveLesson(user.id, meetingId);

        if (result.success) {
          await refreshSubscription();
          return true;
        } else {
          setError(result.message);
          return false;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to book live lesson');
        return false;
      }
    },
    [user?.id, refreshSubscription]
  );

  // Cancel lesson booking
  const cancelLessonBooking = useCallback(
    async (bookingId: string): Promise<boolean> => {
      if (!user?.id) return false;

      try {
        setError(null);
        const result = await SubscriptionService.cancelLessonBooking(user.id, bookingId);

        if (result.success) {
          await refreshSubscription();
          return true;
        } else {
          setError(result.message);
          return false;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to cancel booking');
        return false;
      }
    },
    [user?.id, refreshSubscription]
  );

  // Initial load
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchSubscriptionData();
    } else {
      setIsLoading(false);
    }
  }, [authLoading, isAuthenticated, fetchSubscriptionData]);

  // Convenience flags
  const isSubscribed = subscriptionCheck?.isSubscribed || false;
  const hasAccessToAI = subscriptionCheck?.hasAccessToAI || false;
  const hasAccessToLiveLessons = subscriptionCheck?.hasAccessToLiveLessons || false;
  const isOnTrial = subscriptionCheck?.isOnTrial || false;
  const trialDaysRemaining = subscriptionCheck?.trialDaysRemaining || null;
  const canUpgrade = subscriptionCheck?.canUpgrade || false;
  const currentTier = subscriptionCheck?.tier || 'free';
  const aiUsedToday = subscriptionCheck?.aiUsedToday || 0;
  const aiRemainingToday = subscriptionCheck?.aiRemainingToday || null;
  const aiDailyLimit = subscriptionCheck?.aiDailyLimit || null;
  const liveLessonsRemaining = subscriptionCheck?.liveLessonsRemaining || 0;

  return {
    subscription,
    subscriptionCheck,
    tiers,
    isLoading: isLoading || authLoading,
    isRefreshing,
    isSubscribed,
    hasAccessToAI,
    hasAccessToLiveLessons,
    isOnTrial,
    trialDaysRemaining,
    canUpgrade,
    currentTier,
    aiUsedToday,
    aiRemainingToday,
    aiDailyLimit,
    liveLessonsRemaining,
    refreshSubscription,
    trackAIUsage,
    upgradeTier,
    startTrial,
    cancelSubscription,
    bookLiveLesson,
    cancelLessonBooking,
    error,
  };
};
