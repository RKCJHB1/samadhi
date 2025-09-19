-- All-in-one Supabase schema for the Read/Translate project (run in SQL Editor)
-- Safe to re-run; uses IF NOT EXISTS and DROP POLICY/FUNCTION guards

-- ========== PROFILES ==========
create table if not exists public.profiles (
  id uuid primary key,
  email text,
  role text not null default 'user', -- 'user' | 'moderator' | 'admin'
  first_name text,
  last_name text,
  avatar_url text,
  username text,
  language_proficiency jsonb -- [{code:text, level:'Beginner'|'Fluent'|'Native/Academic'}]
);

-- Username normalization, constraint and unique index
create or replace function public.normalize_username()
returns trigger as $$
begin
  if new.username is null then return new; end if;
  new.username := lower(new.username);
  new.username := regexp_replace(new.username, '[^a-z0-9-]', '', 'g');
  new.username := regexp_replace(new.username, '-{2,}', '-', 'g');
  new.username := trim(both '-' from new.username);
  return new;
end; $$ language plpgsql;

drop trigger if exists normalize_username on public.profiles;
create trigger normalize_username before insert or update of username on public.profiles
for each row execute function public.normalize_username();

alter table if exists public.profiles
  drop constraint if exists profiles_username_format_check;
alter table if exists public.profiles
  add constraint profiles_username_format_check check (username is null or username ~ '^[a-z0-9-]{3,30}$');

create unique index if not exists profiles_username_unique_idx on public.profiles (username) where username is not null;

-- Public view with safe fields only (no email)
create or replace view public.public_profiles as
select id, first_name, last_name, username, role, language_proficiency from public.profiles;
grant select on public.public_profiles to anon;

-- RLS for profiles
alter table public.profiles enable row level security;
DROP POLICY IF EXISTS "Public read basic profile info" ON public.profiles;
CREATE POLICY "Public read basic profile info" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Self upsert profile" ON public.profiles;
CREATE POLICY "Self upsert profile" ON public.profiles FOR INSERT WITH CHECK (id = auth.uid());
DROP POLICY IF EXISTS "Self update profile" ON public.profiles;
CREATE POLICY "Self update profile" ON public.profiles FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());
DROP POLICY IF EXISTS "Admin read profiles" ON public.profiles;
-- NOTE: Avoid recursive policy on profiles; admin reads should be done via RPC or security definer if needed.
-- CREATE POLICY "Admin read profiles" ON public.profiles FOR SELECT USING (public.is_admin(auth.uid()));
DROP POLICY IF EXISTS "Admin update profiles" ON public.profiles;
-- NOTE: Avoid recursive policy on profiles; admin updates should be done via RPC or security definer if needed.
-- CREATE POLICY "Admin update profiles" ON public.profiles FOR UPDATE USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ========== TRANSLATIONS ==========
create table if not exists public.translations (
  lecture_id text not null,
  sentence_index integer not null,
  lang text not null,
  text text not null,
  form text not null default 'native',                  -- 'native' | 'transliteration'
  romanization_scheme text null,                        -- optional when form = transliteration
  status text not null default 'pending',               -- 'pending' | 'approved' | 'rejected'
  created_by uuid null,                                 -- references profiles.id
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint translations_pkey primary key (lecture_id, sentence_index, lang, form, created_at)
);

-- FK to profiles for joins (used by public_profiles!translations_created_by_fkey)
alter table if exists public.translations drop constraint if exists translations_created_by_fkey;
alter table if exists public.translations
  add constraint translations_created_by_fkey foreign key (created_by)
  references public.profiles(id) on delete set null;

-- Helpful indexes for queries used in the app
create index if not exists idx_translations_lecture_lang_status_form_sent on public.translations (lecture_id, lang, status, form, sentence_index);
create index if not exists idx_translations_creator_status on public.translations (created_by, status);
create index if not exists idx_translations_updated_at on public.translations (updated_at desc);

-- RLS for translations
alter table public.translations enable row level security;
DROP POLICY IF EXISTS "Public read approved translations" ON public.translations;
CREATE POLICY "Public read approved translations" ON public.translations FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Moderators read all" ON public.translations;
CREATE POLICY "Moderators read all" ON public.translations FOR SELECT USING (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
);

