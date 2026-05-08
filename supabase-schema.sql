-- ============================================
-- Supabase Schema for Admin Moderator System
-- ============================================
-- 
-- INSTRUCTIONS:
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to SQL Editor
-- 3. Paste this entire file and run it
-- 4. Enable Row Level Security policies as needed
--
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'moderator')),
  login_code TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Index for login code lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_login_code ON admin_users(login_code);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- ============================================
-- MANTRA ASSIGNMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS mantra_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moderator_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  mantra_id TEXT NOT NULL,
  mantra_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'submitted', 'approved', 'needs_revision')),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES admin_users(id),
  notes TEXT,
  moderator_notes TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_mantra_assignments_moderator ON mantra_assignments(moderator_id);
CREATE INDEX IF NOT EXISTS idx_mantra_assignments_mantra ON mantra_assignments(mantra_id);
CREATE INDEX IF NOT EXISTS idx_mantra_assignments_status ON mantra_assignments(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Enable RLS on tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mantra_assignments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all users
CREATE POLICY "Users can view all admin users" ON admin_users
  FOR SELECT USING (true);

-- Policy: Allow authenticated users to insert users (for super admin)
CREATE POLICY "Super admin can create users" ON admin_users
  FOR INSERT WITH CHECK (true);

-- Policy: Allow users to update their own record or super admin can update any
CREATE POLICY "Users can update" ON admin_users
  FOR UPDATE USING (true);

-- Policy: Allow super admin to delete users
CREATE POLICY "Super admin can delete users" ON admin_users
  FOR DELETE USING (true);

-- Policy: Allow authenticated users to read assignments
CREATE POLICY "Users can view assignments" ON mantra_assignments
  FOR SELECT USING (true);

-- Policy: Allow creating assignments
CREATE POLICY "Super admin can create assignments" ON mantra_assignments
  FOR INSERT WITH CHECK (true);

-- Policy: Allow updating assignments
CREATE POLICY "Users can update assignments" ON mantra_assignments
  FOR UPDATE USING (true);

-- Policy: Allow deleting assignments
CREATE POLICY "Super admin can delete assignments" ON mantra_assignments
  FOR DELETE USING (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================
-- Uncomment to insert test data
/*
INSERT INTO admin_users (name, email, role, login_code, is_active)
VALUES 
  ('Test Moderator', 'test@example.com', 'moderator', 'MOD-Test-1234', true);
*/

-- ============================================
-- HELPFUL QUERIES
-- ============================================
-- Get all moderators with their assignment counts:
/*
SELECT 
  u.id,
  u.name,
  u.login_code,
  COUNT(a.id) as assignment_count,
  COUNT(CASE WHEN a.status = 'submitted' THEN 1 END) as pending_reviews
FROM admin_users u
LEFT JOIN mantra_assignments a ON u.id = a.moderator_id
WHERE u.role = 'moderator'
GROUP BY u.id, u.name, u.login_code;
*/

-- Get all submitted assignments for review:
/*
SELECT 
  a.*,
  u.name as moderator_name
FROM mantra_assignments a
JOIN admin_users u ON a.moderator_id = u.id
WHERE a.status = 'submitted'
ORDER BY a.submitted_at DESC;
*/

