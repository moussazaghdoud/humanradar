'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { fetchLeaderboard } from '@/lib/supabase/queries';
import LeaderboardView from '@/components/leaderboard/LeaderboardView';
import type { User } from '@/types';

export default function LeaderboardPage() {
  const { user: authUser } = useAuth();
  const [players, setPlayers] = useState<User[]>([]);

  useEffect(() => {
    fetchLeaderboard(50).then(setPlayers);
  }, []);

  return (
    <main className="min-h-screen px-4 pt-8">
      <LeaderboardView players={players} currentUserId={authUser?.id ?? null} />
    </main>
  );
}
