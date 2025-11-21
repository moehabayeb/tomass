import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { lessonProgressService } from '@/services/lessonProgressService';
import { speakingTestService } from '@/services/speakingTestService';

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

              // 🔧 FIX: Sync placement test if exists locally but not in database
              const localPlacement = localStorage.getItem('guestPlacementTest') ||
                                    localStorage.getItem('lastTestResult');

              if (localPlacement) {
                try {
                  const placementData = JSON.parse(localPlacement);

                  // Check if placement exists in database
                  const { data: existingTest } = await supabase
                    .from('speaking_test_results')
                    .select('id')
                    .eq('user_id', session.user.id)
                    .limit(1);

                  if (!existingTest || existingTest.length === 0) {
                    // 🔧 FIX: Actually upload placement test data to database
                    const testResult = placementData.scores || placementData;

                    if (testResult.overall_score !== undefined) {
                      await speakingTestService.saveTestResult({
                        overall_score: testResult.overall_score || 0,
                        recommended_level: testResult.recommended_level || placementData.level || 'A1',
                        pronunciation_score: testResult.pronunciation_score || 0,
                        grammar_score: testResult.grammar_score || 0,
                        vocabulary_score: testResult.vocabulary_score || 0,
                        fluency_score: testResult.fluency_score || 0,
                        comprehension_score: testResult.comprehension_score || 0,
                        test_duration: testResult.test_duration || 0,
                        transcript: testResult.transcript || [],
                        detailed_feedback: testResult.detailed_feedback || {},
                        words_per_minute: testResult.words_per_minute || 0,
                        unique_words_count: testResult.unique_words_count || 0,
                        grammar_errors_count: testResult.grammar_errors_count || 0,
                        pronunciation_issues: testResult.pronunciation_issues || [],
                        test_type: testResult.test_type || 'full'
                      });

                      toast.success('Placement test synced to your account!');
                    }
                  }
                } catch (err) {
                  if (import.meta.env.DEV) console.error('Failed to sync placement test:', err);
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
            if (import.meta.env.DEV) console.error('Failed to sync progress on login:', error);
            toast.warning('Progress sync failed. Some data may not be saved.');
          }
        }

        // FIX #6: Handle logout event - clear localStorage for security
        if (event === 'SIGNED_OUT') {
          try {
            // Clear progress data for security/privacy (synchronous - fast)
            localStorage.removeItem('ll_progress_v1');
            localStorage.removeItem('completedModules');
            localStorage.removeItem('userPlacement');
            localStorage.removeItem('placement');
            localStorage.removeItem('recommendedStartLevel');
            localStorage.removeItem('recommendedStartModule');

            // PERFORMANCE FIX: Clear guest progress keys in background (non-blocking)
            // Using setTimeout prevents blocking the UI thread during sign-out
            setTimeout(() => {
              try {
                const allKeys = Object.keys(localStorage);
                const keysToRemove = allKeys.filter(key => key.startsWith('speakflow:v2:'));
                keysToRemove.forEach(key => localStorage.removeItem(key));
              } catch (err) {
                // Silent fail for cleanup - non-critical
              }
            }, 0);

            // REMOVED: Duplicate toast (UserDropdown already shows one)
          } catch (error) {
            // Silent fail for cleanup - non-critical
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