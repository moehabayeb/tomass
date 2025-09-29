-- =====================================================
-- Admin Meetings System - Complete & Final Solution
-- =====================================================
-- This migration creates a complete, bulletproof admin meetings system
-- with proper parameter ordering, full CRUD operations, and public/admin views
-- =====================================================

-- Enable required extensions
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- =====================================================
-- A. CLEAN UP EXISTING OBJECTS
-- =====================================================

-- Drop existing views safely
drop view if exists public.admin_meetings cascade;
drop view if exists public.public_meetings cascade;

-- Drop existing functions with dynamic cleanup
do $cleanup$
declare
  r record;
begin
  for r in
    select p.oid, p.proname
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in ('create_meeting','update_meeting','delete_meeting','hide_meeting','unhide_meeting','upsert_rsvp')
  loop
    execute format('drop function if exists %I.%I(%s) cascade;',
                   'public',
                   r.proname,
                   pg_get_function_identity_arguments(r.oid));
  end loop;
end$cleanup$;

-- =====================================================
-- B. TABLES & SCHEMA
-- =====================================================

-- 1) Base meetings table with proper schema
create table if not exists public.meetings (
  id               uuid primary key default gen_random_uuid(),
  title            text not null check (length(title) >= 3 and length(title) <= 200),
  description      text check (description is null or length(description) <= 2000),
  meeting_url      text not null check (meeting_url ~ '^https?://'),
  starts_at        timestamptz not null,
  ends_at          timestamptz,
  is_active        boolean not null default true,
  created_by       uuid references auth.users(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Update trigger for updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_meetings_updated_at on public.meetings;
create trigger update_meetings_updated_at
  before update on public.meetings
  for each row execute function public.update_updated_at_column();

-- 2) User roles table for RBAC
create table if not exists public.user_roles (
  user_id uuid references auth.users(id) not null,
  role    text not null check (role in ('admin', 'user', 'moderator')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- 3) Meeting RSVPs table
create table if not exists public.meeting_rsvps (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'yes' check (status in ('yes', 'no', 'maybe')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(meeting_id, user_id)
);

-- =====================================================
-- C. VIEWS
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
  -- Add computed fields for compatibility
  starts_at as scheduled_at,
  extract(epoch from (coalesce(ends_at, starts_at + interval '1 hour') - starts_at)) / 60 as duration_minutes
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
  -- Add computed fields for compatibility
  starts_at as scheduled_at,
  coalesce(extract(epoch from (ends_at - starts_at)) / 60, 60) as duration_minutes,
  -- Add fields expected by MeetingsApp component
  title as teacher_name,
  coalesce(description, 'General English Practice') as focus_topic,
  meeting_url as zoom_link
from public.meetings
where is_active = true
  and starts_at >= now()
order by starts_at asc;

-- =====================================================
-- D. ADMIN CHECK FUNCTIONS
-- =====================================================

-- Admin check function (with parameter)
create or replace function public.is_admin(check_user_id uuid)
returns boolean
language sql
stable
security definer
as $$
  select exists(
    select 1 from public.user_roles
    where user_id = check_user_id and role = 'admin'
  );
$$;

-- Admin check function (no parameter)
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
stable
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    return false;
  end if;
  return exists(
    select 1 from public.user_roles
    where user_id = uid and role = 'admin'
  );
end;
$$;

-- =====================================================
-- E. CRUD FUNCTIONS - ALPHABETICAL PARAMETER ORDER
-- =====================================================

-- 1) CREATE MEETING
-- Parameters: p_description, p_duration_minutes, p_meeting_url, p_scheduled_at, p_title (ALPHABETICAL!)
create or replace function public.create_meeting(
  p_description       text,
  p_duration_minutes  integer,
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

  -- Insert meeting
  insert into public.meetings(
    title,
    description,
    meeting_url,
    starts_at,
    ends_at,
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
    true,
    v_user_id
  )
  returning * into v_meeting;

  return to_jsonb(v_meeting);
end;
$$;

-- 2) UPDATE MEETING
-- Parameters: p_description, p_duration_minutes, p_meeting_id, p_meeting_url, p_scheduled_at, p_title (ALPHABETICAL!)
create or replace function public.update_meeting(
  p_description       text,
  p_duration_minutes  integer,
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

-- 6) UPSERT RSVP (alphabetical: p_meeting_id, p_status)
create or replace function public.upsert_rsvp(
  p_meeting_id uuid,
  p_status text
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_user_id uuid := auth.uid();
  v_rsvp meeting_rsvps%rowtype;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = 'P0001';
  end if;

  if p_status not in ('yes', 'no', 'maybe') then
    raise exception 'RSVP status must be yes, no, or maybe' using errcode = 'P0003';
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
-- F. RLS POLICIES
-- =====================================================

-- Enable RLS on all tables
alter table public.meetings enable row level security;
alter table public.user_roles enable row level security;
alter table public.meeting_rsvps enable row level security;

-- Meetings policies
do $$
begin
  -- Drop existing policies
  drop policy if exists meetings_read_admins on public.meetings;
  drop policy if exists meetings_write_admins on public.meetings;

  -- Admin read/write access
  create policy meetings_read_admins on public.meetings
    for select to authenticated
    using (public.is_admin(auth.uid()));

  create policy meetings_write_admins on public.meetings
    for all to authenticated
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));
end$$;

-- User roles policies
do $$
begin
  drop policy if exists user_roles_read_all on public.user_roles;
  drop policy if exists user_roles_write_admins on public.user_roles;

  create policy user_roles_read_all on public.user_roles
    for select to authenticated using (true);

  create policy user_roles_write_admins on public.user_roles
    for all to authenticated
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));
end$$;

