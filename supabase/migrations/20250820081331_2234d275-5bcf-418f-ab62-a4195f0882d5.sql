-- Update user_profiles table to have proper XP tracking
-- Rename existing 'xp' column to 'xp_current' and add 'xp_total'
ALTER TABLE public.user_profiles 
  RENAME COLUMN xp TO xp_current;

ALTER TABLE public.user_profiles 
  ADD COLUMN xp_total INTEGER NOT NULL DEFAULT 0;

-- Update existing records to set xp_total = xp_current for consistency
UPDATE public.user_profiles 
SET xp_total = xp_current 
WHERE xp_total = 0;

-- Create function to calculate XP threshold for a given level
CREATE OR REPLACE FUNCTION public.get_xp_threshold(target_level INTEGER)
RETURNS INTEGER
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT (target_level * 100) + ((target_level - 1) * 50);
$$;

-- Create function to award XP and handle level-ups atomically
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
  
  -- Update the user profile atomically
  UPDATE public.user_profiles
  SET 
    level = new_level,
    xp_current = new_xp_current,
    xp_total = new_xp_total,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Calculate next threshold
  level_threshold := get_xp_threshold(new_level + 1);
  
  -- Return the result as JSON
  SELECT json_build_object(
    'level', new_level,
    'xp_current', new_xp_current,
    'xp_total', new_xp_total,
    'next_threshold', level_threshold,
    'level_up_occurred', level_up_occurred,
    'points_awarded', p_points
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Enable realtime for user_profiles table
ALTER TABLE public.user_profiles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_profiles;