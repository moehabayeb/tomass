-- =====================================================
-- FINAL FIX: Functions with Alphabetical Parameters
-- =====================================================
-- Supabase matches RPC functions by parameter names in ALPHABETICAL ORDER
-- The error showed it expects: (p_description, p_duration_minutes, p_meeting_url, p_scheduled_at, p_title)
-- This migration creates functions with the EXACT parameter order Supabase expects
-- =====================================================

-- =====================================================
-- 1. DROP ALL EXISTING FUNCTION VERSIONS
-- =====================================================

-- Drop all possible function signatures to avoid conflicts
DROP FUNCTION IF EXISTS public.create_meeting(TEXT, TEXT, TEXT, TIMESTAMPTZ, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS public.update_meeting(UUID, TEXT, TEXT, TEXT, TIMESTAMPTZ, INTEGER, BOOLEAN) CASCADE;
DROP FUNCTION IF EXISTS public.upsert_rsvp(UUID, TEXT) CASCADE;

-- =====================================================
-- 2. CREATE MEETING FUNCTION - ALPHABETICAL ORDER
-- =====================================================

CREATE OR REPLACE FUNCTION public.create_meeting(
  p_description TEXT DEFAULT NULL,
  p_duration_minutes INTEGER DEFAULT 60,
  p_meeting_url TEXT,
  p_scheduled_at TIMESTAMPTZ,
  p_title TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_meeting_id UUID;
  v_user_id UUID;
  v_meeting_json JSON;
BEGIN
  v_user_id := auth.uid();

  -- Check admin permission
  IF NOT public.is_admin(v_user_id) THEN
    RAISE EXCEPTION 'Permission denied: Admin role required';
  END IF;

  -- Validate inputs
  IF p_title IS NULL OR LENGTH(TRIM(p_title)) < 3 THEN
    RAISE EXCEPTION 'Title must be at least 3 characters long';
  END IF;

  IF p_meeting_url IS NULL OR p_meeting_url !~ '^https?://' THEN
    RAISE EXCEPTION 'Meeting URL must be a valid HTTP/HTTPS URL';
  END IF;

  IF p_scheduled_at IS NULL OR p_scheduled_at <= NOW() THEN
    RAISE EXCEPTION 'Meeting must be scheduled for a future date and time';
  END IF;

  IF p_duration_minutes IS NULL OR p_duration_minutes <= 0 OR p_duration_minutes > 480 THEN
    RAISE EXCEPTION 'Duration must be between 1 and 480 minutes';
  END IF;

  -- Insert meeting
  INSERT INTO public.meetings (
    title, description, meeting_url, scheduled_at, duration_minutes, created_by
  ) VALUES (
    TRIM(p_title), TRIM(p_description), p_meeting_url, p_scheduled_at, p_duration_minutes, v_user_id
  ) RETURNING id INTO v_meeting_id;

  -- Return the complete meeting object as JSON
  SELECT row_to_json(m.*)
  INTO v_meeting_json
  FROM (
    SELECT
      id,
      title,
      description,
      meeting_url,
      scheduled_at,
      duration_minutes,
      is_active,
      created_by,
      created_at,
      updated_at
    FROM public.meetings
    WHERE id = v_meeting_id
  ) m;

  RETURN v_meeting_json;
END;
$$;

-- =====================================================
-- 3. UPDATE MEETING FUNCTION - ALPHABETICAL ORDER
-- =====================================================

-- Parameters in alphabetical order: p_duration_minutes, p_is_active, p_meeting_id, p_meeting_url, p_scheduled_at, p_title, p_description
CREATE OR REPLACE FUNCTION public.update_meeting(
  p_description TEXT DEFAULT NULL,
  p_duration_minutes INTEGER DEFAULT 60,
  p_is_active BOOLEAN DEFAULT TRUE,
  p_meeting_id UUID,
  p_meeting_url TEXT,
  p_scheduled_at TIMESTAMPTZ,
  p_title TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_meeting_json JSON;
BEGIN
  v_user_id := auth.uid();

  -- Check admin permission
  IF NOT public.is_admin(v_user_id) THEN
    RAISE EXCEPTION 'Permission denied: Admin role required';
  END IF;

  -- Validate inputs
  IF p_title IS NULL OR LENGTH(TRIM(p_title)) < 3 THEN
    RAISE EXCEPTION 'Title must be at least 3 characters long';
  END IF;

  IF p_meeting_url IS NULL OR p_meeting_url !~ '^https?://' THEN
    RAISE EXCEPTION 'Meeting URL must be a valid HTTP/HTTPS URL';
  END IF;

  IF p_scheduled_at IS NULL THEN
    RAISE EXCEPTION 'Scheduled date and time is required';
  END IF;

  IF p_duration_minutes IS NULL OR p_duration_minutes <= 0 OR p_duration_minutes > 480 THEN
    RAISE EXCEPTION 'Duration must be between 1 and 480 minutes';
  END IF;

  -- Update meeting
  UPDATE public.meetings
  SET
    title = TRIM(p_title),
    description = TRIM(p_description),
    meeting_url = p_meeting_url,
    scheduled_at = p_scheduled_at,
    duration_minutes = p_duration_minutes,
    is_active = p_is_active,
    updated_at = NOW()
  WHERE id = p_meeting_id;

  -- Check if meeting exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Meeting not found or you do not have permission to update it';
  END IF;

  -- Return the complete updated meeting object as JSON
  SELECT row_to_json(m.*)
  INTO v_meeting_json
  FROM (
    SELECT
      id,
      title,
      description,
      meeting_url,
      scheduled_at,
      duration_minutes,
      is_active,
      created_by,
      created_at,
      updated_at
    FROM public.meetings
    WHERE id = p_meeting_id
  ) m;

  RETURN v_meeting_json;
END;
$$;

-- =====================================================
-- 4. UPSERT RSVP FUNCTION - ALPHABETICAL ORDER
-- =====================================================

-- Parameters in alphabetical order: p_meeting_id, p_status
CREATE OR REPLACE FUNCTION public.upsert_rsvp(
  p_meeting_id UUID,
  p_status TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_rsvp_json JSON;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Validate status
  IF p_status NOT IN ('yes', 'no', 'maybe') THEN
    RAISE EXCEPTION 'RSVP status must be yes, no, or maybe';
  END IF;

  -- Check if meeting exists and is active
  IF NOT EXISTS (
    SELECT 1 FROM public.meetings
    WHERE id = p_meeting_id AND is_active = true
  ) THEN
    RAISE EXCEPTION 'Meeting not found or is not active';
  END IF;

  -- Upsert RSVP
  INSERT INTO public.meeting_rsvps (meeting_id, user_id, status)
  VALUES (p_meeting_id, v_user_id, p_status)
  ON CONFLICT (meeting_id, user_id)
  DO UPDATE SET
    status = p_status,
    updated_at = NOW();

  -- Return the complete RSVP object as JSON
  SELECT row_to_json(r.*)
  INTO v_rsvp_json
  FROM (
    SELECT
      id,
      meeting_id,
      user_id,
      status,
      created_at,
      updated_at
    FROM public.meeting_rsvps
    WHERE meeting_id = p_meeting_id AND user_id = v_user_id
  ) r;

  RETURN v_rsvp_json;
END;
$$;

-- =====================================================
-- 5. GRANT PERMISSIONS WITH CORRECT SIGNATURES
-- =====================================================

GRANT EXECUTE ON FUNCTION public.create_meeting(TEXT, INTEGER, TEXT, TIMESTAMPTZ, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_meeting(TEXT, INTEGER, BOOLEAN, UUID, TEXT, TIMESTAMPTZ, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_rsvp(UUID, TEXT) TO authenticated;

-- =====================================================
-- 6. VERIFICATION AND TESTING
-- =====================================================

-- The functions now have parameters in the EXACT order Supabase expects:
-- create_meeting(p_description, p_duration_minutes, p_meeting_url, p_scheduled_at, p_title)
-- update_meeting(p_description, p_duration_minutes, p_is_active, p_meeting_id, p_meeting_url, p_scheduled_at, p_title)

-- Test the function signature (uncomment to test manually):
-- SELECT public.create_meeting(
--   p_description := 'Test description',
--   p_duration_minutes := 60,
--   p_meeting_url := 'https://zoom.us/test',
--   p_scheduled_at := NOW() + INTERVAL '1 hour',
--   p_title := 'Test Meeting'
-- );

-- =====================================================
-- END OF FINAL FIX - Functions now match Supabase parameter matching!
-- =====================================================