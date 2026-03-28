import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useHabitStore } from '@/store/useHabitStore';
import HabitCard from '@/components/dashboard/HabitCard';
import CreateTaskDialog from '@/components/tasks/CreateTaskDialog';
import { format } from 'date-fns';
import { Sparkles, Sun, Moon, Coffee, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const { tasks, logs, profile } = useHabitStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayLogs = logs[today] || [];
  
  const morningTasks = tasks.filter(t => t.timePreference === 'morning');
  const otherTasks = tasks.filter(t => t.timePreference !== 'morning');

  const completionRate = tasks.length > 0 
    ? Math.round((todayLogs.length / tasks.length) * 100) 
    : 0;

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-indigo-600 font-bold mb-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Good Morning, {profile.name}</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Today's Journey
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
              {format(new Date(), 'EEEE, MMMM do')} • You've completed {todayLogs.length}/{tasks.length} habits
            </p>
          </div>
          <CreateTaskDialog />
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Daily Progress</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{completionRate}%</p>
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                className="h-full bg-orange-500"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Current Streak</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">12 Days</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Total XP</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{profile.points}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Morning Mode Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
              <Sun className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Morning Rituals</h2>
          </div>
          
          {morningTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {morningTasks.map(task => (
                <HabitCard 
                  key={task.id} 
                  task={task} 
                  date={today}
                  log={todayLogs.find(l => l.taskId === task.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
              <Coffee className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No morning habits scheduled yet.</p>
            </div>
          )}
        </section>

        {/* Rest of Day Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
              <Moon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Rest of the Day</h2>
          </div>
          
          {otherTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTasks.map(task => (
                <HabitCard 
                  key={task.id} 
                  task={task} 
                  date={today}
                  log={todayLogs.find(l => l.taskId === task.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
              <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Add more habits to fill your day!</p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;