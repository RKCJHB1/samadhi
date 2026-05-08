/**
 * Admin Authentication Service
 * Handles login/logout for super admin and moderators
 */

import { adminStorage } from './adminStorage';
import {
  AdminSession,
  AdminUser,
  UserRole,
  SUPER_ADMIN_CODE,
  SESSION_DURATION_MS,
} from '@/types/adminTypes';

export interface LoginResult {
  success: boolean;
  error?: string;
  session?: AdminSession;
}

// Super admin virtual user (not stored in DB)
const SUPER_ADMIN_USER: AdminUser = {
  id: 'super_admin',
  name: 'Super Admin',
  role: 'super_admin',
  loginCode: SUPER_ADMIN_CODE,
  isActive: true,
  createdAt: '2024-01-01T00:00:00.000Z',
};

/**
 * Attempt to login with a code
 * Works for both super admin and moderators
 */
export async function login(code: string): Promise<LoginResult> {
  const trimmedCode = code.trim();
  
  // Check if it's the super admin
  if (trimmedCode === SUPER_ADMIN_CODE) {
    const session: AdminSession = {
      userId: SUPER_ADMIN_USER.id,
      userName: SUPER_ADMIN_USER.name,
      role: 'super_admin',
      loginTime: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    
    adminStorage.setSession(session);
    
    return { success: true, session };
  }
  
  // Check if it's a moderator
  const user = await adminStorage.getUserByLoginCode(trimmedCode);
  
  if (!user) {
    return { success: false, error: 'Invalid login code' };
  }
  
  if (!user.isActive) {
    return { success: false, error: 'This account has been deactivated' };
  }
  
  // Update last login time
  await adminStorage.updateUser(user.id, {
    lastLoginAt: new Date().toISOString(),
  });
  
  const session: AdminSession = {
    userId: user.id,
    userName: user.name,
    role: user.role,
    loginTime: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  
  adminStorage.setSession(session);
  
  return { success: true, session };
}

/**
 * Logout current user
 */
export function logout(): void {
  adminStorage.clearSession();
}

/**
 * Get current session
 */
export function getCurrentSession(): AdminSession | null {
  return adminStorage.getSession();
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return adminStorage.getSession() !== null;
}

/**
 * Check if current user is super admin
 */
export function isSuperAdmin(): boolean {
  const session = adminStorage.getSession();
  return session?.role === 'super_admin';
}

/**
 * Check if current user is moderator
 */
export function isModerator(): boolean {
  const session = adminStorage.getSession();
  return session?.role === 'moderator';
}

/**
 * Get current user's role
 */
export function getCurrentRole(): UserRole | null {
  const session = adminStorage.getSession();
  return session?.role || null;
}

/**
 * Get current user's ID
 */
export function getCurrentUserId(): string | null {
  const session = adminStorage.getSession();
  return session?.userId || null;
}

/**
 * Get current user's name
 */
export function getCurrentUserName(): string | null {
  const session = adminStorage.getSession();
  return session?.userName || null;
}

