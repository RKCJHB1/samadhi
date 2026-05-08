/**
 * Admin Protected Route Component
 * Protects admin routes by checking authentication status
 * Supports role-based access control
 * Development only
 */

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentSession, logout } from '@/services/adminAuth';
import { UserRole } from '@/types/adminTypes';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole; // If specified, only this role can access
  allowedRoles?: UserRole[]; // If specified, any of these roles can access
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
  requiredRole,
  allowedRoles
}) => {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthorized' | 'forbidden'>('loading');

  useEffect(() => {
    const checkAuth = () => {
      const session = getCurrentSession();

      if (!session) {
        setAuthState('unauthorized');
        return;
      }

      // Check role requirements
      if (requiredRole && session.role !== requiredRole) {
        setAuthState('forbidden');
        return;
      }

      if (allowedRoles && !allowedRoles.includes(session.role)) {
        setAuthState('forbidden');
        return;
      }

      setAuthState('authenticated');
    };

    checkAuth();
  }, [requiredRole, allowedRoles]);

  // Show loading while checking authentication
  if (authState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indian-saffron mx-auto"></div>
          <p className="mt-4 text-spiritual-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (authState === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  // Show forbidden message if role doesn't match
  if (authState === 'forbidden') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button
            onClick={() => {
              logout();
              window.location.href = '/admin/login';
            }}
            className="px-4 py-2 bg-indian-saffron text-white rounded hover:bg-indian-saffron/90"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AdminProtectedRoute;

