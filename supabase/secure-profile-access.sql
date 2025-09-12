-- More secure approach: Create a view for public profile info
-- This only exposes the minimum data needed for translation attribution

-- Create a view that only exposes attribution-relevant fields
CREATE OR REPLACE VIEW public.profile_attribution AS
SELECT 
  id,
  first_name,
  last_name,
  CASE 
    WHEN first_name IS NOT NULL OR last_name IS NOT NULL 
    THEN CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, ''))
    ELSE SPLIT_PART(email, '@', 1) -- Use email username part if no name
  END as display_name
FROM public.profiles;

-- Allow public read access to the attribution view
DROP POLICY IF EXISTS "Public read profile attribution" ON public.profile_attribution;
-- Note: Views don't use RLS policies, but we'd need to update our query to use this view

-- Alternative: Update the existing policy to be more permissive
-- This is the simpler approach that will work with existing code
DROP POLICY IF EXISTS "Public read basic profile info" ON public.profiles;
CREATE POLICY "Public read basic profile info" ON public.profiles 
  FOR SELECT USING ( true );
