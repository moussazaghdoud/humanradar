'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const user = session?.user as { id?: string; email?: string; name?: string } | undefined;

  const signInWithEmail = async (email: string, password: string) => {
    const res = await signIn('credentials', { email, password, redirect: false });
    return { error: res?.error ? { message: res.error } : null };
  };

  const signUpAndIn = async (email: string, password: string) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: { message: data.error } };

    return signInWithEmail(email, password);
  };

  return {
    session,
    user: user ? { id: user.id ?? '', email: user.email ?? '', name: user.name ?? '' } : null,
    loading,
    signInWithEmail,
    signUp: signUpAndIn,
    signOut: () => signOut({ redirect: false }),
  };
}
