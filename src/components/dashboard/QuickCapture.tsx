import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, Smile, MessageSquare, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const QuickCapture = () => {
  const [mood, setMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleVoiceToggle = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setNote(prev => prev + (transcript ? ' ' + transcript : ''));
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleSave = () => {
    showSuccess("Moment captured! Your growth is being recorded.");
    setMood(null);
    setNote('');
    resetTranscript();
  };

  const moods = [
    { icon: '😔', value: 1, label: 'Low' },
    { icon: '😐', value: 2, label: 'Neutral' },
    { icon: '🙂', value: 3, label: 'Good' },
    { icon: '🤩', value: 4, label: 'Amazing' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Quick Capture</h3>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Mood & Voice Notes</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">How are you feeling?</p>
          <div className="flex justify-between gap-2">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={cn(
                  "flex-1 py-3 rounded-2xl text-2xl transition-all duration-200 border",
                  mood === m.value 
                    ? "bg-indigo-50 border-indigo-200 scale-105" 
                    : "bg-slate-50 border-transparent hover:bg-slate-100"
                )}
              >
                {m.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Voice Reflection</p>
          <div className="relative">
            <Input 
              placeholder={listening ? "Listening..." : "Tap mic to speak or type here..."}
              value={listening ? transcript : note}
              onChange={(e) => setNote(e.target.value)}
              className="rounded-2xl py-6 pr-12 bg-slate-50 border-none focus-visible:ring-indigo-500"
            />
            <button 
              onClick={handleVoiceToggle}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                listening ? "bg-rose-500 text-white animate-pulse" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              )}
            >
              {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button 
          className="w-full rounded-2xl py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100"
          onClick={handleSave}
          disabled={!mood && !note && !transcript}
        >
          <Send className="w-4 h-4 mr-2" /> Save Reflection
        </Button>
      </div>
    </div>
  );
};

export default QuickCapture;