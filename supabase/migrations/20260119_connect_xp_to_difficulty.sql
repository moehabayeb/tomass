-- Connect XP Levels to Conversation Difficulty (Flawless Implementation)
-- This migration ensures that as users earn XP and level up,
-- their conversation difficulty automatically adjusts

-- Step 1: Create helper function to get difficulty level based on numeric level
CREATE OR REPLACE FUNCTION public.get_difficulty_from_level(p_level INTEGER)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN p_level >= 26 THEN 'advanced'::text
    WHEN p_level >= 11 THEN 'intermediate'::text
    ELSE 'beginner'::text
  END;
$$;

-- Step 2: Update existing award_xp function to auto-update user_level
CREATE OR REPLACE FUNCTION public.award_xp(
  p_user_id UUID,
  p_points INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  current_profile RECORD;
  new_xp_current INTEGER;
  new_xp_total INTEGER;
  new_level INTEGER;
  new_difficulty TEXT;
  level_threshold INTEGER;
  level_up_occurred BOOLEAN DEFAULT FALSE;
  result JSON;
BEGIN
  -- Get current user profile
  SELECT level, xp_current, xp_total
  INTO current_profile
  FROM public.user_profiles
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User profile not found';
  END IF;

  -- Calculate new XP values
  new_xp_current := current_profile.xp_current + p_points;
  new_xp_total := current_profile.xp_total + p_points;
  new_level := current_profile.level;

  -- Check for level-ups (handle multiple level-ups if enough XP)
  LOOP
    level_threshold := get_xp_threshold(new_level + 1);

    IF new_xp_current >= level_threshold THEN
      new_level := new_level + 1;
      new_xp_current := new_xp_current - level_threshold;
      level_up_occurred := TRUE;
    ELSE
      EXIT;
    END IF;
  END LOOP;

  -- 🎯 AUTOMATIC DIFFICULTY UPDATE - Based on new level
  new_difficulty := get_difficulty_from_level(new_level);

  -- Update the user profile atomically (XP + Level + Difficulty in one transaction)
  UPDATE public.user_profiles
  SET
    level = new_level,
    xp_current = new_xp_current,
    xp_total = new_xp_total,
    user_level = new_difficulty,
    updated_at = now()
  WHERE user_id = p_user_id;

  -- Calculate next threshold
  level_threshold := get_xp_threshold(new_level + 1);

  -- Return the result as JSON (now includes user_level)
  SELECT json_build_object(
    'level', new_level,
    'xp_current', new_xp_current,
    'xp_total', new_xp_total,
    'next_threshold', level_threshold,
    'user_level', new_difficulty,
    'level_up_occurred', level_up_occurred,
    'points_awarded', p_points
  ) INTO result;

  RETURN result;
END;
$$;

-- Step 3: Migrate existing users to correct difficulty based on current level
-- This ensures backward compatibility for users who already have XP
UPDATE public.user_profiles
SET user_level = get_difficulty_from_level(level)
WHERE user_level != get_difficulty_from_level(level);

-- Step 4: Add comment for documentation
COMMENT ON FUNCTION public.get_difficulty_from_level IS 'Maps numeric level to conversation difficulty (1-10=beginner, 11-25=intermediate, 26+=advanced)';
COMMENT ON FUNCTION public.award_xp IS 'Awards XP to user and automatically updates conversation difficulty based on level progression';
