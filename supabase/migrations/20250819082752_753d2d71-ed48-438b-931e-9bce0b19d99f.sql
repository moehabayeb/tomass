-- 01_speaking_metrics.sql
create table if not exists public.speaking_metrics (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz not null default now(),
  user_id uuid null,
  session_id text null,         -- anonymous session id
  run_id int not null,
  phase text not null,          -- engine_start, state_change, recording_complete, recording_error, invariant_violation
  state_from text null,
  state_to text null,
  engine text null,             -- speech-recognition | media-recorder
  duration_ms int null,
  transcript_len int null,
  error_kind text null,
  device text null,             -- user agent hash or short ua string
  meta jsonb null
);

alter table public.speaking_metrics enable row level security;

-- No direct selects/inserts for clients
create policy "deny all selects" on public.speaking_metrics for select using (false);
create policy "deny all inserts" on public.speaking_metrics for insert with check (false);

-- Trusted function to write (security definer)
create or replace function public.log_speaking_metric(
  p_user_id uuid,
  p_session_id text,
  p_run_id int,
  p_phase text,
  p_state_from text,
  p_state_to text,
  p_engine text,
  p_duration_ms int,
  p_transcript_len int,
  p_error_kind text,
  p_device text,
  p_meta jsonb
) returns void
language sql
security definer
set search_path = public
as $$
  insert into public.speaking_metrics(
    user_id, session_id, run_id, phase, state_from, state_to, engine,
    duration_ms, transcript_len, error_kind, device, meta
  )
  values (
    p_user_id, p_session_id, p_run_id, p_phase, p_state_from, p_state_to, p_engine,
    p_duration_ms, p_transcript_len, p_error_kind, p_device, p_meta
  );
$$;