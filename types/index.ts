export interface User {
  id: string;
  email: string;
  username: string;
  score: number;
  accuracy: number;
  streak: number;
  level: number;
  created_at: string;
}

export interface Dilemma {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  category: DilemmaCategory;
  difficulty: number;
  status: 'active' | 'archived';
  created_at: string;
  created_by: string | null;
}

export interface Vote {
  id: string;
  user_id: string;
  dilemma_id: string;
  predicted_option: 'a' | 'b';
  actual_majority: 'a' | 'b' | null;
  is_correct: boolean | null;
  created_at: string;
}

export interface DilemmaStats {
  dilemma_id: string;
  votes_a: number;
  votes_b: number;
  total_votes: number;
  majority_option: 'a' | 'b';
}

export interface Badge {
  id: string;
  user_id: string;
  badge_name: string;
  earned_at: string;
}

export type DilemmaCategory = 'morality' | 'money' | 'relationships' | 'philosophy' | 'psychology';

export interface GameResult {
  isCorrect: boolean;
  predictedOption: 'a' | 'b';
  majorityOption: 'a' | 'b';
  percentA: number;
  percentB: number;
  pointsEarned: number;
  newStreak: number;
  streakBonus: boolean;
}
