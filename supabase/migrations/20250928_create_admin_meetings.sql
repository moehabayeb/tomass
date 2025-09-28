--
-- Admin Meetings System
-- Stores scheduled meetings accessible by all users, manageable by admins only
--

-- Create admin_meetings table
CREATE TABLE IF NOT EXISTS public.admin_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) >= 3 AND char_length(title) <= 200),
  description TEXT CHECK (description IS NULL OR char_length(description) <= 2000),
  meeting_url TEXT NOT NULL CHECK (meeting_url ~* '^https?://'),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60 CHECK (duration_minutes > 0 AND duration_minutes <= 480),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RSVPs table for tracking user attendance
CREATE TABLE IF NOT EXISTS public.meeting_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES public.admin_meetings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'yes' CHECK (status IN ('yes', 'no', 'maybe')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(meeting_id, user_id)
);

-- Create audit log for admin actions
CREATE TABLE IF NOT EXISTS public.meeting_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID REFERENCES public.admin_meetings(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'deleted', 'activated', 'deactivated')),
  performed_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add user_roles table if not exists (for RBAC)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Helper function: Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = check_user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Create meeting with audit log
CREATE OR REPLACE FUNCTION public.create_meeting(
  p_title TEXT,
  p_description TEXT,
  p_meeting_url TEXT,
  p_scheduled_at TIMESTAMP WITH TIME ZONE,
  p_duration_minutes INTEGER
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_meeting_id UUID;
  v_meeting JSON;
BEGIN
  v_user_id := auth.uid();

  -- Check admin permission
  IF NOT public.is_admin(v_user_id) THEN
    RAISE EXCEPTION 'Permission denied: Admin role required';
  END IF;

  -- Insert meeting
  INSERT INTO public.admin_meetings (
    title, description, meeting_url, scheduled_at, duration_minutes, created_by
  ) VALUES (
    p_title, p_description, p_meeting_url, p_scheduled_at, p_duration_minutes, v_user_id
  )
  RETURNING id INTO v_meeting_id;

  -- Log action
  INSERT INTO public.meeting_audit_log (meeting_id, action, performed_by, changes)
  VALUES (
    v_meeting_id,
    'created',
    v_user_id,
    jsonb_build_object(
      'title', p_title,
      'scheduled_at', p_scheduled_at
    )
  );

  -- Return created meeting
  SELECT row_to_json(m.*)
  INTO v_meeting
  FROM public.admin_meetings m
  WHERE m.id = v_meeting_id;

  RETURN v_meeting;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Update meeting with audit log
CREATE OR REPLACE FUNCTION public.update_meeting(
  p_meeting_id UUID,
  p_title TEXT,
  p_description TEXT,
  p_meeting_url TEXT,
  p_scheduled_at TIMESTAMP WITH TIME ZONE,
  p_duration_minutes INTEGER,
  p_is_active BOOLEAN
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_old_data JSONB;
  v_meeting JSON;
BEGIN
  v_user_id := auth.uid();

  -- Check admin permission
  IF NOT public.is_admin(v_user_id) THEN
    RAISE EXCEPTION 'Permission denied: Admin role required';
  END IF;

  -- Get old data for audit
  SELECT to_jsonb(m.*)
  INTO v_old_data
  FROM public.admin_meetings m
  WHERE m.id = p_meeting_id;

  IF v_old_data IS NULL THEN
    RAISE EXCEPTION 'Meeting not found';
  END IF;

  -- Update meeting
  UPDATE public.admin_meetings
  SET
    title = p_title,
    description = p_description,
    meeting_url = p_meeting_url,
    scheduled_at = p_scheduled_at,
    duration_minutes = p_duration_minutes,
    is_active = p_is_active,
    updated_at = now()
  WHERE id = p_meeting_id;

  -- Log action
  INSERT INTO public.meeting_audit_log (meeting_id, action, performed_by, changes)
  VALUES (
    p_meeting_id,
    'updated',
    v_user_id,
    jsonb_build_object(
      'old', v_old_data,
      'new', jsonb_build_object(
        'title', p_title,
        'scheduled_at', p_scheduled_at,
        'is_active', p_is_active
      )
    )
  );

  -- Return updated meeting
  SELECT row_to_json(m.*)
  INTO v_meeting
  FROM public.admin_meetings m
  WHERE m.id = p_meeting_id;

  RETURN v_meeting;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Delete meeting with audit log
CREATE OR REPLACE FUNCTION public.delete_meeting(p_meeting_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_user_id UUID;
  v_meeting_data JSONB;
BEGIN
  v_user_id := auth.uid();

  -- Check admin permission
  IF NOT public.is_admin(v_user_id) THEN
    RAISE EXCEPTION 'Permission denied: Admin role required';
  END IF;

  -- Get meeting data for audit
  SELECT to_jsonb(m.*)
  INTO v_meeting_data
  FROM public.admin_meetings m
  WHERE m.id = p_meeting_id;

  IF v_meeting_data IS NULL THEN
    RAISE EXCEPTION 'Meeting not found';
  END IF;

  -- Log action before delete
  INSERT INTO public.meeting_audit_log (meeting_id, action, performed_by, changes)
  VALUES (
    p_meeting_id,
    'deleted',
    v_user_id,
    v_meeting_data
  );

  -- Delete meeting (cascades to RSVPs)
  DELETE FROM public.admin_meetings WHERE id = p_meeting_id;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Upsert RSVP
CREATE OR REPLACE FUNCTION public.upsert_rsvp(
  p_meeting_id UUID,
  p_status TEXT
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_rsvp JSON;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Upsert RSVP
  INSERT INTO public.meeting_rsvps (meeting_id, user_id, status)
  VALUES (p_meeting_id, v_user_id, p_status)
  ON CONFLICT (meeting_id, user_id)
  DO UPDATE SET
    status = p_status,
    updated_at = now();

  -- Return RSVP
  SELECT row_to_json(r.*)
  INTO v_rsvp
  FROM public.meeting_rsvps r
  WHERE r.meeting_id = p_meeting_id AND r.user_id = v_user_id;

  RETURN v_rsvp;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies
ALTER TABLE public.admin_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- admin_meetings policies
CREATE POLICY "Everyone can view active meetings"
  ON public.admin_meetings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all meetings"
  ON public.admin_meetings FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert meetings"
  ON public.admin_meetings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update meetings"
  ON public.admin_meetings FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete meetings"
  ON public.admin_meetings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- meeting_rsvps policies
CREATE POLICY "Users can view their own RSVPs"
  ON public.meeting_rsvps FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all RSVPs"
  ON public.meeting_rsvps FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can insert/update their own RSVPs"
  ON public.meeting_rsvps FOR ALL
  USING (user_id = auth.uid());

-- meeting_audit_log policies
CREATE POLICY "Admins can view audit logs"
  ON public.meeting_audit_log FOR SELECT
  USING (public.is_admin(auth.uid()));

-- user_roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Indexes for performance
CREATE INDEX idx_meetings_scheduled_at ON public.admin_meetings(scheduled_at);
CREATE INDEX idx_meetings_is_active ON public.admin_meetings(is_active);
CREATE INDEX idx_meetings_created_by ON public.admin_meetings(created_by);
CREATE INDEX idx_rsvps_meeting_id ON public.meeting_rsvps(meeting_id);
CREATE INDEX idx_rsvps_user_id ON public.meeting_rsvps(user_id);
CREATE INDEX idx_audit_meeting_id ON public.meeting_audit_log(meeting_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_meeting(TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_meeting(UUID, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE, INTEGER, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_meeting(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_rsvp(UUID, TEXT) TO authenticated;

-- Insert sample admin user (update with real user_id after first signup)
-- INSERT INTO public.user_roles (user_id, role) VALUES ('YOUR_USER_ID_HERE', 'admin');