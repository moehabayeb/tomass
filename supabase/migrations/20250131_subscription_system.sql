-- Subscription System Migration
-- Creates tables for 3-tier subscription system with trials and grandfathering

-- Subscription tiers configuration table
CREATE TABLE IF NOT EXISTS public.subscription_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_code text UNIQUE NOT NULL CHECK (tier_code IN ('free', 'ai_only', 'ai_plus_live')),
  tier_name text NOT NULL,
  monthly_price_try integer NOT NULL DEFAULT 0, -- Price in Turkish Lira (kuruş)
  quarterly_price_try integer NOT NULL DEFAULT 0, -- 3-month price in TL (kuruş)
  annual_price_try integer NOT NULL DEFAULT 0, -- Annual price (if needed later)
  features jsonb NOT NULL DEFAULT '{}', -- { ai_unlimited: true, live_lessons: 16, daily_ai_limit: null }
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert default tier configurations
INSERT INTO public.subscription_tiers (tier_code, tier_name, monthly_price_try, quarterly_price_try, features) VALUES
  ('free', 'Free Plan', 0, 0, '{"ai_unlimited": false, "daily_ai_limit": 10, "live_lessons": 0, "trial_eligible": true}'),
  ('ai_only', 'AI-Only Plan', 25000, 60000, '{"ai_unlimited": true, "daily_ai_limit": null, "live_lessons": 0, "trial_eligible": false}'),
  ('ai_plus_live', 'AI + Live Lessons Plan', 475000, 1140000, '{"ai_unlimited": true, "daily_ai_limit": null, "live_lessons": 16, "trial_eligible": false}')
ON CONFLICT (tier_code) DO NOTHING;

-- User subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tier_code text REFERENCES public.subscription_tiers(tier_code) NOT NULL DEFAULT 'free',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('trial', 'active', 'cancelled', 'expired', 'past_due')),

  -- Trial management
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  is_trial_used boolean DEFAULT false,

  -- Subscription period
  current_period_start timestamptz,
  current_period_end timestamptz,

  -- Grandfathering for existing users
  is_grandfathered boolean DEFAULT false,
  grandfathered_until timestamptz,

  -- Payment integration (Iyzico or Stripe)
  payment_provider text CHECK (payment_provider IN ('iyzico', 'stripe', 'google_play', 'apple_pay')),
  payment_customer_id text, -- Iyzico customer ID or Stripe customer ID
  payment_subscription_id text, -- External subscription ID

  -- Live lesson credits (for ai_plus_live tier)
  live_lessons_remaining integer DEFAULT 0,
  live_lessons_reset_date timestamptz,

  -- Metadata
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_tier_code ON public.user_subscriptions(tier_code);

-- Live lesson bookings table
CREATE TABLE IF NOT EXISTS public.live_lesson_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  meeting_id uuid REFERENCES public.meetings(id) ON DELETE CASCADE NOT NULL,
  booking_date timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'attended', 'missed', 'cancelled')),
  credits_used integer DEFAULT 1,
  attended_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_live_lesson_bookings_user_id ON public.live_lesson_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_live_lesson_bookings_meeting_id ON public.live_lesson_bookings(meeting_id);

-- AI usage tracking (for free tier daily limits)
CREATE TABLE IF NOT EXISTS public.ai_usage_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  usage_date date NOT NULL DEFAULT current_date,
  interaction_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_id, usage_date)
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_tracking_user_date ON public.ai_usage_tracking(user_id, usage_date);

-- Subscription history for audit trail
CREATE TABLE IF NOT EXISTS public.subscription_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  from_tier text,
  to_tier text NOT NULL,
  change_reason text, -- 'upgrade', 'downgrade', 'trial_start', 'trial_end', 'cancellation', 'renewal'
  changed_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_subscription_history_user_id ON public.subscription_history(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_subscription_tiers_updated_at BEFORE UPDATE ON public.subscription_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_live_lesson_bookings_updated_at BEFORE UPDATE ON public.live_lesson_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_usage_tracking_updated_at BEFORE UPDATE ON public.ai_usage_tracking
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) Policies

-- Enable RLS on all tables
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_lesson_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_history ENABLE ROW LEVEL SECURITY;

-- Subscription tiers: Read-only for all authenticated users
CREATE POLICY "Anyone can read subscription tiers"
  ON public.subscription_tiers FOR SELECT
  TO authenticated
  USING (true);

-- User subscriptions: Users can only read/update their own subscription
CREATE POLICY "Users can read own subscription"
  ON public.user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
  ON public.user_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON public.user_subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Live lesson bookings: Users can manage their own bookings
CREATE POLICY "Users can read own bookings"
  ON public.live_lesson_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON public.live_lesson_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON public.live_lesson_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- AI usage tracking: Users can read/update their own usage
CREATE POLICY "Users can read own AI usage"
  ON public.ai_usage_tracking FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own AI usage"
  ON public.ai_usage_tracking FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own AI usage"
  ON public.ai_usage_tracking FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Subscription history: Users can read their own history
CREATE POLICY "Users can read own subscription history"
  ON public.subscription_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to initialize subscription for new users
CREATE OR REPLACE FUNCTION initialize_user_subscription()
RETURNS TRIGGER AS $$
BEGIN
  -- Create free subscription with 7-day trial for new users
  INSERT INTO public.user_subscriptions (
    user_id,
    tier_code,
    status,
    trial_started_at,
    trial_ends_at,
    is_trial_used,
    current_period_start,
    current_period_end
  ) VALUES (
    NEW.id,
    'free',
    'trial',
    now(),
    now() + interval '7 days',
    false,
    now(),
    now() + interval '30 days'
  );

  -- Log subscription history
  INSERT INTO public.subscription_history (user_id, to_tier, change_reason)
  VALUES (NEW.id, 'free', 'trial_start');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create subscription on user signup
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_subscription();

-- Function to reset monthly live lesson credits
CREATE OR REPLACE FUNCTION reset_monthly_live_lesson_credits()
RETURNS void AS $$
BEGIN
  UPDATE public.user_subscriptions
  SET
    live_lessons_remaining = 16,
    live_lessons_reset_date = current_date + interval '1 month'
  WHERE
    tier_code = 'ai_plus_live'
    AND status = 'active'
    AND (live_lessons_reset_date IS NULL OR live_lessons_reset_date <= current_date);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments for documentation
COMMENT ON TABLE public.subscription_tiers IS 'Defines the 3 subscription tiers: free, ai_only, ai_plus_live';
COMMENT ON TABLE public.user_subscriptions IS 'Stores user subscription status, tier, trial info, and payment details';
COMMENT ON TABLE public.live_lesson_bookings IS 'Tracks live lesson bookings and attendance for AI + Live tier users';
COMMENT ON TABLE public.ai_usage_tracking IS 'Tracks daily AI interaction count for free tier users (10/day limit)';
COMMENT ON TABLE public.subscription_history IS 'Audit trail of all subscription tier changes';
