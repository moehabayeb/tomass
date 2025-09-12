import { useState, useEffect } from 'react';
import { UserDropdown } from './UserDropdown';
import { NavigationDropdown } from './NavigationDropdown';
import { useAuthReady } from '@/hooks/useAuthReady';
import { useGlobalSound } from '@/hooks/useGlobalSound';
import { Volume2, VolumeX } from 'lucide-react';
import SpeakingApp from './SpeakingApp';
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
import { Toaster } from '@/components/ui/toaster';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type AppMode = 'speaking' | 'lessons' | 'bookmarks' | 'badges' | 'placement-test' | 'games' | 'meetings';

export default function AppNavigation() {
  const [currentMode, setCurrentMode] = useState<AppMode>('speaking');
  const [continuedMessage, setContinuedMessage] = useState<string | undefined>();
  const [showStreakWelcome, setShowStreakWelcome] = useState(false);
  const [, setHasCompletedPlacement] = useState(false);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const { user, isAuthenticated } = useAuthReady();
  const { soundEnabled, toggleSound } = useGlobalSound();
  const { showLevelUpPopup, pendingLevelUp, closeLevelUpPopup, getXPProgress, addXP } = useGamification();
  const { streakData, streakReward } = useStreakTracker(addXP);
  const { newlyUnlockedBadge, closeBadgeNotification } = useBadgeSystem();

  // Show streak welcome popup on first load
  useEffect(() => {
    const hasShownToday = sessionStorage.getItem('streakWelcomeShown');
    if (!hasShownToday && streakData.currentStreak > 0) {
      const timer = setTimeout(() => {
        setShowStreakWelcome(true);
        sessionStorage.setItem('streakWelcomeShown', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [streakData.currentStreak]);

  // const xpProgress = getXPProgress(); // Commented out - not currently used but may be needed for future features

  // Fetch user profile when authenticated
  useEffect(() => {
    if (user && isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (!error && data) {
            setProfile(data);
          }
        } catch (error) {
          // Error handling: Profile fetch failed - user will continue with limited functionality
          console.warn('Failed to fetch user profile:', error);
        }
      };

      fetchProfile();
    }
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
    setHasCompletedPlacement(true);
    setCurrentMode('lessons');
    // You could store the recommended starting point in localStorage or user profile
    localStorage.setItem('recommendedStartLevel', level);
    localStorage.setItem('recommendedStartModule', recommendedModule.toString());
  };

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
      <BadgeAchievement
        badge={newlyUnlockedBadge}
        onClose={closeBadgeNotification}
      />

      {/* User Authentication Section */}
      <div className="fixed top-4 left-4 z-20">
        {user && isAuthenticated ? (
          <UserDropdown 
            user={user} 
            profile={profile} 
          />
        ) : (
          <a
            href="/auth"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70
                     text-primary-foreground font-semibold
                     rounded-full px-6 py-3 min-h-[44px]
                     shadow-lg hover:shadow-xl hover:shadow-primary/25
                     transition-all duration-300 ease-out
                     hover:scale-105 hover:-translate-y-0.5
                     border border-primary/20 hover:border-primary/40
                     flex items-center gap-2 no-underline"
          >
            <span>Sign In</span>
          </a>
        )}
      </div>

      {/* Navigation Dropdown and Sound Toggle - Always visible */}
      <div className="fixed top-4 right-4 z-20 flex items-center gap-3">
        {/* Global Sound Toggle */}
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
        
        <NavigationDropdown 
          currentMode={currentMode} 
          onModeChange={setCurrentMode} 
        />
      </div>

      {/* User Avatar with Streak Badge - Hidden on speaking page for cleaner mobile experience */}

      {/* Content based on current mode */}
      {currentMode === 'lessons' && (
        <LessonsApp onBack={() => setCurrentMode('speaking')} />
      )}
      
      {currentMode === 'bookmarks' && (
        <BookmarksView 
          onBack={() => setCurrentMode('speaking')} 
          onContinueFromMessage={(content) => {
            setContinuedMessage(content);
            setCurrentMode('speaking');
          }}
        />
      )}
      
      {currentMode === 'badges' && (
        <BadgesView onBack={() => setCurrentMode('speaking')} />
      )}
      
      {currentMode === 'placement-test' && (
        <SpeakingPlacementTest 
          onBack={() => setCurrentMode('speaking')} 
          onComplete={handlePlacementComplete}
        />
      )}
      
      {currentMode === 'games' && (
        <GamesApp onBack={() => setCurrentMode('speaking')} />
      )}
      
      {currentMode === 'meetings' && (
        <MeetingsApp onBack={() => setCurrentMode('speaking')} />
      )}
      
      {currentMode === 'speaking' && (
        <SpeakingApp 
          initialMessage={continuedMessage}
          key={continuedMessage ? `continued-${Date.now()}` : 'default'} // Force re-mount when continuing
        />
      )}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}