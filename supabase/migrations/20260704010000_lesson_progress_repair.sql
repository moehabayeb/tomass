-- ============================================================================
-- lesson_progress PRODUCTION REPAIR (July 2026)
--
-- Discovery: the original 20250928_create_lesson_progress.sql migration was
-- never applied to the production project (migration drift — the project was
-- updated ad-hoc via the SQL editor). Every cloud progress save 404'd with
-- 42P01 "relation public.lesson_progress does not exist" since launch; users
-- only ever had device-local progress.
--
-- This script is FULLY IDEMPOTENT and self-contained: safe to run on a
-- project where nothing exists, where everything exists, or anywhere between.
-- It recreates the table, RLS, grants, indexes, trigger, and both functions
-- (upsert_lesson_progress at v2, with the 'updated' flag).
-- ============================================================================

-- 0. Trigger helper (declared in several older migrations; re-declare to be
--    independent of which of them were actually applied)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 1. Table (exact definition from 20250928_create_lesson_progress.sql)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Lesson identifier
  level TEXT NOT NULL,
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
  device_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  UNIQUE(user_id, level, module_id)
);

-- 2. Row Level Security + policies (drop-and-recreate for idempotence)
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can view their own lesson progress"
ON public.lesson_progress FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can insert their own lesson progress"
ON public.lesson_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can update their own lesson progress"
ON public.lesson_progress FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own lesson progress" ON public.lesson_progress;
CREATE POLICY "Users can delete their own lesson progress"
ON public.lesson_progress FOR DELETE
USING (auth.uid() = user_id);

-- 3. Explicit grants (RLS restricts rows; grants allow table access at all)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_level ON public.lesson_progress(user_id, level);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_module ON public.lesson_progress(user_id, level, module_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_updated_at ON public.lesson_progress(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_incomplete ON public.lesson_progress(user_id) WHERE is_module_completed = false;

-- 5. Auto-update timestamp trigger
DROP TRIGGER IF EXISTS update_lesson_progress_timestamp ON public.lesson_progress;
CREATE TRIGGER update_lesson_progress_timestamp
BEFORE UPDATE ON public.lesson_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Progress summary function (from the original migration)
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

-- 7. Upsert function at v2 (adds 'updated' flag exposing the backwards-progress
--    guard; same body as 20260704000000_upsert_lesson_progress_v2.sql)
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
  did_update BOOLEAN := false;
  result JSON;
BEGIN
  SELECT * INTO existing_record
  FROM public.lesson_progress
  WHERE user_id = p_user_id AND level = p_level AND module_id = p_module_id;

  IF FOUND THEN
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
      did_update := true;
    END IF;
  ELSE
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
    did_update := true;
  END IF;

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
    'updated_at', existing_record.updated_at,
    'updated', did_update
  ) INTO result;

  RETURN result;
END;
$$;

-- 8. Realtime (optional, from the original migration; ignore if already added)
ALTER TABLE public.lesson_progress REPLICA IDENTITY FULL;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.lesson_progress;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN undefined_object THEN NULL; -- publication doesn't exist on this project
END $$;

-- 9. Make PostgREST (the REST API) see the new table immediately
NOTIFY pgrst, 'reload schema';
