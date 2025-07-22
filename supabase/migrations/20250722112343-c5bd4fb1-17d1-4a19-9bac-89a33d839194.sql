-- Create meetings table for storing live class schedules
CREATE TABLE public.meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  teacher_name TEXT NOT NULL,
  focus_topic TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  zoom_link TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  max_participants INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user reminders table to track who has set reminders
CREATE TABLE public.user_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('browser', 'email')),
  is_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reminders ENABLE ROW LEVEL SECURITY;

-- Create policies for meetings (public read access)
CREATE POLICY "Anyone can view active meetings" 
ON public.meetings 
FOR SELECT 
USING (is_active = true);

-- Create policies for user reminders (users can only access their own)
CREATE POLICY "Users can view their own reminders" 
ON public.user_reminders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders" 
ON public.user_reminders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
ON public.user_reminders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
ON public.user_reminders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_meetings_updated_at
BEFORE UPDATE ON public.meetings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample meeting data
INSERT INTO public.meetings (title, description, teacher_name, focus_topic, scheduled_at, zoom_link) VALUES
('Weekly English Conversation', 'Practice professional conversations and improve your business vocabulary', 'Sarah Johnson', 'Business English & Professional Communication', NOW() + INTERVAL '2 hours', 'https://zoom.us/j/1234567890?pwd=YYYYYYYYYYYY'),
('Grammar Workshop', 'Master advanced grammar concepts with practical exercises', 'Michael Chen', 'Advanced Tenses & Conditionals', NOW() + INTERVAL '1 day', 'https://zoom.us/j/2345678901?pwd=ZZZZZZZZZZZZ'),
('Pronunciation Clinic', 'Improve your pronunciation with targeted practice', 'Emma Rodriguez', 'American vs British Pronunciation', NOW() + INTERVAL '3 days', 'https://zoom.us/j/3456789012?pwd=AAAAAAAAAAAA'),
('Weekly English Conversation', 'Explore travel vocabulary and cultural discussions', 'Sarah Johnson', 'Travel & Culture Discussions', NOW() + INTERVAL '1 week', 'https://zoom.us/j/4567890123?pwd=BBBBBBBBBBBB');