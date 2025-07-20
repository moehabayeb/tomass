import { useState, useEffect } from 'react';
import { Mic, BookOpen, Bookmark, Award, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeakingApp from './SpeakingApp';
import GrammarModules from './GrammarModules';
import LessonsApp from './LessonsApp';
import { SpeakingPlacementTest } from './SpeakingPlacementTest';
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

type AppMode = 'speaking' | 'lessons' | 'bookmarks' | 'badges' | 'placement-test';

export default function AppNavigation() {
  const [currentMode, setCurrentMode] = useState<AppMode>('speaking');
  const [continuedMessage, setContinuedMessage] = useState<string | undefined>();
  const [showDailyTips, setShowDailyTips] = useState(false);
  const [hasCompletedPlacement, setHasCompletedPlacement] = useState(false);
  const { userProfile, xpBoosts, showLevelUpPopup, pendingLevelUp, closeLevelUpPopup, getXPProgress, addXP } = useGamification();
  const { streakData, getStreakMessage, getNextMilestone, streakReward } = useStreakTracker(addXP);
  const { newlyUnlockedBadge, closeBadgeNotification, getFeatureProgress } = useBadgeSystem();

  const xpProgress = getXPProgress();

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

      {/* Navigation Tab - Always visible */}
      <div 
        className="fixed top-4 right-4 z-20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 min-w-fit"
        style={{ boxShadow: 'var(--shadow-medium)' }}
      >
        <div className="flex space-x-2 p-2 flex-wrap">
          <Button
            onClick={() => setCurrentMode('speaking')}
            variant="ghost"
            size="sm"
            className={`rounded-xl transition-all duration-200 ${
              currentMode === 'speaking' 
                ? 'bg-white/20 text-white shadow-sm' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Mic className="h-4 w-4 mr-2" />
            Speaking
          </Button>
          <Button
            onClick={() => setCurrentMode('lessons')}
            variant="ghost"
            size="sm"
            className={`rounded-xl transition-all duration-200 ${
              currentMode === 'lessons' 
                ? 'bg-white/20 text-white shadow-sm' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Lessons
          </Button>
          <Button
            onClick={() => setCurrentMode('bookmarks')}
            variant="ghost"
            size="sm"
            className={`rounded-xl transition-all duration-200 ${
              currentMode === 'bookmarks' 
                ? 'bg-white/20 text-white shadow-sm' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Saved
          </Button>
          <Button
            onClick={() => setCurrentMode('badges')}
            variant="ghost"
            size="sm"
            className={`rounded-xl transition-all duration-200 ${
              currentMode === 'badges' 
                ? 'bg-white/20 text-white shadow-sm' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Award className="h-4 w-4 mr-2" />
            Badges
          </Button>
          <Button
            onClick={() => setCurrentMode('placement-test')}
            variant="ghost"
            size="sm"
            className={`rounded-xl transition-all duration-200 text-white font-medium ${
              currentMode === 'placement-test' 
                ? 'bg-white/20 shadow-sm' 
                : 'text-white/90 hover:bg-white/15 hover:text-white'
            }`}
          >
            <Mic className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Speaking Test</span>
          </Button>
        </div>
      </div>

      {/* Avatar Display - Only show in speaking mode */}
      {currentMode === 'speaking' && userProfile && (
        <div className="fixed top-4 left-4 z-20">
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

      {/* Streak Counter - Only show in speaking mode */}
      {currentMode === 'speaking' && (
        <div className="fixed bottom-4 left-4 z-20 max-w-72">
          <StreakCounter
            currentStreak={streakData.currentStreak}
            message={getStreakMessage()}
            bestStreak={streakData.bestStreak}
            nextMilestone={getNextMilestone()}
          />
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