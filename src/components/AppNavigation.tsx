import { useState, useEffect, useCallback } from 'react';
import { UserDropdown } from './UserDropdown';
import { NavigationDropdown } from './NavigationDropdown';
import { useAuthReady } from '@/hooks/useAuthReady';
import { useGlobalSound } from '@/hooks/useGlobalSound';
import { Volume2, VolumeX } from 'lucide-react';
import SpeakingApp from './SpeakingApp';
import EnglishProficiencyTest from './EnglishProficiencyTest';
import LessonsApp from './LessonsApp';
import { SpeakingPlacementTest } from './SpeakingPlacementTest';
import { GamesApp } from './GamesApp';
import MeetingsApp from './MeetingsApp';
import BookmarksView from './BookmarksView';
import BadgesView from './BadgesView';
import { LevelUpPopup } from './LevelUpPopup';
import { StreakRewardPopup } from './StreakRewardPopup';
import { StreakWelcomePopup } from './StreakWelcomePopup';
import { BadgeAchievement } from './BadgeAchievement';
import { useGamification } from '@/hooks/useGamification';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
// Admin panel removed for Apple App Store compliance
import { MeetingsWidget } from '@/components/meetings/MeetingsWidget';
import { TestResult } from '@/services/speakingTestService';
import { ErrorBoundary } from './ErrorBoundary';
import { MODULE_RANGES } from '@/constants/moduleRanges';

// Safe storage wrappers for Safari Private Mode compatibility
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  }
};

const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }
};

type AppMode = 'speaking' | 'lessons' | 'bookmarks' | 'badges' | 'placement-test' | 'games' | 'meetings';

