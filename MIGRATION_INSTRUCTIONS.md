# Database Migration Instructions

## Apply Migration: Add Capacity and Level Code

### Steps to Apply Migration

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Navigate to your project: `sgzhbiknaiqsuknwgvjr`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query" button

3. **Copy Migration SQL**
   - Open file: `supabase/migrations/20251231_add_capacity_level_code.sql`
   - Copy the entire contents

4. **Execute Migration**
   - Paste the SQL into the Supabase SQL Editor
   - Click "Run" button
   - Wait for success confirmation

5. **Verify Migration**
   - Run this verification query:
   ```sql
   -- Check if columns exist
   SELECT column_name, data_type, column_default
   FROM information_schema.columns
   WHERE table_name = 'meetings'
   AND column_name IN ('capacity', 'level_code');

   -- Check if functions are updated
   SELECT routine_name, routine_type
   FROM information_schema.routines
   WHERE routine_schema = 'public'
   AND routine_name IN ('create_meeting', 'update_meeting');
   ```

6. **Expected Results**
   - You should see `capacity` and `level_code` columns in the meetings table
   - Functions should be present and callable

### What This Migration Does

✅ **Adds new columns:**
- `capacity` (integer, 1-100, default 20) - Max number of attendees
- `level_code` (text, A1-C2 or 'general', default 'general') - CEFR proficiency level

✅ **Updates database functions:**
- `create_meeting()` - Now accepts capacity and level_code parameters
- `update_meeting()` - Now accepts capacity and level_code parameters

✅ **Updates views:**
- `admin_meetings` - Includes capacity, level_code, and computed section_name
- `public_meetings` - Includes capacity, level_code, and computed section_name

✅ **Sets default values:**
- All existing meetings get capacity=20 and level_code='general'

### Troubleshooting

**Error: "permission denied"**
- Make sure you're logged into Supabase dashboard as the project owner

**Error: "column already exists"**
- This is safe to ignore - the migration is idempotent
- The `IF NOT EXISTS` clause prevents duplicate columns

**Error: "function already exists"**
- This is expected - we're using `CREATE OR REPLACE FUNCTION`
- The old function will be safely replaced with the new one

### After Migration

Once the migration is applied:

1. **Refresh your browser** - Clear any cached data
2. **Test creating a meeting** - Try creating a new meeting from the admin page
3. **Verify the error is gone** - The "Could not find function" error should be resolved
4. **Check meeting display** - Meetings should show capacity and level information

### Rollback (If Needed)

If you need to rollback this migration:

```sql
-- Remove new columns
ALTER TABLE public.meetings DROP COLUMN IF EXISTS capacity;
ALTER TABLE public.meetings DROP COLUMN IF EXISTS level_code;

-- Restore original create_meeting function
-- (Copy from supabase/migrations/20251229_admin_meetings_full.sql lines 178-237)

-- Restore original update_meeting function
-- (Copy from supabase/migrations/20251229_admin_meetings_full.sql lines 241-286)
```

---

**File Location:** `supabase/migrations/20251231_add_capacity_level_code.sql`
**Status:** Ready to apply ✅
