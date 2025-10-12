# 🚀 Apply B2 Modules Migration (151-160)

## Quick Steps to Add Your B2 Modules

### Option 1: Using Supabase Dashboard (RECOMMENDED - Easiest)

1. **Open your Supabase project dashboard** at https://supabase.com/dashboard

2. **Navigate to SQL Editor**:
   - Click on the **SQL Editor** icon in the left sidebar (looks like `</>`)
   - Click **"New Query"**

3. **Copy the migration file**:
   - Open `supabase/migrations/20260101_b2_modules_151_160.sql`
   - Copy the ENTIRE file contents (Ctrl+A, Ctrl+C)

4. **Paste and Execute**:
   - Paste into the SQL Editor
   - Click **"Run"** (or press Ctrl+Enter)
   - Wait for "Success" message

5. **Verify**:
   ```sql
   -- Run this query to verify modules were added:
   SELECT module_number, title, level
   FROM public.modules
   WHERE module_number BETWEEN 151 AND 160
   ORDER BY module_number;
   ```

   You should see 10 rows returned.

6. **Verify Q&A counts**:
   ```sql
   -- Run this to check all Q&A pairs were inserted:
   SELECT
     m.module_number,
     m.title,
     COUNT(qa.id) as qa_count
   FROM public.modules m
   LEFT JOIN public.speaking_qa qa ON qa.module_id = m.id
   WHERE m.module_number BETWEEN 151 AND 160
   GROUP BY m.module_number, m.title
   ORDER BY m.module_number;
   ```

   Expected counts:
   - Modules 151-155, 158: 40 Q&As each
   - Modules 156, 157, 159, 160: 41 Q&As each
   - **Total: 404 Q&A pairs**

---

### Option 2: Using Supabase CLI (If you prefer command line)

1. **Link your project** (one-time setup):
   ```bash
   cd C:/Users/Mohammad/Downloads/tomass-main/tomass-main
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

   Find your project ref at: https://supabase.com/dashboard/project/_/settings/general

2. **Push the migration**:
   ```bash
   npx supabase db push
   ```

---

## 🎯 What This Migration Does

✅ Adds **10 advanced B2 modules** (151-160):
- Module 151: Future Perfect Continuous
- Module 152: Passive Voice (Past/Future Perfect)
- Module 153: Reported Speech – Mixed Tenses
- Module 154: Inversion for Emphasis
- Module 155: Ellipsis and Substitution
- Module 156: Nominalisation
- Module 157: Advanced Linking Words
- Module 158: Complex Conditionals
- Module 159: Unreal Past for Present
- Module 160: Unreal Past for Past

✅ Inserts **404 Q&A pairs** across all modules

✅ Adds performance indexes for fast queries

✅ Handles empty arrays properly for specific modules

---

## 🐛 Troubleshooting

**Problem**: "relation 'public.modules' does not exist"
- **Solution**: Make sure you've already created the base tables. Check your earlier migrations.

**Problem**: "duplicate key value violates unique constraint"
- **Solution**: Modules 151-160 already exist. You can skip or delete them first:
  ```sql
  DELETE FROM public.speaking_qa
  WHERE module_id IN (
    SELECT id FROM public.modules WHERE module_number BETWEEN 151 AND 160
  );

  DELETE FROM public.modules WHERE module_number BETWEEN 151 AND 160;
  ```
  Then re-run the migration.

**Problem**: Migration runs but B2 modules still don't show
- **Solution**: Clear your browser cache and refresh the page (Ctrl+F5)

---

## ✨ After Migration Success

Once applied, refresh your app at http://localhost:8085 and:

1. Navigate to **Lessons** → **B2 Level**
2. You should now see **10 new modules** (151-160)
3. Each module has 40-41 Q&A pairs ready to practice
4. Special UI enhancements automatically active for modules 154-157

---

## 📞 Need Help?

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Verify your database connection is active
3. Ensure you have the correct permissions
