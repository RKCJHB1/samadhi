
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireModerator?: boolean;
  requireTeacher?: boolean; // Added requireTeacher prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  requireModerator = false,
  requireTeacher = false // Added requireTeacher prop
}) => {
  const { user, isLoading, isAdmin, isModerator, isTeacher } = useAuth(); // Added isTeacher
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireModerator && !(isModerator || isAdmin)) {
    return <Navigate to="/" replace />;
  }

  // Added check for teacher role
  if (requireTeacher && !isTeacher) {
    // Redirect non-teachers trying to access teacher routes
    // Consider redirecting to a specific 'unauthorized' page or back to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
