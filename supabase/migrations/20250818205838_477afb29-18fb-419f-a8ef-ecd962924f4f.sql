-- Fix critical security vulnerability: Remove zoom_link from public function
-- and create a separate secure function for enrolled users

-- Update the public function to exclude sensitive data
CREATE OR REPLACE FUNCTION public.get_public_meetings()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  teacher_name TEXT,
  focus_topic TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  max_participants INTEGER,
  current_participants BIGINT
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    m.id,
    m.title,
    m.description,
    m.teacher_name,
    m.focus_topic,
    m.scheduled_at,
    m.duration_minutes,
    m.max_participants,
    COUNT(e.user_id) as current_participants
  FROM public.meetings m
  LEFT JOIN public.meeting_enrollments e ON m.id = e.meeting_id
  WHERE m.is_active = true
  GROUP BY m.id, m.title, m.description, m.teacher_name, m.focus_topic, 
           m.scheduled_at, m.duration_minutes, m.max_participants;
$$;

-- Create a new secure function for enrolled users to get meeting details with Zoom links
CREATE OR REPLACE FUNCTION public.get_enrolled_meeting_details(meeting_uuid UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  teacher_name TEXT,
  focus_topic TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  zoom_link TEXT
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    m.id,
    m.title,
    m.description,
    m.teacher_name,
    m.focus_topic,
    m.scheduled_at,
    m.duration_minutes,
    m.zoom_link
  FROM public.meetings m
  WHERE m.id = meeting_uuid
    AND m.is_active = true
    AND auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.meeting_enrollments 
      WHERE meeting_id = m.id 
      AND user_id = auth.uid()
    );
$$;