-- Supabase SQL schema for translations and profiles
-- Execute in Supabase SQL editor

-- Profiles table (with extended fields)
create table if not exists public.profiles (
  id uuid primary key,
  email text,
  role text not null default 'user', -- 'user' | 'moderator' | 'admin'
  first_name text,
  last_name text,
  avatar_url text
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

-- Ensure translations.created_by references profiles.id for embedding username and referential integrity
alter table if exists public.translations drop constraint if exists translations_created_by_fkey;
alter table if exists public.translations
  add constraint translations_created_by_fkey foreign key (created_by)
  references public.profiles(id) on delete set null;

-- Helpful index for author lookups and joins
create index if not exists idx_translations_created_by on public.translations (created_by);


-- Additional helpful indexes for performance
create index if not exists idx_translations_lecture_lang on public.translations (lecture_id, lang);
create index if not exists idx_translations_creator_status on public.translations (created_by, status);
create index if not exists idx_translations_updated_at on public.translations (updated_at desc);

-- Ensure additional profile fields exist (idempotent safety)
alter table if exists public.profiles add column if not exists email text;
alter table if exists public.profiles add column if not exists role text not null default 'user';
alter table if exists public.profiles add column if not exists first_name text;
alter table if exists public.profiles add column if not exists last_name text;
alter table if exists public.profiles add column if not exists avatar_url text;

-- Username column for clean public URLs
alter table if exists public.profiles add column if not exists username text;

-- Normalize usernames on write (lowercase, allowed chars, collapse dashes, trim)
create or replace function public.normalize_username()
returns trigger as $$
begin
  if new.username is null then
    return new;
  end if;
  new.username := lower(new.username);
  new.username := regexp_replace(new.username, '[^a-z0-9-]', '', 'g');
  new.username := regexp_replace(new.username, '-{2,}', '-', 'g');
  new.username := trim(both '-' from new.username);
  return new;
end;
$$ language plpgsql;

drop trigger if exists normalize_username on public.profiles;
create trigger normalize_username
before insert or update of username on public.profiles
for each row execute function public.normalize_username();

-- Enforce format and length (nullable)
alter table if exists public.profiles
  drop constraint if exists profiles_username_format_check;
alter table if exists public.profiles
  add constraint profiles_username_format_check
  check (
    username is null or username ~ '^[a-z0-9-]{3,30}$'
  );

-- Unique index for non-null usernames
create unique index if not exists profiles_username_unique_idx
  on public.profiles (username)
  where username is not null;

-- Safe public view for attribution (no emails)
create or replace view public.public_profiles as
select id, first_name, last_name, username, role, language_proficiency
from public.profiles;
-- Allow anon read of the view
grant select on public.public_profiles to anon;


-- Lookup index
create index if not exists idx_profiles_username
  on public.profiles (username)
  where username is not null;

-- Enable RLS
alter table public.translations enable row level security;
alter table public.profiles enable row level security;

-- Public can read approved translations
DROP POLICY IF EXISTS "Public read approved translations" ON public.translations;
CREATE POLICY "Public read approved translations" ON public.translations
  FOR SELECT USING ( status = 'approved' );

-- Authenticated users can insert pending translations (created_by set by trigger)
DROP POLICY IF EXISTS "Authenticated insert pending translations" ON public.translations;
CREATE POLICY "Authenticated insert pending translations" ON public.translations
  FOR INSERT
  WITH CHECK ( auth.uid() IS NOT NULL AND status = 'pending' );

-- Only moderators/admins can update (approve/reject)
DROP POLICY IF EXISTS "Moderators update translations" ON public.translations;
CREATE POLICY "Moderators update translations" ON public.translations
  FOR UPDATE USING (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin')
    )
  ) WITH CHECK (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin')
    )
    AND (
      (
        status <> 'approved'
        OR exists (
          select 1 from public.profiles p2 where p2.id = auth.uid() and p2.role = 'admin'
        )
        OR exists (
          select 1 from public.profiles prof
          cross join lateral jsonb_to_recordset(coalesce(prof.language_proficiency, '[]'::jsonb)) as lp(code text, level text)
          where prof.id = auth.uid() and lp.code = lang and lp.level in ('Fluent','Native/Academic')
        )
      )
      AND (
        status <> 'rejected'
        OR exists (
          select 1 from public.profiles p3 where p3.id = auth.uid() and p3.role = 'admin'
        )
        OR exists (
          select 1 from public.language_reviewers lr
          where lr.user_id = auth.uid() and lr.lang = lang
        )
      )
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


-- Votes for translations (per user per translation)
create table if not exists public.translation_votes (
  lecture_id text not null,
  sentence_index integer not null,
  lang text not null,
  form text not null default 'native',
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
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
  );

DROP POLICY IF EXISTS "User update own vote" ON public.translation_votes;
CREATE POLICY "User update own vote" ON public.translation_votes
  FOR UPDATE USING ( user_id = auth.uid() )
  WITH CHECK ( user_id = auth.uid() );

DROP POLICY IF EXISTS "User delete own vote" ON public.translation_votes;
CREATE POLICY "User delete own vote" ON public.translation_votes
  FOR DELETE USING ( user_id = auth.uid() );


-- Language proficiency stored on profiles
alter table if exists public.profiles add column if not exists language_proficiency jsonb; -- [{code:text, level:text}]

-- Allow admins to update any profile (for role management and proficiency updates)
DROP POLICY IF EXISTS "Admin update profiles" ON public.profiles;
CREATE POLICY "Admin update profiles" ON public.profiles
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Update insert policy: user must have any proficiency in the language to insert; Fluent/Native may auto-approve
DROP POLICY IF EXISTS "Authenticated insert pending translations" ON public.translations;
DROP POLICY IF EXISTS "Authenticated insert translations with proficiency" ON public.translations;
CREATE POLICY "Authenticated insert translations with proficiency" ON public.translations
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND exists (
      select 1 from public.profiles prof
      where prof.id = auth.uid()
        and prof.username is not null -- must have username
        and exists (
          select 1 from jsonb_to_recordset(coalesce(prof.language_proficiency, '[]'::jsonb)) as lp(code text, level text)
          where lp.code = lang
        )
    )
    AND (
      status = 'pending'
      OR (
        status = 'approved' AND exists (
          select 1 from public.profiles prof2
          where prof2.id = auth.uid()
            and exists (
              select 1 from jsonb_to_recordset(coalesce(prof2.language_proficiency, '[]'::jsonb)) as lp2(code text, level text)
              where lp2.code = lang and lp2.level in ('Fluent','Native/Academic')
            )
        )
      )
    )
  );

