# Admin Meetings System Setup

## Quick Setup (Development)

### 1. Run the Migration

Go to your Supabase dashboard: https://supabase.com/dashboard/project/sgzhbiknaiqsuknwgvjr/sql/new

Copy and paste the entire contents of `supabase/migrations/20250929_admin_meetings_complete.sql` and click **Run**.

### 2. Add Yourself as Admin

The migration automatically makes the first registered user an admin. If that's not you, run:

```sql
-- Option A: Add by email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Option B: Add by user ID (get ID from auth.users table)
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-uuid-here', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

### 3. Verify Setup

```sql
-- Check if you're admin
SELECT public.is_admin();

-- View all admins
SELECT u.email, ur.role, ur.created_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin';

-- Test meetings view
SELECT * FROM public.admin_meetings;
```

### 4. Test in App

1. Refresh your app at http://localhost:8085
2. Make sure you're signed in
3. Open the menu (top right) - **Admin** should appear at the bottom in red
4. Click Admin → Should load the meetings page without errors
5. Create a test meeting to verify everything works

## Expected Results

✅ Admin button appears in navigation menu
✅ `/rest/v1/admin_meetings` returns 200 with data
✅ No "Error loading meetings" message
✅ Can create, edit, delete meetings
✅ No 404s or PGRST202 errors in browser console

## Troubleshooting

### Admin button not showing
- Check if you're signed in
- Verify your user is in `user_roles` table with role='admin'
- Check browser console for errors

### "Error loading meetings"
- Verify migration was run completely
- Check that `admin_meetings` view exists
- Test the RPC functions manually in Supabase SQL editor

### 404 for admin_meetings
- The `admin_meetings` view wasn't created properly
- Re-run the migration

### PGRST202 errors
- Functions are missing or have wrong signatures
- Re-run the migration to create all functions

## Migration Contents

The `20250929_admin_meetings_complete.sql` migration creates:

- ✅ `user_roles` table for RBAC
- ✅ `meetings` table with proper schema
- ✅ `admin_meetings` view for REST API
- ✅ `meeting_rsvps` table for RSVPs
- ✅ `is_admin()` functions (both signatures)
- ✅ CRUD functions (create_meeting, update_meeting, etc.)
- ✅ RLS policies for admin-only access
- ✅ Proper grants and indexes
- ✅ Seed data for testing

## Database Schema

```sql
-- Core tables
user_roles (user_id, role)
meetings (id, title, description, meeting_url, scheduled_at, duration_minutes, is_active, created_by)
meeting_rsvps (meeting_id, user_id, status)

-- Views
admin_meetings (REST API endpoint)

-- Functions
is_admin() -> boolean
is_admin(check_user_id) -> boolean
create_meeting(...) -> json
update_meeting(...) -> json
delete_meeting(...) -> boolean
upsert_rsvp(...) -> json
```

## Security

- All tables have RLS enabled
- Only admins can read/write meetings
- Users can manage their own RSVPs
- All functions check admin permissions server-side
- SQL injection protection via prepared statements