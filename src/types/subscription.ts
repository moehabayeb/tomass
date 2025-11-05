/**
 * Subscription System Types
 * Defines TypeScript interfaces for the 3-tier subscription system
 */

export type TierCode = 'free' | 'ai_only' | 'ai_plus_live';

export type SubscriptionStatus = 'trial' | 'active' | 'cancelled' | 'expired' | 'past_due';

export type PaymentProvider = 'iyzico' | 'stripe' | 'google_play' | 'apple_pay';

export type BookingStatus = 'booked' | 'attended' | 'missed' | 'cancelled';

export type SubscriptionChangeReason =
  | 'upgrade'
  | 'downgrade'
  | 'trial_start'
  | 'trial_end'
  | 'cancellation'
  | 'renewal'
  | 'grandfathered';

export interface SubscriptionTierFeatures {
  ai_unlimited: boolean;
  daily_ai_limit: number | null; // null means unlimited
  live_lessons: number; // Number of live lessons per month
  trial_eligible: boolean;
}

export interface SubscriptionTier {
  id: string;
  tier_code: TierCode;
  tier_name: string;
  monthly_price_try: number; // Price in kuruş (Turkish currency subunit)
  quarterly_price_try: number; // 3-month price in kuruş
  annual_price_try: number; // Annual price in kuruş
  features: SubscriptionTierFeatures;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  tier_code: TierCode;
  status: SubscriptionStatus;

  // Trial management
  trial_started_at: string | null;
  trial_ends_at: string | null;
  is_trial_used: boolean;

  // Subscription period
  current_period_start: string | null;
  current_period_end: string | null;

  // Grandfathering
  is_grandfathered: boolean;
  grandfathered_until: string | null;

  // Payment integration
  payment_provider: PaymentProvider | null;
  payment_customer_id: string | null;
  payment_subscription_id: string | null;

  // Live lesson credits
  live_lessons_remaining: number;
  live_lessons_reset_date: string | null;

  // Metadata
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface LiveLessonBooking {
  id: string;
  user_id: string;
  meeting_id: string;
  booking_date: string;
  status: BookingStatus;
  credits_used: number;
  attended_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AIUsageTracking {
  id: string;
  user_id: string;
  usage_date: string; // Date in YYYY-MM-DD format
  interaction_count: number;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionHistory {
  id: string;
  user_id: string;
  from_tier: TierCode | null;
  to_tier: TierCode;
  change_reason: SubscriptionChangeReason;
  changed_at: string;
  metadata: Record<string, any>;
}

// Pricing Display Types (for UI)
export interface PricingTier {
  code: TierCode;
  name: string;
  monthlyPrice: number; // In Turkish Lira (TL), not kuruş
  quarterlyPrice: number; // Total for 3 months
  quarterlyMonthlyEquivalent: number; // Monthly equivalent of quarterly price
  savings: number; // How much saved with quarterly vs 3x monthly
  features: string[]; // Human-readable feature list
  isPopular?: boolean;
  cta: string; // Call-to-action text
}

// Subscription Check Result (for feature gating)
export interface SubscriptionCheck {
  isSubscribed: boolean;
  tier: TierCode;
  status: SubscriptionStatus;
  hasAccessToAI: boolean;
  hasAccessToLiveLessons: boolean;
  aiDailyLimit: number | null; // null = unlimited
  aiUsedToday: number;
  aiRemainingToday: number | null; // null = unlimited
  liveLessonsRemaining: number;
  isOnTrial: boolean;
  trialEndsAt: string | null;
  trialDaysRemaining: number | null;
  isGrandfathered: boolean;
  canUpgrade: boolean;
  suggestedUpgradeTier: TierCode | null;
}

// Payment Intent (for Iyzico/Stripe integration)
export interface PaymentIntent {
  provider: PaymentProvider;
  tier_code: TierCode;
  billing_cycle: 'monthly' | 'quarterly' | 'annual';
  amount: number; // In kuruş
  currency: 'TRY'; // Turkish Lira
  redirect_url?: string;
  callback_url?: string;
}

// Subscription Action Results
export interface SubscriptionActionResult {
  success: boolean;
  message: string;
  subscription?: UserSubscription;
  error?: string;
}

// Helper type for database queries
export interface SubscriptionWithTier extends UserSubscription {
  tier: SubscriptionTier;
}

// Constants for UI and validation
export const SUBSCRIPTION_CONSTANTS = {
  TRIAL_DURATION_DAYS: 7,
  FREE_TIER_DAILY_AI_LIMIT: 10,
  AI_PLUS_LIVE_MONTHLY_LESSONS: 16,
  QUARTERLY_DISCOUNT_PERCENT: {
    ai_only: 20, // ₺250/mo → ₺200/mo (₺600 total)
    ai_plus_live: 20, // ₺4750/mo → ₺3800/mo (₺11400 total)
  },
} as const;

// Pricing configuration (matches database)
export const PRICING_CONFIG: Record<TierCode, PricingTier> = {
  free: {
    code: 'free',
    name: 'Free Plan',
    monthlyPrice: 0,
    quarterlyPrice: 0,
    quarterlyMonthlyEquivalent: 0,
    savings: 0,
    features: [
      'Limited AI practice (10 interactions/day)',
      'Basic exercises',
      'Speaking-focused learning',
      '7-day free trial to explore premium features',
    ],
    cta: 'Start Free Trial',
  },
  ai_only: {
    code: 'ai_only',
    name: 'AI-Only Plan',
    monthlyPrice: 250,
    quarterlyPrice: 600,
    quarterlyMonthlyEquivalent: 200,
    savings: 150, // ₺750 - ₺600
    features: [
      'Unlimited AI practice',
      'Fun and educational exercises',
      'Speaking-focused English learning',
      'Progress tracking',
      'No live lessons',
    ],
    isPopular: false,
    cta: 'Subscribe Now',
  },
  ai_plus_live: {
    code: 'ai_plus_live',
    name: 'AI + Live Lessons',
    monthlyPrice: 4750,
    quarterlyPrice: 11400,
    quarterlyMonthlyEquivalent: 3800,
    savings: 2850, // ₺14250 - ₺11400
    features: [
      'Unlimited AI practice',
      'Fun and educational exercises',
      '16 live online classes per month (4 per week)',
      'Speaking-focused English learning',
      'Priority support',
      'Progress tracking',
    ],
    isPopular: true,
    cta: 'Subscribe Now',
  },
};