-- Insert policy requiring login and some proficiency in the target language (username required)
DROP POLICY IF EXISTS "Authenticated insert translations with proficiency" ON public.translations;
CREATE POLICY "Authenticated insert translations with proficiency" ON public.translations
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL
  AND exists (
    select 1 from public.profiles prof
    where prof.id = auth.uid()
      and prof.username is not null
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

-- Only moderators/admins can update (approve/reject), with language-aware allowances
DROP POLICY IF EXISTS "Moderators update translations" ON public.translations;
CREATE POLICY "Moderators update translations" ON public.translations
FOR UPDATE USING (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
) WITH CHECK (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
);

-- Allow admins to fully manage translations (including DELETE)
DROP POLICY IF EXISTS "Admin manage translations" ON public.translations;
CREATE POLICY "Admin manage translations" ON public.translations
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
  );


-- Triggers: set_created_by, set_updated_at, auto-approve for Fluent/Native
create or replace function public.set_created_by()
returns trigger as $$
begin
  if new.created_by is null then new.created_by := auth.uid(); end if;
  return new;
end; $$ language plpgsql set search_path = pg_catalog, public;

drop trigger if exists set_created_by on public.translations;
create trigger set_created_by before insert on public.translations
for each row execute function public.set_created_by();

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end; $$ language plpgsql set search_path = pg_catalog, public;

drop trigger if exists set_updated_at on public.translations;
create trigger set_updated_at before update on public.translations
for each row execute function public.set_updated_at();

create or replace function public.set_status_by_proficiency()
returns trigger as $$
begin
  if new.status is null or new.status = 'pending' then
    if auth.uid() is not null then
      perform 1 from public.profiles prof,
        lateral jsonb_to_recordset(coalesce(prof.language_proficiency, '[]'::jsonb)) as lp(code text, level text)
      where prof.id = auth.uid() and lp.code = new.lang and lp.level in ('Fluent','Native/Academic')
      limit 1;
      if found then new.status := 'approved'; end if;
    end if;
  end if;
  return new;
end; $$ language plpgsql set search_path = pg_catalog, public;

drop trigger if exists set_status_by_proficiency on public.translations;
create trigger set_status_by_proficiency before insert on public.translations
for each row execute function public.set_status_by_proficiency();

-- ========== TRANSLATION VOTES ==========
create table if not exists public.translation_votes (
  lecture_id text not null,
  sentence_index integer not null,
  lang text not null,
  form text not null default 'transliteration',
  text text not null,
  user_id uuid not null,
  value integer not null check (value in (-1, 1)),
  created_at timestamptz default now(),
  constraint translation_votes_unique unique (lecture_id, sentence_index, lang, form, text, user_id)
);

-- Allow admins to fully manage votes (clean up when removing a language)
DROP POLICY IF EXISTS "Admin manage translation votes" ON public.translation_votes;
CREATE POLICY "Admin manage translation votes" ON public.translation_votes
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
  );

create index if not exists translation_votes_lslfit on public.translation_votes (lecture_id, sentence_index, lang, form, text);
create index if not exists idx_votes_lslf on public.translation_votes (lecture_id, sentence_index, lang, form);

alter table public.translation_votes enable row level security;
DROP POLICY IF EXISTS "Public read votes" ON public.translation_votes;
CREATE POLICY "Public read votes" ON public.translation_votes FOR SELECT USING (true);
DROP POLICY IF EXISTS "User upsert own vote" ON public.translation_votes;
CREATE POLICY "User upsert own vote" ON public.translation_votes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
DROP POLICY IF EXISTS "User update own vote" ON public.translation_votes;
CREATE POLICY "User update own vote" ON public.translation_votes FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "User delete own vote" ON public.translation_votes;
CREATE POLICY "User delete own vote" ON public.translation_votes FOR DELETE USING (user_id = auth.uid());

