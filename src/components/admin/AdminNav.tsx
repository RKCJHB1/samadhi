/**
 * Admin Navigation Component
 * Provides navigation between admin pages and logout functionality
 * Shows different navigation based on user role
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Music,
  FileText,
  BookOpen,
  Upload,
  LogOut,
  Shield,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const AdminNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAdmin, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Super Admin sees all navigation
  const superAdminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/moderators', label: 'Moderators', icon: Users },
    { path: '/admin/mantras', label: 'Mantras', icon: Music },
    { path: '/admin/content', label: 'Content', icon: FileText },
    { path: '/admin/verses', label: 'Verses', icon: BookOpen },
    { path: '/admin/bulk-import', label: 'Bulk Import', icon: Upload },
  ];

  // Moderators only see their relevant pages
  const moderatorNavItems = [
    { path: '/admin/my-assignments', label: 'My Assignments', icon: LayoutDashboard },
    { path: '/admin/mantras', label: 'Edit Mantras', icon: Music },
  ];

  const navItems = isAdmin ? superAdminNavItems : moderatorNavItems;

  return (
    <div className="bg-gradient-to-r from-indian-saffron to-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">DEV</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-indian-saffron font-semibold'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-indian-saffron"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-white text-indian-saffron font-semibold'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;

