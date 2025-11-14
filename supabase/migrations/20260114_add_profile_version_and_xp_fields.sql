-- Migration: Add profile_version for optimistic locking and split XP fields
-- Date: 2026-01-14
-- Purpose: Fix Bug #3 - Add atomic transactions with version field and optimistic locking

-- Add profile_version column for optimistic locking
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS profile_version INTEGER NOT NULL DEFAULT 0;

-- Add xp_current and xp_total columns (splitting from old xp column)
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS xp_current INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS xp_total INTEGER NOT NULL DEFAULT 0;

-- Migrate existing xp data to new fields
-- If xp column exists, copy its value to both xp_current and xp_total
DO $$
BEGIN
  -- Check if old 'xp' column exists
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'user_profiles'
    AND column_name = 'xp'
  ) THEN
    -- Copy xp to both xp_current and xp_total
    UPDATE public.user_profiles
    SET
      xp_current = xp,
      xp_total = xp
    WHERE xp_current = 0 AND xp_total = 0;

    -- Drop old xp column after migration
    -- Commented out for safety - uncomment after verifying migration
    -- ALTER TABLE public.user_profiles DROP COLUMN xp;
  END IF;
END $$;

-- Add comment for documentation
COMMENT ON COLUMN public.user_profiles.profile_version IS 'Version number for optimistic locking - incremented on each update to prevent concurrent modification conflicts';
COMMENT ON COLUMN public.user_profiles.xp_current IS 'Current XP in the current level (resets to 0 on level up)';
COMMENT ON COLUMN public.user_profiles.xp_total IS 'Total lifetime XP earned across all levels';

-- Create index on profile_version for faster optimistic locking checks
CREATE INDEX IF NOT EXISTS idx_user_profiles_version
ON public.user_profiles(user_id, profile_version);
