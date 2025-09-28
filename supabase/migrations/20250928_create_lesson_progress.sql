-- Enhanced lesson progress with per-question checkpointing
-- Supports exact resume from any question in any module (A1-B2)

CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Lesson identifier
  level TEXT NOT NULL, -- 'A1', 'A2', 'B1', 'B2'
  module_id INTEGER NOT NULL,

  -- Question position
  question_index INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 40,

  -- Question phase (granular state)
  question_phase TEXT NOT NULL DEFAULT 'MCQ' CHECK (question_phase IN ('MCQ', 'SPEAK_READY', 'AWAITING_FEEDBACK', 'COMPLETED')),

  -- MCQ state (if applicable)
  mcq_selected_choice TEXT CHECK (mcq_selected_choice IN ('A', 'B', 'C', NULL)),
  mcq_is_correct BOOLEAN DEFAULT false,

  -- Completion state
  is_module_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata for sync and versioning
  schema_version INTEGER NOT NULL DEFAULT 1,
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  device_id TEXT, -- Optional: track which device last updated
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  -- Unique constraint per user/level/module (one progress per module)
  UNIQUE(user_id, level, module_id)
);

-- Enable Row Level Security
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only access their own progress
CREATE POLICY "Users can view their own lesson progress"
ON public.lesson_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson progress"
ON public.lesson_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress"
ON public.lesson_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lesson progress"
ON public.lesson_progress FOR DELETE
USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_lesson_progress_user_level ON public.lesson_progress(user_id, level);
CREATE INDEX idx_lesson_progress_user_module ON public.lesson_progress(user_id, level, module_id);
CREATE INDEX idx_lesson_progress_updated_at ON public.lesson_progress(updated_at DESC);
CREATE INDEX idx_lesson_progress_incomplete ON public.lesson_progress(user_id) WHERE is_module_completed = false;

-- Auto-update timestamp trigger (reuse existing function)
CREATE TRIGGER update_lesson_progress_timestamp
BEFORE UPDATE ON public.lesson_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get user's progress summary (for dashboard/stats)
CREATE OR REPLACE FUNCTION public.get_user_progress_summary(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_modules_started', COUNT(*),
    'modules_completed', COUNT(*) FILTER (WHERE is_module_completed = true),
    'levels_active', array_agg(DISTINCT level),
    'last_activity', MAX(updated_at),
    'in_progress_modules', json_agg(
      json_build_object(
        'level', level,
        'module_id', module_id,
        'question_index', question_index,
        'total_questions', total_questions,
        'question_phase', question_phase
      )
    ) FILTER (WHERE is_module_completed = false)
  ) INTO result
  FROM public.lesson_progress
  WHERE user_id = p_user_id;

  RETURN COALESCE(result, '{"total_modules_started": 0, "modules_completed": 0}'::json);
END;
$$;

-- Function to safely upsert lesson progress (handles conflicts)
CREATE OR REPLACE FUNCTION public.upsert_lesson_progress(
  p_user_id UUID,
  p_level TEXT,
  p_module_id INTEGER,
  p_question_index INTEGER,
  p_total_questions INTEGER,
  p_question_phase TEXT,
  p_mcq_selected_choice TEXT DEFAULT NULL,
  p_mcq_is_correct BOOLEAN DEFAULT false,
  p_is_module_completed BOOLEAN DEFAULT false,
  p_device_id TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  existing_record RECORD;
  result JSON;
BEGIN
  -- Check if record exists
  SELECT * INTO existing_record
  FROM public.lesson_progress
  WHERE user_id = p_user_id AND level = p_level AND module_id = p_module_id;

  IF FOUND THEN
    -- Update existing record (only if not moving backwards unless completed)
    IF existing_record.is_module_completed = false AND (
      p_question_index >= existing_record.question_index OR p_is_module_completed = true
    ) THEN
      UPDATE public.lesson_progress
      SET
        question_index = p_question_index,
        total_questions = p_total_questions,
        question_phase = p_question_phase,
        mcq_selected_choice = p_mcq_selected_choice,
        mcq_is_correct = p_mcq_is_correct,
        is_module_completed = p_is_module_completed,
        completed_at = CASE WHEN p_is_module_completed THEN now() ELSE completed_at END,
        device_id = COALESCE(p_device_id, device_id),
        last_synced_at = now(),
        updated_at = now()
      WHERE user_id = p_user_id AND level = p_level AND module_id = p_module_id
      RETURNING * INTO existing_record;
    END IF;
  ELSE
    -- Insert new record
    INSERT INTO public.lesson_progress (
      user_id, level, module_id, question_index, total_questions,
      question_phase, mcq_selected_choice, mcq_is_correct,
      is_module_completed, completed_at, device_id, last_synced_at
    ) VALUES (
      p_user_id, p_level, p_module_id, p_question_index, p_total_questions,
      p_question_phase, p_mcq_selected_choice, p_mcq_is_correct,
      p_is_module_completed,
      CASE WHEN p_is_module_completed THEN now() ELSE NULL END,
      p_device_id, now()
    )
    RETURNING * INTO existing_record;
  END IF;

  -- Return the current state
  SELECT json_build_object(
    'id', existing_record.id,
    'level', existing_record.level,
    'module_id', existing_record.module_id,
    'question_index', existing_record.question_index,
    'total_questions', existing_record.total_questions,
    'question_phase', existing_record.question_phase,
    'mcq_selected_choice', existing_record.mcq_selected_choice,
    'mcq_is_correct', existing_record.mcq_is_correct,
    'is_module_completed', existing_record.is_module_completed,
    'completed_at', existing_record.completed_at,
    'updated_at', existing_record.updated_at
  ) INTO result;

  RETURN result;
END;
$$;

-- Enable realtime for live progress updates (optional)
ALTER TABLE public.lesson_progress REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lesson_progress;