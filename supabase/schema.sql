-- Human Radar — Supabase Schema
-- Run this in the Supabase SQL Editor to set up the database.

-- ── Users ──
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  username text not null,
  score integer not null default 0,
  accuracy integer not null default 0,
  streak integer not null default 0,
  level integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Users can read all profiles" on public.users
  for select using (true);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- ── Dilemmas ──
create table if not exists public.dilemmas (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  option_a text not null,
  option_b text not null,
  category text not null default 'morality',
  difficulty integer not null default 1,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  created_by uuid references public.users(id) on delete set null
);

alter table public.dilemmas enable row level security;

create policy "Anyone can read active dilemmas" on public.dilemmas
  for select using (status = 'active');

-- ── Votes ──
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  dilemma_id uuid not null references public.dilemmas(id) on delete cascade,
  predicted_option text not null check (predicted_option in ('a', 'b')),
  actual_majority text check (actual_majority in ('a', 'b')),
  is_correct boolean,
  created_at timestamptz not null default now()
);

alter table public.votes enable row level security;

create policy "Users can read own votes" on public.votes
  for select using (auth.uid() = user_id);

create policy "Users can insert own votes" on public.votes
  for insert with check (auth.uid() = user_id);

-- Prevent duplicate votes on the same dilemma
create unique index if not exists votes_user_dilemma_unique on public.votes(user_id, dilemma_id);

-- ── Dilemma Stats ──
create table if not exists public.dilemma_stats (
  dilemma_id uuid primary key references public.dilemmas(id) on delete cascade,
  votes_a integer not null default 0,
  votes_b integer not null default 0,
  total_votes integer not null default 0,
  majority_option text not null default 'a' check (majority_option in ('a', 'b'))
);

alter table public.dilemma_stats enable row level security;

create policy "Anyone can read dilemma stats" on public.dilemma_stats
  for select using (true);

create policy "Authenticated users can upsert stats" on public.dilemma_stats
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update stats" on public.dilemma_stats
  for update using (auth.role() = 'authenticated');

-- ── Badges ──
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  badge_name text not null,
  earned_at timestamptz not null default now()
);

alter table public.badges enable row level security;

create policy "Users can read own badges" on public.badges
  for select using (auth.uid() = user_id);

create policy "Users can insert own badges" on public.badges
  for insert with check (auth.uid() = user_id);

create unique index if not exists badges_user_name_unique on public.badges(user_id, badge_name);
