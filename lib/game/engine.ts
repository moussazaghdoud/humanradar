import type { GameResult } from '@/types';

const POINTS_PER_CORRECT = 10;
const STREAK_BONUS_INTERVAL = 3;
const STREAK_BONUS_POINTS = 5;

export function calculateLevel(score: number): number {
  return Math.floor(score / 100) + 1;
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function processAnswer(
  predictedOption: 'a' | 'b',
  majorityOption: 'a' | 'b',
  percentA: number,
  percentB: number,
  currentStreak: number,
  currentScore: number
): GameResult {
  const isCorrect = predictedOption === majorityOption;
  const newStreak = isCorrect ? currentStreak + 1 : 0;
  const streakBonus = isCorrect && newStreak > 0 && newStreak % STREAK_BONUS_INTERVAL === 0;
  const pointsEarned = isCorrect
    ? POINTS_PER_CORRECT + (streakBonus ? STREAK_BONUS_POINTS : 0)
    : 0;

  return {
    isCorrect,
    predictedOption,
    majorityOption,
    percentA,
    percentB,
    pointsEarned,
    newStreak,
    streakBonus,
  };
}

export const BADGE_DEFINITIONS = [
  { name: 'First Win', check: (correct: number, _total: number, _streak: number, _score: number) => correct >= 1 },
  { name: '5 Streak', check: (_correct: number, _total: number, streak: number, _score: number) => streak >= 5 },
  { name: '100 Points', check: (_correct: number, _total: number, _streak: number, score: number) => score >= 100 },
  { name: '80% Accuracy', check: (correct: number, total: number, _streak: number, _score: number) => total >= 10 && (correct / total) >= 0.8 },
  { name: '10 Streak', check: (_correct: number, _total: number, streak: number, _score: number) => streak >= 10 },
  { name: '500 Points', check: (_correct: number, _total: number, _streak: number, score: number) => score >= 500 },
  { name: 'Mind Reader', check: (correct: number, total: number, _streak: number, _score: number) => total >= 20 && (correct / total) >= 0.9 },
] as const;

export function checkNewBadges(
  correct: number,
  total: number,
  streak: number,
  score: number,
  existingBadges: string[]
): string[] {
  return BADGE_DEFINITIONS
    .filter(b => !existingBadges.includes(b.name) && b.check(correct, total, streak, score))
    .map(b => b.name);
}
