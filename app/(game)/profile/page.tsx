'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProfileView from '@/components/profile/ProfileView';
import AuthGate from '@/components/ui/AuthGate';
import Button from '@/components/ui/Button';
import type { User, Badge } from '@/types';

export default function ProfilePage() {
  const { user: authUser, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (!authUser) return;
    fetch('/api/profile').then(r => r.json()).then(data => {
      setProfile(data);
      setBadges(data.badges ?? []);
    });
  }, [authUser]);

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/30 animate-pulse">Loading...</div>
      </main>
    );
  }

  if (!authUser) return <AuthGate />;

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/30 animate-pulse">Loading profile...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pt-8">
      <ProfileView user={profile} badges={badges} />
      <div className="max-w-lg mx-auto mt-6">
        <Button variant="ghost" size="sm" onClick={() => signOut()} className="w-full">
          Sign Out
        </Button>
      </div>
    </main>
  );
}
