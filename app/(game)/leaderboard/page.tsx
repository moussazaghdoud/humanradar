'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LeaderboardView from '@/components/leaderboard/LeaderboardView';
import type { User } from '@/types';

export default function LeaderboardPage() {
  const { playerId } = useAuth();
  const [players, setPlayers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard').then(r => r.json()).then(setPlayers);
  }, []);

  return (
    <main className="min-h-screen px-4 pt-8">
      <LeaderboardView players={players} currentUserId={playerId} />
    </main>
  );
}
