# 🚀 Apply Migrations - Step by Step Guide

## Problem
You got the error: `relation "public.modules" does not exist`

This is because the `modules` and `speaking_qa` tables were never created in your database.

## Solution
Apply **2 migrations** in the correct order:

---

## ✅ Step 1: Apply Schema Migration (Creates Tables)

### File Location
```
C:\Users\Mohammad\Downloads\tomass-main\tomass-main\supabase\migrations\20260101_create_modules_schema.sql
```

### Steps:
1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. **Click SQL Editor** (left sidebar, `</>` icon)
3. **Click "New Query"**
4. **Open the file** `20260101_create_modules_schema.sql` in VS Code or Notepad
5. **Copy ALL contents** (Ctrl+A, then Ctrl+C)
6. **Paste into SQL Editor**
7. **Click "Run"** (or Ctrl+Enter)
8. **Wait for "Success" message**

### What This Does:
✅ Creates `modules` table (stores lesson metadata)
✅ Creates `speaking_qa` table (stores Q&A pairs)
✅ Adds indexes for fast queries
✅ Sets up Row Level Security (RLS)
✅ Creates helper functions
✅ Adds auto-update timestamps

---

## ✅ Step 2: Apply B2 Modules Migration (Inserts Data)

### File Location
```
C:\Users\Mohammad\Downloads\tomass-main\tomass-main\supabase\migrations\20260101_b2_modules_151_160.sql
```

### Steps:
1. **Still in SQL Editor** (same page)
2. **Click "New Query"** again
3. **Open the file** `20260101_b2_modules_151_160.sql`
4. **Copy ALL contents** (Ctrl+A, then Ctrl+C)
5. **Paste into SQL Editor**
6. **Click "Run"** (or Ctrl+Enter)
7. **Wait for "Success" message** (this one takes ~5-10 seconds)

### What This Does:
✅ Inserts 10 B2 modules (151-160)
✅ Inserts 404 Q&A pairs
✅ Handles empty arrays properly
✅ Creates performance indexes

---

## ✅ Step 3: Verify Everything Worked

Run this query in SQL Editor to verify:

```sql
-- Check modules were created
SELECT module_number, title, level
FROM public.modules
WHERE module_number BETWEEN 151 AND 160
ORDER BY module_number;
```

**Expected Result**: 10 rows showing modules 151-160

Then run:

```sql
-- Check Q&A counts
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

**Expected Counts**:
- Modules 151-155, 158: **40 Q&As each**
- Modules 156, 157, 159, 160: **41 Q&As each**
- **Total: 404 Q&A pairs**

---

## ✅ Step 4: Test in Your App

1. Go to your app: http://localhost:8085
2. Navigate to **Lessons** → **B2 Level**
3. You should now see **10 new modules** (151-160) instead of "Content Coming Soon"
4. Click any module to test the Q&A pairs

---

## 🐛 Troubleshooting

### Error: "relation already exists"
**Solution**: Tables already created. Skip Step 1, go directly to Step 2.

### Error: "duplicate key value violates unique constraint"
**Solution**: B2 modules already exist. Run this first to clean up:
```sql
DELETE FROM public.speaking_qa
WHERE module_id IN (
  SELECT id FROM public.modules WHERE module_number BETWEEN 151 AND 160
);

DELETE FROM public.modules WHERE module_number BETWEEN 151 AND 160;
```
Then re-run Step 2.

### Modules still don't appear in app
**Solution**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check browser console for errors (F12)

### Need to reset everything
```sql
-- ⚠️ WARNING: This deletes ALL modules and Q&A pairs
DROP TABLE IF EXISTS public.speaking_qa CASCADE;
DROP TABLE IF EXISTS public.modules CASCADE;
```
Then start from Step 1 again.

---

## 📊 Quick Reference

| Migration File | Purpose | Run Order |
|---------------|---------|-----------|
| `20260101_create_modules_schema.sql` | Creates tables | **1st** |
| `20260101_b2_modules_151_160.sql` | Inserts B2 data | **2nd** |

---

## ✨ After Success

Once both migrations succeed:
- Your app will show all 10 B2 modules
- Students can practice 404 advanced Q&A pairs
- Special UI enhancements will work for modules 154-157
- You're production-ready with all 160 modules! 🎉

---

## 📞 Need Help?

If you encounter issues:
1. Check the Supabase Dashboard → Logs for error details
2. Verify your database connection is active
3. Make sure you ran Step 1 BEFORE Step 2
