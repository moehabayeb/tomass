-- =====================================================
-- MIGRATION: Add capacity and level_code to meetings
-- Date: 2025-12-31
-- Purpose: Add meeting capacity and CEFR level tracking
-- =====================================================

-- Add capacity column (1-100 students, default 20)
alter table public.meetings
add column if not exists capacity integer not null default 20
check (capacity >= 1 and capacity <= 100);

-- Add level_code column (CEFR levels A1-C2, or 'general')
alter table public.meetings
add column if not exists level_code text not null default 'general'
check (level_code in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'general'));

-- Update existing meetings to have default values
update public.meetings
set capacity = 20, level_code = 'general'
where capacity is null or level_code is null;

-- =====================================================
-- UPDATE VIEWS TO INCLUDE NEW FIELDS
-- =====================================================

-- Admin view (what Admin UI uses)
create or replace view public.admin_meetings as
select
  id,
  title,
  description,
  meeting_url,
  starts_at,
  ends_at,
  is_active,
  created_by,
  created_at,
  updated_at,
  capacity,
  level_code,
  -- Add computed fields for compatibility
  starts_at as scheduled_at,
  extract(epoch from (coalesce(ends_at, starts_at + interval '1 hour') - starts_at)) / 60 as duration_minutes,
  -- Add section_name computed field based on level_code
  case level_code
    when 'A1' then 'Beginner I'
    when 'A2' then 'Beginner II'
    when 'B1' then 'Intermediate I'
    when 'B2' then 'Intermediate II'
    when 'C1' then 'Advanced I'
    when 'C2' then 'Advanced II'
    else 'General'
  end as section_name
from public.meetings
order by starts_at desc;

-- Public view (active & upcoming meetings only)
create or replace view public.public_meetings as
select
  id,
  title,
  description,
  meeting_url,
  starts_at,
  ends_at,
  created_at,
  capacity,
  level_code,
  -- Add computed fields for compatibility
  starts_at as scheduled_at,
  coalesce(extract(epoch from (ends_at - starts_at)) / 60, 60) as duration_minutes,
  -- Add fields expected by MeetingsApp component
  title as teacher_name,
  coalesce(description, 'General English Practice') as focus_topic,
  meeting_url as zoom_link,
  -- Add section_name
  case level_code
    when 'A1' then 'Beginner I'
    when 'A2' then 'Beginner II'
    when 'B1' then 'Intermediate I'
    when 'B2' then 'Intermediate II'
    when 'C1' then 'Advanced I'
    when 'C2' then 'Advanced II'
    else 'General'
  end as section_name
from public.meetings
where is_active = true
  and starts_at >= now()
order by starts_at asc;

-- =====================================================
-- UPDATE CREATE_MEETING FUNCTION
-- =====================================================

-- Parameters in ALPHABETICAL order: p_capacity, p_description, p_duration_minutes, p_level_code, p_meeting_url, p_scheduled_at, p_title
create or replace function public.create_meeting(
  p_capacity          integer,
  p_description       text,
  p_duration_minutes  integer,
  p_level_code        text,
  p_meeting_url       text,
  p_scheduled_at      timestamptz,
  p_title             text
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_user_id uuid := auth.uid();
  v_meeting meetings%rowtype;
begin
  -- Admin check
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required' using errcode = 'P0001';
  end if;

  -- Input validation
  if p_title is null or length(trim(p_title)) < 3 then
    raise exception 'Title must be at least 3 characters long' using errcode = 'P0002';
  end if;

  if p_meeting_url is null or p_meeting_url !~ '^https?://' then
    raise exception 'Meeting URL must be a valid HTTP/HTTPS URL' using errcode = 'P0003';
  end if;

  if p_scheduled_at is null or p_scheduled_at <= now() then
    raise exception 'Meeting must be scheduled for a future date and time' using errcode = 'P0004';
  end if;

  if p_capacity is not null and (p_capacity < 1 or p_capacity > 100) then
    raise exception 'Capacity must be between 1 and 100' using errcode = 'P0005';
  end if;

  if p_level_code is not null and p_level_code not in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'general') then
    raise exception 'Invalid level code. Must be A1, A2, B1, B2, C1, C2, or general' using errcode = 'P0006';
  end if;

  -- Insert meeting
  insert into public.meetings(
    title,
    description,
    meeting_url,
    starts_at,
    ends_at,
    is_active,
    created_by,
    capacity,
    level_code
  ) values (
    trim(p_title),
    trim(p_description),
    p_meeting_url,
    p_scheduled_at,
    case
      when p_duration_minutes is not null and p_duration_minutes > 0
      then p_scheduled_at + (p_duration_minutes || ' minutes')::interval
      else p_scheduled_at + interval '1 hour'
    end,
    true,
    v_user_id,
    coalesce(p_capacity, 20),
    coalesce(p_level_code, 'general')
  )
  returning * into v_meeting;

  return to_jsonb(v_meeting);
end;
$$;

-- =====================================================
-- UPDATE UPDATE_MEETING FUNCTION
-- =====================================================

-- Parameters in ALPHABETICAL order: p_capacity, p_description, p_duration_minutes, p_level_code, p_meeting_id, p_meeting_url, p_scheduled_at, p_title
create or replace function public.update_meeting(
  p_capacity          integer,
  p_description       text,
  p_duration_minutes  integer,
  p_level_code        text,
  p_meeting_id        uuid,
  p_meeting_url       text,
  p_scheduled_at      timestamptz,
  p_title             text
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_user_id uuid := auth.uid();
  v_meeting meetings%rowtype;
begin
  -- Admin check
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required' using errcode = 'P0001';
  end if;

  -- Validation for capacity
  if p_capacity is not null and (p_capacity < 1 or p_capacity > 100) then
    raise exception 'Capacity must be between 1 and 100' using errcode = 'P0005';
  end if;

  -- Validation for level_code
  if p_level_code is not null and p_level_code not in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'general') then
    raise exception 'Invalid level code. Must be A1, A2, B1, B2, C1, C2, or general' using errcode = 'P0006';
  end if;

  -- Update meeting
  update public.meetings
  set
    title = coalesce(trim(p_title), title),
    description = coalesce(trim(p_description), description),
    meeting_url = coalesce(p_meeting_url, meeting_url),
    starts_at = coalesce(p_scheduled_at, starts_at),
    ends_at = case
      when p_scheduled_at is not null and p_duration_minutes is not null and p_duration_minutes > 0
      then p_scheduled_at + (p_duration_minutes || ' minutes')::interval
      when p_scheduled_at is not null
      then p_scheduled_at + interval '1 hour'
      else ends_at
    end,
    capacity = coalesce(p_capacity, capacity),
    level_code = coalesce(p_level_code, level_code),
    updated_at = now()
  where id = p_meeting_id
  returning * into v_meeting;

  if v_meeting.id is null then
    raise exception 'Meeting not found' using errcode = 'P0002';
  end if;

  return to_jsonb(v_meeting);
end;
$$;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant view access
grant select on public.admin_meetings to authenticated;
grant select on public.public_meetings to authenticated, anon;

-- Grant execute on updated functions
grant execute on function public.create_meeting(integer, text, integer, text, text, timestamptz, text) to authenticated;
grant execute on function public.update_meeting(integer, text, integer, text, uuid, text, timestamptz, text) to authenticated;
