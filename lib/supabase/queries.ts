import { supabase } from './client';
import type { Dilemma, DilemmaStats, User, Badge } from '@/types';

// ── Dilemmas ──

export async function fetchRandomDilemma(excludeIds: string[] = []): Promise<Dilemma | null> {
  let query = supabase
    .from('dilemmas')
    .select('*')
    .eq('status', 'active');

  if (excludeIds.length > 0) {
    query = query.not('id', 'in', `(${excludeIds.join(',')})`);
  }

  const { data, error } = await query;
  if (error || !data || data.length === 0) return null;

  return data[Math.floor(Math.random() * data.length)] as Dilemma;
}

export async function fetchDilemmaStats(dilemmaId: string): Promise<DilemmaStats | null> {
  const { data, error } = await supabase
    .from('dilemma_stats')
    .select('*')
    .eq('dilemma_id', dilemmaId)
    .single();

  if (error) return null;
  return data as DilemmaStats;
}

// ── Votes ──

export async function submitVote(
  userId: string,
  dilemmaId: string,
  predictedOption: 'a' | 'b'
) {
  // Get current stats
  const stats = await fetchDilemmaStats(dilemmaId);
  const votesA = (stats?.votes_a ?? 0) + (predictedOption === 'a' ? 1 : 0);
  const votesB = (stats?.votes_b ?? 0) + (predictedOption === 'b' ? 1 : 0);
  const totalVotes = votesA + votesB;
  const majorityOption: 'a' | 'b' = votesA >= votesB ? 'a' : 'b';
  const isCorrect = predictedOption === majorityOption;

  // Upsert stats
  await supabase.from('dilemma_stats').upsert({
    dilemma_id: dilemmaId,
    votes_a: votesA,
    votes_b: votesB,
    total_votes: totalVotes,
    majority_option: majorityOption,
  });

  // Insert vote
  await supabase.from('votes').insert({
    user_id: userId,
    dilemma_id: dilemmaId,
    predicted_option: predictedOption,
    actual_majority: majorityOption,
    is_correct: isCorrect,
  });

  return {
    isCorrect,
    majorityOption,
    percentA: totalVotes > 0 ? Math.round((votesA / totalVotes) * 100) : 50,
    percentB: totalVotes > 0 ? Math.round((votesB / totalVotes) * 100) : 50,
    votesA,
    votesB,
    totalVotes,
  };
}

// ── Users ──

export async function fetchUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data as User;
}

export async function updateUserStats(
  userId: string,
  updates: Partial<Pick<User, 'score' | 'accuracy' | 'streak' | 'level'>>
) {
  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  return !error;
}

export async function upsertUser(user: { id: string; email: string; username: string }) {
  const { error } = await supabase.from('users').upsert({
    id: user.id,
    email: user.email,
    username: user.username,
    score: 0,
    accuracy: 0,
    streak: 0,
    level: 1,
  }, { onConflict: 'id' });

  return !error;
}

// ── Leaderboard ──

export async function fetchLeaderboard(limit = 20): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data as User[];
}

// ── Badges ──

export async function fetchUserBadges(userId: string): Promise<Badge[]> {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });

  if (error) return [];
  return data as Badge[];
}

export async function awardBadge(userId: string, badgeName: string): Promise<boolean> {
  // Check if already has badge
  const { data: existing } = await supabase
    .from('badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_name', badgeName)
    .single();

  if (existing) return false;

  const { error } = await supabase.from('badges').insert({
    user_id: userId,
    badge_name: badgeName,
  });

  return !error;
}

export async function fetchUserVoteCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) return 0;
  return count ?? 0;
}

export async function fetchUserCorrectCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_correct', true);

  if (error) return 0;
  return count ?? 0;
}
