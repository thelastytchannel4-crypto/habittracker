import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useHabitStore } from '@/store/useHabitStore';
import HabitCard from '@/components/dashboard/HabitCard';
import CreateTaskDialog from '@/components/tasks/CreateTaskDialog';
import ActiveTracking from '@/components/dashboard/ActiveTracking';
import QuickCapture from '@/components/dashboard/QuickCapture';
import { format } from 'date-fns';
import { Sparkles, Sun, Moon, Coffee, TrendingUp, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { calculateStreak } from '@/utils/habitMetrics';

const Index = () => {
  const { tasks, logs, profile } = useHabitStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayLogs = logs[today] || [];
  
  const morningTasks = tasks.filter(t => t.timePreference === 'morning');
  const otherTasks = tasks.filter(t => t.timePreference !== 'morning');

  const completionRate = tasks.length > 0 
    ? Math.round((todayLogs.filter(l => l.completed).length / tasks.length) * 100) 
    : 0;

  const currentStreak = calculateStreak(logs);

  return (
    <AppLayout>
      <div className="space-y-16 pb-24">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4" />
              <span>Welcome back, {profile.name}</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              Today's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Evolution</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl">
              {format(new Date(), 'EEEE, MMMM do')} • You've mastered {todayLogs.filter(l => l.completed).length} of {tasks.length} habits today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <CreateTaskDialog />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Daily Progress', value: `${completionRate}%`, icon: TrendingUp, color: 'orange', progress: completionRate },
            { label: 'Current Streak', value: `${currentStreak} Days`, icon: Flame, color: 'rose' },
            { label: 'Total Growth', value: `${profile.points} XP`, icon: Sparkles, color: 'indigo' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/30 dark:shadow-none group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                  stat.color === 'orange' ? 'bg-orange-50 text-orange-500' : 
                  stat.color === 'rose' ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-500'
                )}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
              <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
              {stat.progress !== undefined && (
                <div className="mt-6 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    className={cn("h-full rounded-full", stat.color === 'orange' ? 'bg-orange-500' : 'bg-indigo-500')}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActiveTracking />
          <QuickCapture />
        </div>

        <div className="space-y-20">
          <section>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
                  <Sun className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Morning Rituals</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Start your day with intention</p>
                </div>
              </div>
            </div>
            
            {morningTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
              <div className="bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-20 text-center">
                <Coffee className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                <p className="text-slate-500 text-lg font-bold">Your morning is a blank canvas.</p>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Moon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Rest of the Day</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Maintain the momentum</p>
                </div>
              </div>
            </div>
            
            {otherTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
              <div className="bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-20 text-center">
                <Target className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                <p className="text-slate-500 text-lg font-bold">Add more habits to fuel your growth.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;