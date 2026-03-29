import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, BarChart3, User, Trophy, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHabitStore } from '@/store/useHabitStore';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useHabitStore();
  const { logout, user } = useAuth();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ListTodo, label: 'Habits', path: '/habits' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const progress = (profile.points % 500) / 500 * 100;

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F1A] flex flex-col-reverse md:flex-row">
      {/* Sidebar / Bottom Nav */}
      <aside className="w-full md:w-80 bg-white dark:bg-[#111827] border-t md:border-t-0 md:border-r border-slate-200/60 dark:border-slate-800/60 p-4 md:p-8 flex flex-col gap-6 md:gap-12 z-20 md:sticky md:top-0 md:h-screen shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] md:shadow-none">
        
        {/* Branding Section */}
        <div className="hidden md:flex items-center gap-4 px-2">
          <div>
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white block leading-none">Growth</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">Habit</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-row md:flex-col justify-around md:justify-start gap-1 md:gap-3 flex-1">
          <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-5 mb-2">Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-1 md:gap-4 px-3 py-2 md:px-6 md:py-4 rounded-2xl transition-all duration-300 group overflow-hidden flex-1 md:flex-none",
                  isActive 
                    ? "text-indigo-600 dark:text-indigo-400 font-bold" 
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
                <span className="text-[10px] md:text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User & Logout - Desktop */}
        <div className="hidden md:flex flex-col gap-4 mt-auto">
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800/50">
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
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold">Logout</span>
          </Button>
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