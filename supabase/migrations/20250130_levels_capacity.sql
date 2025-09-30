-- =====================================================
-- Meetings System: Add Level/Section and Capacity
-- =====================================================
-- This migration adds level/section categorization and capacity
-- management to the meetings system while preserving all existing
-- functionality and alphabetical RPC parameter ordering.
-- =====================================================

-- Enable required extensions (idempotent)
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- =====================================================
-- A. SCHEMA UPDATES
-- =====================================================

-- 1) Add new columns to meetings table
do $$
begin
  -- Add level_code column if it doesn't exist
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
    and table_name = 'meetings'
    and column_name = 'level_code'
  ) then
    alter table public.meetings add column level_code text not null default 'A1';
    alter table public.meetings add constraint meetings_level_code_check
      check (level_code in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2'));
  end if;

  -- Add capacity column if it doesn't exist
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
    and table_name = 'meetings'
    and column_name = 'capacity'
  ) then
    alter table public.meetings add column capacity integer not null default 8;
    alter table public.meetings add constraint meetings_capacity_check
      check (capacity >= 1 and capacity <= 50);
  end if;
end $$;

-- 2) Backfill existing meetings with default values (idempotent)
update public.meetings
set
  level_code = 'A1',
  capacity = 8
where level_code is null or capacity is null;

-- 3) Create level-to-section mapping function
create or replace function public.get_section_name(p_level_code text)
returns text
language sql
immutable
as $$
  select case p_level_code
    when 'A1' then 'Apples'
    when 'A2' then 'Avocado'
    when 'B1' then 'Banana'
    when 'B2' then 'Blueberry'
    when 'C1' then 'Cherry'
    when 'C2' then 'Coconut'
    else 'Unknown'
  end;
$$;

-- =====================================================
-- B. UPDATED VIEWS
-- =====================================================

-- Drop existing views
drop view if exists public.admin_meetings cascade;
drop view if exists public.public_meetings cascade;

-- Recreate admin view with new fields
create or replace view public.admin_meetings as
select
  id,
  title,
  description,
  meeting_url,
  starts_at,
  ends_at,
  level_code,
  public.get_section_name(level_code) as section_name,
  capacity,
  is_active,
  created_by,
  created_at,
  updated_at,
  -- Backward compatibility fields
  starts_at as scheduled_at,
  coalesce(
    extract(epoch from (ends_at - starts_at))::integer / 60,
    60
  ) as duration_minutes
from public.meetings
order by starts_at desc;

-- Recreate public view with new fields
create or replace view public.public_meetings as
select
  id,
  title,
  description,
  meeting_url,
  starts_at,
  ends_at,
  level_code,
  public.get_section_name(level_code) as section_name,
  capacity,
  created_at,
  -- Backward compatibility fields
  starts_at as scheduled_at,
  coalesce(
    extract(epoch from (ends_at - starts_at))::integer / 60,
    60
  ) as duration_minutes,
  -- Legacy computed fields for backward compatibility
  'Expert English Teacher' as teacher_name,
  case level_code
    when 'A1' then 'Basic conversation and pronunciation'
    when 'A2' then 'Elementary grammar and vocabulary'
    when 'B1' then 'Intermediate speaking skills'
    when 'B2' then 'Advanced conversation practice'
    when 'C1' then 'Professional communication'
    when 'C2' then 'Mastery-level discussion topics'
    else 'Comprehensive English practice'
  end as focus_topic,
  meeting_url as zoom_link
from public.meetings
where is_active = true
  and starts_at >= now()
order by starts_at asc;

-- =====================================================
-- C. UPDATED RPC FUNCTIONS
-- =====================================================

-- Drop existing functions for clean recreation
drop function if exists public.create_meeting(text, integer, text, timestamptz, text) cascade;
drop function if exists public.update_meeting(text, integer, uuid, text, timestamptz, text) cascade;

-- 1) CREATE MEETING (alphabetical parameters)
-- p_capacity, p_description, p_duration_minutes, p_level_code, p_meeting_url, p_scheduled_at, p_title
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
volatile
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

  if p_level_code is null or p_level_code not in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2') then
    raise exception 'Level code must be one of: A1, A2, B1, B2, C1, C2' using errcode = 'P0005';
  end if;

  if p_capacity is null or p_capacity < 1 or p_capacity > 50 then
    raise exception 'Capacity must be between 1 and 50' using errcode = 'P0006';
  end if;

  -- Insert meeting
  insert into public.meetings(
    title,
    description,
    meeting_url,
    starts_at,
    ends_at,
    level_code,
    capacity,
    is_active,
    created_by
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
    p_level_code,
    coalesce(p_capacity, 8),
    true,
    v_user_id
  )
  returning * into v_meeting;

  return to_jsonb(v_meeting);
end;
$$;

-- 2) UPDATE MEETING (alphabetical parameters)
-- p_capacity, p_description, p_duration_minutes, p_level_code, p_meeting_id, p_meeting_url, p_scheduled_at, p_title
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
volatile
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
  if p_level_code is not null and p_level_code not in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2') then
    raise exception 'Level code must be one of: A1, A2, B1, B2, C1, C2' using errcode = 'P0005';
  end if;

  if p_capacity is not null and (p_capacity < 1 or p_capacity > 50) then
    raise exception 'Capacity must be between 1 and 50' using errcode = 'P0006';
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
    level_code = coalesce(p_level_code, level_code),
    capacity = coalesce(p_capacity, capacity),
    updated_at = now()
  where id = p_meeting_id
  returning * into v_meeting;

  if v_meeting.id is null then
    raise exception 'Meeting not found' using errcode = 'P0002';
  end if;

  return to_jsonb(v_meeting);
