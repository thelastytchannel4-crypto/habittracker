import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, BarChart3, User, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHabitStore } from '@/store/useHabitStore';
import { Progress } from '@/components/ui/progress';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { profile } = useHabitStore();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ListTodo, label: 'Habits', path: '/habits' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const nextLevelPoints = profile.level * 500;
  const progress = (profile.points % 500) / 500 * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#1E293B] border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">GrowthAI</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                location.pathname === item.path 
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400" 
                  : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className={cn("w-5 h-5", location.pathname === item.path ? "text-indigo-600" : "group-hover:text-indigo-500")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Level {profile.level}</span>
            </div>
            <span className="text-xs font-medium text-slate-500">{profile.points} XP</span>
          </div>
          <Progress value={progress} className="h-2 bg-slate-200 dark:bg-slate-700" />
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            {nextLevelPoints - (profile.points % 500)} XP to Level {profile.level + 1}
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;