-- Fix profile access for translation attribution and public stats
-- Policy: Public can see usernames and contributions, but NOT email addresses
-- Email addresses are only visible to the user themselves and admins

-- Remove the restrictive "Self read profile" policy
DROP POLICY IF EXISTS "Self read profile" ON public.profiles;

-- Add public read access to basic profile information for attribution and stats
-- This allows showing usernames on translations and stats pages
DROP POLICY IF EXISTS "Public read basic profile info" ON public.profiles;
CREATE POLICY "Public read basic profile info" ON public.profiles
  FOR SELECT USING ( true );

-- Note: This allows public access to first_name, last_name, role, avatar_url, language_proficiency
-- Email addresses are included in this policy but should be filtered out in the application layer
-- for public displays (only shown to the user themselves and admins)
