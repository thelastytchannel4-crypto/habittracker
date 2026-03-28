import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Play, Pause, RotateCcw, Coffee, Brain, Timer as TimerIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const ActiveTracking = () => {
  const [isBreak, setIsBreak] = useState(false);
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1500); // 25 minutes

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ 
    expiryTimestamp, 
    onExpire: () => {
      showSuccess(isBreak ? "Break over! Time to focus." : "Session complete! Take a break.");
      handleToggleMode();
    },
    autoStart: false 
  });

  const handleToggleMode = () => {
    const newIsBreak = !isBreak;
    setIsBreak(newIsBreak);
    const time = new Date();
    time.setSeconds(time.getSeconds() + (newIsBreak ? 300 : 1500)); // 5m break or 25m focus
    restart(time, false);
  };

  const totalSeconds = isBreak ? 300 : 1500;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            isBreak ? "bg-emerald-50 text-emerald-500" : "bg-indigo-50 text-indigo-500"
          )}>
            {isBreak ? <Coffee className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              {isBreak ? "Rest & Recharge" : "Deep Work Session"}
            </h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              {isBreak ? "Short Break" : "Pomodoro Timer"}
            </p>
          </div>
        </div>
        <TimerIcon className="w-5 h-5 text-slate-300" />
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter mb-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <Progress value={progress} className={cn("h-2", isBreak ? "bg-emerald-100" : "bg-indigo-100")} />
      </div>

      <div className="flex items-center gap-3">
        {isRunning ? (
          <Button variant="outline" className="flex-1 rounded-2xl py-6" onClick={pause}>
            <Pause className="w-5 h-5 mr-2" /> Pause
          </Button>
        ) : (
          <Button className="flex-1 rounded-2xl py-6 bg-slate-900 hover:bg-indigo-600" onClick={start}>
            <Play className="w-5 h-5 mr-2" /> Start
          </Button>
        )}
        <Button variant="outline" size="icon" className="rounded-2xl w-14 h-14" onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + (isBreak ? 300 : 1500));
          restart(time, false);
        }}>
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ActiveTracking;