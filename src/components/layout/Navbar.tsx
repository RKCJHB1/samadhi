import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigation } from './NavbarData';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import UserAccountNav from '../auth/UserAccountNav';
import { featureFlags } from '@/utils/featureFlags';
import gsap from 'gsap';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        // Always keep navbar with background on certain pages
        if (location.pathname === '/donate') {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    // Initial check for specific pages
    if (location.pathname === '/donate') {
      setScrolled(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Animate navbar on mount
  useEffect(() => {
    if (navRef.current && logoRef.current) {
      // Initial animation for navbar
      gsap.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      });

      // Logo animation
      gsap.from(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'back.out(1.7)'
      });
    }
  }, []);

  // Check if link is active
  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  // Toggle dropdown menu
  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Reduced in size */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                ref={logoRef}
                src="/lovable-uploads/2e549f27-8429-4042-95be-36194a9d309c.png"
                alt="Ramakrishna Centre Logo"
                className="h-12 md:h-16 transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation
            navigation={navigation}
            isActive={isActive}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />

          {/* User account navigation - Only show if reading section is enabled */}
          {featureFlags.enableReadingSection && (
            <div className="hidden md:flex items-center ml-4">
              <UserAccountNav />
            </div>
          )}

          {/* Mobile menu button - Only visible on mobile */}
          <div className="md:hidden flex items-center">
            {featureFlags.enableReadingSection && <UserAccountNav />}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 ml-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-spiritual-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNavigation
        isOpen={isOpen}
        navigation={navigation}
        isActive={isActive}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
      />
    </nav>
  );
};

export default Navbar;
