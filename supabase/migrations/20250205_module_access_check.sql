-- Module Access Security Check RPC Function
-- Part of the Godly Lockdown System
-- Validates if a user has permission to access a specific module

CREATE OR REPLACE FUNCTION public.check_module_access(
  p_user_id UUID,
  p_level TEXT,
  p_module_id INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_has_placement BOOLEAN;
  v_recommended_level TEXT;
  v_previous_module_id INTEGER;
  v_previous_module_completed BOOLEAN;
  v_level_order TEXT[] := ARRAY['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  v_requested_level_index INTEGER;
  v_recommended_level_index INTEGER;
BEGIN
  -- SECURITY CHECK 1: User must have taken placement test
  SELECT EXISTS(
    SELECT 1
    FROM public.speaking_test_results
    WHERE user_id = p_user_id
    LIMIT 1
  ) INTO v_has_placement;

  IF NOT v_has_placement THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'no_placement_test',
      'message', 'You must complete the placement test before accessing lessons',
      'action', 'take_placement_test'
    );
  END IF;

  -- SECURITY CHECK 2: Get user's recommended level from placement test
  SELECT recommended_level INTO v_recommended_level
  FROM public.speaking_test_results
  WHERE user_id = p_user_id
  ORDER BY created_at DESC
  LIMIT 1;

  -- SECURITY CHECK 3: Validate requested level is not below placement level
  v_requested_level_index := array_position(v_level_order, p_level);
  v_recommended_level_index := array_position(v_level_order, v_recommended_level);

  IF v_requested_level_index < v_recommended_level_index THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'below_placement_level',
      'message', format('This module is below your level (%s). Start from %s modules.', v_recommended_level, v_recommended_level),
      'recommended_level', v_recommended_level
    );
  END IF;

  -- SECURITY CHECK 4: First modules of each level are always accessible (after placement)
  IF p_module_id IN (1, 51, 101, 151, 201, 251) THEN
    RETURN json_build_object(
      'allowed', true,
      'reason', 'level_start_module',
      'message', 'Access granted to level starting module'
    );
  END IF;

  -- SECURITY CHECK 5: Check if previous module is completed
  v_previous_module_id := p_module_id - 1;

  SELECT COALESCE(is_module_completed, false) INTO v_previous_module_completed
  FROM public.lesson_progress
  WHERE user_id = p_user_id
    AND level = p_level
    AND module_id = v_previous_module_id;

  IF v_previous_module_completed IS NULL OR v_previous_module_completed = false THEN
    RETURN json_build_object(
      'allowed', false,
      'reason', 'previous_incomplete',
      'message', format('Complete Module %s first to unlock Module %s', v_previous_module_id, p_module_id),
      'required_module', v_previous_module_id
    );
  END IF;

  -- All security checks passed - grant access
  RETURN json_build_object(
    'allowed', true,
    'reason', 'authorized',
    'message', 'Access granted'
  );

EXCEPTION WHEN OTHERS THEN
  -- Log error and deny access on any database error
  RAISE WARNING 'Module access check error for user % module %: %', p_user_id, p_module_id, SQLERRM;
  RETURN json_build_object(
    'allowed', false,
    'reason', 'error',
    'message', 'Unable to verify access permissions. Please try again.',
    'error', SQLERRM
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.check_module_access(UUID, TEXT, INTEGER) TO authenticated;

-- Add comment for documentation
COMMENT ON FUNCTION public.check_module_access IS 'Security function to validate if a user can access a specific module based on placement test and progress';
