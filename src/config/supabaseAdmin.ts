/**
 * Supabase Configuration for Admin System
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Go to Project Settings > API
 * 3. Copy the "Project URL" and "anon public" key
 * 4. Create a .env file with:
 *    VITE_SUPABASE_ADMIN_URL=your-project-url
 *    VITE_SUPABASE_ADMIN_ANON_KEY=your-anon-key
 * 5. Run the SQL schema (see supabase-schema.sql)
 * 6. Set USE_SUPABASE_ADMIN=true below
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============ CONFIGURATION ============

/**
 * Toggle this to switch between local storage and Supabase
 * Set to true when you're ready to go online
 */
export const USE_SUPABASE_ADMIN = true;

// ============ SUPABASE CLIENT ============

const supabaseUrl = import.meta.env.VITE_SUPABASE_ADMIN_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ADMIN_ANON_KEY || '';

let supabaseAdminClient: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient {
  if (!supabaseAdminClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase Admin credentials not configured. ' +
        'Please set VITE_SUPABASE_ADMIN_URL and VITE_SUPABASE_ADMIN_ANON_KEY in your .env file.'
      );
    }
    supabaseAdminClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseAdminClient;
}

// ============ DATABASE TYPES ============

// These match the Supabase table structure
export interface DbAdminUser {
  id: string;
  name: string;
  email: string | null;
  role: 'super_admin' | 'moderator';
  login_code: string;
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
}

export interface DbMantraAssignment {
  id: string;
  moderator_id: string;
  mantra_id: string;
  mantra_name: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'needs_revision';
  assigned_at: string;
  started_at: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  notes: string | null;
  moderator_notes: string | null;
}

// ============ TYPE CONVERTERS ============

import { AdminUser, MantraAssignment } from '@/types/adminTypes';

export function dbUserToAdminUser(dbUser: DbAdminUser): AdminUser {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email || undefined,
    role: dbUser.role,
    loginCode: dbUser.login_code,
    isActive: dbUser.is_active,
    createdAt: dbUser.created_at,
    lastLoginAt: dbUser.last_login_at || undefined,
  };
}

export function dbAssignmentToMantraAssignment(dbAssignment: DbMantraAssignment): MantraAssignment {
  return {
    id: dbAssignment.id,
    moderatorId: dbAssignment.moderator_id,
    mantraId: dbAssignment.mantra_id,
    mantraName: dbAssignment.mantra_name,
    status: dbAssignment.status,
    assignedAt: dbAssignment.assigned_at,
    startedAt: dbAssignment.started_at || undefined,
    submittedAt: dbAssignment.submitted_at || undefined,
    reviewedAt: dbAssignment.reviewed_at || undefined,
    reviewedBy: dbAssignment.reviewed_by || undefined,
    notes: dbAssignment.notes || undefined,
    moderatorNotes: dbAssignment.moderator_notes || undefined,
  };
}