-- ========== LANGUAGE REVIEWERS & REQUESTS ==========
create table if not exists public.language_reviewers (
  lang text not null,
  user_id uuid not null,
  created_at timestamptz default now(),
  constraint language_reviewers_pkey primary key (lang, user_id)
);
alter table if exists public.language_reviewers drop constraint if exists language_reviewers_user_id_fkey;
alter table if exists public.language_reviewers add constraint language_reviewers_user_id_fkey foreign key (user_id) references public.profiles(id) on delete cascade;
create index if not exists idx_language_reviewers_lang on public.language_reviewers (lang);
create index if not exists idx_language_reviewers_user on public.language_reviewers (user_id);
alter table public.language_reviewers enable row level security;
DROP POLICY IF EXISTS "Public read language reviewers" ON public.language_reviewers;
CREATE POLICY "Public read language reviewers" ON public.language_reviewers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage language reviewers" ON public.language_reviewers;
CREATE POLICY "Admin manage language reviewers" ON public.language_reviewers FOR ALL USING (
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
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.language_reviewer_requests enable row level security;
create index if not exists idx_lrr_lang_status on public.language_reviewer_requests (lang, status);
create index if not exists idx_lrr_user on public.language_reviewer_requests (user_id);
DROP POLICY IF EXISTS "User insert own reviewer request" ON public.language_reviewer_requests;
CREATE POLICY "User insert own reviewer request" ON public.language_reviewer_requests FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
DROP POLICY IF EXISTS "User read own reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "User read own reviewer requests" ON public.language_reviewer_requests FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Admin read reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin read reviewer requests" ON public.language_reviewer_requests FOR SELECT USING (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
DROP POLICY IF EXISTS "Admin update reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin update reviewer requests" ON public.language_reviewer_requests FOR UPDATE USING (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Allow admins to fully manage reviewer requests (cleanup operations)
DROP POLICY IF EXISTS "Admin manage reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin manage reviewer requests" ON public.language_reviewer_requests
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );


create or replace function public.set_updated_at()
returns trigger as $$ begin new.updated_at := now(); return new; end; $$ language plpgsql set search_path = pg_catalog, public;
DROP TRIGGER IF EXISTS set_updated_at_lrr ON public.language_reviewer_requests;
CREATE TRIGGER set_updated_at_lrr BEFORE UPDATE ON public.language_reviewer_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

create table if not exists public.language_requests (
  id bigserial primary key,
  lang text not null,
  user_id uuid not null,
  reason text,
  status text not null default 'pending', -- 'pending' | 'processed'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.language_requests enable row level security;
create index if not exists idx_language_requests_lang on public.language_requests (lang);
create index if not exists idx_language_requests_user on public.language_requests (user_id);
DROP POLICY IF EXISTS "User insert language request" ON public.language_requests;
CREATE POLICY "User insert language request" ON public.language_requests FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
DROP POLICY IF EXISTS "User read own language requests" ON public.language_requests;
CREATE POLICY "User read own language requests" ON public.language_requests FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Admin read language requests" ON public.language_requests;
CREATE POLICY "Admin read language requests" ON public.language_requests FOR SELECT USING (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
DROP POLICY IF EXISTS "Admin update language requests" ON public.language_requests;
CREATE POLICY "Admin update language requests" ON public.language_requests FOR UPDATE USING (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Allow admins to fully manage language requests (cleanup operations)
DROP POLICY IF EXISTS "Admin manage language requests" ON public.language_requests;
CREATE POLICY "Admin manage language requests" ON public.language_requests
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ========== LANGUAGE APPROVALS (manual approvals) ==========
create table if not exists public.language_approvals (
  lang text primary key,
  created_by uuid null references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);
alter table public.language_approvals enable row level security;
-- Allow public read so the site can list approved languages
DROP POLICY IF EXISTS "Public read language_approvals" ON public.language_approvals;
CREATE POLICY "Public read language_approvals" ON public.language_approvals FOR SELECT USING (true);
-- Admins can manage approvals
DROP POLICY IF EXISTS "Admin manage language_approvals" ON public.language_approvals;
CREATE POLICY "Admin manage language_approvals" ON public.language_approvals
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

DROP TRIGGER IF EXISTS set_updated_at_lang_req ON public.language_requests;
CREATE TRIGGER set_updated_at_lang_req BEFORE UPDATE ON public.language_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ========== LANGUAGE HIDDEN (blocklist) ==========
create table if not exists public.language_hidden (
  lang text primary key,
  created_by uuid null references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);
alter table public.language_hidden enable row level security;
DROP POLICY IF EXISTS "Public read language_hidden" ON public.language_hidden;
CREATE POLICY "Public read language_hidden" ON public.language_hidden FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage language_hidden" ON public.language_hidden;
CREATE POLICY "Admin manage language_hidden" ON public.language_hidden
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );


-- ========== READING PROGRESS ==========

-- Allow admins to fully manage reading_progress (cleanup for removed languages)
DROP POLICY IF EXISTS "Admin manage reading progress" ON public.reading_progress;
CREATE POLICY "Admin manage reading progress" ON public.reading_progress
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('moderator','admin'))
  );

create table if not exists public.reading_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lecture_id text not null,
  lang text not null,
  last_sentence_index integer not null default 0,
  started_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint reading_progress_pkey primary key (user_id, lecture_id, lang)
);
create index if not exists idx_reading_progress_user on public.reading_progress (user_id);
create index if not exists idx_reading_progress_lecture on public.reading_progress (lecture_id);
create index if not exists idx_reading_progress_user_lecture on public.reading_progress (user_id, lecture_id);

alter table public.reading_progress enable row level security;
DROP POLICY IF EXISTS "User read own progress" ON public.reading_progress;
CREATE POLICY "User read own progress" ON public.reading_progress FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "User upsert own progress" ON public.reading_progress;
CREATE POLICY "User upsert own progress" ON public.reading_progress FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
DROP POLICY IF EXISTS "User update own progress" ON public.reading_progress;
CREATE POLICY "User update own progress" ON public.reading_progress FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "User delete own progress" ON public.reading_progress;
CREATE POLICY "User delete own progress" ON public.reading_progress FOR DELETE USING (user_id = auth.uid());
DROP TRIGGER IF EXISTS set_updated_at_reading_progress ON public.reading_progress;
CREATE TRIGGER set_updated_at_reading_progress BEFORE UPDATE ON public.reading_progress FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ========== RPC FUNCTIONS (AGGREGATES) ==========
-- Unique sentence stats per language (security definer to bypass RLS safely)
DROP FUNCTION IF EXISTS public.get_language_unique_stats();
CREATE FUNCTION public.get_language_unique_stats()
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
  )
  select
    lang,
    sum(1)::int as total,
    sum(is_approved)::int as approved,
    sum(is_pending)::int as pending,
    sum(is_rejected)::int as rejected,
    count(distinct lecture_id)::int as lecturesCovered
  from unique_keys
  group by lang
  order by total desc;
