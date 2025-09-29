-- =====================================================
-- Fix Meeting Functions - Return Complete Objects
-- =====================================================
-- This migration fixes the create_meeting and update_meeting functions
-- to return complete meeting objects instead of just UUIDs
-- =====================================================

-- =====================================================
-- 1. FIX CREATE MEETING FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION public.create_meeting(
  p_title TEXT,
  p_description TEXT DEFAULT NULL,
  p_meeting_url TEXT,
  p_scheduled_at TIMESTAMPTZ,
  p_duration_minutes INTEGER DEFAULT 60
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
    TRIM(p_title), p_description, p_meeting_url, p_scheduled_at, p_duration_minutes, v_user_id
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
-- 2. FIX UPDATE MEETING FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_meeting(
  p_meeting_id UUID,
  p_title TEXT,
  p_description TEXT DEFAULT NULL,
  p_meeting_url TEXT,
  p_scheduled_at TIMESTAMPTZ,
  p_duration_minutes INTEGER DEFAULT 60,
  p_is_active BOOLEAN DEFAULT TRUE
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
    description = p_description,
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
-- 3. FIX UPSERT RSVP FUNCTION
-- =====================================================

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
-- 4. UPDATE FUNCTION GRANTS
-- =====================================================

-- Grant execute permissions on updated functions
GRANT EXECUTE ON FUNCTION public.create_meeting(TEXT, TEXT, TEXT, TIMESTAMPTZ, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_meeting(UUID, TEXT, TEXT, TEXT, TIMESTAMPTZ, INTEGER, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_rsvp(UUID, TEXT) TO authenticated;

-- =====================================================
-- 5. VERIFICATION QUERIES (for manual testing)
-- =====================================================

-- Test queries to verify the fixes:
--
-- 1. Test creating a meeting (replace with your actual values):
-- SELECT public.create_meeting(
--   'Test Meeting',
--   'Description',
--   'https://zoom.us/test',
--   NOW() + INTERVAL '1 hour',
--   60
-- );
--
-- 2. Test updating a meeting (replace UUID with actual meeting ID):
-- SELECT public.update_meeting(
--   'your-meeting-uuid-here',
--   'Updated Title',
--   'Updated Description',
--   'https://meet.google.com/test',
--   NOW() + INTERVAL '2 hours',
--   90,
--   true
-- );

-- =====================================================
-- END OF MIGRATION - Meeting Functions Now Return Complete Objects
-- =====================================================