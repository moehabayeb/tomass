import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { lessonProgressService } from '@/services/lessonProgressService';
import { speakingTestService } from '@/services/speakingTestService';
import { StorageMigrationService } from '@/services/storageMigrationService';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { logger } from '@/lib/logger';

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

        // PRODUCTION FIX: Handle login event - robust sync with verification
        if (event === 'SIGNED_IN' && session?.user) {
          const userId = session.user.id;
          logger.log('[Auth] User signed in, starting progress sync for:', userId);

          try {
            toast.info('Syncing your progress...');

            // Step 1: Run migration service to unify all legacy keys
            const { placementTest, progress } = StorageMigrationService.runFullMigration(userId);
            logger.log('[Auth] Migration complete. Placement:', !!placementTest, 'Progress:', !!progress);

            // Step 2: Sync placement test to Supabase with VERIFICATION
            if (placementTest) {
              try {
                // Check if placement already exists in database
                const { data: existingTest } = await supabase
                  .from('speaking_test_results')
                  .select('id')
                  .eq('user_id', userId)
                  .limit(1);

                if (!existingTest || existingTest.length === 0) {
                  // Build test result from placement data
                  const testResult = placementTest.scores || placementTest;

                  // Save to database
                  const saveResult = await speakingTestService.saveTestResult({
                    overall_score: testResult.overall_score || 0,
                    recommended_level: testResult.recommended_level || placementTest.level || 'A1',
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

                  // VERIFICATION: Confirm data is in cloud
                  const { data: verifyTest } = await supabase
                    .from('speaking_test_results')
                    .select('id')
                    .eq('user_id', userId)
                    .limit(1);

                  if (verifyTest && verifyTest.length > 0) {
                    logger.log('[Auth] Placement test synced and VERIFIED');
                    toast.success('Placement test synced!');
                  } else {
                    logger.error('[Auth] Placement sync verification FAILED');
                    // Keep local data as backup
                  }
                } else {
                  logger.log('[Auth] Placement test already exists in database');
                }
              } catch (err) {
                logger.error('[Auth] Failed to sync placement test:', err);
                // Don't clear local - keep as backup
              }
            }

            // Step 3: Load existing progress from cloud (in case user has progress on other devices)
            try {
              await lessonProgressService.loadProgressFromCloud(userId);
              logger.log('[Auth] Cloud progress loaded');
            } catch (err) {
              logger.log('[Auth] No cloud progress to load or load failed');
            }

            // Step 4: Sync local progress to cloud
            const result = await lessonProgressService.mergeProgressOnLogin(userId);

            // Step 5: Dispatch sync complete event for other components to listen
            window.dispatchEvent(new CustomEvent('auth:sync-complete', {
              detail: { userId, success: true, synced: result?.synced || 0 }
            }));

            if (result && result.synced > 0) {
              toast.success(`Welcome back! Synced ${result.synced} module(s).`);
            } else {
              toast.success('Welcome back! Your progress is up to date.');
            }

            logger.log('[Auth] Full sync complete');

          } catch (error) {
            logger.error('[Auth] Progress sync failed:', error);
            toast.warning('Progress sync failed. Some data may not be saved.');

            // Still dispatch event so UI doesn't hang
            window.dispatchEvent(new CustomEvent('auth:sync-complete', {
              detail: { userId, success: false, error: String(error) }
            }));
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
            localStorage.removeItem('guestPlacementTest');
            localStorage.removeItem('lastTestResult');
            localStorage.removeItem('recommendedStartLevel');
            localStorage.removeItem('recommendedStartModule');

            // Also clear new unified keys
            localStorage.removeItem(STORAGE_KEYS.PLACEMENT_TEST);
            localStorage.removeItem(STORAGE_KEYS.SYNC_STATUS);

            // PERFORMANCE FIX: Clear guest progress keys in background (non-blocking)
            // Using setTimeout prevents blocking the UI thread during sign-out
            setTimeout(() => {
              try {
                const allKeys = Object.keys(localStorage);
                const keysToRemove = allKeys.filter(key =>
                  key.startsWith('speakflow:v2:') ||
                  key.startsWith('tomashoca:progress:')
                );
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

    // v74: Validate session server-side when app resumes from background.
    // An expired/revoked session should be detected immediately, not on next API call.
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        supabase.auth.getSession().then(({ data: { session: freshSession } }) => {
          setSession(freshSession);
          setUser(freshSession?.user ?? null);
          setIsAuthenticated(!!freshSession);
        }).catch(() => {
          // Network error on resume — don't redirect to login, just keep stale session
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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