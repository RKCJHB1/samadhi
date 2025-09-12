# Supabase setup for Translations

This project can sync translations (sentence-by-sentence) to Supabase. LocalStorage remains as a fallback when Supabase env vars are not present.

## 1) Create a Supabase project
- Get the Project URL and anon public key (Settings → API)
- In the project SQL editor, run `supabase/schema.sql` from this repo

## 2) Add env vars
Create a `.env.local` file in the repo root with:

VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

Restart `npm run dev`.

## 3) How it works
- ReadLecturePage:
  - On load, fetches remote translations for the selected language and merges into the local store
  - On submit, saves to local store and also upserts to Supabase (if configured)
- ReadIndexPage progress currently reads from local store. It will automatically reflect remote items after ReadLecturePage merges them.

## 4) Security
RLS in `supabase/schema.sql` currently allows anon read/insert/update (temporary, per requirement). Lock this down when moderation is added.

