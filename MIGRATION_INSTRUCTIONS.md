# Database Migration Instructions

## Apply Migration: Add Capacity and Level Code

### Steps to Apply Migration

1. **Open Supabase SQL Editor**
   - **Direct link:** [https://supabase.com/dashboard/project/sgzhbiknaiqsuknwgvjr/sql/new](https://supabase.com/dashboard/project/sgzhbiknaiqsuknwgvjr/sql/new)
   - Or manually: Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → SQL Editor → New Query

2. **Copy Migration SQL**
   - Open file: `supabase/migrations/20251231_add_capacity_level_code.sql`
   - Select all (Ctrl+A / Cmd+A) and copy (Ctrl+C / Cmd+C)

3. **Execute Migration**
   - Paste the SQL into the Supabase SQL Editor
   - Click the green "Run" button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for "Success. No rows returned" message

4. **Test immediately**
   - Go back to your app and try creating a meeting
   - The error should be gone!

5. **Verify Migration (Optional)**
   - Run this verification query in SQL Editor:
   ```sql
   -- Check if columns exist
   SELECT column_name, data_type, column_default
   FROM information_schema.columns
   WHERE table_name = 'meetings'
   AND column_name IN ('capacity', 'level_code');

   -- Test the helper function
   SELECT public.get_section_name('A1') as section_a1,
          public.get_section_name('B2') as section_b2,
          public.get_section_name('C2') as section_c2;

   -- Check if views include new fields
   SELECT column_name
   FROM information_schema.columns
   WHERE table_name = 'admin_meetings'
   AND column_name IN ('capacity', 'level_code', 'section_name');
   ```

6. **Expected Results**
   - You should see `capacity` (integer, default 20) and `level_code` (text, default 'general')
   - Helper function should return: "A1 / Apples", "B2 / Blueberry", "C2 / Coconut"
   - All three columns should appear in admin_meetings view

### What This Migration Does

✅ **Adds new columns:**
- `capacity` (integer, 1-100, default 20) - Max number of attendees
- `level_code` (text, A1-C2 or 'general', default 'general') - CEFR proficiency level

✅ **Adds helper function:**
- `get_section_name(level_code)` - Converts level codes to display format (e.g., "A1 / Apples", "B2 / Blueberry")

✅ **Updates database functions:**
- `create_meeting()` - Now accepts capacity and level_code parameters (alphabetical order)
- `update_meeting()` - Now accepts capacity and level_code parameters (alphabetical order)

✅ **Updates views:**
- `admin_meetings` - Includes capacity, level_code, and computed section_name field
- `public_meetings` - Includes capacity, level_code, and computed section_name field

✅ **Sets default values:**
- All existing meetings get capacity=20 and level_code='general'

✅ **Section name mapping:**
- A1 → "A1 / Apples"
- A2 → "A2 / Avocado"
- B1 → "B1 / Banana"
- B2 → "B2 / Blueberry"
- C1 → "C1 / Cherry"
- C2 → "C2 / Coconut"
- general → "General"

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
