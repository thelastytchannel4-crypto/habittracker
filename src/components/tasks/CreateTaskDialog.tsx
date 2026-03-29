import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from 'lucide-react';
import { useHabitStore } from '@/store/useHabitStore';
import { Category, TaskType } from '@/types/habit';

const CreateTaskDialog = () => {
  const { addTask } = useHabitStore();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    addTask({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as Category,
      icon: formData.get('icon') as string || '🎯',
      type: formData.get('type') as TaskType,
      frequency: 'daily',
      timePreference: formData.get('time') as any,
      difficulty: formData.get('difficulty') as any,
      whyItMatters: formData.get('why') as string,
      targetValue: Number(formData.get('target')) || undefined,
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-6 shadow-lg shadow-indigo-200">
          <Plus className="w-5 h-5 mr-2" /> New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Design Your Growth
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input id="name" name="name" placeholder="e.g. Morning Meditation" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Emoji Icon</Label>
              <Input id="icon" name="icon" placeholder="🧘" className="rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="What exactly will you do?" className="rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select name="category" defaultValue="Health">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Learning">Learning</SelectItem>
                  <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="Creativity">Creativity</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Relationships">Relationships</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select name="difficulty" defaultValue="medium">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (10 XP)</SelectItem>
                  <SelectItem value="medium">Medium (25 XP)</SelectItem>
                  <SelectItem value="hard">Hard (50 XP)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Time of Day</Label>
              <Select name="time" defaultValue="morning">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select name="type" defaultValue="binary">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binary">Done / Not Done</SelectItem>
                  <SelectItem value="timed">Timed (Minutes)</SelectItem>
                  <SelectItem value="quantifiable">Quantifiable (Count)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="why">Why does this matter to you?</Label>
            <Input id="why" name="why" placeholder="Your personal motivation..." className="rounded-xl" />
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 text-lg font-bold">
            Launch Habit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;