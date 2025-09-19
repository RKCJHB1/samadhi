-- Migration: Add `username` to profiles with normalization, validation and uniqueness
-- Run this in Supabase SQL editor or via migration tooling

-- 1) Add column
alter table if exists public.profiles
  add column if not exists username text;

-- 2) Normalize to lowercase, strip invalid chars, collapse/trim dashes
create or replace function public.normalize_username()
returns trigger as $$
begin
  if new.username is null then
    return new;
  end if;
  -- lowercase
  new.username := lower(new.username);
  -- keep only [a-z0-9-]
  new.username := regexp_replace(new.username, '[^a-z0-9-]', '', 'g');
  -- collapse multiple dashes
  new.username := regexp_replace(new.username, '-{2,}', '-', 'g');
  -- trim leading/trailing dashes
  new.username := trim(both '-' from new.username);
  return new;
end;
$$ language plpgsql set search_path = pg_catalog, public;

drop trigger if exists normalize_username on public.profiles;
create trigger normalize_username
before insert or update of username on public.profiles
for each row execute function public.normalize_username();

-- 3) Enforce format and length (nullable)
alter table if exists public.profiles
  drop constraint if exists profiles_username_format_check;
alter table if exists public.profiles
  add constraint profiles_username_format_check
  check (
    username is null or username ~ '^[a-z0-9-]{3,30}$'
  );

-- 4) Enforce uniqueness (nullable). Unique index avoids conflicts on NULLs
--    Since we normalize to lowercase before write, this is effectively case-insensitive
create unique index if not exists profiles_username_unique_idx
  on public.profiles (username)
  where username is not null;

-- 5) Helpful lookup index (no-op if unique index already serves)
create index if not exists idx_profiles_username
  on public.profiles (username)
  where username is not null;

