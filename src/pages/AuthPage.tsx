import React, { useState } from 'react';
import { account } from '@/lib/appwrite';
import { ID, AppwriteException } from 'appwrite';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { checkUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await account.createEmailPasswordSession(email, password);
        showSuccess("Welcome back!");
      } else {
        await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password);
        showSuccess("Account created successfully!");
      }
      await checkUser();
      navigate('/');
    } catch (error: any) {
      console.error("Auth Error Details:", error);
      
      if (error instanceof AppwriteException) {
        // Handle specific Appwrite errors
        if (error.type === 'user_already_exists') {
          showError("An account with this email already exists.");
        } else if (error.type === 'user_invalid_credentials') {
          showError("Invalid email or password. Please try again.");
        } else {
          showError(error.message || "Authentication failed");
        }
      } else if (error.message === 'Failed to fetch') {
        showError("Connection failed. Please ensure your domain is added to Appwrite Platforms.");
      } else {
        showError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B0F1A] p-4">
      <Card className="w-full max-w-md rounded-[2.5rem] border-none shadow-2xl shadow-indigo-100 dark:shadow-none overflow-hidden">
        <div className="bg-indigo-600 p-10 text-white text-center">
          <h1 className="text-3xl font-black tracking-tight">Growth Habit</h1>
          <p className="text-indigo-100 text-sm mt-2">Your journey to mastery starts here.</p>
        </div>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="rounded-xl"
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="rounded-xl"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="rounded-xl"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (
                isLogin ? <><LogIn className="w-5 h-5 mr-2" /> Sign In</> : <><UserPlus className="w-5 h-5 mr-2" /> Create Account</>
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              disabled={isLoading}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;