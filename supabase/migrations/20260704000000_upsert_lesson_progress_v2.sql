-- upsert_lesson_progress v2: expose whether the row was actually written.
--
-- The v1 function's backwards-progress guard (question_index must not decrease
-- unless completing) silently SKIPPED the UPDATE and returned the OLD row as if
-- the save succeeded. Clients could not tell "saved" from "server kept its newer
-- row", so local and cloud state silently diverged.
--
-- v2 adds an 'updated' boolean to the returned JSON: true when an INSERT/UPDATE
-- actually ran, false when the guard kept the existing row. Same name, same
-- argument list, same return type (JSON) -- CREATE OR REPLACE is zero-downtime,
-- idempotent, and existing clients simply ignore the extra key.

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
      did_update := true;
    END IF;
    -- else: backwards-progress guard keeps the existing row; did_update stays false
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
    did_update := true;
  END IF;

  -- Return the current state (+ whether this call actually wrote it)
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
