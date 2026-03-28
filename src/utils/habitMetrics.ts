import { DailyLog, Task, Category } from '../types/habit';
import { format, subDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const calculateStreak = (logs: Record<string, DailyLog[]>) => {
  let streak = 0;
  let date = new Date();
  
  // Check if any task was completed today
  const todayStr = format(date, 'yyyy-MM-dd');
  const todayCompleted = (logs[todayStr] || []).some(l => l.completed);
  
  // If nothing today, start checking from yesterday
  if (!todayCompleted) {
    date = subDays(date, 1);
  }

  while (true) {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayLogs = logs[dateStr] || [];
    const completedAny = dayLogs.some(l => l.completed);
    
    if (completedAny) {
      streak++;
      date = subDays(date, 1);
    } else {
      break;
    }
  }
  return streak;
};

export const getWeeklyCompletionData = (logs: Record<string, DailyLog[]>, tasksCount: number) => {
  return Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayLogs = logs[dateStr] || [];
    const completedCount = dayLogs.filter(l => l.completed).length;
    
    return {
      name: format(date, 'EEE'),
      completion: tasksCount > 0 ? Math.round((completedCount / tasksCount) * 100) : 0,
      focus: dayLogs.reduce((acc, curr) => acc + (curr.focusTime || 0), 0)
    };
  });
};

export const getCategoryPerformance = (tasks: Task[], logs: Record<string, DailyLog[]>) => {
  const categories: Category[] = ['Health', 'Career', 'Learning', 'Mindfulness', 'Creativity', 'Finance', 'Relationships'];
  
  return categories.map(cat => {
    const catTasks = tasks.filter(t => t.category === cat);
    if (catTasks.length === 0) return { subject: cat, A: 0, fullMark: 100, count: 0 };
    
    let totalPossible = 0;
    let totalCompleted = 0;
    
    Object.values(logs).forEach(dayLogs => {
      catTasks.forEach(task => {
        totalPossible++;
        if (dayLogs.find(l => l.taskId === task.id && l.completed)) {
          totalCompleted++;
        }
      });
    });

    const score = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
    return { subject: cat, A: score, fullMark: 100, count: catTasks.length };
  });
};