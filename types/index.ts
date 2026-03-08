export interface User {
  id: string;
  username: string;
  score: number;
  accuracy: number;
  streak: number;
  level: number;
  createdAt: string;
}

export interface Dilemma {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  category: DilemmaCategory;
  difficulty: number;
  status: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  userId: string;
  badgeName: string;
  earnedAt: string;
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
