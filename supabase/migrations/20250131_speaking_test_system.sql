-- =====================================================
-- Speaking Test System: Comprehensive Proficiency Assessment
-- =====================================================
-- This migration creates the complete speaking test system with
-- detailed scoring, test history, and content management.
-- =====================================================

-- Enable required extensions (idempotent)
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- =====================================================
-- A. SPEAKING TEST RESULTS TABLE
-- =====================================================

-- Create speaking test results table
create table if not exists public.speaking_test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  test_date timestamptz default now(),

  -- Overall assessment
  overall_score integer not null check (overall_score >= 0 and overall_score <= 100),
  recommended_level text not null check (recommended_level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),

  -- Detailed scores (0-100)
  pronunciation_score integer not null check (pronunciation_score >= 0 and pronunciation_score <= 100),
  grammar_score integer not null check (grammar_score >= 0 and grammar_score <= 100),
  vocabulary_score integer not null check (vocabulary_score >= 0 and vocabulary_score <= 100),
  fluency_score integer not null check (fluency_score >= 0 and fluency_score <= 100),
  comprehension_score integer not null check (comprehension_score >= 0 and comprehension_score <= 100),

  -- Test details
  test_duration integer not null, -- duration in seconds
  transcript jsonb not null default '[]'::jsonb, -- Full test transcript with timestamps
  detailed_feedback jsonb not null default '{}'::jsonb, -- Phase-by-phase feedback

  -- Performance metrics
  words_per_minute numeric(5,2),
  unique_words_count integer,
  grammar_errors_count integer,
  pronunciation_issues jsonb default '[]'::jsonb,

  -- Test metadata
  test_type text default 'full' check (test_type in ('full', 'practice', 'placement')),
  is_completed boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- B. SPEAKING TEST PROMPTS TABLE
-- =====================================================

