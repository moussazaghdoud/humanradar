'use client';

import type { User } from '@/types';
import Card from '@/components/ui/Card';

interface ShareCardProps {
  user: User;
  statLine?: string;
}

export default function ShareCard({ user, statLine }: ShareCardProps) {
  const defaultStat = `I understand humans better than most — ${user.accuracy}% accuracy on Human Radar!`;
  const text = statLine ?? defaultStat;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Human Radar',
          text,
          url: typeof window !== 'undefined' ? window.location.origin : '',
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <Card glow className="text-center space-y-4 max-w-sm mx-auto">
      <div className="text-xs uppercase tracking-widest text-violet-400 font-semibold">Human Radar</div>
      <div className="text-lg text-white font-bold">{user.username}</div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="text-2xl font-bold text-white">{user.score}</div>
          <div className="text-xs text-white/50">Score</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{user.accuracy}%</div>
          <div className="text-xs text-white/50">Accuracy</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-400">{user.streak}🔥</div>
          <div className="text-xs text-white/50">Streak</div>
        </div>
      </div>
      <button
        onClick={handleShare}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold
          hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.97] transition-all duration-200"
      >
        Share Result
      </button>
    </Card>
  );
}
