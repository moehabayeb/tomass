-- Receipt Tracking Migration
-- Adds columns to track Apple/Google receipt verification

-- Add receipt tracking columns to user_subscriptions
ALTER TABLE public.user_subscriptions
ADD COLUMN IF NOT EXISTS latest_receipt_data text,
ADD COLUMN IF NOT EXISTS receipt_verified_at timestamptz,
ADD COLUMN IF NOT EXISTS external_subscription_id text;

-- Create index for external_subscription_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_external_sub_id
ON public.user_subscriptions(external_subscription_id);

-- Create purchase_receipts table for audit trail
CREATE TABLE IF NOT EXISTS public.purchase_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  product_id text NOT NULL,

  -- Receipt data
  receipt_data text NOT NULL, -- Base64 receipt or purchase token
  verified_at timestamptz NOT NULL DEFAULT now(),
  verification_response jsonb, -- Full response from Apple/Google

  -- Transaction info
  transaction_id text, -- Apple: original_transaction_id, Google: orderId
  purchase_date timestamptz,
  expiry_date timestamptz,

  -- Subscription details
  tier_code text REFERENCES public.subscription_tiers(tier_code),
  status text CHECK (status IN ('trial', 'active', 'expired', 'cancelled', 'refunded')),

  -- Payment provider info
  payment_provider text CHECK (payment_provider IN ('apple_pay', 'google_play')),
  environment text CHECK (environment IN ('Production', 'Sandbox', 'Test')),

  -- Metadata
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for purchase_receipts
CREATE INDEX IF NOT EXISTS idx_purchase_receipts_user_id
ON public.purchase_receipts(user_id);

CREATE INDEX IF NOT EXISTS idx_purchase_receipts_transaction_id
ON public.purchase_receipts(transaction_id);

CREATE INDEX IF NOT EXISTS idx_purchase_receipts_platform
ON public.purchase_receipts(platform);

-- Enable RLS on purchase_receipts
ALTER TABLE public.purchase_receipts ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own receipts
CREATE POLICY "Users can read own receipts"
  ON public.purchase_receipts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policy: Only service role can insert receipts (via Edge Functions)
CREATE POLICY "Service role can insert receipts"
  ON public.purchase_receipts FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Comments for documentation
COMMENT ON COLUMN public.user_subscriptions.latest_receipt_data IS 'Latest Apple receipt or Google purchase token for verification';
COMMENT ON COLUMN public.user_subscriptions.receipt_verified_at IS 'Timestamp of last successful receipt verification';
COMMENT ON COLUMN public.user_subscriptions.external_subscription_id IS 'Apple original_transaction_id or Google orderId';
COMMENT ON TABLE public.purchase_receipts IS 'Audit trail of all purchase receipt verifications';

-- Function to clean up old receipts (optional, for data retention)
CREATE OR REPLACE FUNCTION cleanup_old_receipts()
RETURNS void AS $$
BEGIN
  -- Delete receipts older than 2 years (adjust as needed)
  DELETE FROM public.purchase_receipts
  WHERE created_at < now() - interval '2 years';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- You can run this function manually or set up a cron job
-- SELECT cleanup_old_receipts();
