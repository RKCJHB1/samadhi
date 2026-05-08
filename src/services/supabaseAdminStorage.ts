/**
 * Supabase Admin Storage Service
 * Online implementation using Supabase PostgreSQL
 * Implements the same IAdminStorage interface as LocalAdminStorage
 */

import {
  AdminUser,
  AdminSession,
  MantraAssignment,
  IAdminStorage,
  SESSION_DURATION_MS,
} from '@/types/adminTypes';
import {
  getSupabaseAdminClient,
  dbUserToAdminUser,
  dbAssignmentToMantraAssignment,
  DbAdminUser,
  DbMantraAssignment,
} from '@/config/supabaseAdmin';

const SESSION_KEY = 'admin_session';

class SupabaseAdminStorage implements IAdminStorage {
  private get supabase() {
    return getSupabaseAdminClient();
  }

  // ============ USERS ============

  async getUsers(): Promise<AdminUser[]> {
    const { data, error } = await this.supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as DbAdminUser[]).map(dbUserToAdminUser);
  }

  async getUser(id: string): Promise<AdminUser | null> {
    const { data, error } = await this.supabase
      .from('admin_users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return dbUserToAdminUser(data as DbAdminUser);
  }

  async getUserByLoginCode(code: string): Promise<AdminUser | null> {
    const { data, error } = await this.supabase
      .from('admin_users')
      .select('*')
      .eq('login_code', code)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return dbUserToAdminUser(data as DbAdminUser);
  }

  async createUser(userData: Omit<AdminUser, 'id' | 'createdAt'>): Promise<AdminUser> {
    const dbData = {
      name: userData.name,
      email: userData.email || null,
      role: userData.role,
      login_code: userData.loginCode,
      is_active: userData.isActive,
      last_login_at: userData.lastLoginAt || null,
    };

    const { data, error } = await this.supabase
      .from('admin_users')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;
    return dbUserToAdminUser(data as DbAdminUser);
  }

  async updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser> {
    const dbUpdates: Partial<DbAdminUser> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.email !== undefined) dbUpdates.email = updates.email || null;
    if (updates.role !== undefined) dbUpdates.role = updates.role;
    if (updates.loginCode !== undefined) dbUpdates.login_code = updates.loginCode;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
    if (updates.lastLoginAt !== undefined) dbUpdates.last_login_at = updates.lastLoginAt || null;

    const { data, error } = await this.supabase
      .from('admin_users')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return dbUserToAdminUser(data as DbAdminUser);
  }

  async deleteUser(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('admin_users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ============ ASSIGNMENTS ============

  async getAssignments(): Promise<MantraAssignment[]> {
    const { data, error } = await this.supabase
      .from('mantra_assignments')
      .select('*')
      .order('assigned_at', { ascending: false });

    if (error) throw error;
    return (data as DbMantraAssignment[]).map(dbAssignmentToMantraAssignment);
  }

  async getAssignmentsByModerator(moderatorId: string): Promise<MantraAssignment[]> {
    const { data, error } = await this.supabase
      .from('mantra_assignments')
      .select('*')
      .eq('moderator_id', moderatorId)
      .order('assigned_at', { ascending: false });

    if (error) throw error;
    return (data as DbMantraAssignment[]).map(dbAssignmentToMantraAssignment);
  }

  async getAssignmentByMantra(mantraId: string): Promise<MantraAssignment | null> {
    const { data, error } = await this.supabase
      .from('mantra_assignments')
      .select('*')
      .eq('mantra_id', mantraId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return dbAssignmentToMantraAssignment(data as DbMantraAssignment);
  }

  async createAssignment(assignmentData: Omit<MantraAssignment, 'id' | 'assignedAt'>): Promise<MantraAssignment> {
    const dbData = {
      moderator_id: assignmentData.moderatorId,
      mantra_id: assignmentData.mantraId,
      mantra_name: assignmentData.mantraName,
      status: assignmentData.status,
      started_at: assignmentData.startedAt || null,
      submitted_at: assignmentData.submittedAt || null,
      reviewed_at: assignmentData.reviewedAt || null,
      reviewed_by: assignmentData.reviewedBy || null,
      notes: assignmentData.notes || null,
      moderator_notes: assignmentData.moderatorNotes || null,
    };

    const { data, error } = await this.supabase
      .from('mantra_assignments')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;
    return dbAssignmentToMantraAssignment(data as DbMantraAssignment);
  }

  async updateAssignment(id: string, updates: Partial<MantraAssignment>): Promise<MantraAssignment> {
    const dbUpdates: Partial<DbMantraAssignment> = {};
    if (updates.moderatorId !== undefined) dbUpdates.moderator_id = updates.moderatorId;
    if (updates.mantraId !== undefined) dbUpdates.mantra_id = updates.mantraId;
    if (updates.mantraName !== undefined) dbUpdates.mantra_name = updates.mantraName;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.startedAt !== undefined) dbUpdates.started_at = updates.startedAt || null;
    if (updates.submittedAt !== undefined) dbUpdates.submitted_at = updates.submittedAt || null;
    if (updates.reviewedAt !== undefined) dbUpdates.reviewed_at = updates.reviewedAt || null;
    if (updates.reviewedBy !== undefined) dbUpdates.reviewed_by = updates.reviewedBy || null;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes || null;
    if (updates.moderatorNotes !== undefined) dbUpdates.moderator_notes = updates.moderatorNotes || null;

    const { data, error } = await this.supabase
      .from('mantra_assignments')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return dbAssignmentToMantraAssignment(data as DbMantraAssignment);
  }

  async deleteAssignment(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mantra_assignments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ============ SESSION ============
  // Session is still stored locally (browser) for security

  getSession(): AdminSession | null {
    try {
      const data = sessionStorage.getItem(SESSION_KEY);
      if (!data) return null;

      const session: AdminSession = JSON.parse(data);
      if (Date.now() > session.expiresAt) {
        this.clearSession();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  setSession(session: AdminSession): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  clearSession(): void {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

// Export the class for conditional instantiation
export { SupabaseAdminStorage };

