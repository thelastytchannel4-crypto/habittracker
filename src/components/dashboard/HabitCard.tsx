import React, { useState } from 'react';
import { Check, Clock, Zap, MoreVertical, Star } from 'lucide-react';
import { Task, DailyLog } from '@/types/habit';
import { useHabitStore } from '@/store/useHabitStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#10B981', '#F59E0B']
    });
    
    setIsLogging(false);
  };

  const categoryColors: Record<string, string> = {
    Health: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Career: 'bg-blue-50 text-blue-600 border-blue-100',
    Learning: 'bg-violet-50 text-violet-600 border-violet-100',
    Mindfulness: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    Creativity: 'bg-pink-50 text-pink-600 border-pink-100',
    Finance: 'bg-amber-50 text-amber-600 border-amber-100',
    Relationships: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <motion.div 
      layout
      className={cn(
        "group relative bg-white dark:bg-slate-900 rounded-3xl p-5 border transition-all duration-300",
        log?.completed 
          ? "border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/5" 
          : "border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm",
            categoryColors[task.category] || "bg-slate-50 text-slate-600"
          )}>
            {task.icon}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{task.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                categoryColors[task.category]
              )}>
                {task.category}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {task.timePreference}
              </span>
            </div>
          </div>
        </div>
        
        <button className="text-slate-300 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 min-h-[40px]">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-500">
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-xs font-bold">Streak: 5</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLogging ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col gap-3 w-full"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Quality: {quality}/5</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star 
                      key={i} 
                      className={cn("w-4 h-4 cursor-pointer", i <= quality ? "text-amber-400 fill-current" : "text-slate-200")}
                      onClick={() => setQuality(i)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => setIsLogging(false)}>Cancel</Button>
                <Button size="sm" className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700" onClick={submitLog}>Log It</Button>
              </div>
            </motion.div>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={log?.completed}
              className={cn(
                "rounded-2xl px-6 transition-all duration-300",
                log?.completed 
                  ? "bg-emerald-500 hover:bg-emerald-500 text-white opacity-100" 
                  : "bg-slate-900 hover:bg-indigo-600 text-white"
              )}
            >
              {log?.completed ? (
                <><Check className="w-4 h-4 mr-2" /> Done</>
              ) : (
                "Complete"
              )}
            </Button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HabitCard;