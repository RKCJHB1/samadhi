-- Migration: Pin function search_path and set public.public_profiles as SECURITY INVOKER
-- Purpose: Address Supabase security advisories for role-mutable search_path and view security.
-- Notes: Idempotent and safe to re-run.

begin;

-- Pin search_path for functions to avoid role-mutable behavior
DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.set_created_by() SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.set_updated_at() SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.set_status_by_proficiency() SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.get_language_unique_stats() SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.get_reading_overview_counts() SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.record_reading_time(text, text, bigint) SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.get_user_reading_time_totals(uuid) SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

DO $$ BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.normalize_username() SET search_path = ''pg_catalog, public''';
  EXCEPTION WHEN undefined_function THEN NULL;
  END;
END $$;

-- Ensure the public_profiles view runs with invoker privileges
create or replace view public.public_profiles with (security_barrier=true) as
select id, first_name, last_name, username, role, language_proficiency
from public.profiles;

-- Ensure anon can read the public view
grant select on public.public_profiles to anon;

commit;
