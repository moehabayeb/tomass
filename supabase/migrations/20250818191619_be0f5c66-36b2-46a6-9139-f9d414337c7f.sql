-- Remove conflicting policies and create a single secure policy
DROP POLICY "Enrolled users can view meetings they're enrolled in" ON public.meetings;
DROP POLICY "Authenticated users can view basic meeting info" ON public.meetings;

-- Create a single policy that only allows enrolled users to see full meeting details
CREATE POLICY "Only enrolled users can view meetings" 
ON public.meetings 
FOR SELECT 
USING (
  is_active = true AND 
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.meeting_enrollments 
    WHERE meeting_id = meetings.id 
    AND user_id = auth.uid()
  )
);

-- Fix function search path security issue
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

-- Fix search path for existing functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public;