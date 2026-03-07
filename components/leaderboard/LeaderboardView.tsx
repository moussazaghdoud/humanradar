'use client';

import type { User } from '@/types';
import Card from '@/components/ui/Card';

interface LeaderboardViewProps {
  players: User[];
  currentUserId: string | null;
}

const MEDAL = ['🥇', '🥈', '🥉'];

export default function LeaderboardView({ players, currentUserId }: LeaderboardViewProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-3 animate-fade-in">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Leaderboard</h2>

      {players.map((player, i) => {
        const isMe = player.id === currentUserId;
        return (
          <Card
            key={player.id}
            className={`flex items-center gap-4 py-4 ${
              isMe ? 'border-violet-500/50 bg-violet-500/10' : ''
            }`}
          >
            <div className="w-10 text-center text-lg font-bold">
              {i < 3 ? MEDAL[i] : <span className="text-white/40">{i + 1}</span>}
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {player.username[0]?.toUpperCase() ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">
                {player.username}
                {isMe && <span className="text-violet-400 text-xs ml-2">(you)</span>}
              </div>
              <div className="text-xs text-white/40">Level {player.level} · {player.accuracy}% acc</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{player.score}</div>
              <div className="text-xs text-white/40">pts</div>
            </div>
          </Card>
        );
      })}

      {players.length === 0 && (
        <p className="text-white/30 text-center text-sm">No players yet. Be the first!</p>
      )}
    </div>
  );
}
