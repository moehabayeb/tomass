-- =====================================================
-- Admin Meetings System - Complete Migration
-- =====================================================
-- This migration creates a complete admin meetings system:
-- - Role-based access control (RBAC)
-- - Meetings table with proper schema
-- - Admin-only RLS policies
-- - REST API view for frontend
-- - Proper function signatures
-- - Seed data for testing
-- =====================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =====================================================
-- A. ROLES / ADMIN CHECK
-- =====================================================

-- 1) User roles table for RBAC (idempotent)
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'user', 'moderator')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- RLS: Users can see their own roles, admins can see all
drop policy if exists "user_roles_read_own" on public.user_roles;
create policy "user_roles_read_own" on public.user_roles
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "user_roles_read_admin" on public.user_roles;
create policy "user_roles_read_admin" on public.user_roles
  for select
  to authenticated
  using (exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'admin'
  ));

-- 2) Admin check function - EXACT signature used by frontend
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

-- 3) Zero-arg convenience wrapper for cleaner frontend calls
create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
as $$
declare
  current_uid uuid;
begin
  current_uid := auth.uid();

  if current_uid is null then
    return false;
  end if;

  return exists (
    select 1 from public.user_roles
    where user_id = current_uid and role = 'admin'
  );
end;
$$;

-- 4) Grants for authenticated users
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_admin() to authenticated;
grant select on public.user_roles to authenticated;

-- =====================================================
-- B. MEETINGS DATA MODEL
-- =====================================================

-- 5) Base meetings table with all required fields
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) >= 3 and char_length(title) <= 200),
  description text check (description is null or char_length(description) <= 2000),
  meeting_url text not null check (meeting_url ~* '^https?://'),
  scheduled_at timestamptz not null,
  duration_minutes integer not null default 60 check (duration_minutes > 0 and duration_minutes <= 480),
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add updated_at trigger
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

-- 6) Admin meetings view - what the frontend REST API queries
create or replace view public.admin_meetings as
select
  id,
  title,
  description,
  meeting_url,
  scheduled_at,
  duration_minutes,
  is_active,
  created_by,
  created_at,
  updated_at
from public.meetings
order by scheduled_at asc;

-- 7) Enable RLS on meetings table
alter table public.meetings enable row level security;

-- RLS: Only admins can read meetings
drop policy if exists "meetings_read_admins" on public.meetings;
create policy "meetings_read_admins" on public.meetings
  for select
  to authenticated
  using (public.is_admin(auth.uid()));

-- RLS: Only admins can insert/update/delete meetings
drop policy if exists "meetings_write_admins" on public.meetings;
create policy "meetings_write_admins" on public.meetings
  for all
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- 8) Grants for REST API access
grant select on public.admin_meetings to authenticated;
grant all on public.meetings to authenticated;

-- =====================================================
-- C. RSVP SYSTEM (Optional but included for completeness)
-- =====================================================

