'use client';

import { useGame } from '@/hooks/useGame';
import { useAuth } from '@/hooks/useAuth';
import DilemmaCard from '@/components/game/DilemmaCard';
import ResultCard from '@/components/game/ResultCard';
import ScoreBar from '@/components/game/ScoreBar';

export default function PlayPage() {
  const { playerId, loading } = useAuth();
  const { phase, dilemma, result, user, newBadges, predict, next } = useGame(playerId);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/30 animate-pulse">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-6">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
      </div>

      <ScoreBar user={user} />

      <div className="flex-1 flex items-center justify-center w-full py-8">
        {phase === 'loading' && (
          <div className="text-white/30 animate-pulse">Loading...</div>
        )}

        {phase === 'playing' && dilemma && (
          <DilemmaCard dilemma={dilemma} onPredict={predict} />
        )}

        {phase === 'result' && result && dilemma && (
          <ResultCard result={result} dilemma={dilemma} newBadges={newBadges} onNext={next} />
        )}
      </div>
    </main>
  );
}
