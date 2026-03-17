import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '../supabaseClient';
import { ensureUserInDatabase } from '../utils/userSync';

interface DatabaseUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  dbUser: DatabaseUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseUser = async (userId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      
      if (!token || !userId) return;

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setDbUser(userData);
      }
    } catch (error) {
      console.error('Error fetching database user:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchDatabaseUser(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          
          // Sync user to database in the background (don't block UI)
          ensureUserInDatabase(
            session.user.id,
            session.user.email!,
            session.user.user_metadata?.name
          ).then(() => {
            // Fetch the updated database user
            fetchDatabaseUser(session.user.id);
          }).catch(error => {
            console.error('Failed to sync user to database:', error);
          });
          
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setDbUser(null);
          setLoading(false);
        } else {
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchDatabaseUser(session.user.id);
          }
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      console.log('Attempting to sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      console.log('Sign out successful');
      // Manually set user to null to ensure immediate UI update
      setUser(null);
      setDbUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      // Even if sign out fails, clear local state
      setUser(null);
      setDbUser(null);
    }
  };

  const value = {
    user,
    dbUser,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
