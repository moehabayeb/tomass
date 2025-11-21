-- Create waitlist_signups table for App Store compliant subscription interest collection
CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  tier_interested TEXT NOT NULL DEFAULT 'ai_only',
  source TEXT DEFAULT 'pricing_page',
  notified_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist_signups(email);

-- Add index for tier interested
CREATE INDEX IF NOT EXISTS idx_waitlist_tier ON public.waitlist_signups(tier_interested);

-- Enable RLS
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for unauthenticated users on pricing page)
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist_signups
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read/update (for admin dashboard)
CREATE POLICY "Service role can read waitlist"
  ON public.waitlist_signups
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can update waitlist"
  ON public.waitlist_signups
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Add comment
COMMENT ON TABLE public.waitlist_signups IS 'Stores email signups for subscription launch notifications';
