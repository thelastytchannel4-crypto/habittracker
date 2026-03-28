import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useHabitStore } from '@/store/useHabitStore';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Calendar, Target, Zap } from 'lucide-react';
import CreateTaskDialog from '@/components/tasks/CreateTaskDialog';
import { motion } from 'framer-motion';

const TasksPage = () => {
  const { tasks, deleteTask } = useHabitStore();

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <header className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Habit Library</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage and refine your daily systems</p>
          </div>
          <CreateTaskDialog />
        </header>

        <div className="grid grid-cols-1 gap-4">
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    {task.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{task.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {task.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" /> {task.frequency}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Target className="w-3 h-3" /> {task.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
                    <Edit2 className="w-4 h-4 text-slate-400" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-xl border-slate-200 hover:bg-rose-50 hover:border-rose-100 hover:text-rose-500"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-20 text-center">
              <Zap className="w-16 h-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No habits yet</h3>
              <p className="text-slate-500 mb-8">Start your journey by creating your first habit.</p>
              <CreateTaskDialog />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TasksPage;