import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuthReady } from '@/hooks/useAuthReady';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<'apple' | 'google' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, signInWithApple, signInWithGoogle, isAuthenticated } = useAuthReady();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get('redirectTo') || '/';
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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
        const redirectTo = searchParams.get('redirectTo') || '/';
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

  const handleAppleSignIn = async () => {
    setIsSocialLoading('apple');
    try {
      const { error } = await signInWithApple();
      if (error) {
        toast({ title: "Apple sign in failed", description: error.message, variant: "destructive" });
        setIsSocialLoading(null);
      }
      // On success, page redirects — no need to clear loading
    } catch {
      toast({ title: "An error occurred", description: "Please try again later.", variant: "destructive" });
      setIsSocialLoading(null);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSocialLoading('google');
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({ title: "Google sign in failed", description: error.message, variant: "destructive" });
        setIsSocialLoading(null);
      }
    } catch {
      toast({ title: "An error occurred", description: "Please try again later.", variant: "destructive" });
      setIsSocialLoading(null);
    }
  };

  const [activeTab, setActiveTab] = useState('signin');

  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-950 to-[#0B0E2C] text-white">
      {/* Header */}
      <header className="pt-safe pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300">Tomas Hoca</span>
        </h1>
        <p className="mt-2 text-slate-300/80">Learn English with AI and live classes</p>
      </header>

      <div className="px-4 pb-16">
        <div className="mx-auto w-full max-w-md space-y-4">

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Sign in with Apple — must be first and prominent per Apple Guideline 4.8 */}
            <button
              onClick={handleAppleSignIn}
              disabled={!!isSocialLoading}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white text-black
                         font-semibold py-3.5 min-h-[48px] shadow-lg
                         hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSocialLoading === 'apple' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              )}
              Continue with Apple
            </button>

            {/* Sign in with Google */}
            <button
              onClick={handleGoogleSignIn}
              disabled={!!isSocialLoading}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/10 text-white
                         font-semibold py-3.5 min-h-[48px] ring-1 ring-white/20
                         hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSocialLoading === 'google' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-xs text-slate-400 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* Email/Password Card */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl overflow-hidden">
            {/* Tab navigation */}
            <div className="grid grid-cols-2">
              <button
                onClick={() => handleTabChange('signin')}
                role="tab"
                aria-selected={activeTab === 'signin'}
                className={`py-3 min-h-[44px] text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'signin' ? 'text-white border-white' : 'text-slate-300 hover:text-white/90 border-transparent'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleTabChange('signup')}
                role="tab"
                aria-selected={activeTab === 'signup'}
                className={`py-3 min-h-[44px] text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'signup' ? 'text-white border-white' : 'text-slate-300 hover:text-white/90 border-transparent'
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

          {/* Legal text */}
          <p className="text-xs text-slate-300/60 text-center leading-relaxed px-4">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-sky-300 hover:text-sky-200 underline transition-colors">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-sky-300 hover:text-sky-200 underline transition-colors">
              Privacy Policy
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
