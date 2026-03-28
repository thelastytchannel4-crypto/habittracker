import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HabitState, Task, DailyLog, UserProfile, Category } from '../types/habit';

interface HabitStore extends HabitState {
  addTask: (task: Omit<Task, 'id' | 'points' | 'created'>) => void;
  logTask: (date: string, log: DailyLog) => void;
  updateProfile: (points: number) => void;
  deleteTask: (id: string) => void;
}

const calculatePoints = (difficulty: string, quality: number) => {
  const base = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 25 : 50;
  return base * (quality / 5);
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      tasks: [],
      logs: {},
      profile: {
        name: "Growth Seeker",
        level: 1,
        points: 0,
        badges: [],
        streak: 0,
      },
      addTask: (taskData) => set((state) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          points: 0,
          created: new Date().toISOString(),
        };
        return { tasks: [...state.tasks, newTask] };
      }),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      logTask: (date, log) => set((state) => {
        const currentLogs = state.logs[date] || [];
        const task = state.tasks.find(t => t.id === log.taskId);
        const pointsEarned = task ? calculatePoints(task.difficulty, log.completionQuality) : 0;
        
        const newLogs = [...currentLogs.filter(l => l.taskId !== log.taskId), log];
        
        return {
          logs: { ...state.logs, [date]: newLogs },
          profile: {
            ...state.profile,
            points: state.profile.points + pointsEarned,
            level: Math.floor((state.profile.points + pointsEarned) / 500) + 1
          }
        };
      }),
      updateProfile: (points) => set((state) => ({
        profile: { ...state.profile, points: state.profile.points + points }
      })),
    }),
    {
      name: 'habit-storage',
    }
  )
);