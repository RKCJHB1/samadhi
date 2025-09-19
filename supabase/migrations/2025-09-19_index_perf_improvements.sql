-- Migration: Add targeted indexes to improve common query patterns
-- Safe to re-run; uses IF NOT EXISTS
-- Rationale:
--  - translations: composite for lecture/lang/status/form ordered by sentence_index
--  - reading_progress: frequent lookups by (user_id, lecture_id)
--  - reading_time_daily: per-user time series access pattern
--  - translation_votes: lean index for tallies without large text column

begin;

-- translations: composite index for common reads
create index if not exists idx_translations_lecture_lang_status_form_sent
  on public.translations (lecture_id, lang, status, form, sentence_index);

-- reading_progress: per-user-per-lecture
create index if not exists idx_reading_progress_user_lecture
  on public.reading_progress (user_id, lecture_id);

-- reading_time_daily: per-user time series
create index if not exists idx_rtd_user_day
  on public.reading_time_daily (user_id, day);

-- translation_votes: lean aggregate/tally index
create index if not exists idx_votes_lslf
  on public.translation_votes (lecture_id, sentence_index, lang, form);

commit;

