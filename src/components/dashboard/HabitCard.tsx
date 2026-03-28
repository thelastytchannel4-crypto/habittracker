import React, { useState } from 'react';
import { Check, Clock, Zap, MoreVertical, Star, Flame } from 'lucide-react';
import { Task, DailyLog } from '@/types/habit';
import { useHabitStore } from '@/store/useHabitStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';

interface HabitCardProps {
  task: Task;
  log?: DailyLog;
  date: string;
}

const HabitCard = ({ task, log, date }: HabitCardProps) => {
  const { logTask } = useHabitStore();
  const [isLogging, setIsLogging] = useState(false);
  const [quality, setQuality] = useState(5);

  const handleComplete = () => {
    if (log?.completed) return;
    setIsLogging(true);
  };

  const submitLog = () => {
    logTask(date, {
      taskId: task.id,
      completed: true,
      completionQuality: quality,
      focusTime: task.targetValue || 0,
      timestamp: new Date().toISOString(),
    });
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#6366F1', '#A855F7', '#EC4899'],
      ticks: 200
    });
    
    setIsLogging(false);
  };

  const categoryStyles: Record<string, { bg: string, text: string, icon: string }> = {
    Health: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', icon: 'bg-emerald-500' },
    Career: { bg: 'bg-blue-500/10', text: 'text-blue-600', icon: 'bg-blue-500' },
    Learning: { bg: 'bg-violet-500/10', text: 'text-violet-600', icon: 'bg-violet-500' },
    Mindfulness: { bg: 'bg-indigo-500/10', text: 'text-indigo-600', icon: 'bg-indigo-500' },
    Creativity: { bg: 'bg-pink-500/10', text: 'text-pink-600', icon: 'bg-pink-500' },
    Finance: { bg: 'bg-amber-500/10', text: 'text-amber-600', icon: 'bg-amber-500' },
    Relationships: { bg: 'bg-rose-500/10', text: 'text-rose-600', icon: 'bg-rose-500' },
  };

  const style = categoryStyles[task.category] || categoryStyles.Mindfulness;

  return (
    <motion.div 
      layout
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500",
        log?.completed 
          ? "bg-white dark:bg-slate-900/40 border-2 border-emerald-500/20" 
          : "bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/40 dark:shadow-none"
      )}
    >
      {/* Background Glow */}
      <div className={cn(
        "absolute -right-10 -top-10 w-40 h-40 blur-[80px] opacity-20 transition-opacity duration-500 group-hover:opacity-40",
        style.bg.replace('/10', '')
      )} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            <div className={cn(
              "w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
              style.bg
            )}>
              {task.icon}
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-900 dark:text-white leading-tight tracking-tight">{task.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                  style.bg, style.text
                )}>
                  {task.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                  <Clock className="w-3 h-3" /> {task.timePreference}
                </span>
              </div>
            </div>
          </div>
          
          <button className="p-2 text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 line-clamp-2 min-h-[40px]">
          {task.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-orange-500">
              <Flame className="w-5 h-5 fill-current" />
              <span className="text-sm font-black">12</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-500">
              <Zap className="w-5 h-5 fill-current" />
              <span className="text-sm font-black">+{task.difficulty === 'hard' ? 50 : task.difficulty === 'medium' ? 25 : 10}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isLogging ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4 absolute inset-x-8 bottom-8 bg-white dark:bg-slate-900 z-20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Quality</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "w-5 h-5 cursor-pointer transition-all duration-200 hover:scale-125", 
                          i <= quality ? "text-amber-400 fill-current" : "text-slate-200 dark:text-slate-700"
                        )}
                        onClick={() => setQuality(i)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" className="flex-1 rounded-2xl font-bold" onClick={() => setIsLogging(false)}>Cancel</Button>
                  <Button size="sm" className="flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none" onClick={submitLog}>Log It</Button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                disabled={log?.completed}
                className={cn(
                  "relative h-14 px-8 rounded-[1.25rem] font-black text-sm uppercase tracking-widest transition-all duration-500 overflow-hidden",
                  log?.completed 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-none" 
                    : "bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-none"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {log?.completed ? (
                    <><Check className="w-5 h-5 stroke-[3]" /> Done</>
                  ) : (
                    "Complete"
                  )}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;