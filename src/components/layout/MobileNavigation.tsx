
import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavbarData';

interface MobileNavigationProps {
  isOpen: boolean;
  navigation: NavItem[];
  isActive: (href: string) => boolean;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  navigation,
  isActive,
  activeDropdown,
  toggleDropdown
}) => {
  return (
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}
      id="mobile-menu"
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.dropdown ? (
              <>
                {/* Main page link for dropdown items */}
                <Link
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium mobile-nav-item ${
                    isActive(item.href)
                      ? 'text-spiritual-500 bg-spiritual-50 active'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
                {/* Dropdown toggle button */}
                <button
                  className={`block w-full text-left px-3 py-1 ml-4 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50`}
                  onClick={() => toggleDropdown(item.name)}
                >
                  {activeDropdown === item.name ? '▼' : '▶'} More {item.name} Options
                </button>
                {activeDropdown === item.name && (
                  <div className="pl-8 space-y-1 mt-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive(subItem.href)
                            ? 'text-spiritual-500 bg-spiritual-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : item.href.startsWith('http') ? (
                <a
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium mobile-nav-item text-gray-700 hover:text-gray-900 hover:bg-gray-50`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium mobile-nav-item ${
                    isActive(item.href)
                      ? 'text-spiritual-500 bg-spiritual-50 active'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
