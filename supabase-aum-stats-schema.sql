-- Aum Stats Table for tracking chanting statistics
-- This replaces the Turso database with a Supabase-native table

CREATE TABLE IF NOT EXISTS aum_stats (
  id BIGSERIAL PRIMARY KEY,
  global_chants BIGINT DEFAULT 0,
  record_chants BIGINT DEFAULT 0,
  avg_chants_per_user FLOAT DEFAULT 0,
  unique_users BIGINT DEFAULT 0,
  unique_countries BIGINT DEFAULT 0,
  user_chants JSONB DEFAULT '{}'::jsonb,
  countries JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a unique index to ensure single stats record
CREATE UNIQUE INDEX IF NOT EXISTS idx_aum_stats_single ON aum_stats(id) WHERE id = 1;

-- Create index for updated_at for sorting/filtering
CREATE INDEX IF NOT EXISTS idx_aum_stats_updated_at ON aum_stats(updated_at DESC);

-- User Chants Log - for historical tracking and analytics
CREATE TABLE IF NOT EXISTS user_chants_log (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  chant_count BIGINT DEFAULT 1,
  country VARCHAR(2),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_user_chants_user_id ON user_chants_log(user_id);

-- Create index for timestamp queries
CREATE INDEX IF NOT EXISTS idx_user_chants_timestamp ON user_chants_log(timestamp DESC);

-- Enable RLS (Row-Level Security) for security
ALTER TABLE aum_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_chants_log ENABLE ROW LEVEL SECURITY;

-- Allow all users to read stats (public data)
CREATE POLICY "Allow public read on aum_stats" ON aum_stats
  FOR SELECT USING (true);

-- Allow all users to update stats (with rate limiting handled in app)
CREATE POLICY "Allow public update on aum_stats" ON aum_stats
  FOR UPDATE USING (true)
  WITH CHECK (true);

-- Allow all users to insert chant logs
CREATE POLICY "Allow public insert on user_chants_log" ON user_chants_log
  FOR INSERT WITH CHECK (true);

-- Allow all users to read their own chant logs (optional, for analytics)
CREATE POLICY "Allow public read on user_chants_log" ON user_chants_log
  FOR SELECT USING (true);

-- Initialize the stats record (if not exists)
INSERT INTO aum_stats (id, global_chants, record_chants, avg_chants_per_user, unique_users, unique_countries)
VALUES (1, 0, 0, 0, 0, 0)
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- Atomic increment function for extremely high concurrency
-- Allows batching clicks and safely incrementing them without race conditions
-- =========================================================================
CREATE OR REPLACE FUNCTION increment_aum_chants(
  increment_by INT,
  p_user_id TEXT,
  p_country TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_was_new_user BOOLEAN;
  v_was_new_country BOOLEAN;
  v_country_key TEXT;
  v_new_global BIGINT;
  v_new_unique_users BIGINT;
  v_new_unique_countries BIGINT;
  v_user_chants JSONB;
  v_countries JSONB;
  v_new_user_count BIGINT;
BEGIN
  -- Default country key
  v_country_key := COALESCE(p_country, 'Local');

  -- Get current counts and check if new user/country
  SELECT
    user_chants,
    countries,
    NOT (user_chants ? p_user_id),
    NOT (countries ? v_country_key)
  INTO
    v_user_chants,
    v_countries,
    v_was_new_user,
    v_was_new_country
  FROM aum_stats WHERE id = 1 FOR UPDATE;

  -- Calculate new user chant count
  v_new_user_count := COALESCE((v_user_chants->>p_user_id)::BIGINT, 0) + increment_by;

  -- Update the JSON objects
  v_user_chants := jsonb_set(
    v_user_chants,
    ARRAY[p_user_id],
    to_jsonb(v_new_user_count)
  );

  v_countries := jsonb_set(
    v_countries,
    ARRAY[v_country_key],
    to_jsonb(COALESCE((v_countries->>v_country_key)::BIGINT, 0) + increment_by)
  );

  -- Perform the atomic update
  UPDATE aum_stats
  SET
    global_chants = global_chants + increment_by,
    unique_users = unique_users + CASE WHEN v_was_new_user THEN 1 ELSE 0 END,
    unique_countries = unique_countries + CASE WHEN v_was_new_country THEN 1 ELSE 0 END,
    user_chants = v_user_chants,
    countries = v_countries,
    record_chants = GREATEST(record_chants, v_new_user_count),
    updated_at = NOW()
  WHERE id = 1
  RETURNING global_chants, unique_users, unique_countries INTO v_new_global, v_new_unique_users, v_new_unique_countries;

  -- Update average
  IF v_new_unique_users > 0 THEN
    UPDATE aum_stats SET avg_chants_per_user = v_new_global::FLOAT / v_new_unique_users WHERE id = 1;
  END IF;

  -- Also log it (optional, for analytics)
  INSERT INTO user_chants_log (user_id, chant_count, country)
  VALUES (p_user_id, increment_by, p_country);
END;
$$;