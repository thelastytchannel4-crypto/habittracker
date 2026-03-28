import { useState, useEffect } from 'react';
import { Habit, DailySummary, AppState, UserStats, DailyLogEntry } from '../types/habit';
import { format } from 'date-fns';

const STORAGE_KEY = 'intelligent_habit_tracker_data';

const INITIAL_STATS: UserStats = {
  points: 0,
  level: 1,
  experience: 0,
  streaks: {},
  badges: [],
};

export const useHabitStore = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      habits: [],
      dailySummaries: {},
      stats: INITIAL_STATS,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'archived'>) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      archived: false,
    };
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  };

  const logHabit = (date: string, log: DailyLogEntry) => {
    setState(prev => {
      const summaries = { ...prev.dailySummaries };
      if (!summaries[date]) {
        summaries[date] = {
          date,
          energyLevel: 3,
          mood: 'neutral',
          notes: '',
          logs: [],
        };
      }

      const existingLogIndex = summaries[date].logs.findIndex(l => l.habitId === log.habitId);
      const newLogs = [...summaries[date].logs];
      
      if (existingLogIndex >= 0) {
        newLogs[existingLogIndex] = log;
      } else {
        newLogs.push(log);
      }

      summaries[date] = { ...summaries[date], logs: newLogs };

      // Calculate points
      let pointsEarned = 10; // Base points
      if (log.completed) {
        const habit = prev.habits.find(h => h.id === log.habitId);
        if (habit) {
          if (habit.difficulty === 'medium') pointsEarned += 10;
          if (habit.difficulty === 'hard') pointsEarned += 20;
          pointsEarned += (log.quality || 3) * 2;
        }
      }

      const newExperience = prev.stats.experience + pointsEarned;
      const newLevel = Math.floor(newExperience / 1000) + 1;

      return {
        ...prev,
        dailySummaries: summaries,
        stats: {
          ...prev.stats,
          points: prev.stats.points + pointsEarned,
          experience: newExperience,
          level: newLevel,
        }
      };
    });
  };

  const updateDailySummary = (date: string, updates: Partial<DailySummary>) => {
    setState(prev => {
      const summaries = { ...prev.dailySummaries };
      if (!summaries[date]) {
        summaries[date] = {
          date,
          energyLevel: 3,
          mood: 'neutral',
          notes: '',
          logs: [],
        };
      }
      summaries[date] = { ...summaries[date], ...updates };
      return { ...prev, dailySummaries: summaries };
    });
  };

  return {
    ...state,
    addHabit,
    logHabit,
    updateDailySummary,
  };
};