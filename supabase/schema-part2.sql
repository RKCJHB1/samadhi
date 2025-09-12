-- Part 2 of the schema - Advanced policies and features
-- Run this AFTER schema-fixed.sql

-- Simple policies for basic functionality (we'll add advanced ones later if needed)
DROP POLICY IF EXISTS "Authenticated insert pending translations" ON public.translations;
CREATE POLICY "Authenticated insert pending translations" ON public.translations
  FOR INSERT
  WITH CHECK ( auth.uid() IS NOT NULL AND status = 'pending' );

-- Only moderators/admins can update (approve/reject) - simplified version
DROP POLICY IF EXISTS "Moderators update translations" ON public.translations;
CREATE POLICY "Moderators update translations" ON public.translations
  FOR UPDATE USING (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin')
    )
  );

-- Moderators/admins can read all translations
DROP POLICY IF EXISTS "Moderators read all" ON public.translations;
CREATE POLICY "Moderators read all" ON public.translations
  FOR SELECT USING (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin')
    )
  );

-- Votes for translations (per user per translation)
create table if not exists public.translation_votes (
  lecture_id text not null,
  sentence_index integer not null,
  lang text not null,
  form text not null default 'transliteration',
  text text not null,
  user_id uuid not null,
  value integer not null check (value in (-1, 1)),
  created_at timestamp with time zone default now(),
  constraint translation_votes_unique unique (lecture_id, sentence_index, lang, form, text, user_id)
);

-- Helpful index for aggregations (includes form)
create index if not exists translation_votes_lslfit on public.translation_votes (lecture_id, sentence_index, lang, form, text);

-- Enable RLS
alter table public.translation_votes enable row level security;

-- Public can read vote tallies
DROP POLICY IF EXISTS "Public read votes" ON public.translation_votes;
CREATE POLICY "Public read votes" ON public.translation_votes
  FOR SELECT USING ( true );

-- Only logged-in users can insert/update/delete their own votes
DROP POLICY IF EXISTS "User upsert own vote" ON public.translation_votes;
CREATE POLICY "User upsert own vote" ON public.translation_votes
  FOR INSERT
  WITH CHECK ( auth.uid() IS NOT NULL AND user_id = auth.uid() );

DROP POLICY IF EXISTS "User update own vote" ON public.translation_votes;
CREATE POLICY "User update own vote" ON public.translation_votes
  FOR UPDATE USING ( user_id = auth.uid() )
  WITH CHECK ( user_id = auth.uid() );

DROP POLICY IF EXISTS "User delete own vote" ON public.translation_votes;
CREATE POLICY "User delete own vote" ON public.translation_votes
  FOR DELETE USING ( user_id = auth.uid() );

-- Language-specific reviewers (admin-managed)
create table if not exists public.language_reviewers (
  lang text not null,
  user_id uuid not null,
  created_at timestamp with time zone default now(),
  constraint language_reviewers_pkey primary key (lang, user_id)
);

alter table public.language_reviewers enable row level security;

-- Anyone can read reviewer assignments (for future features)
DROP POLICY IF EXISTS "Public read language reviewers" ON public.language_reviewers;
CREATE POLICY "Public read language reviewers" ON public.language_reviewers
  FOR SELECT USING ( true );

-- Only admins can modify reviewer assignments
DROP POLICY IF EXISTS "Admin manage language reviewers" ON public.language_reviewers;
CREATE POLICY "Admin manage language reviewers" ON public.language_reviewers
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
