import { useState, useEffect } from 'react';
import { UserDropdown } from './UserDropdown';
import { NavigationDropdown } from './NavigationDropdown';
import { useAuthReady } from '@/hooks/useAuthReady';
import SpeakingApp from './SpeakingApp';
import GrammarModules from './GrammarModules';
import LessonsApp from './LessonsApp';
import { SpeakingPlacementTest } from './SpeakingPlacementTest';
import { GamesApp } from './GamesApp';
import MeetingsApp from './MeetingsApp';
import DailyTips from './DailyTips';
import DailyTipsBadge from './DailyTipsBadge';
import BookmarksView from './BookmarksView';
import BadgesView from './BadgesView';
import { AvatarDisplay } from './AvatarDisplay';
import { LevelUpPopup } from './LevelUpPopup';
import { XPBoostAnimation } from './XPBoostAnimation';
import { StreakCounter } from './StreakCounter';
import { StreakRewardPopup } from './StreakRewardPopup';
import { BadgeAchievement } from './BadgeAchievement';
import { useGamification } from '@/hooks/useGamification';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { Toaster } from '@/components/ui/toaster';
import { supabase } from '@/integrations/supabase/client';

type AppMode = 'speaking' | 'lessons' | 'bookmarks' | 'badges' | 'placement-test' | 'games' | 'meetings';

export default function AppNavigation() {
  const [currentMode, setCurrentMode] = useState<AppMode>('speaking');
  const [continuedMessage, setContinuedMessage] = useState<string | undefined>();
  const [showDailyTips, setShowDailyTips] = useState(false);
  const [hasCompletedPlacement, setHasCompletedPlacement] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const { user, isAuthenticated } = useAuthReady();
  const { userProfile, xpBoosts, showLevelUpPopup, pendingLevelUp, closeLevelUpPopup, getXPProgress, addXP } = useGamification();
  const { streakData, getStreakMessage, getNextMilestone, streakReward } = useStreakTracker(addXP);
  const { newlyUnlockedBadge, closeBadgeNotification, getFeatureProgress } = useBadgeSystem();

  const xpProgress = getXPProgress();

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
          console.error('Error fetching profile:', error);
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
      
      {/* XP Boost Animations */}
      <XPBoostAnimation boosts={xpBoosts} />
      
      {/* Level Up Popup */}
      <LevelUpPopup 
        show={showLevelUpPopup} 
        newLevel={pendingLevelUp || 1} 
        onClose={closeLevelUpPopup} 
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

      {/* Daily Tips Modal */}
      {showDailyTips && (
        <DailyTips onClose={() => setShowDailyTips(false)} />
      )}

      {/* User Dropdown - Always visible when authenticated */}
      {user && isAuthenticated && (
        <div className="fixed top-4 left-4 z-20">
          <UserDropdown 
            user={user} 
            profile={profile} 
          />
        </div>
      )}

      {/* Navigation Dropdown - Always visible */}
      <NavigationDropdown 
        currentMode={currentMode} 
        onModeChange={setCurrentMode} 
      />

      {/* XP Avatar Display - Only show in speaking mode, positioned below user dropdown */}
      {currentMode === 'speaking' && userProfile && (
        <div className="fixed top-16 left-4 z-20">
          <AvatarDisplay
            level={userProfile.level}
            xp={Math.max(0, xpProgress.current)}
            maxXP={xpProgress.max}
            userName={userProfile.name}
            showXPBar={true}
            size="md"
          />
        </div>
      )}

      {/* Enhanced Centered Streak Counter - Clean, rewarding design */}
      {currentMode === 'speaking' && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-xl border border-white/30 animate-fade-in">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xl">🔥</span>
              </div>
              <div className="text-white">
                <div className="font-bold text-xl">{streakData.currentStreak} Days</div>
                <div className="text-sm opacity-90">Current Streak ✨</div>
              </div>
              {streakData.bestStreak > streakData.currentStreak && (
                <div className="text-white/70 text-sm border-l border-white/30 pl-4">
                  🏆 Best: {streakData.bestStreak}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Daily Tips Badge - Only show in speaking mode */}
      {currentMode === 'speaking' && (
        <div className="fixed top-20 right-4 z-20">
          <DailyTipsBadge onClick={() => setShowDailyTips(true)} />
        </div>
      )}

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