-- Language-specific reviewers (admin-managed)
create table if not exists public.language_reviewers (
  lang text not null,
  user_id uuid not null,
  created_at timestamp with time zone default now(),
  constraint language_reviewers_pkey primary key (lang, user_id)
);

-- Foreign key to profiles(id) so PostgREST/Supabase can resolve `profiles!inner` joins
alter table if exists public.language_reviewers
  drop constraint if exists language_reviewers_user_id_fkey;
alter table if exists public.language_reviewers
  add constraint language_reviewers_user_id_fkey
  foreign key (user_id) references public.profiles(id)
  on delete cascade;

-- Helpful indexes
create index if not exists idx_language_reviewers_lang on public.language_reviewers (lang);
create index if not exists idx_language_reviewers_user on public.language_reviewers (user_id);


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

-- DB-side safeguard: auto-set status to approved for Fluent/Native users
create or replace function public.set_status_by_proficiency()
returns trigger as $$
begin
  if new.status is null or new.status = 'pending' then
    if auth.uid() is not null then
      perform 1 from public.profiles prof,
        lateral jsonb_to_recordset(coalesce(prof.language_proficiency, '[]'::jsonb)) as lp(code text, level text)
      where prof.id = auth.uid() and lp.code = new.lang and lp.level in ('Fluent','Native/Academic')
      limit 1;
      if found then
        new.status := 'approved';



      end if;
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_status_by_proficiency on public.translations;
create trigger set_status_by_proficiency
before insert on public.translations
for each row execute function public.set_status_by_proficiency();



-- Approved languages (manual list)
create table if not exists public.language_approvals (
  lang text primary key,
  created_by uuid null,
  created_at timestamp with time zone default now()
);

-- Foreign key to profiles for attribution (optional)
alter table if exists public.language_approvals
  drop constraint if exists language_approvals_created_by_fkey;
alter table if exists public.language_approvals
  add constraint language_approvals_created_by_fkey
  foreign key (created_by) references public.profiles(id)
  on delete set null;

