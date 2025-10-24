# Admin Guide: Managing Meetings via Supabase Studio

This guide explains how administrators can manage meetings using Supabase Studio after the admin panel was removed from the mobile app for Apple App Store compliance.

## Table of Contents
- [Why Supabase Studio?](#why-supabase-studio)
- [Accessing Supabase Studio](#accessing-supabase-studio)
- [Meeting Fields Reference](#meeting-fields-reference)
- [Common Tasks](#common-tasks)
- [SQL Queries Reference](#sql-queries-reference)
- [Viewing RSVPs](#viewing-rsvps)

---

## Why Supabase Studio?

The admin panel was removed from the mobile app to comply with Apple App Store Guideline 3.2.2, which prohibits apps with remotely configurable content that bypasses App Store review.

**Benefits of using Supabase Studio:**
- ✅ 100% Apple App Store compliant
- ✅ Full database access with powerful query capabilities
- ✅ No additional code to maintain
- ✅ Built-in data export/import
- ✅ Realtime monitoring and logging

---

## Accessing Supabase Studio

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: Click on your TOMASS project
3. **Navigate to Table Editor**: Click "Table Editor" in the left sidebar
4. **Select the `admin_meetings` table**

---

## Meeting Fields Reference

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | text | Meeting title (min 3 chars) | "Weekly English Practice Session" |
| `meeting_url` | text | Full meeting URL | "https://meet.google.com/abc-def-ghi" |
| `starts_at` | timestamptz | Start date and time (ISO format) | "2025-02-01 15:00:00+00" |
| `ends_at` | timestamptz | End date and time (auto-calculated) | "2025-02-01 16:00:00+00" |
| `level_code` | text | CEFR level or "general" | "B2" |
| `capacity` | int4 | Max attendees (1-100) | 20 |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `description` | text | Meeting description | "Practice conversation skills" |
| `is_active` | boolean | Visibility to users | true (default) |

### Auto-populated Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | uuid | Unique identifier (auto-generated) |
| `created_by` | uuid | Admin user ID (auto-populated) |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |
| `scheduled_at` | timestamptz | Computed from starts_at |
| `duration_minutes` | int4 | Computed from ends_at - starts_at |
| `section_name` | text | Computed from level_code |

### Valid Level Codes

- `general` - General / All Levels
- `A1` - A1 / Apples (Beginner I)
- `A2` - A2 / Avocado (Beginner II)
- `B1` - B1 / Banana (Intermediate I)
- `B2` - B2 / Blueberry (Intermediate II)
- `C1` - C1 / Cherry (Advanced I)
- `C2` - C2 / Coconut (Advanced II)

---

## Common Tasks

### 1. Create a New Meeting

**Using Table Editor:**
1. Click "Insert row" button in Supabase Studio
2. Fill in the required fields:
   ```
   title: "English Conversation Practice"
   description: "Weekly conversation practice session"
   meeting_url: "https://meet.google.com/xyz-abc-123"
   starts_at: "2025-02-15 14:00:00+00"  (UTC timezone)
   ends_at: "2025-02-15 15:00:00+00"    (1 hour duration)
   level_code: "B2"
   capacity: 20
   is_active: true
   ```
3. Click "Save"

**Using SQL Editor:**
```sql
INSERT INTO admin_meetings (
  title,
  description,
  meeting_url,
  starts_at,
  ends_at,
  level_code,
  capacity,
  is_active
) VALUES (
  'English Conversation Practice',
  'Weekly conversation practice session',
  'https://meet.google.com/xyz-abc-123',
  '2025-02-15 14:00:00+00',  -- UTC timezone
  '2025-02-15 15:00:00+00',  -- 1 hour duration
  'B2',
  20,
  true
);
```

### 2. Edit a Meeting

**Using Table Editor:**
1. Find the meeting in the `admin_meetings` table
2. Click on the row to expand it
3. Edit the desired fields
4. Click "Save"

**Using SQL Editor:**
```sql
UPDATE admin_meetings
SET
  title = 'Updated Meeting Title',
  description = 'Updated description',
  starts_at = '2025-02-20 15:00:00+00',
  ends_at = '2025-02-20 16:30:00+00',
  capacity = 25
WHERE id = 'your-meeting-id-here';
```

### 3. Hide a Meeting (make invisible to users)

**Using Table Editor:**
1. Find the meeting
2. Set `is_active` to `false`
3. Click "Save"

**Using SQL Editor:**
```sql
UPDATE admin_meetings
SET is_active = false
WHERE id = 'your-meeting-id-here';
```

### 4. Delete a Meeting

**Using Table Editor:**
1. Find the meeting
2. Click the delete icon (trash can)
3. Confirm deletion

**Using SQL Editor:**
```sql
DELETE FROM admin_meetings
WHERE id = 'your-meeting-id-here';
```

---

## SQL Queries Reference

### View All Upcoming Meetings
```sql
SELECT
  title,
  starts_at,
  ends_at,
  level_code,
  section_name,
  capacity,
  is_active,
  meeting_url
FROM admin_meetings
WHERE starts_at > NOW()
  AND is_active = true
ORDER BY starts_at ASC;
```

### View Meetings by Level
```sql
SELECT
  title,
  starts_at,
  level_code,
  capacity
FROM admin_meetings
WHERE level_code = 'B2'  -- Change to desired level
  AND is_active = true
ORDER BY starts_at ASC;
```

### Find Meetings This Week
```sql
SELECT
  title,
  starts_at,
  duration_minutes,
  capacity
FROM admin_meetings
WHERE starts_at >= DATE_TRUNC('week', NOW())
  AND starts_at < DATE_TRUNC('week', NOW()) + INTERVAL '1 week'
  AND is_active = true
ORDER BY starts_at ASC;
```

### View Past Meetings (for analytics)
```sql
SELECT
  title,
  starts_at,
  ends_at,
  level_code
FROM admin_meetings
WHERE starts_at < NOW()
ORDER BY starts_at DESC
LIMIT 20;
```

### Create Recurring Weekly Meeting (4 weeks)
```sql
INSERT INTO admin_meetings (
  title, description, meeting_url,
  starts_at, ends_at, level_code, capacity
)
SELECT
  'Weekly B2 Conversation Practice',
  'Practice advanced conversation skills',
  'https://meet.google.com/xyz-abc-123',
  '2025-02-15 14:00:00+00'::timestamptz + (n || ' weeks')::interval,
  '2025-02-15 15:00:00+00'::timestamptz + (n || ' weeks')::interval,
  'B2',
  20
FROM generate_series(0, 3) AS n;
```

---

## Viewing RSVPs

### Check RSVP Counts for a Meeting
```sql
SELECT
  m.title,
  m.starts_at,
  m.capacity,
  COUNT(*) FILTER (WHERE r.status = 'yes') AS yes_count,
  COUNT(*) FILTER (WHERE r.status = 'maybe') AS maybe_count,
  COUNT(*) FILTER (WHERE r.status = 'no') AS no_count,
  COUNT(*) AS total_rsvps
FROM admin_meetings m
LEFT JOIN meeting_rsvps r ON m.id = r.meeting_id
WHERE m.id = 'your-meeting-id-here'
GROUP BY m.id, m.title, m.starts_at, m.capacity;
```

### View All RSVPs with User Details
```sql
SELECT
  m.title AS meeting_title,
  m.starts_at,
  p.full_name AS user_name,
  r.status AS rsvp_status,
  r.created_at AS rsvp_date
FROM meeting_rsvps r
JOIN admin_meetings m ON r.meeting_id = m.id
JOIN profiles p ON r.user_id = p.user_id
WHERE m.id = 'your-meeting-id-here'
ORDER BY r.created_at DESC;
```

### Find Meetings Near Capacity
```sql
SELECT
  m.title,
  m.starts_at,
  m.capacity,
  COUNT(*) FILTER (WHERE r.status = 'yes') AS confirmed_attendees,
  ROUND(COUNT(*) FILTER (WHERE r.status = 'yes')::numeric / m.capacity * 100, 0) AS fill_percentage
FROM admin_meetings m
LEFT JOIN meeting_rsvps r ON m.id = r.meeting_id
WHERE m.is_active = true
  AND m.starts_at > NOW()
GROUP BY m.id, m.title, m.starts_at, m.capacity
HAVING COUNT(*) FILTER (WHERE r.status = 'yes') >= m.capacity * 0.8
ORDER BY fill_percentage DESC;
```

---

## Tips and Best Practices

### Timezone Handling
- **Always use UTC timestamps** in `starts_at` and `ends_at` fields
- The app automatically converts to user's local timezone
- Example UTC times:
  - `2025-02-15 14:00:00+00` = 2pm UTC
  - `2025-02-15 09:00:00+00` = 9am UTC

### Meeting URLs
- Use full URLs including `https://`
- Supported platforms: Google Meet, Zoom, Microsoft Teams, etc.
- Example: `https://meet.google.com/abc-def-ghi`

### Capacity Planning
- Default capacity: 20 attendees
- Recommended range: 5-30 for effective conversation practice
- Set higher (up to 100) for presentations/lectures

### Level Code Recommendations
- Use `general` for mixed-level sessions
- Use specific levels (A1, B2, etc.) for targeted practice
- Group similar levels together (A1+A2 or B1+B2)

---

## Troubleshooting

### Meeting Not Showing in App
Check:
1. `is_active` is set to `true`
2. `starts_at` is in the future
3. `starts_at` is within the next 7 days (app shows meetings up to 7 days ahead)

### Invalid Level Code Error
Ensure `level_code` is one of:
- `general`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`

### Capacity Errors
- Capacity must be between 1 and 100
- Cannot reduce capacity below current "yes" RSVPs

---

## Support

For technical issues or questions:
- Check Supabase logs: Dashboard → Logs
- View realtime updates: Dashboard → Table Editor (realtime mode)
- Database errors: Dashboard → SQL Editor → View query history

---

**Last Updated**: January 2025
**App Version**: Production v2.0
**Database Schema**: admin_meetings v2
