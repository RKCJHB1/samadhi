/**
 * Admin System Types
 * Designed to work locally now and migrate to Supabase/Firebase later
 */

// User roles in the system
export type UserRole = 'super_admin' | 'moderator';

// Status of a mantra assignment
export type AssignmentStatus = 'pending' | 'in_progress' | 'submitted' | 'approved' | 'needs_revision';

// Base user interface
export interface AdminUser {
  id: string;
  name: string;
  email?: string; // Optional for local, required for online
  role: UserRole;
  loginCode: string; // Unique code for login (e.g., "MOD-Priya-2024")
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

// Mantra assignment to a moderator
export interface MantraAssignment {
  id: string;
  moderatorId: string;
  mantraId: string;
  mantraName: string;
  status: AssignmentStatus;
  assignedAt: string;
  startedAt?: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string; // Notes from super admin
  moderatorNotes?: string; // Notes from moderator
}

// Session info for logged-in user
export interface AdminSession {
  userId: string;
  userName: string;
  role: UserRole;
  loginTime: number;
  expiresAt: number;
}

// Mantra with assignment info (for display)
export interface MantraWithAssignment {
  id: string;
  name: string;
  audioSrc: string;
  transliteration: string;
  assignment?: MantraAssignment;
  isConfigured: boolean; // Has timing data
  isConfirmed: boolean; // Timing confirmed by admin
}

// Storage interface - can be implemented by localStorage or Supabase
export interface IAdminStorage {
  // Users
  getUsers(): Promise<AdminUser[]>;
  getUser(id: string): Promise<AdminUser | null>;
  getUserByLoginCode(code: string): Promise<AdminUser | null>;
  createUser(user: Omit<AdminUser, 'id' | 'createdAt'>): Promise<AdminUser>;
  updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser>;
  deleteUser(id: string): Promise<void>;
  
  // Assignments
  getAssignments(): Promise<MantraAssignment[]>;
  getAssignmentsByModerator(moderatorId: string): Promise<MantraAssignment[]>;
  getAssignmentByMantra(mantraId: string): Promise<MantraAssignment | null>;
  createAssignment(assignment: Omit<MantraAssignment, 'id' | 'assignedAt'>): Promise<MantraAssignment>;
  updateAssignment(id: string, updates: Partial<MantraAssignment>): Promise<MantraAssignment>;
  deleteAssignment(id: string): Promise<void>;
  
  // Session
  getSession(): AdminSession | null;
  setSession(session: AdminSession): void;
  clearSession(): void;
}

// Constants
export const SUPER_ADMIN_CODE = 'RKCAdmin2024';
export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Helper to generate unique IDs (works locally, will be replaced by DB IDs online)
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to generate moderator login codes
export function generateModeratorCode(name: string): string {
  const cleanName = name.replace(/\s+/g, '').substring(0, 10);
  const randomSuffix = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `MOD-${cleanName}-${randomSuffix}`;
}

// Status display info
export const statusInfo: Record<AssignmentStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  in_progress: { label: 'In Progress', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  submitted: { label: 'Submitted for Review', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  approved: { label: 'Approved', color: 'text-green-600', bgColor: 'bg-green-100' },
  needs_revision: { label: 'Needs Revision', color: 'text-red-600', bgColor: 'bg-red-100' },
};

