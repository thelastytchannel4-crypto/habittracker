import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, BarChart3, User, Sparkles, Trophy, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHabitStore } from '@/store/useHabitStore';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { profile } = useHabitStore();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ListTodo, label: 'Habits', path: '/habits' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const progress = (profile.points % 500) / 500 * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F1A] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white dark:bg-[#111827] border-r border-slate-200/60 dark:border-slate-800/60 p-8 flex flex-col gap-10 z-20">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            <Sparkles className="text-white w-7 h-7" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white block leading-none">Growth</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">Architect AI</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 group overflow-hidden",
                  isActive 
                    ? "text-indigo-600 dark:text-indigo-400 font-bold" 
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-indigo-600" : "text-slate-400")} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Level {profile.level}</span>
            </div>
            <span className="text-xs font-bold text-indigo-600">{profile.points} XP</span>
          </div>
          <div className="relative h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            />
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-3 text-center uppercase tracking-widest">
            {500 - (profile.points % 500)} XP to next level
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;