-- Create speaking test prompts table
create table if not exists public.speaking_test_prompts (
  id uuid primary key default gen_random_uuid(),
  phase integer not null check (phase >= 1 and phase <= 5),
  phase_name text not null,
  level_range text[] not null, -- Array of levels this prompt is suitable for
  prompt_type text not null check (prompt_type in ('introduction', 'description', 'storytelling', 'discussion', 'comparison')),

  -- Prompt content
  title text not null,
  instructions text not null,
  content text,
  image_url text,
  audio_url text,

  -- Evaluation criteria
  expected_responses jsonb default '[]'::jsonb,
  evaluation_criteria jsonb not null default '{}'::jsonb,
  time_limit integer not null default 180, -- seconds

  -- Metadata
  difficulty_level text check (difficulty_level in ('beginner', 'intermediate', 'advanced')),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- C. CEFR VOCABULARY TABLE
-- =====================================================

-- Create CEFR vocabulary reference table
create table if not exists public.cefr_vocabulary (
  id uuid primary key default gen_random_uuid(),
  word text not null unique,
  level text not null check (level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  word_type text check (word_type in ('noun', 'verb', 'adjective', 'adverb', 'phrase', 'idiom')),
  frequency_score integer default 1 check (frequency_score >= 1 and frequency_score <= 10),
  created_at timestamptz default now()
);

-- =====================================================
-- D. INDEXES FOR PERFORMANCE
-- =====================================================

-- Indexes for speaking test results
create index if not exists idx_speaking_test_results_user_id on public.speaking_test_results(user_id);
create index if not exists idx_speaking_test_results_test_date on public.speaking_test_results(test_date desc);
create index if not exists idx_speaking_test_results_level on public.speaking_test_results(recommended_level);
create index if not exists idx_speaking_test_results_score on public.speaking_test_results(overall_score desc);

-- Indexes for prompts
create index if not exists idx_speaking_test_prompts_phase on public.speaking_test_prompts(phase);
create index if not exists idx_speaking_test_prompts_type on public.speaking_test_prompts(prompt_type);
create index if not exists idx_speaking_test_prompts_active on public.speaking_test_prompts(is_active);

-- Indexes for vocabulary
create index if not exists idx_cefr_vocabulary_level on public.cefr_vocabulary(level);
create index if not exists idx_cefr_vocabulary_word on public.cefr_vocabulary(word);

-- =====================================================
-- E. RPC FUNCTIONS
-- =====================================================

-- Function to save speaking test result
create or replace function public.save_speaking_test_result(
  p_overall_score integer,
  p_recommended_level text,
  p_pronunciation_score integer,
  p_grammar_score integer,
  p_vocabulary_score integer,
  p_fluency_score integer,
  p_comprehension_score integer,
  p_test_duration integer,
  p_transcript jsonb,
  p_detailed_feedback jsonb,
  p_words_per_minute numeric,
  p_unique_words_count integer,
  p_grammar_errors_count integer,
  p_pronunciation_issues jsonb,
  p_test_type text default 'full'
)
returns jsonb
language plpgsql
security definer
volatile
as $$
declare
  v_user_id uuid := auth.uid();
  v_result speaking_test_results%rowtype;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = 'P0001';
  end if;

  insert into public.speaking_test_results(
    user_id,
    overall_score,
    recommended_level,
    pronunciation_score,
    grammar_score,
    vocabulary_score,
    fluency_score,
    comprehension_score,
    test_duration,
    transcript,
    detailed_feedback,
    words_per_minute,
    unique_words_count,
    grammar_errors_count,
    pronunciation_issues,
    test_type
  ) values (
    v_user_id,
    p_overall_score,
    p_recommended_level,
    p_pronunciation_score,
    p_grammar_score,
    p_vocabulary_score,
    p_fluency_score,
    p_comprehension_score,
    p_test_duration,
    p_transcript,
    p_detailed_feedback,
    p_words_per_minute,
    p_unique_words_count,
    p_grammar_errors_count,
    p_pronunciation_issues,
    p_test_type
  )
  returning * into v_result;

  return to_jsonb(v_result);
end;
$$;

-- Function to get user's test history
create or replace function public.get_user_test_history(
  p_limit integer default 10
)
returns jsonb
language plpgsql
security definer
stable
as $$
declare
  v_user_id uuid := auth.uid();
  v_results jsonb;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = 'P0001';
  end if;

  select jsonb_agg(
    jsonb_build_object(
      'id', id,
      'test_date', test_date,
      'overall_score', overall_score,
      'recommended_level', recommended_level,
      'pronunciation_score', pronunciation_score,
      'grammar_score', grammar_score,
      'vocabulary_score', vocabulary_score,
      'fluency_score', fluency_score,
      'comprehension_score', comprehension_score,
      'test_duration', test_duration,
      'words_per_minute', words_per_minute,
      'test_type', test_type
    )
  ) into v_results
  from public.speaking_test_results
  where user_id = v_user_id
    and is_completed = true
  order by test_date desc
  limit p_limit;

  return coalesce(v_results, '[]'::jsonb);
end;
$$;

-- Function to get random test prompts for each phase
create or replace function public.get_test_prompts()
returns jsonb
language plpgsql
security definer
stable
as $$
declare
  v_prompts jsonb;
begin
  select jsonb_agg(
    jsonb_build_object(
      'phase', phase,
      'phase_name', phase_name,
      'prompt_type', prompt_type,
      'title', title,
      'instructions', instructions,
      'content', content,
      'image_url', image_url,
      'audio_url', audio_url,
      'time_limit', time_limit,
      'evaluation_criteria', evaluation_criteria
    )
  ) into v_prompts
  from (
    select distinct on (phase) *
    from public.speaking_test_prompts
    where is_active = true
    order by phase, random()
  ) sorted_prompts
  order by phase;

  return coalesce(v_prompts, '[]'::jsonb);
end;
$$;

-- Function to check vocabulary level
create or replace function public.check_vocabulary_level(
  p_words text[]
)
returns jsonb
language plpgsql
security definer
stable
as $$
declare
  v_result jsonb;
begin
  select jsonb_build_object(
    'total_words', array_length(p_words, 1),
    'recognized_words', count(*),
    'level_breakdown', jsonb_object_agg(
      level,
      count(*)
    ),
    'average_level', (
      case
        when avg(case level
          when 'A1' then 1
          when 'A2' then 2
          when 'B1' then 3
          when 'B2' then 4
          when 'C1' then 5
          when 'C2' then 6
        end) <= 1.5 then 'A1'
        when avg(case level
          when 'A1' then 1
          when 'A2' then 2
          when 'B1' then 3
          when 'B2' then 4
          when 'C1' then 5
          when 'C2' then 6
        end) <= 2.5 then 'A2'
        when avg(case level
          when 'A1' then 1
          when 'A2' then 2
          when 'B1' then 3
          when 'B2' then 4
          when 'C1' then 5
          when 'C2' then 6
        end) <= 3.5 then 'B1'
        when avg(case level
          when 'A1' then 1
          when 'A2' then 2
          when 'B1' then 3
          when 'B2' then 4
          when 'C1' then 5
          when 'C2' then 6
        end) <= 4.5 then 'B2'
        when avg(case level
          when 'A1' then 1
          when 'A2' then 2
          when 'B1' then 3
          when 'B2' then 4
          when 'C1' then 5
          when 'C2' then 6
        end) <= 5.5 then 'C1'
        else 'C2'
      end
    )
  ) into v_result
  from public.cefr_vocabulary
  where word = any(p_words);

  return coalesce(v_result, jsonb_build_object('total_words', array_length(p_words, 1), 'recognized_words', 0));
end;
$$;

-- =====================================================
-- F. SAMPLE DATA
-- =====================================================

-- Insert sample test prompts
insert into public.speaking_test_prompts (phase, phase_name, level_range, prompt_type, title, instructions, content, time_limit, evaluation_criteria) values
-- Phase 1: Introduction
(1, 'Introduction', '{A1,A2,B1,B2,C1,C2}', 'introduction', 'Personal Introduction',
 'Please introduce yourself. Tell me your name, where you are from, and what you like to do in your free time.',
 'This is a warm-up to help you feel comfortable. Speak naturally and don''t worry about making mistakes.',
 120,
 '{"pronunciation": "Clear articulation of basic words", "grammar": "Simple present tense usage", "vocabulary": "Basic personal vocabulary", "fluency": "Natural pace without long pauses"}'),

-- Phase 2: Picture Description
(2, 'Description', '{A1,A2,B1,B2,C1,C2}', 'description', 'Describe the Scene',
 'Look at this image and describe what you see. Talk about the people, objects, colors, and what you think is happening.',
 'Take your time to observe the details. Use descriptive language and try to paint a picture with your words.',
 180,
 '{"vocabulary": "Range of descriptive adjectives", "grammar": "Present continuous and descriptive structures", "organization": "Logical flow of description"}'),

-- Phase 3: Storytelling
(3, 'Storytelling', '{A2,B1,B2,C1,C2}', 'storytelling', 'Tell a Story',
 'Tell me about a memorable experience you had. It could be a trip, celebration, or any interesting event from your life.',
 'Focus on telling a complete story with a beginning, middle, and end. Include details about what happened and how you felt.',
 180,
 '{"grammar": "Past tense accuracy", "narrative": "Story structure and coherence", "vocabulary": "Range of past time expressions", "engagement": "Ability to maintain listener interest"}'),

-- Phase 4: Opinion Discussion
(4, 'Discussion', '{B1,B2,C1,C2}', 'discussion', 'Share Your Opinion',
 'Do you think social media has a positive or negative impact on society? Share your opinion and explain your reasons.',
 'This is your chance to express your thoughts and support them with examples or personal experiences.',
 240,
 '{"argumentation": "Clear position and supporting reasons", "vocabulary": "Opinion-expressing language", "grammar": "Complex sentence structures", "critical_thinking": "Depth of analysis"}'),

-- Phase 5: Comparison and Contrast
(5, 'Comparison', '{A2,B1,B2,C1,C2}', 'comparison', 'Compare and Contrast',
 'Compare living in a big city versus living in a small town. Which lifestyle do you prefer and why? Speak for at least 30 seconds.',
 'Think about differences in lifestyle, opportunities, community, cost of living, and quality of life. Provide clear reasoning for your preference.',
 180,
 '{"analysis": "Clear comparison of both options with specific differences", "reasoning": "Logical explanation of preference with supporting arguments", "examples": "Use of concrete examples to illustrate points", "clarity": "Well-structured response with clear contrasts"}');

-- Insert sample CEFR vocabulary (basic set)
insert into public.cefr_vocabulary (word, level, word_type, frequency_score) values
-- A1 Level
('hello', 'A1', 'phrase', 10),
('name', 'A1', 'noun', 10),
('good', 'A1', 'adjective', 10),
('like', 'A1', 'verb', 10),
('have', 'A1', 'verb', 10),
('go', 'A1', 'verb', 10),
('come', 'A1', 'verb', 10),
('see', 'A1', 'verb', 10),
('big', 'A1', 'adjective', 9),
('small', 'A1', 'adjective', 9),

-- A2 Level
('experience', 'A2', 'noun', 8),
('interesting', 'A2', 'adjective', 8),
('different', 'A2', 'adjective', 8),
('important', 'A2', 'adjective', 8),
('usually', 'A2', 'adverb', 7),
('sometimes', 'A2', 'adverb', 8),
('because', 'A2', 'phrase', 9),
('although', 'A2', 'phrase', 6),

-- B1 Level
('opportunity', 'B1', 'noun', 6),
('definitely', 'B1', 'adverb', 6),
('particularly', 'B1', 'adverb', 5),
('consider', 'B1', 'verb', 6),
('society', 'B1', 'noun', 6),
('influence', 'B1', 'verb', 5),
('obviously', 'B1', 'adverb', 5),

-- B2 Level
('nevertheless', 'B2', 'adverb', 4),
('consequently', 'B2', 'adverb', 4),
('significant', 'B2', 'adjective', 5),
('analyze', 'B2', 'verb', 4),
('perspective', 'B2', 'noun', 4),
('contemporary', 'B2', 'adjective', 3),

-- C1 Level
('sophisticated', 'C1', 'adjective', 3),
('phenomenon', 'C1', 'noun', 3),
('comprehensive', 'C1', 'adjective', 3),
('implications', 'C1', 'noun', 3),
('prevalent', 'C1', 'adjective', 2),

-- C2 Level
('ubiquitous', 'C2', 'adjective', 2),
('paradigm', 'C2', 'noun', 2),
('nuanced', 'C2', 'adjective', 2),
('intrinsic', 'C2', 'adjective', 2),
('juxtaposition', 'C2', 'noun', 1);

-- =====================================================
-- G. ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
alter table public.speaking_test_results enable row level security;
alter table public.speaking_test_prompts enable row level security;
alter table public.cefr_vocabulary enable row level security;

-- RLS policies for speaking_test_results
create policy "Users can view own test results" on public.speaking_test_results
  for select using (auth.uid() = user_id);

create policy "Users can insert own test results" on public.speaking_test_results
  for insert with check (auth.uid() = user_id);

-- RLS policies for speaking_test_prompts (read-only for authenticated users)
create policy "Authenticated users can view active prompts" on public.speaking_test_prompts
  for select using (auth.role() = 'authenticated' and is_active = true);

-- RLS policies for cefr_vocabulary (read-only for authenticated users)
create policy "Authenticated users can view vocabulary" on public.cefr_vocabulary
  for select using (auth.role() = 'authenticated');

-- =====================================================
-- H. GRANTS AND PERMISSIONS
-- =====================================================

-- Grant permissions for tables
grant select, insert on public.speaking_test_results to authenticated;
grant select on public.speaking_test_prompts to authenticated;
grant select on public.cefr_vocabulary to authenticated;

-- Grant permissions for functions
grant execute on function public.save_speaking_test_result(integer, text, integer, integer, integer, integer, integer, integer, jsonb, jsonb, numeric, integer, integer, jsonb, text) to authenticated;
grant execute on function public.get_user_test_history(integer) to authenticated;
grant execute on function public.get_test_prompts() to authenticated;
grant execute on function public.check_vocabulary_level(text[]) to authenticated;

-- =====================================================
-- I. VERIFICATION QUERIES
-- =====================================================

-- Verify tables exist:
-- select table_name from information_schema.tables where table_schema = 'public' and table_name like '%speaking%';

-- Verify functions exist:
-- select proname from pg_proc where proname like '%speaking%' or proname like '%vocabulary%';

-- Test prompts retrieval:
-- select public.get_test_prompts();

-- Test vocabulary check:
-- select public.check_vocabulary_level(array['hello', 'sophisticated', 'ubiquitous']);