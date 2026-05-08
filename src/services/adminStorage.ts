/**
 * Admin Storage Service
 * Exports either LocalAdminStorage or SupabaseAdminStorage based on config
 *
 * To switch to Supabase:
 * 1. Set USE_SUPABASE_ADMIN = true in src/config/supabaseAdmin.ts
 * 2. Add VITE_SUPABASE_ADMIN_URL and VITE_SUPABASE_ADMIN_ANON_KEY to .env
 * 3. Run the SQL schema in Supabase (see supabase-schema.sql)
 */

import {
  AdminUser,
  AdminSession,
  MantraAssignment,
  IAdminStorage,
  generateId,
} from '@/types/adminTypes';

import { USE_SUPABASE_ADMIN } from '@/config/supabaseAdmin';
import { SupabaseAdminStorage } from './supabaseAdminStorage';

const STORAGE_KEYS = {
  USERS: 'admin_users',
  ASSIGNMENTS: 'admin_assignments',
  SESSION: 'admin_session',
};

class LocalAdminStorage implements IAdminStorage {
  // ============ USERS ============
  
  async getUsers(): Promise<AdminUser[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  async getUser(id: string): Promise<AdminUser | null> {
    const users = await this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  async getUserByLoginCode(code: string): Promise<AdminUser | null> {
    const users = await this.getUsers();
    return users.find(u => u.loginCode === code && u.isActive) || null;
  }

  async createUser(userData: Omit<AdminUser, 'id' | 'createdAt'>): Promise<AdminUser> {
    const users = await this.getUsers();
    const newUser: AdminUser = {
      ...userData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  }

  async updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser> {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users[index];
  }

  async deleteUser(id: string): Promise<void> {
    const users = await this.getUsers();
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
  }

  // ============ ASSIGNMENTS ============

  async getAssignments(): Promise<MantraAssignment[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  async getAssignmentsByModerator(moderatorId: string): Promise<MantraAssignment[]> {
    const assignments = await this.getAssignments();
    return assignments.filter(a => a.moderatorId === moderatorId);
  }

  async getAssignmentByMantra(mantraId: string): Promise<MantraAssignment | null> {
    const assignments = await this.getAssignments();
    return assignments.find(a => a.mantraId === mantraId) || null;
  }

  async createAssignment(data: Omit<MantraAssignment, 'id' | 'assignedAt'>): Promise<MantraAssignment> {
    const assignments = await this.getAssignments();
    const newAssignment: MantraAssignment = {
      ...data,
      id: generateId(),
      assignedAt: new Date().toISOString(),
    };
    assignments.push(newAssignment);
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    return newAssignment;
  }

  async updateAssignment(id: string, updates: Partial<MantraAssignment>): Promise<MantraAssignment> {
    const assignments = await this.getAssignments();
    const index = assignments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Assignment not found');
    
    assignments[index] = { ...assignments[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    return assignments[index];
  }

  async deleteAssignment(id: string): Promise<void> {
    const assignments = await this.getAssignments();
    const filtered = assignments.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(filtered));
  }

  // ============ SESSION ============

  getSession(): AdminSession | null {
    try {
      const data = sessionStorage.getItem(STORAGE_KEYS.SESSION);
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
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  }

  clearSession(): void {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  }
}

// ============ CONDITIONAL EXPORT ============

/**
 * Export the appropriate storage implementation based on config.
 * When USE_SUPABASE_ADMIN is true, uses Supabase.
 * Otherwise, uses localStorage.
 */
let adminStorage: IAdminStorage;

if (USE_SUPABASE_ADMIN) {
  adminStorage = new SupabaseAdminStorage();
  console.log('[Admin Storage] Using Supabase backend');
} else {
  adminStorage = new LocalAdminStorage();
  console.log('[Admin Storage] Using local storage');
}

export { adminStorage };

// Export for type checking
export type { IAdminStorage };

