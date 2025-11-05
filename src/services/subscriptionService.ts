/**
 * Subscription Service
 * Handles all subscription-related API calls to Supabase
 */

import { supabase } from '@/integrations/supabase/client';
import type {
  UserSubscription,
  SubscriptionTier,
  SubscriptionCheck,
  LiveLessonBooking,
  AIUsageTracking,
  SubscriptionHistory,
  TierCode,
  SubscriptionActionResult,
  SubscriptionStatus,
  PaymentIntent,
} from '@/types/subscription';
import { SUBSCRIPTION_CONSTANTS } from '@/types/subscription';

export class SubscriptionService {
  /**
   * Get all available subscription tiers
   */
  static async getSubscriptionTiers(): Promise<SubscriptionTier[]> {
    const { data, error } = await supabase
      .from('subscription_tiers')
      .select('*')
      .eq('is_active', true)
      .order('monthly_price_try', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  }

  /**
   * Get user's current subscription
   */
  static async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // User doesn't have a subscription yet (should be created on signup)
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  }

  /**
   * Get comprehensive subscription check (for feature gating)
   */
  static async checkSubscription(userId: string): Promise<SubscriptionCheck> {
    // Get user subscription
    const subscription = await this.getUserSubscription(userId);

    if (!subscription) {
      // No subscription found - return free tier defaults
      return {
        isSubscribed: false,
        tier: 'free',
        status: 'expired',
        hasAccessToAI: false,
        hasAccessToLiveLessons: false,
        aiDailyLimit: SUBSCRIPTION_CONSTANTS.FREE_TIER_DAILY_AI_LIMIT,
        aiUsedToday: 0,
        aiRemainingToday: SUBSCRIPTION_CONSTANTS.FREE_TIER_DAILY_AI_LIMIT,
        liveLessonsRemaining: 0,
        isOnTrial: false,
        trialEndsAt: null,
        trialDaysRemaining: null,
        isGrandfathered: false,
        canUpgrade: true,
        suggestedUpgradeTier: 'ai_only',
      };
    }

    // Check if subscription is active or on trial
    const isActive = ['trial', 'active'].includes(subscription.status);

    // Calculate trial info
    const isOnTrial = subscription.status === 'trial';
    const trialEndsAt = subscription.trial_ends_at;
    let trialDaysRemaining: number | null = null;
    if (isOnTrial && trialEndsAt) {
      const now = new Date();
      const endsAt = new Date(trialEndsAt);
      trialDaysRemaining = Math.ceil((endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      trialDaysRemaining = Math.max(0, trialDaysRemaining);
    }

    // Determine access based on tier
    const hasAccessToAI =
      isActive && (subscription.tier_code === 'ai_only' || subscription.tier_code === 'ai_plus_live' || isOnTrial);
    const hasAccessToLiveLessons = isActive && subscription.tier_code === 'ai_plus_live';

    // Get AI usage for today (for free tier)
    let aiUsedToday = 0;
    let aiDailyLimit: number | null = null;
    let aiRemainingToday: number | null = null;

    if (subscription.tier_code === 'free' && !isOnTrial) {
      aiDailyLimit = SUBSCRIPTION_CONSTANTS.FREE_TIER_DAILY_AI_LIMIT;
      const usage = await this.getAIUsageToday(userId);
      aiUsedToday = usage?.interaction_count || 0;
      aiRemainingToday = Math.max(0, aiDailyLimit - aiUsedToday);
    } else if (hasAccessToAI) {
      // Unlimited AI for paid tiers and trial
      aiDailyLimit = null;
      aiRemainingToday = null;
    }

    // Suggested upgrade tier
    let suggestedUpgradeTier: TierCode | null = null;
    if (subscription.tier_code === 'free') {
      suggestedUpgradeTier = 'ai_only';
    } else if (subscription.tier_code === 'ai_only') {
      suggestedUpgradeTier = 'ai_plus_live';
    }

    return {
      isSubscribed: isActive,
      tier: subscription.tier_code,
      status: subscription.status,
      hasAccessToAI,
      hasAccessToLiveLessons,
      aiDailyLimit,
      aiUsedToday,
      aiRemainingToday,
      liveLessonsRemaining: subscription.live_lessons_remaining,
      isOnTrial,
      trialEndsAt,
      trialDaysRemaining,
      isGrandfathered: subscription.is_grandfathered,
      canUpgrade: subscription.tier_code !== 'ai_plus_live',
      suggestedUpgradeTier,
    };
  }

  /**
   * Track AI interaction (increment daily usage)
   */
  static async trackAIInteraction(userId: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const { error } = await supabase.rpc('increment_ai_usage', {
      p_user_id: userId,
      p_usage_date: today,
    });

    // If RPC doesn't exist, fallback to manual upsert
    if (error && error.code === '42883') {
      // Function doesn't exist
      const { data: existing } = await supabase
        .from('ai_usage_tracking')
        .select('*')
        .eq('user_id', userId)
        .eq('usage_date', today)
        .single();

      if (existing) {
        await supabase
          .from('ai_usage_tracking')
          .update({ interaction_count: existing.interaction_count + 1 })
          .eq('user_id', userId)
          .eq('usage_date', today);
      } else {
        await supabase.from('ai_usage_tracking').insert({
          user_id: userId,
          usage_date: today,
          interaction_count: 1,
        });
      }
    } else if (error) {
      throw error;
    }
  }

  /**
   * Get AI usage for today
   */
  static async getAIUsageToday(userId: string): Promise<AIUsageTracking | null> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const { data, error } = await supabase
      .from('ai_usage_tracking')
      .select('*')
      .eq('user_id', userId)
      .eq('usage_date', today)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data || null;
  }

  /**
   * Start free trial (manually, if needed)
   */
  static async startTrial(userId: string): Promise<SubscriptionActionResult> {
    const subscription = await this.getUserSubscription(userId);

    if (!subscription) {
      return {
        success: false,
        message: 'Subscription not found',
        error: 'NO_SUBSCRIPTION',
      };
    }

    if (subscription.is_trial_used) {
      return {
        success: false,
        message: 'Trial already used',
        error: 'TRIAL_ALREADY_USED',
      };
    }

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + SUBSCRIPTION_CONSTANTS.TRIAL_DURATION_DAYS);

    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'trial',
        trial_started_at: new Date().toISOString(),
        trial_ends_at: trialEndsAt.toISOString(),
        is_trial_used: true,
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: 'Failed to start trial',
        error: error.message,
      };
    }

    // Log history
    await this.logSubscriptionChange(userId, subscription.tier_code, subscription.tier_code, 'trial_start');

    return {
      success: true,
      message: 'Trial started successfully',
      subscription: data,
    };
  }

  /**
   * Upgrade subscription to a new tier
   */
  static async upgradeTier(
    userId: string,
    newTierCode: TierCode,
    paymentIntentId?: string
  ): Promise<SubscriptionActionResult> {
    const subscription = await this.getUserSubscription(userId);

    if (!subscription) {
      return {
        success: false,
        message: 'Subscription not found',
        error: 'NO_SUBSCRIPTION',
      };
    }

    const oldTier = subscription.tier_code;

    // Calculate new period
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setDate(periodEnd.getDate() + 30); // Default 30-day period

    // Reset live lessons if upgrading to ai_plus_live
    const liveLessonsRemaining =
      newTierCode === 'ai_plus_live' ? SUBSCRIPTION_CONSTANTS.AI_PLUS_LIVE_MONTHLY_LESSONS : 0;
    const liveLessonsResetDate = newTierCode === 'ai_plus_live' ? periodEnd.toISOString() : null;

    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        tier_code: newTierCode,
        status: 'active',
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
        live_lessons_remaining: liveLessonsRemaining,
        live_lessons_reset_date: liveLessonsResetDate,
        payment_subscription_id: paymentIntentId || subscription.payment_subscription_id,
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: 'Failed to upgrade subscription',
        error: error.message,
      };
    }

    // Log history
    await this.logSubscriptionChange(userId, oldTier, newTierCode, 'upgrade');

    return {
      success: true,
      message: `Successfully upgraded to ${newTierCode}`,
      subscription: data,
    };
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(userId: string): Promise<SubscriptionActionResult> {
    const subscription = await this.getUserSubscription(userId);

    if (!subscription) {
      return {
        success: false,
        message: 'Subscription not found',
        error: 'NO_SUBSCRIPTION',
      };
    }

    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'cancelled',
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: 'Failed to cancel subscription',
        error: error.message,
      };
    }

    // Log history
    await this.logSubscriptionChange(userId, subscription.tier_code, 'free', 'cancellation');

    return {
      success: true,
      message: 'Subscription cancelled',
      subscription: data,
    };
  }

  /**
   * Book a live lesson
   */
  static async bookLiveLesson(userId: string, meetingId: string): Promise<SubscriptionActionResult> {
    // Check subscription
    const check = await this.checkSubscription(userId);

    if (!check.hasAccessToLiveLessons) {
      return {
        success: false,
        message: 'You need the AI + Live Lessons plan to book live classes',
        error: 'NO_ACCESS_TO_LIVE_LESSONS',
      };
    }

    if (check.liveLessonsRemaining <= 0) {
      return {
        success: false,
        message: 'No live lesson credits remaining this month',
        error: 'NO_CREDITS_REMAINING',
      };
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('live_lesson_bookings')
      .insert({
        user_id: userId,
        meeting_id: meetingId,
        status: 'booked',
        credits_used: 1,
      })
      .select()
      .single();

    if (bookingError) {
      return {
        success: false,
        message: 'Failed to book lesson',
        error: bookingError.message,
      };
    }

    // Decrement live lessons remaining
    const subscription = await this.getUserSubscription(userId);
    if (subscription) {
      await supabase
        .from('user_subscriptions')
        .update({
          live_lessons_remaining: subscription.live_lessons_remaining - 1,
        })
        .eq('user_id', userId);
    }

    return {
      success: true,
      message: 'Live lesson booked successfully',
    };
  }

  /**
   * Cancel a live lesson booking
   */
  static async cancelLessonBooking(userId: string, bookingId: string): Promise<SubscriptionActionResult> {
    // Update booking status
    const { error: bookingError } = await supabase
      .from('live_lesson_bookings')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', bookingId)
      .eq('user_id', userId);

    if (bookingError) {
      return {
        success: false,
        message: 'Failed to cancel booking',
        error: bookingError.message,
      };
    }

    // Refund credit
    const subscription = await this.getUserSubscription(userId);
    if (subscription) {
      await supabase
        .from('user_subscriptions')
        .update({
          live_lessons_remaining: subscription.live_lessons_remaining + 1,
        })
        .eq('user_id', userId);
    }

    return {
      success: true,
      message: 'Booking cancelled and credit refunded',
    };
  }

  /**
   * Get user's live lesson bookings
   */
  static async getUserBookings(userId: string): Promise<LiveLessonBooking[]> {
    const { data, error } = await supabase
      .from('live_lesson_bookings')
      .select('*')
      .eq('user_id', userId)
      .order('booking_date', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  /**
   * Get subscription history
   */
  static async getSubscriptionHistory(userId: string): Promise<SubscriptionHistory[]> {
    const { data, error } = await supabase
      .from('subscription_history')
      .select('*')
      .eq('user_id', userId)
      .order('changed_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  /**
   * Log subscription tier change
   */
  private static async logSubscriptionChange(
    userId: string,
    fromTier: TierCode | null,
    toTier: TierCode,
    reason: string
  ): Promise<void> {
    await supabase.from('subscription_history').insert({
      user_id: userId,
      from_tier: fromTier,
      to_tier: toTier,
      change_reason: reason,
    });
  }

  /**
   * Create payment intent (placeholder for Iyzico/Stripe integration)
   */
  static async createPaymentIntent(userId: string, intent: PaymentIntent): Promise<{ checkoutUrl: string }> {
    // TODO: Implement actual Iyzico or Stripe payment integration
    // This is a placeholder that returns a mock URL

    // In production, this would:
    // 1. Call Iyzico API to create payment session
    // 2. Return the checkout URL
    // 3. Handle webhooks to update subscription status

    return {
      checkoutUrl: `/payment/checkout?tier=${intent.tier_code}&cycle=${intent.billing_cycle}`,
    };
  }

  /**
   * Grandfather existing users (1 month free AI access)
   */
  static async grandfatherUser(userId: string): Promise<SubscriptionActionResult> {
    const subscription = await this.getUserSubscription(userId);

    if (!subscription) {
      return {
        success: false,
        message: 'Subscription not found',
        error: 'NO_SUBSCRIPTION',
      };
    }

    const grandfatheredUntil = new Date();
    grandfatheredUntil.setDate(grandfatheredUntil.getDate() + 30); // 1 month

    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        tier_code: 'ai_only',
        status: 'active',
        is_grandfathered: true,
        grandfathered_until: grandfatheredUntil.toISOString(),
        current_period_start: new Date().toISOString(),
        current_period_end: grandfatheredUntil.toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: 'Failed to grandfather user',
        error: error.message,
      };
    }

    // Log history
    await this.logSubscriptionChange(userId, subscription.tier_code, 'ai_only', 'grandfathered');

    return {
      success: true,
      message: 'User grandfathered with 1 month free AI access',
      subscription: data,
    };
  }
}
