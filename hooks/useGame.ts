'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Dilemma, GameResult } from '@/types';

export type GamePhase = 'loading' | 'playing' | 'result';

interface UserStats {
  score: number;
  streak: number;
  accuracy: number;
  level: number;
}

export function useGame(userId: string | null) {
  const [phase, setPhase] = useState<GamePhase>('loading');
  const [dilemma, setDilemma] = useState<Dilemma | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentDilemmaIds, setRecentDilemmaIds] = useState<string[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  const loadNextDilemma = useCallback(async () => {
    setPhase('loading');
    setResult(null);
    setNewBadges([]);

    const res = await fetch('/api/game/dilemma', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ excludeIds: recentDilemmaIds.slice(-20) }),
    });
    const data = await res.json();

    if (!data) {
      setRecentDilemmaIds([]);
      const retry = await fetch('/api/game/dilemma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ excludeIds: [] }),
      });
      setDilemma(await retry.json());
    } else {
      setDilemma(data);
    }
    setPhase('playing');
  }, [recentDilemmaIds]);

  const loadProfile = useCallback(async () => {
    if (!userId) return;
    const res = await fetch('/api/profile', {
      headers: { 'x-player-id': userId },
    });
    if (res.ok) {
      const data = await res.json();
      setUserStats({ score: data.score, streak: data.streak, accuracy: data.accuracy, level: data.level });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadProfile();
      loadNextDilemma();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const predict = useCallback(async (option: 'a' | 'b') => {
    if (!dilemma || !userId || phase !== 'playing') return;

    const res = await fetch('/api/game/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: userId, dilemmaId: dilemma.id, predictedOption: option }),
    });

    if (!res.ok) return;
    const data = await res.json();

    const gameResult: GameResult = {
      isCorrect: data.isCorrect,
      predictedOption: data.predictedOption,
      majorityOption: data.majorityOption,
      percentA: data.percentA,
      percentB: data.percentB,
      pointsEarned: data.pointsEarned,
      newStreak: data.newStreak,
      streakBonus: data.streakBonus,
    };

    setResult(gameResult);
    setRecentDilemmaIds(prev => [...prev, dilemma.id]);
    setUserStats(data.user);
    if (data.newBadges?.length > 0) setNewBadges(data.newBadges);
    setPhase('result');
  }, [dilemma, userId, phase]);

  // Build a user-like object for ScoreBar
  const user = userStats ? {
    id: userId ?? '',
    username: '',
    score: userStats.score,
    accuracy: userStats.accuracy,
    streak: userStats.streak,
    level: userStats.level,
    created_at: '',
  } : null;

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