end;
$$;

-- 3) HIDE MEETING
create or replace function public.hide_meeting(p_meeting_id uuid)
returns jsonb
language plpgsql
security definer
volatile
as $$
declare
  v_user_id uuid := auth.uid();
  v_meeting meetings%rowtype;
begin
  -- Admin check
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required' using errcode = 'P0001';
  end if;

  update public.meetings
  set is_active = false, updated_at = now()
  where id = p_meeting_id
  returning * into v_meeting;

  if v_meeting.id is null then
    raise exception 'Meeting not found' using errcode = 'P0002';
  end if;

  return to_jsonb(v_meeting);
end;
$$;

-- 4) UNHIDE MEETING
create or replace function public.unhide_meeting(p_meeting_id uuid)
returns jsonb
language plpgsql
security definer
volatile
as $$
declare
  v_user_id uuid := auth.uid();
  v_meeting meetings%rowtype;
begin
  -- Admin check
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required' using errcode = 'P0001';
  end if;

  update public.meetings
  set is_active = true, updated_at = now()
  where id = p_meeting_id
  returning * into v_meeting;

  if v_meeting.id is null then
    raise exception 'Meeting not found' using errcode = 'P0002';
  end if;

  return to_jsonb(v_meeting);
end;
$$;

-- 5) DELETE MEETING
create or replace function public.delete_meeting(p_meeting_id uuid)
returns jsonb
language plpgsql
security definer
volatile
as $$
declare
  v_user_id uuid := auth.uid();
  v_meeting meetings%rowtype;
begin
  -- Admin check
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required' using errcode = 'P0001';
  end if;

  delete from public.meetings
  where id = p_meeting_id
  returning * into v_meeting;

  if v_meeting.id is null then
    raise exception 'Meeting not found' using errcode = 'P0002';
  end if;

  return to_jsonb(v_meeting);
end;
$$;

-- 6) UPDATE UPSERT_RSVP WITH CAPACITY ENFORCEMENT
create or replace function public.upsert_rsvp(
  p_meeting_id uuid,
  p_status text
)
returns jsonb
language plpgsql
security definer
volatile
as $$
declare
  v_user_id uuid := auth.uid();
  v_rsvp meeting_rsvps%rowtype;
  v_current_yes_count integer;
  v_meeting_capacity integer;
  v_user_current_status text;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = 'P0001';
  end if;

  if p_status not in ('yes', 'no', 'maybe') then
    raise exception 'RSVP status must be yes, no, or maybe' using errcode = 'P0003';
  end if;

  -- Get meeting capacity
  select capacity into v_meeting_capacity
  from public.meetings
  where id = p_meeting_id;

  if v_meeting_capacity is null then
    raise exception 'Meeting not found' using errcode = 'P0002';
  end if;

  -- Get user's current RSVP status
  select status into v_user_current_status
  from public.meeting_rsvps
  where meeting_id = p_meeting_id and user_id = v_user_id;

  -- Count current 'yes' RSVPs (excluding this user if they already have an RSVP)
  select count(*) into v_current_yes_count
  from public.meeting_rsvps
  where meeting_id = p_meeting_id
    and status = 'yes'
    and user_id != v_user_id;

  -- Capacity enforcement: only check if user is trying to RSVP 'yes'
  if p_status = 'yes' and v_current_yes_count >= v_meeting_capacity then
    raise exception 'Meeting is full (capacity %). Please choose another session.', v_meeting_capacity using errcode = 'P0007';
  end if;

  -- Upsert RSVP
  insert into public.meeting_rsvps (meeting_id, user_id, status)
  values (p_meeting_id, v_user_id, p_status)
  on conflict (meeting_id, user_id)
  do update set status = p_status, updated_at = now()
  returning * into v_rsvp;

  return to_jsonb(v_rsvp);
end;
$$;

-- =====================================================
-- D. PERMISSIONS & GRANTS
-- =====================================================

-- Grant permissions for new function signatures
grant execute on function public.get_section_name(text) to authenticated;
grant execute on function public.create_meeting(integer, text, integer, text, text, timestamptz, text) to authenticated;
grant execute on function public.update_meeting(integer, text, integer, text, uuid, text, timestamptz, text) to authenticated;
grant execute on function public.hide_meeting(uuid) to authenticated;
grant execute on function public.unhide_meeting(uuid) to authenticated;
grant execute on function public.delete_meeting(uuid) to authenticated;

-- Revoke old function permissions (they're dropped anyway)
revoke execute on function public.create_meeting(text, integer, text, timestamptz, text) from authenticated;
revoke execute on function public.update_meeting(text, integer, uuid, text, timestamptz, text) from authenticated;

-- View permissions
grant select on public.admin_meetings to authenticated;
grant select on public.public_meetings to authenticated;

-- =====================================================
-- E. VERIFICATION QUERIES
-- =====================================================

-- These queries can be run to verify the migration worked correctly:
--
-- 1. Verify columns exist:
-- select column_name, data_type, is_nullable, column_default
-- from information_schema.columns
-- where table_name = 'meetings' and column_name in ('level_code', 'capacity');
--
-- 2. Verify function signatures:
-- select proname, pg_get_function_identity_arguments(oid)
-- from pg_proc
-- where proname in ('create_meeting', 'update_meeting')
--   and pronamespace = 'public'::regnamespace;
--
-- 3. Test views:
-- select level_code, section_name, capacity from public.admin_meetings limit 1;
-- select level_code, section_name, capacity from public.public_meetings limit 1;
--
-- 4. Test capacity enforcement:
-- -- This should fail if run when a meeting is at capacity
-- select public.upsert_rsvp('[meeting-id]', 'yes');