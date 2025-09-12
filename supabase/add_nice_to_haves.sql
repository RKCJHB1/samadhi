-- Run this in your Supabase project's SQL Editor
-- These statements are idempotent; re-running is safe.

-- 1) Foreign key from translations.created_by -> profiles.id (for profile embedding)
alter table if exists public.translations
  drop constraint if exists translations_created_by_fkey;
alter table if exists public.translations
  add constraint translations_created_by_fkey
  foreign key (created_by) references public.profiles(id)
  on delete set null;

-- 2) Public read for approved translations (RLS)
alter table public.translations enable row level security;
drop policy if exists "Public read approved translations" on public.translations;
create policy "Public read approved translations" on public.translations
  for select using (status = 'approved');

-- 3) Public profile view with only safe fields
create or replace view public.public_profiles as
select id, first_name, last_name, username, role, language_proficiency
from public.profiles;
-- Grant anon read on the view
grant select on public.public_profiles to anon;

-- 4) Policies on profiles (self-manage; admins manage)
alter table public.profiles enable row level security;
drop policy if exists "Public read basic profile info" on public.profiles;
create policy "Public read basic profile info" on public.profiles
  for select using (true);

drop policy if exists "Self upsert profile" on public.profiles;
create policy "Self upsert profile" on public.profiles for insert with check (id = auth.uid());

drop policy if exists "Self update profile" on public.profiles;
create policy "Self update profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "Admin update profiles" on public.profiles;
create policy "Admin update profiles" on public.profiles
  for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- 5) Username uniqueness + format safety
alter table if exists public.profiles add column if not exists username text;
create unique index if not exists profiles_username_unique on public.profiles(lower(username)) where username is not null;

-- 6) Helpful indexes for speed
create index if not exists idx_translations_lecture_lang on public.translations (lecture_id, lang);
create index if not exists idx_translations_creator_status on public.translations (created_by, status);
create index if not exists idx_translations_updated_at on public.translations (updated_at desc);

-- 7) Voting table indexes (if table exists)
create index if not exists translation_votes_lslfit on public.translation_votes (lecture_id, sentence_index, lang, form, text);

