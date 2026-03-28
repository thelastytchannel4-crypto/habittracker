import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useHabitStore } from '@/store/useHabitStore';
import { Award, Trophy, Zap, Star, Shield, Flame, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

const ProfilePage = () => {
  const { profile } = useHabitStore();

  const badges = [
    { icon: Flame, name: "7-Day Streak", desc: "Consistent for a full week", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Shield, name: "Habit Master", desc: "Completed 100 total tasks", color: "text-indigo-500", bg: "bg-indigo-50" },
    { icon: Star, name: "Early Bird", desc: "10 morning habits done", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Target, name: "Precision", desc: "5 tasks with 5/5 quality", color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <header className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="relative">
            <div className="w-32 h-32 bg-indigo-600 rounded-[32px] flex items-center justify-center text-5xl text-white shadow-2xl shadow-indigo-200">
              {profile.name[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-amber-400 rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center font-black text-white">
              {profile.level}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{profile.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-6">Level {profile.level} Growth Architect</p>
            
            <div className="max-w-md">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-400 uppercase tracking-wider">Experience Points</span>
                <span className="text-indigo-600">{profile.points} XP</span>
              </div>
              <Progress value={(profile.points % 500) / 500 * 100} className="h-3 bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-center px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
              <p className="text-2xl font-black text-slate-900 dark:text-white">12</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Streak</p>
            </div>
            <div className="text-center px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
              <p className="text-2xl font-black text-slate-900 dark:text-white">4</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Badges</p>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Award className="w-7 h-7 text-amber-500" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-center group"
              >
                <div className={cn("w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", badge.bg, badge.color)}>
                  <badge.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{badge.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Growth Mindset</h3>
              <p className="text-indigo-100 leading-relaxed mb-8">
                "The secret of your future is hidden in your daily routine."
              </p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                View Year-End Report
              </button>
            </div>
            <Trophy className="absolute -bottom-10 -right-10 w-48 h-48 text-indigo-500/30 rotate-12" />
          </div>

          <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Next Milestone</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                Complete 5 more 'Hard' tasks to unlock the <strong>Elite Architect</strong> title.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-amber-400" />
                </div>
                <span className="text-xs font-bold">60%</span>
              </div>
            </div>
            <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-800/50 -rotate-12" />
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;