export default function AppNavigation() {
  const [currentMode, setCurrentMode] = useState<AppMode>('speaking');
  const [continuedMessage, setContinuedMessage] = useState<string | undefined>();
  const [showStreakWelcome, setShowStreakWelcome] = useState(false);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const { user, isAuthenticated } = useAuthReady();
  const { soundEnabled, toggleSound } = useGlobalSound();
  const { showLevelUpPopup, pendingLevelUp, closeLevelUpPopup, getXPProgress, addXP } = useGamification();
  const { streakData, streakReward } = useStreakTracker(addXP);
  const { newlyUnlockedBadge, closeBadgeNotification } = useBadgeSystem();

  // v59: Detect Android for conditional styling (fixes mirror/glass effect)
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

  // Show streak welcome popup on first load
  useEffect(() => {
    const hasShownToday = safeSessionStorage.getItem('streakWelcomeShown');
    if (!hasShownToday && streakData.currentStreak > 0) {
      const timer = setTimeout(() => {
        setShowStreakWelcome(true);
        safeSessionStorage.setItem('streakWelcomeShown', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [streakData.currentStreak]);

  // Fetch user profile when authenticated
  useEffect(() => {
    let isMounted = true;

    if (user && isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (!error && data && isMounted) {
            setProfile(data);
          }
        } catch (error) {
          // Apple Store Compliance: Silent fail - profile fetch is non-critical
        }
      };

      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [user, isAuthenticated]);

  // Clear continued message after it's used
  useEffect(() => {
    if (currentMode === 'speaking' && continuedMessage) {
      // Clear the message after a short delay to allow the component to use it
      const timer = setTimeout(() => {
        setContinuedMessage(undefined);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentMode, continuedMessage]);

  const handlePlacementComplete = (level: string, recommendedModule: number) => {
    setCurrentMode('lessons');
    safeLocalStorage.setItem('recommendedStartLevel', level);
    safeLocalStorage.setItem('recommendedStartModule', recommendedModule.toString());
  };

  const handleNavigateToPlacementTest = () => {
    setCurrentMode('placement-test');
  };

  const handleTestComplete = (result: TestResult) => {
    // Apple Store Compliance: Silent operation - no console logs

    // Store the test result safely
    safeLocalStorage.setItem('lastTestResult', JSON.stringify({
      level: result.recommended_level,
      scores: {
        overall: result.overall_score,
        pronunciation: result.pronunciation_score,
        grammar: result.grammar_score,
        vocabulary: result.vocabulary_score,
        fluency: result.fluency_score,
        comprehension: result.comprehension_score
      },
      date: new Date().toISOString()
    }));

    // Set up for lessons navigation
    safeLocalStorage.setItem('recommendedStartLevel', result.recommended_level);
    safeLocalStorage.setItem('userPlacement', JSON.stringify({
      level: result.recommended_level,
      scores: result,
      at: Date.now()
    }));

    // 🔧 FIX: Save placement completion flag for ProgressStore
    safeLocalStorage.setItem('placementTestCompleted', 'true');
    safeLocalStorage.setItem('placementTestDate', new Date().toISOString());

    // 🔧 FIX: Initialize progress store entry so LessonsApp knows user has started
    const progressKey = 'll_progress_v1';
    const existingProgress = safeLocalStorage.getItem(progressKey);
    if (!existingProgress) {
      // Create initial empty progress entry to signal placement is complete
      const initialProgress = {
        [`${result.recommended_level}-1`]: {
          level: result.recommended_level,
          module: 1,
          phase: 'intro' as const,
          listeningIndex: 0,
          speakingIndex: 0,
          completed: false,
          totalListening: 0,
          totalSpeaking: 0,
          updatedAt: Date.now(),
          v: 1
        }
      };
      safeLocalStorage.setItem(progressKey, JSON.stringify(initialProgress));
    }

    // Enable access to the recommended level
    const unlocksStr = safeLocalStorage.getItem('unlocks') || '{}';
    try {
      const unlocks = JSON.parse(unlocksStr);
      unlocks[result.recommended_level] = true;
      safeLocalStorage.setItem('unlocks', JSON.stringify(unlocks));
    } catch {
      // If parsing fails, create new object
      safeLocalStorage.setItem('unlocks', JSON.stringify({ [result.recommended_level]: true }));
    }
  };

  const handleGoToLessons = () => {
    // Phase 2.1: Check for pending navigation from placement test
    const pendingNav = safeLocalStorage.getItem('pendingNavigation');
    if (pendingNav) {
      try {
        const nav = JSON.parse(pendingNav);
        // Clear pending navigation
        safeLocalStorage.removeItem('pendingNavigation');

        // Apply navigation parameters if recent (within 5 minutes)
        if (Date.now() - nav.timestamp < 5 * 60 * 1000) {
          safeLocalStorage.setItem('currentLevel', nav.level);
          safeLocalStorage.setItem('currentModule', String(nav.moduleId));
        }
      } catch (error) {
        // Invalid JSON, ignore
      }
    }

    // Navigate to lessons mode with the user's recommended level
    setCurrentMode('lessons');
  };

  // Get initial lesson parameters from test result
  const getInitialLessonParams = () => {
    const testResult = safeLocalStorage.getItem('lastTestResult');
    if (testResult) {
      try {
        const parsed = JSON.parse(testResult);
        const level = parsed.level;

        // Determine starting module based on level
        let startingModule = 1;
        switch (level) {
          case 'A1':
            startingModule = 1;
            break;
          case 'A2':
            startingModule = 51;
            break;
          case 'B1':
            startingModule = 101;
            break;
          case 'B2':
            startingModule = 151;
            break;
          case 'C1':
            startingModule = 1; // C1 not implemented yet, fallback to A1
            break;
          case 'C2':
            startingModule = 1; // C2 not implemented yet, fallback to A1
            break;
          default:
            startingModule = 1;
        }

        return { level: level === 'C1' || level === 'C2' ? 'A1' : level, module: startingModule };
      } catch {
        // Parsing failed, fall through to next check
      }
    }

    // Fallback to localStorage recommendedStartLevel if available
    const recommendedLevel = safeLocalStorage.getItem('recommendedStartLevel');
    const recommendedModule = safeLocalStorage.getItem('recommendedStartModule');

    if (recommendedLevel) {
      let module = recommendedModule ? parseInt(recommendedModule) : 1;
      let level = recommendedLevel;

      // Ensure module is in correct range for level using centralized constants
      const levelKey = level as keyof typeof MODULE_RANGES;
      if (MODULE_RANGES[levelKey]) {
        const range = MODULE_RANGES[levelKey];
        module = Math.max(range.start, Math.min(range.end, module));
      } else {
        // Default to A1 if level is invalid
        level = 'A1';
        module = MODULE_RANGES.A1.start;
      }

      return { level, module };
    }

    return null;
  };

  // 🔧 CRITICAL FIX: Memoize mode change handler to prevent prop changes triggering re-renders
  const handleModeChange = useCallback((mode: AppMode) => {
    setCurrentMode(mode);
  }, []);

  return (
    <div className="relative">
      {/* Background Stars Animation */}
      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
      />
      
      {/* Level Up Popup */}
      <LevelUpPopup 
        show={showLevelUpPopup} 
        newLevel={pendingLevelUp || 1} 
        onClose={closeLevelUpPopup} 
      />

      {/* Streak Welcome Popup */}
      <StreakWelcomePopup
        currentStreak={streakData.currentStreak}
        bestStreak={streakData.bestStreak}
        isVisible={showStreakWelcome}
        onClose={() => setShowStreakWelcome(false)}
      />

      {/* Streak Reward Popup */}
      <StreakRewardPopup
        reward={streakReward}
        onClose={() => {}} // Auto-closes after timer
      />

      {/* Badge Achievement Popup */}
      {/* Phase 2.2: Add ErrorBoundary for consistency with BadgesView */}
      <ErrorBoundary>
        <BadgeAchievement
          badge={newlyUnlockedBadge}
          onClose={closeBadgeNotification}
        />
      </ErrorBoundary>

      {/* v48: Unified Header Bar - Clean layout with proper Dynamic Island spacing */}
      {/* v59: Remove glass effect on Android to fix mirror artifact */}
      <header className={`fixed top-0 left-0 right-0 z-20 header-bar ${
        isAndroid ? '' : 'bg-gradient-to-b from-black/30 via-black/10 to-transparent backdrop-blur-md'
      }`}>
        <div className="flex items-center justify-between">
          {/* Left: Sign In / User Avatar - v59: Only visible on Speaking page */}
          {currentMode === 'speaking' ? (
            user && isAuthenticated ? (
              <UserDropdown
                user={user}
                profile={profile}
              />
            ) : (
              <a
                href="/auth"
                className="bg-white/95 text-gray-900 font-semibold
                         rounded-full px-5 py-2.5 min-h-[44px]
                         shadow-lg hover:shadow-xl
                         transition-all duration-200
                         hover:bg-white
                         flex items-center no-underline"
              >
                <span>Sign In</span>
              </a>
            )
          ) : (
            /* Spacer when Sign In not visible - keeps menu on right */
            <div />
          )}

          {/* Right: Sound Toggle + Menu */}
          <div className="flex items-center gap-2">
            {/* Global Sound Toggle - Only visible on speaking pages */}
            {(currentMode === 'speaking' || currentMode === 'placement-test') && (
              <button
                onClick={toggleSound}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg hover:shadow-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
                title={soundEnabled ? "Sound is ON - Click to mute" : "Sound is OFF - Click to enable"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
            )}

            <NavigationDropdown
              currentMode={currentMode}
              onModeChange={handleModeChange}
            />
          </div>
        </div>
      </header>

      {/* Meetings Widget - Show on speaking page */}
      {currentMode === 'speaking' && (
        <div className="fixed bottom-4 right-4 z-10 max-w-sm">
          <ErrorBoundary>
            <MeetingsWidget
              className="border-white/20 bg-white/10 backdrop-blur-xl text-white"
            />
          </ErrorBoundary>
        </div>
      )}

      {/* User Avatar with Streak Badge - Hidden on speaking page for cleaner mobile experience */}

      {/* Content based on current mode */}
      {currentMode === 'lessons' && (
        <LessonsApp
          onBack={() => setCurrentMode('speaking')}
          onNavigateToPlacementTest={handleNavigateToPlacementTest}
          {...getInitialLessonParams()}
        />
      )}
      
      {currentMode === 'bookmarks' && (
        <ErrorBoundary>
          <BookmarksView
            onBack={() => setCurrentMode('speaking')}
            onContinueFromMessage={(content) => {
              setContinuedMessage(content);
              setCurrentMode('speaking');
            }}
          />
        </ErrorBoundary>
      )}
      
      {currentMode === 'badges' && (
        <ErrorBoundary>
          <BadgesView onBack={() => setCurrentMode('speaking')} />
        </ErrorBoundary>
      )}
      
      {currentMode === 'placement-test' && (
        <EnglishProficiencyTest
          onComplete={handleTestComplete}
          onBack={() => setCurrentMode('speaking')}
          onGoToLessons={handleGoToLessons}
          testType="placement"
        />
      )}
      
      {currentMode === 'games' && (
        <GamesApp onBack={() => setCurrentMode('speaking')} />
      )}
      
      {currentMode === 'meetings' && (
        <ErrorBoundary>
          <MeetingsApp onBack={() => setCurrentMode('speaking')} />
        </ErrorBoundary>
      )}

      {currentMode === 'speaking' && (
        <ErrorBoundary>
          <SpeakingApp
            initialMessage={continuedMessage}
            key={continuedMessage || 'default'} // Use message content as stable key
          />
        </ErrorBoundary>
      )}

    </div>
  );
}