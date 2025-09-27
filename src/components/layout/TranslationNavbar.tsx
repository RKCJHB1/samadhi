import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserAccountNav from '@/components/auth/UserAccountNav';
import { useAuth } from '@/contexts/AuthContext';
import './navbar.css';
import { Menu, X } from 'lucide-react';

const TranslationNavbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);
  const isReadHomeExact = location.pathname === '/read';

  const isInReadSection = location.pathname === '/read' || location.pathname.startsWith('/read/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/2e549f27-8429-4042-95be-36194a9d309c.png"
                alt="Ramakrishna Centre Logo"
                className="h-10 md:h-12 transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            {/* Easy exit back to main homepage on all devices */}
            {!isInReadSection && (
              <>
                <Link to="/" className="t-nav-link px-2 text-sm font-medium tracking-wide text-gray-800 hover:text-spiritual-600">Home</Link>
                <div className="h-4 w-px bg-gray-300"></div>
              </>
            )}
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
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Open menu"
            aria-controls="t-mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      {/* Mobile panel */}
      {mobileOpen && (
        <div id="t-mobile-menu" className="md:hidden border-t border-gray-200 py-3">
          <div className="flex flex-col gap-2 text-sm">
            {!isInReadSection && (
              <Link to="/" className="t-nav-link px-2 py-2 text-gray-800 hover:text-spiritual-600" onClick={() => setMobileOpen(false)}>Home</Link>
            )}
            <Link to="/read" className={`t-nav-link px-2 py-2 text-gray-800 hover:text-spiritual-600 ${isReadHomeExact ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Read Home</Link>
            <Link to="/read/lectures" className={`t-nav-link px-2 py-2 text-gray-800 hover:text-spiritual-600 ${isActive('/read/lectures') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Read/Translate</Link>
            <Link to="/read/languages" className={`t-nav-link px-2 py-2 text-gray-800 hover:text-spiritual-600 ${isActive('/read/languages') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Request a New Language</Link>
            <Link to="/read/stats" className={`t-nav-link px-2 py-2 text-gray-800 hover:text-spiritual-600 ${isActive('/read/stats') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Stats</Link>
            <Link to="/read/faq" className={`t-nav-link px-2 py-2 text-gray-800 hover:text-spiritual-600 ${isActive('/read/faq') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>FAQ's</Link>
            {user ? (
              <div className="px-2 py-2"><UserAccountNav /></div>
            ) : (
              <Link to="/auth/login" className="px-2 py-2 text-gray-700 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default TranslationNavbar;

