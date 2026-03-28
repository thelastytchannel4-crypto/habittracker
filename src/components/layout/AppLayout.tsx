import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, BarChart3, User, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHabitStore } from '@/store/useHabitStore';
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
      {/* Sidebar - Strictly Vertical */}
      <aside className="w-full md:w-80 bg-white dark:bg-[#111827] border-r border-slate-200/60 dark:border-slate-800/60 p-8 flex flex-col gap-12 z-20 md:sticky md:top-0 md:h-screen">
        {/* Logo Section */}
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            <Sparkles className="text-white w-7 h-7" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white block leading-none">Growth</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">Architect AI</span>
          </div>
        </div>

        {/* Navigation - Vertical Column */}
        <nav className="flex flex-col gap-3 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-5 mb-2">Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group overflow-hidden",
                  isActive 
                    ? "text-indigo-600 dark:text-indigo-400 font-bold shadow-sm" 
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
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
                <span className="text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Progress Card */}
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800/50 mt-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Level</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{profile.level}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">{profile.points} XP</span>
          </div>
          <div className="relative h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            />
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-4 text-center uppercase tracking-widest">
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