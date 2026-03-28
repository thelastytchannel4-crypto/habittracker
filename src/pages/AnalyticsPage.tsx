import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useHabitStore } from '@/store/useHabitStore';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { Brain, TrendingUp, Zap, Award, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AnalyticsPage = () => {
  const { tasks, logs } = useHabitStore();

  // Mock data for visualization
  const weeklyData = [
    { name: 'Mon', completion: 65, focus: 120 },
    { name: 'Tue', completion: 85, focus: 180 },
    { name: 'Wed', completion: 45, focus: 90 },
    { name: 'Thu', completion: 90, focus: 210 },
    { name: 'Fri', completion: 75, focus: 150 },
    { name: 'Sat', completion: 30, focus: 60 },
    { name: 'Sun', completion: 55, focus: 100 },
  ];

  const categoryData = [
    { subject: 'Health', A: 120, fullMark: 150 },
    { subject: 'Career', A: 98, fullMark: 150 },
    { subject: 'Learning', A: 86, fullMark: 150 },
    { subject: 'Mindfulness', A: 99, fullMark: 150 },
    { subject: 'Creativity', A: 85, fullMark: 150 },
    { subject: 'Finance', A: 65, fullMark: 150 },
  ];

  const aiInsights = [
    {
      icon: Brain,
      title: "Correlation Detected",
      text: "Your 'Morning Meditation' completion correlates with a 25% higher productivity in 'Career' tasks.",
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      icon: TrendingUp,
      title: "Optimal Window",
      text: "You are 40% more likely to complete 'Hard' tasks when scheduled before 10:00 AM.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: AlertCircle,
      title: "Risk Alert",
      text: "Your 'Health' category has seen a 15% decline over the last 7 days. Consider a reset.",
      color: "text-rose-500",
      bg: "bg-rose-50"
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <header>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Growth Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">AI-powered insights into your personal evolution</p>
        </header>

        {/* AI Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiInsights.map((insight, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", insight.bg, insight.color)}>
                <insight.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{insight.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{insight.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Completion Trend */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Completion Trend</h3>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <ArrowUpRight className="w-4 h-4" /> +12% vs last week
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    stroke="#4f46e5" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Balance */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Life Balance Matrix</h3>
            <div className="h-[300px] w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Radar
                    name="Growth"
                    dataKey="A"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Summary Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Category Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Completion</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Focus Hours</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Growth</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { cat: 'Health', comp: '85%', focus: '32h', growth: '+12%', grade: 'A' },
                  { cat: 'Career', comp: '70%', focus: '45h', growth: '-5%', grade: 'B-' },
                  { cat: 'Learning', comp: '92%', focus: '28h', growth: '+18%', grade: 'A+' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{row.cat}</td>
                    <td className="px-8 py-6 text-slate-500">{row.comp}</td>
                    <td className="px-8 py-6 text-slate-500">{row.focus}</td>
                    <td className={cn("px-8 py-6 font-medium", row.growth.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                      {row.growth}
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                        {row.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;