$$ language sql stable security definer set search_path = pg_catalog, public;
GRANT EXECUTE ON FUNCTION public.get_language_unique_stats() TO anon, authenticated;

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
$$ language sql stable security definer set search_path = pg_catalog, public;
GRANT EXECUTE ON FUNCTION public.get_reading_overview_counts() TO anon, authenticated;



-- ========== READING TIME (DAILY AGGREGATE) ==========
create table if not exists public.reading_time_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  lecture_id text not null,
  lang text not null,
  day date not null default (now() at time zone 'utc')::date,
  ms bigint not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint reading_time_daily_pkey primary key (user_id, lecture_id, lang, day)
);
create index if not exists idx_reading_time_daily_user on public.reading_time_daily (user_id);
create index if not exists idx_reading_time_daily_lecture on public.reading_time_daily (lecture_id);
create index if not exists idx_rtd_user_day on public.reading_time_daily (user_id, day);

alter table public.reading_time_daily enable row level security;

-- RLS: users can manage their own rows
DROP POLICY IF EXISTS "User upsert own reading time" ON public.reading_time_daily;
CREATE POLICY "User upsert own reading time" ON public.reading_time_daily FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
DROP POLICY IF EXISTS "User update own reading time" ON public.reading_time_daily;
CREATE POLICY "User update own reading time" ON public.reading_time_daily FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "User read own reading time" ON public.reading_time_daily;
CREATE POLICY "User read own reading time" ON public.reading_time_daily FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "User delete own reading time" ON public.reading_time_daily;
CREATE POLICY "User delete own reading time" ON public.reading_time_daily FOR DELETE USING (user_id = auth.uid());

-- Trigger to maintain updated_at
DROP TRIGGER IF EXISTS set_updated_at_reading_time_daily ON public.reading_time_daily;
CREATE TRIGGER set_updated_at_reading_time_daily BEFORE UPDATE ON public.reading_time_daily FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RPC to record time (security definer not needed; relies on RLS and auth.uid())
DROP FUNCTION IF EXISTS public.record_reading_time(text, text, bigint);
CREATE FUNCTION public.record_reading_time(p_lecture_id text, p_lang text, p_delta_ms bigint)
RETURNS boolean AS $$
DECLARE
  v_user uuid := auth.uid();
  v_day date := (now() at time zone 'utc')::date;
  v_delta bigint := GREATEST(0, LEAST(p_delta_ms, 600000)); -- clamp to 10 minutes max per call
BEGIN
  IF v_user IS NULL THEN
    RETURN false;
  END IF;
  INSERT INTO public.reading_time_daily (user_id, lecture_id, lang, day, ms)
  VALUES (v_user, p_lecture_id, p_lang, v_day, v_delta)
  ON CONFLICT (user_id, lecture_id, lang, day)
  DO UPDATE SET ms = public.reading_time_daily.ms + EXCLUDED.ms, updated_at = now();
  RETURN true;
