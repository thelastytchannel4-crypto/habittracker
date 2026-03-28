export type HabitCategory = 'Health' | 'Career' | 'Learning' | 'Relationships' | 'Finance' | 'Creativity' | 'Mindfulness';

export type HabitType = 'binary' | 'quantifiable' | 'timed' | 'incremental';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  icon: string;
  type: HabitType;
  targetValue?: number;
  unit?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[]; // 0-6
  timePreference: 'morning' | 'afternoon' | 'evening' | 'anytime';
  difficulty: Difficulty;
  whyItMatters: string;
  linkedGoal?: string;
  dependencies?: string[];
  createdAt: string;
  archived: boolean;
}

export interface DailyLogEntry {
  habitId: string;
  completed: boolean;
  value?: number; // for quantifiable/timed
  quality: number; // 1-5
  focusTime?: number; // minutes
  timestamp: string;
  notes?: string;
  obstacles?: string[];
}

export interface DailySummary {
  date: string;
  energyLevel: number; // 1-5
  mood: string;
  notes: string;
  logs: DailyLogEntry[];
}

export interface UserStats {
  points: number;
  level: number;
  experience: number;
  streaks: Record<string, number>;
  badges: string[];
}

export interface AppState {
  habits: Habit[];
  dailySummaries: Record<string, DailySummary>;
  stats: UserStats;
}