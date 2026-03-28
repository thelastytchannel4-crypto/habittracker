export type Category = 'Health' | 'Career' | 'Learning' | 'Relationships' | 'Finance' | 'Creativity' | 'Mindfulness';

export type TaskType = 'binary' | 'quantifiable' | 'timed' | 'incremental';

export interface Task {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: string;
  type: TaskType;
  targetValue?: number;
  frequency: 'daily' | 'weekly' | 'custom';
  timePreference: 'morning' | 'afternoon' | 'evening';
  difficulty: 'easy' | 'medium' | 'hard';
  whyItMatters: string;
  linkedGoal?: string;
  points: number;
  created: string;
}

export interface DailyLog {
  taskId: string;
  completed: boolean;
  completionQuality: number; // 1-5
  focusTime: number; // minutes
  timestamp: string;
  notes?: string;
  energyLevel?: number;
}

export interface UserProfile {
  name: string;
  level: number;
  points: number;
  badges: string[];
  streak: number;
}

export interface HabitState {
  tasks: Task[];
  logs: Record<string, DailyLog[]>; // date string key: "YYYY-MM-DD"
  profile: UserProfile;
}