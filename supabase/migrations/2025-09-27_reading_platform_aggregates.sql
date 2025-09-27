-- Migration: Platform-wide reading aggregates for Stats page
-- Includes RPCs and helpful indexes; safe to re-run (uses IF EXISTS / IF NOT EXISTS)

begin;

-- 1) Platform-wide total reading time (ms)
--    Sums daily aggregates from public.reading_time_daily
DROP FUNCTION IF EXISTS public.get_platform_reading_time_totals();
CREATE FUNCTION public.get_platform_reading_time_totals()
RETURNS TABLE ( total_ms bigint )
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  RETURN QUERY
  SELECT COALESCE(SUM(ms), 0)::bigint AS total_ms
  FROM public.reading_time_daily;
END; $$;
GRANT EXECUTE ON FUNCTION public.get_platform_reading_time_totals() TO anon, authenticated;


-- 2) Platform-wide reading progress aggregates (by language)
--    Heuristic for completion uses >= 90 sentences read per lecture.
--    If you later add exact sentence counts per lecture, this function can be updated to use those.
DROP FUNCTION IF EXISTS public.get_reading_progress_aggregates(text);
CREATE FUNCTION public.get_reading_progress_aggregates(p_lang text DEFAULT 'en')
RETURNS TABLE (
  total_lectures_started integer,
  total_lectures_completed integer,
  total_lectures_in_progress integer,
  total_sentences_read bigint
)
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM public.reading_progress WHERE lang = p_lang)::int AS total_lectures_started,
    (SELECT COUNT(*) FROM public.reading_progress WHERE lang = p_lang AND (last_sentence_index + 1) >= 90)::int AS total_lectures_completed,
    (SELECT COUNT(*) FROM public.reading_progress WHERE lang = p_lang AND (last_sentence_index + 1) BETWEEN 1 AND 89)::int AS total_lectures_in_progress,
    (SELECT COALESCE(SUM(last_sentence_index + 1), 0)::bigint FROM public.reading_progress WHERE lang = p_lang) AS total_sentences_read;
END; $$;
GRANT EXECUTE ON FUNCTION public.get_reading_progress_aggregates(text) TO anon, authenticated;


-- 3) Helpful indexes (idempotent)
-- Existing index (shown in previous migration) is re-stated for idempotency
CREATE INDEX IF NOT EXISTS idx_rtd_user_day
  ON public.reading_time_daily (user_id, day);

-- Add indexes to support language-filtered aggregates on reading_progress
CREATE INDEX IF NOT EXISTS idx_reading_progress_lang
  ON public.reading_progress (lang);

CREATE INDEX IF NOT EXISTS idx_reading_progress_lang_last
  ON public.reading_progress (lang, last_sentence_index);

commit;

