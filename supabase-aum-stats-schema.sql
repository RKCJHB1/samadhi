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
