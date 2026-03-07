'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProfileView from '@/components/profile/ProfileView';
import type { User, Badge } from '@/types';

export default function ProfilePage() {
  const { playerId, loading } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (!playerId) return;
    fetch('/api/profile', { headers: { 'x-player-id': playerId } })
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setBadges(data.badges ?? []);
      });
  }, [playerId]);

  if (loading || !profile) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/30 animate-pulse">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pt-8">
      <ProfileView user={profile} badges={badges} />
    </main>
  );
}
