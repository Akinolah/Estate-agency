'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  const fetchProfile = async (authId) => {
    if (!authId) return null;
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*, user_roles(*)')
      .eq('auth_id', authId)
      .maybeSingle();
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (!mounted) return;

        if (currentSession?.user) {
          setUser(currentSession.user);
          setSession(currentSession);
          const profile = await fetchProfile(currentSession.user.id);
          if (mounted) setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      (async () => {
        if (newSession?.user) {
          setUser(newSession.user);
          setSession(newSession);
          const profile = await fetchProfile(newSession.user.id);
          setUserProfile(profile);
        } else {
          setUser(null);
          setSession(null);
          setUserProfile(null);
        }
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, fullName, role) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (error) throw new Error(error.message);

    if (data.user) {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role_name', role)
        .maybeSingle();

      if (roleData) {
        await supabase.from('user_profiles').insert({
          auth_id: data.user.id,
          email,
          full_name: fullName,
          role_id: roleData.id,
        });
      }
    }

    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    if (data.user) {
      setUser(data.user);
      setSession(data.session);
      const profile = await fetchProfile(data.user.id);
      setUserProfile(profile);
    }

    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setSession(null);
    router.push('/');
  };

  const value = {
    user,
    userProfile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isAdmin: userProfile?.user_roles?.role_name === 'admin',
    isSeller: userProfile?.user_roles?.role_name === 'seller',
    isBuyer: userProfile?.user_roles?.role_name === 'buyer',
    isAgent: userProfile?.user_roles?.role_name === 'agent',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
