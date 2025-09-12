
import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavbarData';
import NavbarDropdown from './NavbarDropdown';

interface DesktopNavigationProps {
  navigation: NavItem[];
  isActive: (href: string) => boolean;
  activeDropdown: string | null;
  setActiveDropdown: (name: string | null) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navigation,
  isActive,
  activeDropdown,
  setActiveDropdown
}) => {
  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <div className="hidden md:block">
      <div className="flex items-center">
        {navigation.map((item) => {
          if (item.dropdown) {
            return (
              <NavbarDropdown
                key={item.name}
                item={item}
                isActive={isActive}
                isOpen={activeDropdown === item.name}
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              />
            );
          }

          const isExternal = item.href.startsWith('http');

          return isExternal ? (
            <a
              key={item.name}
              href={item.href}
              className={`nav-link px-4 py-2 text-sm font-medium tracking-wide ${item.name === 'New Ashram Project' ? 'long-item' : ''}`}
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link px-4 py-2 text-sm font-medium tracking-wide ${isActive(item.href) ? 'active' : ''} ${item.name === 'New Ashram Project' ? 'long-item' : ''}`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopNavigation;