-- Meeting RSVPs table
create table if not exists public.meeting_rsvps (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'yes' check (status in ('yes', 'no', 'maybe')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(meeting_id, user_id)
);

alter table public.meeting_rsvps enable row level security;

-- Users can manage their own RSVPs
drop policy if exists "rsvps_own" on public.meeting_rsvps;
create policy "rsvps_own" on public.meeting_rsvps
  for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Admins can view all RSVPs
drop policy if exists "rsvps_admin" on public.meeting_rsvps;
create policy "rsvps_admin" on public.meeting_rsvps
  for select
  to authenticated
  using (public.is_admin(auth.uid()));

grant all on public.meeting_rsvps to authenticated;

-- =====================================================
-- D. CRUD FUNCTIONS FOR FRONTEND
-- =====================================================

-- Function to create meeting (admin only)
create or replace function public.create_meeting(
  p_title text,
  p_description text default null,
  p_meeting_url text,
  p_scheduled_at timestamptz,
  p_duration_minutes integer default 60
)
returns json
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_meeting_id uuid;
  v_meeting json;
begin
  v_user_id := auth.uid();

  -- Check admin permission
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required';
  end if;

  -- Insert meeting
  insert into public.meetings (
    title, description, meeting_url, scheduled_at, duration_minutes, created_by
  ) values (
    p_title, p_description, p_meeting_url, p_scheduled_at, p_duration_minutes, v_user_id
  )
  returning id into v_meeting_id;

  -- Return created meeting
  select row_to_json(m.*)
  into v_meeting
  from public.admin_meetings m
  where m.id = v_meeting_id;

  return v_meeting;
end;
$$;

-- Function to update meeting (admin only)
create or replace function public.update_meeting(
  p_meeting_id uuid,
  p_title text,
  p_description text default null,
  p_meeting_url text,
  p_scheduled_at timestamptz,
  p_duration_minutes integer default 60,
  p_is_active boolean default true
)
returns json
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_meeting json;
begin
  v_user_id := auth.uid();

  -- Check admin permission
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required';
  end if;

  -- Update meeting
  update public.meetings
  set
    title = p_title,
    description = p_description,
    meeting_url = p_meeting_url,
    scheduled_at = p_scheduled_at,
    duration_minutes = p_duration_minutes,
    is_active = p_is_active,
    updated_at = now()
  where id = p_meeting_id;

  if not found then
    raise exception 'Meeting not found';
  end if;

  -- Return updated meeting
  select row_to_json(m.*)
  into v_meeting
  from public.admin_meetings m
  where m.id = p_meeting_id;

  return v_meeting;
end;
$$;

-- Function to delete meeting (admin only)
create or replace function public.delete_meeting(p_meeting_id uuid)
returns boolean
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
begin
  v_user_id := auth.uid();

  -- Check admin permission
  if not public.is_admin(v_user_id) then
    raise exception 'Permission denied: Admin role required';
  end if;

  -- Delete meeting
  delete from public.meetings where id = p_meeting_id;

  return found;
end;
$$;

-- Function to upsert RSVP
create or replace function public.upsert_rsvp(
  p_meeting_id uuid,
  p_status text
)
returns json
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_rsvp json;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  -- Upsert RSVP
  insert into public.meeting_rsvps (meeting_id, user_id, status)
  values (p_meeting_id, v_user_id, p_status)
  on conflict (meeting_id, user_id)
  do update set
    status = p_status,
    updated_at = now();

  -- Return RSVP
  select row_to_json(r.*)
  into v_rsvp
  from public.meeting_rsvps r
  where r.meeting_id = p_meeting_id and r.user_id = v_user_id;

  return v_rsvp;
end;
$$;

-- Grant execute permissions on all functions
grant execute on function public.create_meeting(text, text, text, timestamptz, integer) to authenticated;
grant execute on function public.update_meeting(uuid, text, text, text, timestamptz, integer, boolean) to authenticated;
grant execute on function public.delete_meeting(uuid) to authenticated;
grant execute on function public.upsert_rsvp(uuid, text) to authenticated;

-- =====================================================
-- E. INDEXES FOR PERFORMANCE
-- =====================================================

create index if not exists idx_meetings_scheduled_at on public.meetings(scheduled_at);
create index if not exists idx_meetings_is_active on public.meetings(is_active);
create index if not exists idx_meetings_created_by on public.meetings(created_by);
create index if not exists idx_rsvps_meeting_id on public.meeting_rsvps(meeting_id);
create index if not exists idx_rsvps_user_id on public.meeting_rsvps(user_id);
create index if not exists idx_user_roles_user_id on public.user_roles(user_id);
create index if not exists idx_user_roles_role on public.user_roles(role);

-- =====================================================
-- F. SEED DATA FOR TESTING
-- =====================================================

-- Insert a test meeting (only if we can determine a user to assign it to)
do $$
declare
  v_first_user_id uuid;
begin
  -- Get the first user (usually the developer)
  select id into v_first_user_id
  from auth.users
  order by created_at asc
  limit 1;

  if v_first_user_id is not null then
    -- Make them an admin first
    insert into public.user_roles (user_id, role)
    values (v_first_user_id, 'admin')
    on conflict (user_id, role) do nothing;

    -- Insert a test meeting
    insert into public.meetings (
      title,
      description,
      meeting_url,
      scheduled_at,
      duration_minutes,
      is_active,
      created_by
    ) values (
      'Test Meeting - Admin System',
      'This is a test meeting created during migration to verify the admin system works correctly.',
      'https://meet.google.com/test-meeting-' || substr(md5(random()::text), 1, 8),
      now() + interval '1 day',
      30,
      true,
      v_first_user_id
    ) on conflict do nothing;
  end if;
end $$;

-- =====================================================
-- G. SUMMARY & VERIFICATION QUERIES
-- =====================================================

-- Verification queries (run these manually to test):
-- 1. Check if admin function works:
--    SELECT public.is_admin();
--    SELECT public.is_admin(auth.uid());

-- 2. Check if meetings view is accessible:
--    SELECT * FROM public.admin_meetings;

-- 3. Check if RLS is working:
--    SELECT * FROM public.meetings; -- Should only work for admins

-- 4. Test REST endpoint (via PostgREST):
--    GET /rest/v1/admin_meetings?select=*&order=scheduled_at.asc

-- =====================================================
-- END OF MIGRATION
-- =====================================================