-- Helpful index
create index if not exists idx_language_approvals_lang on public.language_approvals (lang);

-- Enable RLS
alter table public.language_approvals enable row level security;

-- Public can read the list of approved languages (safe to expose)
DROP POLICY IF EXISTS "Public read language approvals" ON public.language_approvals;
CREATE POLICY "Public read language approvals" ON public.language_approvals
  FOR SELECT USING ( true );

-- Only admins can add/remove approvals
DROP POLICY IF EXISTS "Admin manage language approvals" ON public.language_approvals;
CREATE POLICY "Admin manage language approvals" ON public.language_approvals
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Volunteer reviewer requests

-- Hidden languages (blocklist to override auto-approval by translations)
create table if not exists public.language_hidden (
  lang text primary key,
  created_by uuid null references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);

alter table public.language_hidden enable row level security;

-- Public can read hidden list so the app can hide languages consistently
DROP POLICY IF EXISTS "Public read language_hidden" ON public.language_hidden;
CREATE POLICY "Public read language_hidden" ON public.language_hidden
  FOR SELECT USING ( true );

-- Only admins can modify the hidden list
DROP POLICY IF EXISTS "Admin manage language_hidden" ON public.language_hidden;
CREATE POLICY "Admin manage language_hidden" ON public.language_hidden
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create table if not exists public.language_reviewer_requests (
  id bigserial primary key,
  lang text not null,
  user_id uuid not null,
  level text not null, -- 'Fluent' | 'Native/Academic'
  sample_text text,
  status text not null default 'pending', -- 'pending' | 'approved' | 'rejected'
  reviewed_by uuid null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.language_reviewer_requests enable row level security;

-- Indexes
create index if not exists idx_lrr_lang_status on public.language_reviewer_requests (lang, status);
create index if not exists idx_lrr_user on public.language_reviewer_requests (user_id);

-- Users can create and see their own requests
DROP POLICY IF EXISTS "User insert own reviewer request" ON public.language_reviewer_requests;
CREATE POLICY "User insert own reviewer request" ON public.language_reviewer_requests
  FOR INSERT WITH CHECK ( auth.uid() IS NOT NULL AND user_id = auth.uid() );

DROP POLICY IF EXISTS "User read own reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "User read own reviewer requests" ON public.language_reviewer_requests
  FOR SELECT USING ( user_id = auth.uid() );

-- Admins can read/manage all requests
DROP POLICY IF EXISTS "Admin read reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin read reviewer requests" ON public.language_reviewer_requests
  FOR SELECT USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin update reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin update reviewer requests" ON public.language_reviewer_requests
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- updated_at trigger for requests
DROP TRIGGER IF EXISTS set_updated_at_lrr ON public.language_reviewer_requests;
CREATE TRIGGER set_updated_at_lrr
BEFORE UPDATE ON public.language_reviewer_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- Language requests (to start a new translation language)
create table if not exists public.language_requests (
  id bigserial primary key,
  lang text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  reason text,
  status text not null default 'pending', -- future use if we want to mark as processed
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (lang, user_id)
);

alter table public.language_requests enable row level security;

-- Indexes
create index if not exists idx_language_requests_lang on public.language_requests (lang);
create index if not exists idx_language_requests_user on public.language_requests (user_id);

-- Users can create and see their own requests
DROP POLICY IF EXISTS "User insert language request" ON public.language_requests;
CREATE POLICY "User insert language request" ON public.language_requests
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
    AND exists (
      select 1 from public.profiles prof
      where prof.id = auth.uid()
        and prof.username is not null -- must have username
        and exists (
          select 1 from jsonb_to_recordset(coalesce(prof.language_proficiency, '[]'::jsonb)) as lp(code text, level text)
          where lp.code = lang
        )
    )
  );

DROP POLICY IF EXISTS "User read own language requests" ON public.language_requests;
CREATE POLICY "User read own language requests" ON public.language_requests
  FOR SELECT USING ( user_id = auth.uid() );

-- Admins can read/manage all requests
DROP POLICY IF EXISTS "Admin read language requests" ON public.language_requests;
CREATE POLICY "Admin read language requests" ON public.language_requests
  FOR SELECT USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin update language requests" ON public.language_requests;
