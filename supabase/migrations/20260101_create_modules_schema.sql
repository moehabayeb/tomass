-- ============================================================================
-- CREATE MODULES AND SPEAKING_QA BASE SCHEMA
-- Description: Creates the foundational tables for storing lesson modules and Q&A content
-- Date: 2026-01-01
-- Run this BEFORE: 20260101_b2_modules_151_160.sql
-- ============================================================================

-- ============================================================================
-- MODULES TABLE - Stores lesson module metadata
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Module identification
  module_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),

  -- Lesson metadata
  lesson_type TEXT NOT NULL DEFAULT 'AI Teacher-Led Speaking Lesson',
  lesson_objectives JSONB DEFAULT '[]'::jsonb,
  topic_explanation TEXT DEFAULT '',

  -- Grammar structures and examples
  structures JSONB DEFAULT '[]'::jsonb,
  examples JSONB DEFAULT '[]'::jsonb,
  time_expressions JSONB DEFAULT '[]'::jsonb,

  -- Module status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  -- Constraints
  CONSTRAINT modules_module_number_positive CHECK (module_number > 0),
  CONSTRAINT modules_title_not_empty CHECK (length(trim(title)) > 0)
);

-- ============================================================================
-- SPEAKING_QA TABLE - Stores Q&A pairs for speaking practice
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.speaking_qa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Link to module
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,

  -- Question and answer content
  question TEXT NOT NULL,
  answer TEXT NOT NULL,

  -- Optional metadata for future enhancements
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard', NULL)),
  tags JSONB DEFAULT '[]'::jsonb,

  -- Display order within module
  display_order INTEGER,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  -- Constraints
  CONSTRAINT speaking_qa_question_not_empty CHECK (length(trim(question)) > 0),
  CONSTRAINT speaking_qa_answer_not_empty CHECK (length(trim(answer)) > 0)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Modules indexes
CREATE INDEX IF NOT EXISTS idx_modules_level ON public.modules(level);
CREATE INDEX IF NOT EXISTS idx_modules_module_number ON public.modules(module_number);
CREATE INDEX IF NOT EXISTS idx_modules_active ON public.modules(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_modules_level_active ON public.modules(level, is_active) WHERE is_active = true;

-- Speaking Q&A indexes
CREATE INDEX IF NOT EXISTS idx_speaking_qa_module_id ON public.speaking_qa(module_id);
CREATE INDEX IF NOT EXISTS idx_speaking_qa_active ON public.speaking_qa(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_speaking_qa_module_display ON public.speaking_qa(module_id, display_order);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_qa ENABLE ROW LEVEL SECURITY;

-- Modules policies - Public read access for active modules
CREATE POLICY "Anyone can view active modules"
ON public.modules FOR SELECT
USING (is_active = true);

-- Admin can manage modules (if you have an admin role)
-- Uncomment and adjust if you have role-based access control:
-- CREATE POLICY "Admins can manage modules"
-- ON public.modules FOR ALL
-- USING (auth.jwt() ->> 'role' = 'admin');

-- Speaking Q&A policies - Public read access for active Q&A
CREATE POLICY "Anyone can view active speaking_qa"
ON public.speaking_qa FOR SELECT
USING (
  is_active = true
  AND EXISTS (
    SELECT 1 FROM public.modules
    WHERE modules.id = speaking_qa.module_id
    AND modules.is_active = true
  )
);

-- ============================================================================
-- TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- ============================================================================

-- Create update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_modules_timestamp
BEFORE UPDATE ON public.modules
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_speaking_qa_timestamp
BEFORE UPDATE ON public.speaking_qa
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get modules by level with Q&A count
CREATE OR REPLACE FUNCTION public.get_modules_by_level(p_level TEXT)
RETURNS TABLE (
  id UUID,
  module_number INTEGER,
  title TEXT,
  level TEXT,
  lesson_type TEXT,
  lesson_objectives JSONB,
  topic_explanation TEXT,
  structures JSONB,
  examples JSONB,
  time_expressions JSONB,
  qa_count BIGINT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id,
    m.module_number,
    m.title,
    m.level,
    m.lesson_type,
    m.lesson_objectives,
    m.topic_explanation,
    m.structures,
    m.examples,
    m.time_expressions,
    COUNT(qa.id) as qa_count,
    m.created_at
  FROM public.modules m
  LEFT JOIN public.speaking_qa qa ON qa.module_id = m.id AND qa.is_active = true
  WHERE m.level = p_level AND m.is_active = true
  GROUP BY m.id, m.module_number, m.title, m.level, m.lesson_type,
           m.lesson_objectives, m.topic_explanation, m.structures,
           m.examples, m.time_expressions, m.created_at
  ORDER BY m.module_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get module with all Q&A pairs
CREATE OR REPLACE FUNCTION public.get_module_with_qa(p_module_number INTEGER)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'module', row_to_json(m.*),
    'qa_pairs', COALESCE(
      (SELECT json_agg(json_build_object(
        'id', qa.id,
        'question', qa.question,
        'answer', qa.answer,
        'difficulty_level', qa.difficulty_level,
        'display_order', qa.display_order
      ) ORDER BY qa.display_order, qa.created_at)
      FROM public.speaking_qa qa
      WHERE qa.module_id = m.id AND qa.is_active = true),
      '[]'::json
    )
  ) INTO result
  FROM public.modules m
  WHERE m.module_number = p_module_number AND m.is_active = true;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ENABLE REALTIME (OPTIONAL)
-- ============================================================================

-- Enable realtime for live updates
ALTER TABLE public.modules REPLICA IDENTITY FULL;
ALTER TABLE public.speaking_qa REPLICA IDENTITY FULL;

-- Add to realtime publication
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.modules;
  ALTER PUBLICATION supabase_realtime ADD TABLE public.speaking_qa;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================================
-- VERIFICATION QUERIES (Run these to verify setup)
-- ============================================================================

-- Verify tables created:
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('modules', 'speaking_qa');

-- Verify indexes:
-- SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' AND tablename IN ('modules', 'speaking_qa');

-- Test helper function:
-- SELECT * FROM public.get_modules_by_level('B2');

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.modules IS 'Stores lesson module metadata for all CEFR levels (A1-C2)';
COMMENT ON TABLE public.speaking_qa IS 'Stores question-answer pairs for AI-led speaking practice';

COMMENT ON COLUMN public.modules.module_number IS 'Unique sequential module identifier (1-160+)';
COMMENT ON COLUMN public.modules.level IS 'CEFR level: A1, A2, B1, B2, C1, or C2';
COMMENT ON COLUMN public.modules.structures IS 'JSON array of grammar structures taught in this module';
COMMENT ON COLUMN public.modules.examples IS 'JSON array of example sentences demonstrating the structures';
COMMENT ON COLUMN public.modules.time_expressions IS 'JSON array of time expressions associated with this grammar';

COMMENT ON COLUMN public.speaking_qa.module_id IS 'Foreign key to modules table';
COMMENT ON COLUMN public.speaking_qa.display_order IS 'Optional order for displaying Q&A pairs (null = insertion order)';
