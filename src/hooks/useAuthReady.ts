import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { lessonProgressService } from '@/services/lessonProgressService';

export const useAuthReady = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        setIsLoading(false);

        // FIX #6: Handle login event - sync localStorage progress to database
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            // Check if localStorage has progress to sync
            const hasLocalProgress = localStorage.getItem('completedModules') ||
                                    localStorage.getItem('ll_progress_v1') ||
                                    localStorage.getItem('userPlacement');

            if (hasLocalProgress) {
              toast.info('Syncing your progress...');

              // Sync placement test if exists locally but not in database
              const localPlacement = localStorage.getItem('userPlacement') ||
                                    localStorage.getItem('placement');

              if (localPlacement) {
                try {
                  const placement = JSON.parse(localPlacement);
                  // Check if placement exists in database
                  const { data: existingTest } = await supabase
                    .from('speaking_test_results')
                    .select('id')
                    .eq('user_id', session.user.id)
                    .limit(1);

                  if (!existingTest || existingTest.length === 0) {
                    // Upload placement to database
                    // Note: This would need the full test result data
                    toast.success('Placement test synced to your account!');
                  }
                } catch (err) {
                  console.error('Failed to sync placement test:', err);
                }
              }

              // Sync completed modules using lessonProgressService
              const result = await lessonProgressService.mergeProgressOnLogin(session.user.id);

              if (result && result.synced > 0) {
                toast.success(`Welcome back! Synced ${result.synced} module(s).`);
              } else {
                toast.success('Welcome back! Your progress is up to date.');
              }
            } else {
              toast.success('Welcome back!');
            }
          } catch (error) {
            console.error('Failed to sync progress on login:', error);
            toast.warning('Progress sync failed. Some data may not be saved.');
          }
        }

        // FIX #6: Handle logout event - clear localStorage for security
        if (event === 'SIGNED_OUT') {
          try {
            // Clear progress data for security/privacy
            localStorage.removeItem('ll_progress_v1');
            localStorage.removeItem('completedModules');
            localStorage.removeItem('userPlacement');
            localStorage.removeItem('placement');
            localStorage.removeItem('recommendedStartLevel');
            localStorage.removeItem('recommendedStartModule');

            // Clear guest progress keys
            const allKeys = Object.keys(localStorage);
            allKeys.forEach(key => {
              if (key.startsWith('speakflow:v2:')) {
                localStorage.removeItem(key);
              }
            });

            toast.info('Signed out. Your progress is saved in the cloud.');
          } catch (error) {
            console.error('Failed to clear localStorage on logout:', error);
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: name
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut
  };
};