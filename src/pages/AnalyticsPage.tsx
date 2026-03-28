import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useHabitStore } from '@/store/useHabitStore';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { Brain, TrendingUp, Zap, Award, AlertCircle, ArrowUpRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getWeeklyCompletionData, getCategoryPerformance } from '@/utils/habitMetrics';

const AnalyticsPage = () => {
  const { tasks, logs } = useHabitStore();

  const weeklyData = getWeeklyCompletionData(logs, tasks.length);
  const categoryData = getCategoryPerformance(tasks, logs);

  const hasData = Object.keys(logs).length > 0;

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <header>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Growth Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Real-time insights into your personal evolution</p>
        </header>

        {!hasData ? (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-12 rounded-[40px] text-center border border-indigo-100 dark:border-indigo-800/50">
            <Info className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Data Yet</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Complete your first habit to start generating growth analytics and AI-powered insights.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">7-Day Completion Trend</h3>
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

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Category Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Completion Rate</th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Active Habits</th>
                      <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {categoryData.filter(d => d.count > 0).map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{row.subject}</td>
                        <td className="px-8 py-6 text-slate-500">{row.A}%</td>
                        <td className="px-8 py-6 text-slate-500">{row.count}</td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold",
                            row.A >= 80 ? "bg-emerald-50 text-emerald-600" : 
                            row.A >= 50 ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                          )}>
                            {row.A >= 80 ? 'Mastering' : row.A >= 50 ? 'Improving' : 'Needs Focus'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;