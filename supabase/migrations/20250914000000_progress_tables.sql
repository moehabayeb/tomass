-- Create comprehensive progress tracking tables for unified progress system
-- This migration creates all necessary tables for the ProgressService

-- ============================================
-- LESSON PROGRESS TABLE
-- ============================================
CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level TEXT NOT NULL, -- A1, A2, B1, etc.
  module_id INTEGER NOT NULL,
  phase TEXT NOT NULL CHECK (phase IN ('intro', 'listening', 'speaking', 'complete')),
  current_question_index INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  time_spent INTEGER NOT NULL DEFAULT 0, -- milliseconds
  completed BOOLEAN NOT NULL DEFAULT false,
  mcq_completed BOOLEAN NOT NULL DEFAULT false,
  speaking_completed BOOLEAN NOT NULL DEFAULT false,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, level, module_id)
);

-- Create index for faster queries
CREATE INDEX idx_lesson_progress_user_level_module ON public.lesson_progress(user_id, level, module_id);
CREATE INDEX idx_lesson_progress_user_completed ON public.lesson_progress(user_id, completed);

-- ============================================
-- PLACEMENT TEST PROGRESS TABLE
-- ============================================
CREATE TABLE public.placement_test_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL CHECK (test_type IN ('speaking', 'grammar', 'integration')),
  current_question_index INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  answers JSONB NOT NULL DEFAULT '[]',
  scores JSONB NOT NULL DEFAULT '{}',
  completed BOOLEAN NOT NULL DEFAULT false,
  results JSONB,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, test_type)
);

-- ============================================
-- GAME PROGRESS TABLE
-- ============================================
CREATE TABLE public.game_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  score INTEGER NOT NULL DEFAULT 0,
  high_score INTEGER NOT NULL DEFAULT 0,
  completed_levels JSONB NOT NULL DEFAULT '[]',
  achievements JSONB NOT NULL DEFAULT '[]',
  time_spent INTEGER NOT NULL DEFAULT 0, -- milliseconds
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, game_type)
);

-- ============================================
-- GAMIFICATION PROGRESS TABLE
-- ============================================
CREATE TABLE public.gamification_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  current_streak INTEGER NOT NULL DEFAULT 0,
  best_streak INTEGER NOT NULL DEFAULT 0,
  last_visit_date TEXT NOT NULL DEFAULT '',
  badges JSONB NOT NULL DEFAULT '[]',
  milestones JSONB NOT NULL DEFAULT '[]',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================
-- USER PREFERENCES TABLE (separate from user_profiles)
-- ============================================
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sound_enabled BOOLEAN NOT NULL DEFAULT true,
  language TEXT NOT NULL DEFAULT 'en',
  theme TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  notifications JSONB NOT NULL DEFAULT '{
    "streakReminders": true,
    "lessonReminders": true,
    "weeklyReports": true
  }',
  privacy JSONB NOT NULL DEFAULT '{
    "shareProgress": false,
    "showInLeaderboard": true
  }',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_test_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Lesson Progress Policies
CREATE POLICY "Users can view their own lesson progress" 
ON public.lesson_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson progress" 
ON public.lesson_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress" 
ON public.lesson_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Placement Test Progress Policies
CREATE POLICY "Users can view their own placement test progress" 
ON public.placement_test_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own placement test progress" 
ON public.placement_test_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own placement test progress" 
ON public.placement_test_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Game Progress Policies
CREATE POLICY "Users can view their own game progress" 
ON public.game_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game progress" 
ON public.game_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own game progress" 
ON public.game_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Gamification Progress Policies
CREATE POLICY "Users can view their own gamification progress" 
ON public.gamification_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gamification progress" 
ON public.gamification_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification progress" 
ON public.gamification_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- User Preferences Policies
CREATE POLICY "Users can view their own preferences" 
ON public.user_preferences FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" 
ON public.user_preferences FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
ON public.user_preferences FOR UPDATE 
USING (auth.uid() = user_id);

-- ============================================
-- CREATE TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE TRIGGER update_lesson_progress_updated_at
BEFORE UPDATE ON public.lesson_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_placement_test_progress_updated_at
BEFORE UPDATE ON public.placement_test_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_game_progress_updated_at
BEFORE UPDATE ON public.game_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gamification_progress_updated_at
BEFORE UPDATE ON public.gamification_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- ENABLE REALTIME FOR ALL PROGRESS TABLES
-- ============================================
ALTER TABLE public.lesson_progress REPLICA IDENTITY FULL;
ALTER TABLE public.placement_test_progress REPLICA IDENTITY FULL;
ALTER TABLE public.game_progress REPLICA IDENTITY FULL;
ALTER TABLE public.gamification_progress REPLICA IDENTITY FULL;
ALTER TABLE public.user_preferences REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.lesson_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.placement_test_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gamification_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_preferences;

-- ============================================
-- CREATE HELPER FUNCTIONS
-- ============================================

-- Function to get user's lesson progress summary
CREATE OR REPLACE FUNCTION public.get_lesson_progress_summary(p_user_id UUID DEFAULT auth.uid())
RETURNS TABLE (
  total_modules INTEGER,
  completed_modules INTEGER,
  in_progress_modules INTEGER,
  total_time_spent INTEGER,
  average_accuracy NUMERIC
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(*)::INTEGER as total_modules,
    COUNT(CASE WHEN completed = true THEN 1 END)::INTEGER as completed_modules,
    COUNT(CASE WHEN completed = false AND current_question_index > 0 THEN 1 END)::INTEGER as in_progress_modules,
    COALESCE(SUM(time_spent), 0)::INTEGER as total_time_spent,
    CASE 
      WHEN COUNT(*) > 0 THEN ROUND(AVG(CASE WHEN total_questions > 0 THEN (correct_answers::NUMERIC / total_questions) * 100 ELSE 0 END), 2)
      ELSE 0
    END as average_accuracy
  FROM public.lesson_progress 
  WHERE user_id = p_user_id;
$$;

-- Function to create default user preferences
CREATE OR REPLACE FUNCTION public.create_default_user_preferences(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;
  
  INSERT INTO public.gamification_progress (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;

-- ============================================
-- UPDATE USER PROFILE TRIGGER TO CREATE DEFAULTS
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create default preferences and gamification progress
  PERFORM create_default_user_preferences(NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_progress
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user_progress();