-- RSVP policies
do $$
begin
  drop policy if exists rsvps_own on public.meeting_rsvps;
  drop policy if exists rsvps_admin_read on public.meeting_rsvps;

  create policy rsvps_own on public.meeting_rsvps
    for all to authenticated
    using (user_id = auth.uid())
    with check (user_id = auth.uid());

  create policy rsvps_admin_read on public.meeting_rsvps
    for select to authenticated
    using (public.is_admin(auth.uid()));
end$$;

-- =====================================================
-- G. PERMISSIONS & GRANTS
-- =====================================================

-- Function permissions
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.create_meeting(text, integer, text, timestamptz, text) to authenticated;
grant execute on function public.update_meeting(text, integer, uuid, text, timestamptz, text) to authenticated;
grant execute on function public.hide_meeting(uuid) to authenticated;
grant execute on function public.unhide_meeting(uuid) to authenticated;
grant execute on function public.delete_meeting(uuid) to authenticated;
grant execute on function public.upsert_rsvp(uuid, text) to authenticated;

-- Table permissions
grant select on public.user_roles to authenticated;
grant all on public.meeting_rsvps to authenticated;

-- View permissions
grant select on public.admin_meetings to authenticated;
grant select on public.public_meetings to authenticated, anon;

-- =====================================================
-- H. INDEXES FOR PERFORMANCE
-- =====================================================

create index if not exists idx_meetings_starts_at on public.meetings(starts_at);
create index if not exists idx_meetings_is_active on public.meetings(is_active);
create index if not exists idx_meetings_created_by on public.meetings(created_by);
create index if not exists idx_user_roles_user_id on public.user_roles(user_id);
create index if not exists idx_user_roles_role on public.user_roles(role);
create index if not exists idx_rsvps_meeting_user on public.meeting_rsvps(meeting_id, user_id);

-- =====================================================
-- I. AUTO-SETUP FOR DEVELOPMENT
-- =====================================================

do $$
declare
  v_first_user_id uuid;
begin
  -- Make first user an admin (dev convenience)
  select id into v_first_user_id
  from auth.users
  order by created_at asc
  limit 1;

  if v_first_user_id is not null then
    insert into public.user_roles (user_id, role)
    values (v_first_user_id, 'admin')
    on conflict (user_id, role) do nothing;

    -- Insert test meeting
    insert into public.meetings (
      title,
      description,
      meeting_url,
      starts_at,
      ends_at,
      is_active,
      created_by
    ) values (
      'Test Admin Meeting - System Verification',
      'This is a test meeting created during migration to verify the complete admin system works correctly. You can edit, hide/unhide, or delete this meeting.',
      'https://meet.google.com/test-admin-' || substr(md5(random()::text), 1, 8),
      now() + interval '2 hours',
      now() + interval '3 hours',
      true,
      v_first_user_id
    ) on conflict do nothing;
  end if;
end $$;

-- =====================================================
-- J. VERIFICATION QUERIES
-- =====================================================

-- Test admin functions:
-- select public.is_admin();
-- select * from public.admin_meetings;
-- select * from public.public_meetings;

-- Test function signatures:
-- select proname, pg_get_function_identity_arguments(oid)
-- from pg_proc
-- where proname in ('create_meeting','update_meeting','delete_meeting','hide_meeting','unhide_meeting')
--   and pronamespace = 'public'::regnamespace;

-- Expected results:
-- create_meeting(text,integer,text,timestamp with time zone,text)
-- update_meeting(text,integer,uuid,text,timestamp with time zone,text)
-- delete_meeting(uuid)
-- hide_meeting(uuid)
-- unhide_meeting(uuid)

-- =====================================================
-- END OF COMPLETE ADMIN MEETINGS SYSTEM
-- =====================================================