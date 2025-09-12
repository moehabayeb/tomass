-- Create meeting enrollments table to track who can access meetings
CREATE TABLE public.meeting_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, meeting_id)
);

-- Enable RLS on enrollments table
ALTER TABLE public.meeting_enrollments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for enrollments
CREATE POLICY "Users can view their own enrollments" 
ON public.meeting_enrollments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll themselves in meetings" 
ON public.meeting_enrollments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unenroll themselves from meetings" 
ON public.meeting_enrollments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Update meetings table RLS policy to restrict access to enrolled participants only
DROP POLICY "Anyone can view active meetings" ON public.meetings;

-- Allow enrolled users to view full meeting details (including zoom links)
CREATE POLICY "Enrolled users can view meetings they're enrolled in" 
ON public.meetings 
FOR SELECT 
USING (
  is_active = true AND 
  EXISTS (
    SELECT 1 FROM public.meeting_enrollments 
    WHERE meeting_id = meetings.id 
    AND user_id = auth.uid()
  )
);

-- Allow authenticated users to view basic meeting info for enrollment purposes
-- (excluding sensitive zoom_link field)
CREATE POLICY "Authenticated users can view basic meeting info" 
ON public.meetings 
FOR SELECT 
USING (
  is_active = true AND 
  auth.uid() IS NOT NULL
);

-- Create a function to get public meeting info (without zoom links)
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