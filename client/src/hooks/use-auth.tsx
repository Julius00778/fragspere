import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase, type AuthUser, isSupabaseConfigured } from '@/lib/supabase';
import { User as AuthSession } from '@supabase/supabase-js';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'discord') => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user as AuthUser || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user as AuthUser || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata: any) => {
    if (!isSupabaseConfigured) {
      return { 
        error: { 
          message: 'Authentication not configured. Please set up your Supabase credentials in the environment variables.' 
        } 
      };
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      return { error };
    } catch (err) {
      return { 
        error: { 
          message: 'Authentication service unavailable. Please check your Supabase configuration.' 
        } 
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { 
        error: { 
          message: 'Authentication not configured. Please set up your Supabase credentials in the environment variables.' 
        } 
      };
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (err) {
      return { 
        error: { 
          message: 'Authentication service unavailable. Please check your Supabase configuration.' 
        } 
      };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithProvider = async (provider: 'google' | 'discord') => {
    if (!isSupabaseConfigured) {
      return { 
        error: { 
          message: 'Authentication not configured. Please set up your Supabase credentials in the environment variables.' 
        } 
      };
    }
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      return { error };
    } catch (err) {
      return { 
        error: { 
          message: 'Authentication service unavailable. Please check your Supabase configuration.' 
        } 
      };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
      signInWithProvider,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
