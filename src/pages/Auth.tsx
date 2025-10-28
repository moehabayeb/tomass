import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthReady } from '@/hooks/useAuthReady';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated } = useAuthReady();
  const { toast } = useToast();

  // Redirect to meetings if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get('redirectTo') || '/?tab=meetings';
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sanitize inputs: trim whitespace and normalize email to lowercase
      const trimmedEmail = email.trim().toLowerCase();
      const { error } = await signIn(trimmedEmail, password);
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
        const redirectTo = searchParams.get('redirectTo') || '/?tab=meetings';
        navigate(redirectTo);
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sanitize inputs: trim whitespace, normalize email, and clean name
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedName = fullName.trim();
      const { error } = await signUp(trimmedEmail, password, trimmedName);
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "Account exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        // Clear form fields after successful sign-up
        setEmail('');
        setPassword('');
        setFullName('');

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState('signin');

  // Clear form fields when switching tabs for better UX and security
  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-950 to-[#0B0E2C] text-white">
      {/* Header */}
      <header className="pt-10 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300">English Learning</span>
        </h1>
        <p className="mt-2 text-slate-300/80">Join our live classes and improve your English</p>
      </header>

      {/* Card shell */}
      <div className="px-4 pb-16">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl overflow-hidden">
          {/* Tab navigation */}
          <div className="grid grid-cols-2">
            <button
              onClick={() => handleTabChange('signin')}
              className={`py-3 text-sm font-semibold transition-colors ${
                activeTab === 'signin' ? 'text-white' : 'text-slate-300 hover:text-white/90'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange('signup')}
              className={`py-3 text-sm font-semibold transition-colors ${
                activeTab === 'signup' ? 'text-white' : 'text-slate-300 hover:text-white/90'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* SIGN IN */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="px-5 pb-6 pt-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address (e.g., user@example.com)"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/10 text-white placeholder:text-slate-300/70
                             px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-400
                             shadow-inner selection:bg-sky-400/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Password</label>
                <input
                  type="password" 
                  autoComplete="current-password" 
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/10 text-white placeholder:text-slate-300/70
                             px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-400
                             shadow-inner selection:bg-sky-400/30"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300
                           text-indigo-950 font-semibold py-3 shadow-lg shadow-emerald-500/20
                           hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-400
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </button>
            </form>
          )}

          {/* SIGN UP */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="px-5 pb-6 pt-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-200">Full Name</label>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/10 text-white placeholder:text-slate-300/70
                             px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-400
                             shadow-inner selection:bg-sky-400/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address (e.g., user@example.com)"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/10 text-white placeholder:text-slate-300/70
                             px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-400
                             shadow-inner selection:bg-sky-400/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/10 text-white placeholder:text-slate-300/70
                             px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-400
                             shadow-inner selection:bg-sky-400/30"
                />
                <p className="mt-1 text-xs text-slate-300/60">
                  Must be at least 6 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300
                           text-indigo-950 font-semibold py-3 shadow-lg shadow-emerald-500/20
                           hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-400
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-slate-300/80 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}