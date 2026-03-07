'use client';

import type { User } from '@/types';

interface ScoreBarProps {
  user: User | null;
}

export default function ScoreBar({ user }: ScoreBarProps) {
  if (!user) return null;

  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto px-2 py-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-white/40">Lv.</span>
        <span className="text-white font-semibold">{user.level}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-white font-semibold">{user.score}</span>
        <span className="text-white/40">pts</span>
      </div>
      <div className="flex items-center gap-1">
        {user.streak > 0 && (
          <>
            <span className="text-orange-400 font-semibold">{user.streak}</span>
            <span className="text-orange-400">🔥</span>
          </>
        )}
        {user.streak === 0 && <span className="text-white/30">0🔥</span>}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-white font-semibold">{user.accuracy}%</span>
        <span className="text-white/40">acc</span>
      </div>
    </div>
  );
}