CREATE POLICY "Admin update language requests" ON public.language_requests
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- updated_at trigger for language_requests
DROP TRIGGER IF EXISTS set_updated_at_lang_req ON public.language_requests;
CREATE TRIGGER set_updated_at_lang_req
BEFORE UPDATE ON public.language_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- Reading progress tracking per user/lecture/language
create table if not exists public.reading_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lecture_id text not null,
  lang text not null,
  last_sentence_index integer not null default 0,
  started_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint reading_progress_pkey primary key (user_id, lecture_id, lang)
);

-- Indexes for quick lookups
create index if not exists idx_reading_progress_user on public.reading_progress (user_id);
create index if not exists idx_reading_progress_lecture on public.reading_progress (lecture_id);

-- Enable RLS
alter table public.reading_progress enable row level security;

-- Policies: users can see and manage only their own progress
DROP POLICY IF EXISTS "User read own progress" ON public.reading_progress;
CREATE POLICY "User read own progress" ON public.reading_progress
  FOR SELECT USING ( user_id = auth.uid() );

DROP POLICY IF EXISTS "User upsert own progress" ON public.reading_progress;
CREATE POLICY "User upsert own progress" ON public.reading_progress
  FOR INSERT WITH CHECK ( auth.uid() IS NOT NULL AND user_id = auth.uid() );


-- RPC to compute unique sentence stats per language
create or replace function public.get_language_unique_stats()
returns table (
  lang text,
  total integer,
  approved integer,
  pending integer,
  rejected integer,
  lecturesCovered integer
) as $$
  with base as (
    select lang, lecture_id, sentence_index, status
    from public.translations
    where status is not null
  ),
  unique_keys as (
    select lang, lecture_id, sentence_index,
           max(case when status = 'approved' then 1 else 0 end) as is_approved,
           max(case when status = 'pending' then 1 else 0 end) as is_pending,
           max(case when status = 'rejected' then 1 else 0 end) as is_rejected
    from base
    group by lang, lecture_id, sentence_index
  ),
  agg as (
    select lang,
           count(*)::int as total,
           sum(is_approved)::int as approved,
           sum(case when is_approved = 0 and is_pending = 1 then 1 else 0 end)::int as pending,
           sum(case when is_approved = 0 and is_pending = 0 and is_rejected = 1 then 1 else 0 end)::int as rejected,
           count(distinct lecture_id)::int as lecturesCovered
    from unique_keys
    group by lang
  )
  select * from agg
  order by total desc;
$$ language sql stable security definer;

grant execute on function public.get_language_unique_stats() to anon, authenticated;

DROP POLICY IF EXISTS "User update own progress" ON public.reading_progress;
CREATE POLICY "User update own progress" ON public.reading_progress
  FOR UPDATE USING ( user_id = auth.uid() ) WITH CHECK ( user_id = auth.uid() );

DROP POLICY IF EXISTS "User delete own progress" ON public.reading_progress;
CREATE POLICY "User delete own progress" ON public.reading_progress
  FOR DELETE USING ( user_id = auth.uid() );

-- Trigger to maintain updated_at
DROP TRIGGER IF EXISTS set_updated_at_reading_progress ON public.reading_progress;
CREATE TRIGGER set_updated_at_reading_progress
BEFORE UPDATE ON public.reading_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Reading overview counts (security definer to bypass RLS for aggregates)
DROP FUNCTION IF EXISTS public.get_reading_overview_counts();
CREATE FUNCTION public.get_reading_overview_counts()
returns table (
  total_registered integer,
  total_readers integer,
  active_readers_24h integer,
  active_readers_3d integer,
  active_readers_7d integer,
  total_sessions integer
) as $$
  select
    (select count(*) from public.profiles)::int as total_registered,
    (select count(distinct user_id) from public.reading_progress)::int as total_readers,
    (select count(distinct user_id) from public.reading_progress where updated_at >= now() - interval '24 hours')::int as active_readers_24h,
    (select count(distinct user_id) from public.reading_progress where updated_at >= now() - interval '3 days')::int as active_readers_3d,
    (select count(distinct user_id) from public.reading_progress where updated_at >= now() - interval '7 days')::int as active_readers_7d,
    (select count(*) from public.reading_progress)::int as total_sessions;
$$ language sql stable security definer;

grant execute on function public.get_reading_overview_counts() to anon, authenticated;
