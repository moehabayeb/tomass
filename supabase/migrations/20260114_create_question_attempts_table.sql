-- Migration: Create question_attempts table for detailed progress tracking
-- Date: 2026-01-14
-- Purpose: Bug #9 - Sync question attempts to database for cross-device analytics

-- Create question_attempts table
CREATE TABLE IF NOT EXISTS public.question_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Question identification
  question_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  level_id TEXT NOT NULL,

  -- Attempt details
  attempt_number INTEGER NOT NULL DEFAULT 1,
  correct BOOLEAN NOT NULL DEFAULT false,

  -- User's answer
  user_answer TEXT NOT NULL,
  expected_answer TEXT NOT NULL,

  -- Timing information
  start_time BIGINT NOT NULL,
  end_time BIGINT NOT NULL,
  time_spent INTEGER NOT NULL, -- milliseconds

  -- Grammar errors (stored as JSONB for flexibility)
  grammar_errors JSONB DEFAULT '[]'::jsonb,

  -- Retry information
  retry_reason TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  -- Constraints
  CONSTRAINT valid_time_spent CHECK (time_spent >= 0),
  CONSTRAINT valid_attempt_number CHECK (attempt_number > 0)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_question_attempts_user_id
ON public.question_attempts(user_id);

CREATE INDEX IF NOT EXISTS idx_question_attempts_module
ON public.question_attempts(user_id, level_id, module_id);

CREATE INDEX IF NOT EXISTS idx_question_attempts_question
ON public.question_attempts(user_id, question_id);

CREATE INDEX IF NOT EXISTS idx_question_attempts_created_at
ON public.question_attempts(user_id, created_at DESC);

-- Create composite index for common queries
CREATE INDEX IF NOT EXISTS idx_question_attempts_composite
ON public.question_attempts(user_id, level_id, module_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own question attempts"
ON public.question_attempts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own question attempts"
ON public.question_attempts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own question attempts"
ON public.question_attempts
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own question attempts"
ON public.question_attempts
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to get question statistics
CREATE OR REPLACE FUNCTION public.get_question_stats(
  p_user_id UUID,
  p_question_id TEXT
)
RETURNS TABLE (
  total_attempts BIGINT,
  correct_attempts BIGINT,
  average_time NUMERIC,
  best_time INTEGER,
  first_try_correct BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_attempts,
    COUNT(*) FILTER (WHERE correct = true)::BIGINT as correct_attempts,
    ROUND(AVG(time_spent)::NUMERIC, 2) as average_time,
    MIN(time_spent) FILTER (WHERE correct = true) as best_time,
    (
      SELECT qa.correct
      FROM public.question_attempts qa
      WHERE qa.user_id = p_user_id
        AND qa.question_id = p_question_id
        AND qa.attempt_number = 1
      LIMIT 1
    ) as first_try_correct
  FROM public.question_attempts
  WHERE user_id = p_user_id
    AND question_id = p_question_id;
END;
$$;

-- Create function to get module accuracy
CREATE OR REPLACE FUNCTION public.get_module_accuracy(
  p_user_id UUID,
  p_level_id TEXT,
  p_module_id INTEGER
)
RETURNS TABLE (
  total_questions BIGINT,
  correct_questions BIGINT,
  accuracy NUMERIC,
  average_time NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH latest_attempts AS (
    SELECT DISTINCT ON (question_id)
      question_id,
      correct,
      time_spent
    FROM public.question_attempts
    WHERE user_id = p_user_id
      AND level_id = p_level_id
      AND module_id = p_module_id
    ORDER BY question_id, created_at DESC
  )
  SELECT
    COUNT(*)::BIGINT as total_questions,
    COUNT(*) FILTER (WHERE correct = true)::BIGINT as correct_questions,
    ROUND((COUNT(*) FILTER (WHERE correct = true)::NUMERIC / NULLIF(COUNT(*), 0) * 100), 2) as accuracy,
    ROUND(AVG(time_spent)::NUMERIC, 2) as average_time
  FROM latest_attempts;
END;
$$;

-- Create function to cleanup old attempts (keep last 1000 per user)
CREATE OR REPLACE FUNCTION public.cleanup_old_question_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete attempts older than 1 year, keeping at least 1000 most recent per user
  DELETE FROM public.question_attempts
  WHERE id IN (
    SELECT id
    FROM (
      SELECT
        id,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as row_num
      FROM public.question_attempts
      WHERE created_at < NOW() - INTERVAL '1 year'
    ) ranked
    WHERE row_num > 1000
  );
END;
$$;

-- Add comments for documentation
COMMENT ON TABLE public.question_attempts IS 'Stores detailed question-level attempt data for analytics and progress tracking';
COMMENT ON COLUMN public.question_attempts.grammar_errors IS 'Array of grammar error objects stored as JSONB';
COMMENT ON FUNCTION public.get_question_stats IS 'Returns detailed statistics for a specific question';
COMMENT ON FUNCTION public.get_module_accuracy IS 'Returns accuracy and performance metrics for a module';
COMMENT ON FUNCTION public.cleanup_old_question_attempts IS 'Maintenance function to remove old attempts (run periodically)';
