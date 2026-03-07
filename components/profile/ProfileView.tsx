'use client';

import type { User, Badge as BadgeType } from '@/types';
import Card from '@/components/ui/Card';
import BadgeDisplay from '@/components/ui/Badge';
import ShareCard from '@/components/game/ShareCard';

interface ProfileViewProps {
  user: User;
  badges: BadgeType[];
}

export default function ProfileView({ user, badges }: ProfileViewProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white mb-3">
          {user.username[0]?.toUpperCase() ?? '?'}
        </div>
        <h2 className="text-2xl font-bold text-white">{user.username}</h2>
        <p className="text-white/50 text-sm">Level {user.level}</p>
      </div>

      <Card>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-white">{user.score}</div>
            <div className="text-xs text-white/50">Total Score</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{user.accuracy}%</div>
            <div className="text-xs text-white/50">Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-400">{user.streak}</div>
            <div className="text-xs text-white/50">Current Streak</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-violet-400">{user.level}</div>
            <div className="text-xs text-white/50">Level</div>
          </div>
        </div>
      </Card>

      {/* Level progress */}
      <Card>
        <div className="text-sm text-white/50 mb-2">Progress to Level {user.level + 1}</div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${(user.score % 100)}%` }}
          />
        </div>
        <div className="text-xs text-white/30 mt-1">{user.score % 100} / 100 pts</div>
      </Card>

      {/* Badges */}
      <Card>
        <div className="text-sm text-white/50 mb-3">Badges</div>
        {badges.length === 0 ? (
          <p className="text-white/30 text-sm">No badges earned yet. Keep playing!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {badges.map(b => (
              <BadgeDisplay key={b.id} name={b.badge_name} />
            ))}
          </div>
        )}
      </Card>

      <ShareCard user={user} />
    </div>
  );
}
