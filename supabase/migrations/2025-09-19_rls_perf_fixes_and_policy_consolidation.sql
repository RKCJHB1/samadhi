-- Migration: RLS performance fixes (wrap auth.uid() in SELECT) and policy name consolidation
-- Purpose: Address Supabase lints: auth_rls_initplan and multiple_permissive_policies
-- Notes: Idempotent and safe to re-run. Drops variant policy names then creates canonical ones.

begin;

-- Helper note: Using (select auth.uid()) in policies per Supabase guidance
-- https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

-- ========== translations ==========
DROP POLICY IF EXISTS "Public read approved translations" ON public.translations;
CREATE POLICY "Public read approved translations" ON public.translations
  FOR SELECT USING ( status = 'approved' );

DROP POLICY IF EXISTS "Authenticated insert translations with proficiency" ON public.translations;
CREATE POLICY "Authenticated insert translations with proficiency" ON public.translations
  FOR INSERT
  WITH CHECK (
    (select auth.uid()) IS NOT NULL
    AND exists (
      select 1 from public.profiles prof
      where prof.id = (select auth.uid())
        and exists (
          select 1 from jsonb_to_recordset(coalesce(prof.language_proficiency, '[]'::jsonb)) as lp(code text, level text)
          where lp.code = lang
        )
    )
    AND status = 'pending'
  );

DROP POLICY IF EXISTS "Moderators read all" ON public.translations;
CREATE POLICY "Moderators read all" ON public.translations
  FOR SELECT USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  );

DROP POLICY IF EXISTS "Moderators update translations" ON public.translations;
CREATE POLICY "Moderators update translations" ON public.translations
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  );

DROP POLICY IF EXISTS "Admin manage translations" ON public.translations;
CREATE POLICY "Admin manage translations" ON public.translations
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  );

-- ========== profiles ==========
DROP POLICY IF EXISTS "Public read basic profile info" ON public.profiles;
CREATE POLICY "Public read basic profile info" ON public.profiles
  FOR SELECT USING ( true );

-- Drop variant names to avoid duplicates
DROP POLICY IF EXISTS "Allow self insert" ON public.profiles;
DROP POLICY IF EXISTS "Self upsert profile" ON public.profiles;
CREATE POLICY "Self upsert profile" ON public.profiles
  FOR INSERT WITH CHECK ( id = (select auth.uid()) );

DROP POLICY IF EXISTS "Allow self update" ON public.profiles;
DROP POLICY IF EXISTS "Self update profile" ON public.profiles;
CREATE POLICY "Self update profile" ON public.profiles
  FOR UPDATE USING ( id = (select auth.uid()) ) WITH CHECK ( id = (select auth.uid()) );

DROP POLICY IF EXISTS "Admin read profiles" ON public.profiles;
CREATE POLICY "Admin read profiles" ON public.profiles
  FOR SELECT USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin update profiles" ON public.profiles;
CREATE POLICY "Admin update profiles" ON public.profiles
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

-- ========== translation_votes ==========
DROP POLICY IF EXISTS "Public read votes" ON public.translation_votes;
CREATE POLICY "Public read votes" ON public.translation_votes
  FOR SELECT USING ( true );

