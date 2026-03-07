'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { upsertUser } from '@/lib/supabase/queries';
import type { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        upsertUser({
          id: session.user.id,
          email: session.user.email ?? '',
          username: session.user.email?.split('@')[0] ?? 'player',
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  return {
    session,
    user: session?.user ?? null,
    loading,
    signInWithEmail,
    signUp,
    signOut,
  };
}
