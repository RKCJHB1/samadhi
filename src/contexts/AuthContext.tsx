import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define types
interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username?: string | null;
  role?: 'user' | 'moderator' | 'admin';
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isTeacher: boolean; // Added teacher role state
  isLoading: boolean;
  isModerator: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signUp: (email: string, password: string, userData: { firstName?: string; lastName?: string; languageProficiency?: Array<{ code: string; level: 'Beginner'|'Fluent'|'Native/Academic' }> }) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false); // Added teacher state
  const [isLoading, setLoading] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  // TEMP: Supabase wiring for user/profile
  useEffect(() => {
    (async () => {
      try {
        const mod = await import('@/services/translationsSupabase');
        const current = await mod.getCurrentUser();
        if (current) {
          const email = (current.email || '').toLowerCase();
          const adminEmailOverride = email === 'viprananda@rkmm.org';
          setUser({ id: current.id, email: current.email ?? '' });
          const prof = await mod.getProfile(current.id);
          const role = (prof?.role as any) || (adminEmailOverride ? 'admin' : undefined);
          setProfile({ id: prof?.id || current.id, first_name: prof?.first_name ?? null, last_name: prof?.last_name ?? null, avatar_url: prof?.avatar_url ?? null, username: prof?.username ?? null, role });
          setIsAdmin(role === 'admin');
          setIsModerator(role === 'moderator' || role === 'admin');
        }
      } catch (e) {
        console.warn('Auth bootstrap skipped:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { toast } = useToast();

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        // Removed: const currentUser = await api.auth.getCurrentUser();

        // Removed: if (currentUser) {
          // Removed: setUser(currentUser);

          // Removed: // Load profile
          // Removed: const userProfile = await api.profile.get(currentUser.id);
          // Removed: setProfile(userProfile);

          // Removed: // Check admin role
          // Removed: const hasAdminRole = await api.roles.check('admin');
          // Removed: setIsAdmin(hasAdminRole);

          // Removed: // Check moderator role
          // Removed: const hasModeratorRole = await api.roles.check('moderator');
          // Removed: setIsModerator(hasModeratorRole);

          // Removed: // Placeholder: Check teacher role (adjust based on your API)
          // Removed: const hasTeacherRole = await api.roles.check('teacher');
          // Removed: setIsTeacher(hasTeacherRole);
        // Removed: }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Sign in user
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const mod = await import('@/services/translationsSupabase');
      const sb = mod.getSupabase();
      if (!sb) throw new Error("Database connection not initialized");

      const { data, error } = await sb.auth.signInWithPassword({ email, password });

      if (error) throw error;
      if (!data.user) throw new Error("No user returned");

      const current = data.user;
      const userEmail = (current.email || '').toLowerCase();
      const adminEmailOverride = userEmail === 'viprananda@rkmm.org';
      setUser({ id: current.id, email: current.email ?? '' });

      const prof = await mod.getProfile(current.id);
      const role = (prof?.role as any) || (adminEmailOverride ? 'admin' : undefined);
      setProfile({ id: prof?.id || current.id, first_name: prof?.first_name ?? null, last_name: prof?.last_name ?? null, avatar_url: prof?.avatar_url ?? null, username: prof?.username ?? null, role });
      setIsAdmin(role === 'admin');
      setIsModerator(role === 'moderator' || role === 'admin');
      setIsTeacher(role === 'teacher');

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Could not sign you in. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign up user
  const signUp = async (email: string, password: string, userData: { firstName?: string; lastName?: string; languageProficiency?: Array<{ code: string; level: 'Beginner'|'Fluent'|'Native/Academic' }> }) => {
    try {
      setLoading(true);
      const mod = await import('@/services/translationsSupabase');
      const sb = mod.getSupabase();
      if (!sb) throw new Error("Database connection not initialized");

      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        await mod.upsertProfile({
          id: data.user.id,
          email: data.user.email ?? null,
          first_name: userData.firstName ?? null,
          last_name: userData.lastName ?? null,
          role: 'user'
        });
      }

      // By default, new users are not admins or teachers
      setIsAdmin(false);
      setIsModerator(false);
      setIsTeacher(false); // Initialize teacher role

      // Store language proficiency (frontend-only for now)
      if (userData.languageProficiency && userData.languageProficiency.length) {
        try {
          localStorage.setItem('languageProficiency', JSON.stringify(userData.languageProficiency));
        } catch {}
      }


      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Could not create your account. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      // Ensure Supabase session is cleared so guarded routes behave correctly
      try {
        const mod = await import('@/services/translationsSupabase');
        const sb = mod.getSupabase();
        if (sb) {
          await sb.auth.signOut();
        }
      } catch (e) {
        console.warn('Supabase signOut skipped:', e);
      }

      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      setIsModerator(false);
      setIsTeacher(false); // Reset teacher role on sign out

      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });

      // Redirect to homepage after logout (as per requirement)
      try { window.location.assign('/'); } catch {}
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Value object
  const value = {
    user,
    profile,
    isAdmin,
    isTeacher, // Added teacher state to context value
    isLoading,
    isModerator,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