DROP POLICY IF EXISTS "User upsert own vote" ON public.translation_votes;
CREATE POLICY "User upsert own vote" ON public.translation_votes
  FOR INSERT WITH CHECK ( (select auth.uid()) IS NOT NULL AND user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "User update own vote" ON public.translation_votes;
CREATE POLICY "User update own vote" ON public.translation_votes
  FOR UPDATE USING ( user_id = (select auth.uid()) )
  WITH CHECK ( user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "User delete own vote" ON public.translation_votes;
CREATE POLICY "User delete own vote" ON public.translation_votes
  FOR DELETE USING ( user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "Admin manage translation votes" ON public.translation_votes;
CREATE POLICY "Admin manage translation votes" ON public.translation_votes
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  );

-- ========== language_reviewers ==========
DROP POLICY IF EXISTS "Public read language reviewers" ON public.language_reviewers;
CREATE POLICY "Public read language reviewers" ON public.language_reviewers
  FOR SELECT USING ( true );

DROP POLICY IF EXISTS "Admin manage language reviewers" ON public.language_reviewers;
CREATE POLICY "Admin manage language reviewers" ON public.language_reviewers
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

-- ========== language_reviewer_requests ==========
DROP POLICY IF EXISTS "User insert own reviewer request" ON public.language_reviewer_requests;
CREATE POLICY "User insert own reviewer request" ON public.language_reviewer_requests
  FOR INSERT WITH CHECK ( (select auth.uid()) IS NOT NULL AND user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "User read own reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "User read own reviewer requests" ON public.language_reviewer_requests
  FOR SELECT USING ( user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "Admin read reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin read reviewer requests" ON public.language_reviewer_requests
  FOR SELECT USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin update reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin update reviewer requests" ON public.language_reviewer_requests
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin manage reviewer requests" ON public.language_reviewer_requests;
CREATE POLICY "Admin manage reviewer requests" ON public.language_reviewer_requests
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

-- ========== language_requests ==========
DROP POLICY IF EXISTS "User insert language request" ON public.language_requests;
CREATE POLICY "User insert language request" ON public.language_requests
  FOR INSERT WITH CHECK ( (select auth.uid()) IS NOT NULL AND user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "User read own language requests" ON public.language_requests;
CREATE POLICY "User read own language requests" ON public.language_requests
  FOR SELECT USING ( user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "Admin read language requests" ON public.language_requests;
CREATE POLICY "Admin read language requests" ON public.language_requests
  FOR SELECT USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin update language requests" ON public.language_requests;
CREATE POLICY "Admin update language requests" ON public.language_requests
  FOR UPDATE USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin manage language requests" ON public.language_requests;
CREATE POLICY "Admin manage language requests" ON public.language_requests
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

-- ========== language_approvals ==========
-- Drop variant names that may coexist and cause duplicates
DROP POLICY IF EXISTS "Public read language approvals" ON public.language_approvals;
DROP POLICY IF EXISTS "Public read language_approvals" ON public.language_approvals;
DROP POLICY IF EXISTS "public read approvals" ON public.language_approvals;
CREATE POLICY "Public read language approvals" ON public.language_approvals
  FOR SELECT USING ( true );

DROP POLICY IF EXISTS "Admin manage language approvals" ON public.language_approvals;
DROP POLICY IF EXISTS "Admin manage language_approvals" ON public.language_approvals;
CREATE POLICY "Admin manage language approvals" ON public.language_approvals
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

-- ========== language_hidden ==========
DROP POLICY IF EXISTS "Public read language hidden" ON public.language_hidden;
DROP POLICY IF EXISTS "public read hidden" ON public.language_hidden;
DROP POLICY IF EXISTS "Public read language_hidden" ON public.language_hidden;
CREATE POLICY "Public read language_hidden" ON public.language_hidden
  FOR SELECT USING ( true );

DROP POLICY IF EXISTS "Admin manage language_hidden" ON public.language_hidden;
CREATE POLICY "Admin manage language_hidden" ON public.language_hidden
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin')
  );

-- ========== reading_progress ==========
-- Drop older/variant names seen in lints
DROP POLICY IF EXISTS "select own progress" ON public.reading_progress;
DROP POLICY IF EXISTS "insert own progress" ON public.reading_progress;
DROP POLICY IF EXISTS "update own progress" ON public.reading_progress;
DROP POLICY IF EXISTS "User read own progress" ON public.reading_progress;
DROP POLICY IF EXISTS "User upsert own progress" ON public.reading_progress;
DROP POLICY IF EXISTS "User update own progress" ON public.reading_progress;
DROP POLICY IF EXISTS "User delete own progress" ON public.reading_progress;

CREATE POLICY "User read own progress" ON public.reading_progress
  FOR SELECT USING ( user_id = (select auth.uid()) );

CREATE POLICY "User upsert own progress" ON public.reading_progress
  FOR INSERT WITH CHECK ( (select auth.uid()) IS NOT NULL AND user_id = (select auth.uid()) );

CREATE POLICY "User update own progress" ON public.reading_progress
  FOR UPDATE USING ( user_id = (select auth.uid()) ) WITH CHECK ( user_id = (select auth.uid()) );

CREATE POLICY "User delete own progress" ON public.reading_progress
  FOR DELETE USING ( user_id = (select auth.uid()) );

DROP POLICY IF EXISTS "Admin manage reading progress" ON public.reading_progress;
CREATE POLICY "Admin manage reading progress" ON public.reading_progress
  FOR ALL USING (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  ) WITH CHECK (
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('moderator','admin'))
  );

-- ========== reading_time_daily ==========
DROP POLICY IF EXISTS "User upsert own reading time" ON public.reading_time_daily;
DROP POLICY IF EXISTS "User update own reading time" ON public.reading_time_daily;
DROP POLICY IF EXISTS "User read own reading time" ON public.reading_time_daily;
DROP POLICY IF EXISTS "User delete own reading time" ON public.reading_time_daily;

CREATE POLICY "User upsert own reading time" ON public.reading_time_daily
  FOR INSERT WITH CHECK ( (select auth.uid()) IS NOT NULL AND user_id = (select auth.uid()) );

CREATE POLICY "User update own reading time" ON public.reading_time_daily
  FOR UPDATE USING ( user_id = (select auth.uid()) ) WITH CHECK ( user_id = (select auth.uid()) );

CREATE POLICY "User read own reading time" ON public.reading_time_daily
  FOR SELECT USING ( user_id = (select auth.uid()) );

CREATE POLICY "User delete own reading time" ON public.reading_time_daily
  FOR DELETE USING ( user_id = (select auth.uid()) );

commit;

