
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, Settings, ShieldCheck } from 'lucide-react';

const UserAccountNav = () => {
  const { user, profile, signOut, isAdmin, isModerator } = useAuth();

  const location = useLocation();
  const inReadContext = location.pathname.startsWith('/read');

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    const loginHref = inReadContext ? `/auth/login?readnav=1&next=${next}` : `/auth/login?next=${next}`;
    return (
      <Link to={loginHref} className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md border border-indian-saffron/30">
        Login
      </Link>
    );
  }

  const initials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user.email?.substring(0, 2).toUpperCase() || 'U';

  const fullName = profile?.first_name && profile?.last_name
    ? `${profile.first_name} ${profile.last_name}`
    : user.email || 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 bg-gray-200 text-gray-600">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border border-indian-saffron/20">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Public profile (preferred) */}
        <DropdownMenuItem asChild>
          <Link to={profile?.username ? `/user/${profile.username}` : (inReadContext ? '/profile?requireUsername=1&readnav=1' : '/profile?requireUsername=1')} className="cursor-pointer flex w-full items-center">
            <User className="mr-2 h-4 w-4 text-indian-saffron" />
            <span>{profile?.username ? 'My Profile' : 'Set Username'}</span>
          </Link>
        </DropdownMenuItem>
        {/* Account settings and translation profile */}
        <DropdownMenuItem asChild>
          <Link to={inReadContext ? '/profile?readnav=1' : '/profile'} className="cursor-pointer flex w-full items-center">
            <Settings className="mr-2 h-4 w-4 text-gray-600" />
            <span>Account Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/read/profile" className="cursor-pointer flex w-full items-center">
            <ShieldCheck className="mr-2 h-4 w-4 text-indigo-700" />
            <span>Translation Profile (edit)</span>
          </Link>
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/read/admin" className="cursor-pointer flex w-full items-center">
                <ShieldCheck className="mr-2 h-4 w-4 text-indigo-700" />
                <span>Translation Admin</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={inReadContext ? '/moderation/translations?readnav=1' : '/moderation/translations'} className="cursor-pointer flex w-full items-center">
                <ShieldCheck className="mr-2 h-4 w-4 text-indigo-700" />
                <span>Moderate Translations</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4 text-indian-saffron" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
