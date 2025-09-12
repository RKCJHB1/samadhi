-- Supabase SQL schema for translations and profiles
-- Execute in Supabase SQL editor
-- Fixed version that creates columns in correct order

-- Profiles table (with extended fields)
create table if not exists public.profiles (
  id uuid primary key,
  email text,
  role text not null default 'user', -- 'user' | 'moderator' | 'admin'
  first_name text,
  last_name text,
  avatar_url text,
  language_proficiency jsonb -- [{code:text, level:text}] - CREATE THIS EARLY
);

-- Translations table with moderation and attribution
create table if not exists public.translations (
  lecture_id text not null,
  sentence_index integer not null,
  lang text not null,
  text text not null,
  status text not null default 'pending', -- 'pending' | 'approved' | 'rejected'
  created_by uuid null, -- references auth.users.id when logged in
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint translations_pkey primary key (lecture_id, sentence_index, lang, created_at)
);

-- Ensure additional profile fields exist (idempotent safety)
alter table if exists public.profiles add column if not exists email text;
alter table if exists public.profiles add column if not exists role text not null default 'user';
alter table if exists public.profiles add column if not exists first_name text;
alter table if exists public.profiles add column if not exists last_name text;
alter table if exists public.profiles add column if not exists avatar_url text;
alter table if exists public.profiles add column if not exists language_proficiency jsonb;

-- Enable RLS
alter table public.translations enable row level security;
alter table public.profiles enable row level security;

-- Public can read approved translations
DROP POLICY IF EXISTS "Public read approved translations" ON public.translations;
CREATE POLICY "Public read approved translations" ON public.translations
  FOR SELECT USING ( status = 'approved' );

-- Profiles policies:
-- Public can read basic profile info (name, role, avatar) for attribution and stats
-- Email addresses are only visible to the user themselves and admins
DROP POLICY IF EXISTS "Public read basic profile info" ON public.profiles;
CREATE POLICY "Public read basic profile info" ON public.profiles 
  FOR SELECT USING ( true );

-- Users can read/update their own profile (including email)
DROP POLICY IF EXISTS "Self upsert profile" ON public.profiles;
CREATE POLICY "Self upsert profile" ON public.profiles FOR INSERT WITH CHECK ( id = auth.uid() );
DROP POLICY IF EXISTS "Self update profile" ON public.profiles;
CREATE POLICY "Self update profile" ON public.profiles FOR UPDATE USING ( id = auth.uid() ) WITH CHECK ( id = auth.uid() );

-- Admins can read all profiles
DROP POLICY IF EXISTS "Admin read profiles" ON public.profiles;
CREATE POLICY "Admin read profiles" ON public.profiles FOR SELECT USING (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Allow admins to update any profile (for role management and proficiency updates)
DROP POLICY IF EXISTS "Admin update profiles" ON public.profiles;
CREATE POLICY "Admin update profiles" ON public.profiles
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Set created_by on insert automatically to auth.uid()
create or replace function public.set_created_by()
returns trigger as $$
begin
  if new.created_by is null then
    new.created_by = auth.uid();
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_created_by on public.translations;
create trigger set_created_by
before insert on public.translations
for each row execute function public.set_created_by();

-- Trigger to update updated_at on change
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.translations;
create trigger set_updated_at
before update on public.translations
for each row execute function public.set_updated_at();
