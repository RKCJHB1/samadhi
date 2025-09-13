import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserAccountNav from '@/components/auth/UserAccountNav';
import { useAuth } from '@/contexts/AuthContext';
import './navbar.css';

const TranslationNavbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);
  const isReadHomeExact = location.pathname === '/read';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Title */}
          <div className="flex items-center gap-3" aria-hidden="true"></div>

          {/* Links */}
          <div className="flex items-center gap-3 text-sm font-medium flex-wrap md:flex-nowrap">
            {/* Easy exit back to main homepage on all devices */}
            <Link to="/" className="t-nav-link px-2 text-sm font-medium tracking-wide text-gray-800 hover:text-spiritual-600">Home</Link>
            <div className="h-4 w-px bg-gray-300"></div>
            {/* Always show Read Home; only highlight when exactly on /read */}
            <>
              <Link to="/read" className={`t-nav-link px-2 text-sm font-medium tracking-wide text-gray-800 hover:text-spiritual-600 ${isReadHomeExact ? 'active' : ''}`}>← Read Home</Link>
              <div className="h-4 w-px bg-gray-300"></div>
            </>
            <Link to="/read/lectures" className={`t-nav-link px-2 text-sm font-medium tracking-wide text-gray-800 hover:text-spiritual-600 ${isActive('/read/lectures') ? 'active' : ''}`}>Read/Translate</Link>
            <Link to="/read/languages" className={`t-nav-link px-2 text-sm font-medium tracking-wide text-gray-800 hover:text-spiritual-600 ${isActive('/read/languages') ? 'active' : ''}`}>Request a New Language</Link>
            <Link to="/read/stats" className={`t-nav-link px-2 text-sm font-medium tracking-wide text-gray-800 hover:text-spiritual-600 ${isActive('/read/stats') ? 'active' : ''}`}>Stats</Link>
            <Link to="/read/faq" className={`t-nav-link px-2 text-sm font-medium tracking-wide text-gray-800 hover:text-spiritual-600 ${isActive('/read/faq') ? 'active' : ''}`}>FAQ's</Link>
            {user ? (
              <div className="ml-2 hidden md:block">
                <UserAccountNav />
              </div>
            ) : (
              <Link to="/auth/login" className="text-gray-700 hover:text-gray-900">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TranslationNavbar;

