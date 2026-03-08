'use client';

import type { GameResult, Dilemma } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';

interface ResultCardProps {
  result: GameResult;
  dilemma: Dilemma;
  newBadges: string[];
  onNext: () => void;
}

export default function ResultCard({ result, dilemma, newBadges, onNext }: ResultCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-5 animate-fade-in">
      {/* Correct / Incorrect banner */}
      <div className={`text-4xl font-black ${result.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
        {result.isCorrect ? 'Correct!' : 'Wrong!'}
      </div>

      {/* Question reminder */}
      <p className="text-sm text-white/50 text-center">{dilemma.question}</p>

      {/* Vote distribution */}
      <div className="w-full space-y-3 mt-2">
        <div className={`rounded-2xl p-4 border ${
          result.majorityOption === 'a'
            ? 'border-emerald-400/40 bg-emerald-500/10'
            : 'border-white/10 bg-white/5'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium text-sm">{dilemma.optionA}</span>
            {result.majorityOption === 'a' && (
              <span className="text-xs text-emerald-400 font-semibold">MAJORITY</span>
            )}
          </div>
          <ProgressBar
            percent={result.percentA}
            color={result.majorityOption === 'a' ? 'green' : 'violet'}
          />
        </div>

        <div className={`rounded-2xl p-4 border ${
          result.majorityOption === 'b'
            ? 'border-emerald-400/40 bg-emerald-500/10'
            : 'border-white/10 bg-white/5'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium text-sm">{dilemma.optionB}</span>
            {result.majorityOption === 'b' && (
              <span className="text-xs text-emerald-400 font-semibold">MAJORITY</span>
            )}
          </div>
          <ProgressBar
            percent={result.percentB}
            color={result.majorityOption === 'b' ? 'green' : 'violet'}
          />
        </div>
      </div>

      {/* Points & Streak */}
      <div className="flex gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-white">+{result.pointsEarned}</div>
          <div className="text-xs text-white/50">points</div>
        </div>
        {result.newStreak > 0 && (
          <div>
            <div className="text-2xl font-bold text-orange-400">{result.newStreak}🔥</div>
            <div className="text-xs text-white/50">streak</div>
          </div>
        )}
        {result.streakBonus && (
          <div className="text-sm text-yellow-400 font-semibold animate-bounce">
            Streak Bonus! +5
          </div>
        )}
      </div>

      {/* New badges */}
      {newBadges.length > 0 && (
        <div className="text-center space-y-1">
          <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider">New Badge!</div>
          {newBadges.map(b => (
            <div key={b} className="text-white font-medium animate-bounce">{b}</div>
          ))}
        </div>
      )}

      {/* Next CTA */}
      <Button size="lg" onClick={onNext} className="w-full mt-2">
        Next Question
      </Button>
    </div>
  );
}
