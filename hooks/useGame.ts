'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Dilemma, GameResult, User } from '@/types';
import { fetchRandomDilemma, submitVote, fetchUserProfile, updateUserStats, fetchUserBadges, awardBadge, fetchUserCorrectCount, fetchUserVoteCount } from '@/lib/supabase/queries';
import { processAnswer, calculateLevel, calculateAccuracy, checkNewBadges } from '@/lib/game/engine';

export type GamePhase = 'loading' | 'playing' | 'result';

export function useGame(userId: string | null) {
  const [phase, setPhase] = useState<GamePhase>('loading');
  const [dilemma, setDilemma] = useState<Dilemma | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [recentDilemmaIds, setRecentDilemmaIds] = useState<string[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  const loadNextDilemma = useCallback(async () => {
    setPhase('loading');
    setResult(null);
    setNewBadges([]);

    const next = await fetchRandomDilemma(recentDilemmaIds.slice(-20));
    if (!next) {
      // All dilemmas seen — reset
      setRecentDilemmaIds([]);
      const fallback = await fetchRandomDilemma([]);
      setDilemma(fallback);
    } else {
      setDilemma(next);
    }
    setPhase('playing');
  }, [recentDilemmaIds]);

  const loadUser = useCallback(async () => {
    if (!userId) return;
    const profile = await fetchUserProfile(userId);
    if (profile) setUser(profile);
  }, [userId]);

  useEffect(() => {
    loadUser();
    loadNextDilemma();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const predict = useCallback(async (option: 'a' | 'b') => {
    if (!dilemma || !userId || phase !== 'playing') return;

    const voteResult = await submitVote(userId, dilemma.id, option);
    const currentStreak = user?.streak ?? 0;
    const currentScore = user?.score ?? 0;

    const gameResult = processAnswer(
      option,
      voteResult.majorityOption,
      voteResult.percentA,
      voteResult.percentB,
      currentStreak,
      currentScore
    );

    setResult(gameResult);
    setRecentDilemmaIds(prev => [...prev, dilemma.id]);

    // Update user stats
    const newScore = currentScore + gameResult.pointsEarned;
    const newStreak = gameResult.newStreak;
    const totalVotes = await fetchUserVoteCount(userId);
    const correctVotes = await fetchUserCorrectCount(userId);
    const newAccuracy = calculateAccuracy(correctVotes, totalVotes);
    const newLevel = calculateLevel(newScore);

    await updateUserStats(userId, {
      score: newScore,
      streak: newStreak,
      accuracy: newAccuracy,
      level: newLevel,
    });

    setUser(prev => prev ? {
      ...prev,
      score: newScore,
      streak: newStreak,
      accuracy: newAccuracy,
      level: newLevel,
    } : null);

    // Check badges
    const existingBadges = await fetchUserBadges(userId);
    const existingNames = existingBadges.map(b => b.badge_name);
    const earned = checkNewBadges(correctVotes, totalVotes, newStreak, newScore, existingNames);
    for (const badge of earned) {
      await awardBadge(userId, badge);
    }
    if (earned.length > 0) setNewBadges(earned);

    setPhase('result');
  }, [dilemma, userId, phase, user]);

  return {
    phase,
    dilemma,
    result,
    user,
    newBadges,
    predict,
    next: loadNextDilemma,
  };
}