END; $$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public;
GRANT EXECUTE ON FUNCTION public.record_reading_time(text, text, bigint) TO authenticated;

-- Public aggregates for profiles (security definer to bypass RLS and expose only totals)
DROP FUNCTION IF EXISTS public.get_user_reading_time_totals(uuid);
CREATE FUNCTION public.get_user_reading_time_totals(p_user uuid)
RETURNS TABLE(total_ms bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT COALESCE(sum(ms), 0)::bigint AS total_ms
  FROM public.reading_time_daily
  WHERE user_id = p_user;
END; $$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = pg_catalog, public;
GRANT EXECUTE ON FUNCTION public.get_user_reading_time_totals(uuid) TO anon, authenticated;



-- ========== MAINTENANCE RPC: Purge data for languages that are NOT currently approved ==========
-- Effective approval = present in language_approvals minus any in language_hidden
DROP FUNCTION IF EXISTS public.purge_unapproved_languages();
CREATE FUNCTION public.purge_unapproved_languages()
RETURNS TABLE(
  purge_lang text,
  translations_deleted bigint,
  votes_deleted bigint,
  reading_progress_deleted bigint,
  reviewers_deleted bigint,
  reviewer_requests_deleted bigint,
  language_requests_deleted bigint,
  reading_time_deleted bigint
) AS $$
DECLARE
  langs_to_purge text[];
  l text;
  r_translations bigint; r_votes bigint; r_progress bigint; r_reviewers bigint; r_rr bigint; r_lr bigint; r_time bigint;
BEGIN
  -- Admin check: allow service role (auth.uid() is null in SQL Editor); enforce admin for app calls
  IF auth.uid() IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    ) THEN
      RAISE EXCEPTION 'Not authorized';
    END IF;
  END IF;

  WITH approved AS (
    SELECT lower(lang) AS lang FROM public.language_approvals
    EXCEPT
    SELECT lower(lang) FROM public.language_hidden
  ), all_langs AS (
    SELECT DISTINCT lower(lang) AS lang FROM public.translations
    UNION SELECT DISTINCT lower(lang) FROM public.translation_votes
    UNION SELECT DISTINCT lower(lang) FROM public.reading_progress
    UNION SELECT DISTINCT lower(lang) FROM public.language_reviewers
    UNION SELECT DISTINCT lower(lang) FROM public.language_reviewer_requests
    UNION SELECT DISTINCT lower(lang) FROM public.language_requests
    UNION SELECT DISTINCT lower(lang) FROM public.reading_time_daily
  )
  SELECT array_agg(al.lang) INTO langs_to_purge
  FROM all_langs al WHERE al.lang NOT IN (SELECT ap.lang FROM approved ap);

  IF langs_to_purge IS NULL OR array_length(langs_to_purge, 1) IS NULL THEN
    RETURN; -- nothing to purge
  END IF;

  FOREACH l IN ARRAY langs_to_purge LOOP
    DELETE FROM public.translation_votes WHERE lower(lang) = l;      GET DIAGNOSTICS r_votes = ROW_COUNT;
    DELETE FROM public.translations WHERE lower(lang) = l;           GET DIAGNOSTICS r_translations = ROW_COUNT;
    DELETE FROM public.reading_progress WHERE lower(lang) = l;       GET DIAGNOSTICS r_progress = ROW_COUNT;
    DELETE FROM public.language_reviewers WHERE lower(lang) = l;     GET DIAGNOSTICS r_reviewers = ROW_COUNT;
    DELETE FROM public.language_reviewer_requests WHERE lower(lang) = l; GET DIAGNOSTICS r_rr = ROW_COUNT;
    DELETE FROM public.language_requests WHERE lower(lang) = l;      GET DIAGNOSTICS r_lr = ROW_COUNT;
    DELETE FROM public.reading_time_daily WHERE lower(lang) = l;     GET DIAGNOSTICS r_time = ROW_COUNT;

    -- Assign OUT parameters then return next row
    purge_lang := l;
    translations_deleted := r_translations;
    votes_deleted := r_votes;
    reading_progress_deleted := r_progress;
    reviewers_deleted := r_reviewers;
    reviewer_requests_deleted := r_rr;
    language_requests_deleted := r_lr;
    reading_time_deleted := r_time;
    RETURN NEXT;
  END LOOP;
END; $$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
GRANT EXECUTE ON FUNCTION public.purge_unapproved_languages() TO authenticated;
