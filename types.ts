export interface UserStats {
  balance: number;
  earningsToday: number;
  earningsYesterday: number;
  availableBalance: number;
  totalWithdrawn: number;
}

export interface WeeklyDataPoint {
  day: string;
  amount: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  durationSec: number;
  image: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
}

export interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit' | 'game_reward';
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  provider?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}

export enum Tab {
  DASHBOARD = 'dashboard',
  GAMES = 'games',
  WALLET = 'wallet',
  PROFILE = 'profile',
  CONFIGURATION = 'configuration'
}