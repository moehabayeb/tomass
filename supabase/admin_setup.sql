-- =====================================================
-- Admin Setup Script
-- =====================================================
-- Run this after the main migration to set up admin users
-- =====================================================

-- Option 1: Add specific user as admin (replace with your actual user ID)
-- Get your user ID first by running: SELECT id, email FROM auth.users ORDER BY created_at DESC;

-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR-UUID-HERE', 'admin')
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Option 2: Add user by email (replace with your actual email)
-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin'
-- FROM auth.users
-- WHERE email = 'your-email@example.com'
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Option 3: Make the first registered user an admin (for development)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
ORDER BY created_at ASC
LIMIT 1
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify admin setup
SELECT
  u.email,
  ur.role,
  ur.created_at as role_granted_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin';