import { useState, useCallback, useEffect } from 'react';
import { useUserData } from './useUserData';
import { dataService } from '@/services/dataService';

interface XPBoost {
  id: string;
  points: number;
  message: string;
  timestamp: number;
}

export const useGamification = () => {
  const { userProfile, updateProfile } = useUserData();
  const [xpBoosts, setXpBoosts] = useState<XPBoost[]>([]);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [pendingLevelUp, setPendingLevelUp] = useState<number | null>(null);

  // XP thresholds - easily configurable
  const XP_PER_LEVEL = 500;
  const getCurrentLevelXP = (level: number) => level * XP_PER_LEVEL;
  const getXPForNextLevel = (currentXP: number, level: number) => {
    const currentLevelBase = getCurrentLevelXP(level - 1);
    const nextLevelBase = getCurrentLevelXP(level);
    return {
      current: currentXP - currentLevelBase,
      max: nextLevelBase - currentLevelBase,
      remaining: nextLevelBase - currentXP
    };
  };

  const showLevelUp = useCallback((newLevel: number) => {
    setPendingLevelUp(newLevel);
    setShowLevelUpPopup(true);
  }, []);

  const closeLevelUpPopup = useCallback(() => {
    setShowLevelUpPopup(false);
    setPendingLevelUp(null);
  }, []);

  const addXP = useCallback(async (points: number, activity: string, bonus?: { responseTime?: number; isCorrect?: boolean }) => {
    if (!userProfile) return 0;

    // Calculate bonus based on activity and performance
    let bonusMultiplier = 1;
    let bonusMessage = '';

    if (bonus?.responseTime && bonus?.responseTime < 3000 && bonus?.isCorrect) {
      bonusMultiplier = 1.5;
      bonusMessage = 'Lightning fast! ⚡';
    } else if (bonus?.responseTime && bonus?.responseTime < 5000 && bonus?.isCorrect) {
      bonusMultiplier = 1.2;
      bonusMessage = 'Well done! 👏';
    } else if (bonus?.isCorrect !== false) {
      bonusMessage = getActivityMessage(activity);
    }

    const finalPoints = Math.floor(points * bonusMultiplier);
    
    // Add visual XP boost
    const boost: XPBoost = {
      id: Math.random().toString(36).substr(2, 9),
      points: finalPoints,
      message: bonusMessage,
      timestamp: Date.now()
    };
    
    setXpBoosts(prev => [...prev, boost]);
    
    // Remove boost after animation
    setTimeout(() => {
      setXpBoosts(prev => prev.filter(b => b.id !== boost.id));
    }, 2000);

    // Calculate new XP and level
    const newXP = userProfile.xp + finalPoints;
    const currentLevelThreshold = getCurrentLevelXP(userProfile.level);
    
    if (newXP >= currentLevelThreshold) {
      const newLevel = userProfile.level + 1;
      const carryOverXP = newXP; // Keep all XP, just level up
      
      await updateProfile({ 
        xp: carryOverXP, 
        level: newLevel 
      });
      
      showLevelUp(newLevel);
    } else {
      await updateProfile({ xp: newXP });
    }

    return finalPoints;
  }, [userProfile, updateProfile, showLevelUp]);

  // XP earning methods for different activities
  const earnXPForGrammarLesson = useCallback((completed: boolean, responseTime?: number) => {
    return addXP(
      completed ? 50 : 25, 
      'grammar', 
      { responseTime, isCorrect: completed }
    );
  }, [addXP]);

  const earnXPForConversation = useCallback((messageCount: number) => {
    return addXP(messageCount * 10, 'conversation');
  }, [addXP]);

  const earnXPForDailyTip = useCallback(() => {
    return addXP(15, 'daily-tip');
  }, [addXP]);

  const earnXPForStreak = useCallback((streakDays: number) => {
    const bonusPoints = Math.min(streakDays * 5, 50); // Cap at 50 bonus points
    return addXP(bonusPoints, 'streak');
  }, [addXP]);

  // Get current XP progress
  const getXPProgress = useCallback(() => {
    if (!userProfile) return { current: 0, max: 100, remaining: 100, percentage: 0 };
    
    const progress = getXPForNextLevel(userProfile.xp, userProfile.level);
    return {
      ...progress,
      percentage: (progress.current / progress.max) * 100
    };
  }, [userProfile]);

  const getActivityMessage = (activity: string): string => {
    const messages = {
      'grammar': 'Grammar master! 📚',
      'conversation': 'Great conversation! 💬',
      'daily-tip': 'Knowledge gained! 💡',
      'streak': 'Streak bonus! 🔥',
      'mission': 'Mission complete! 🎯'
    };
    return messages[activity] || 'Nice work! ⭐';
  };

  return {
    // State
    userProfile,
    xpBoosts,
    showLevelUpPopup,
    pendingLevelUp,
    
    // Actions
    addXP,
    earnXPForGrammarLesson,
    earnXPForConversation,
    earnXPForDailyTip,
    earnXPForStreak,
    closeLevelUpPopup,
    
    // Computed values
    getXPProgress,
    level: userProfile?.level || 1,
    totalXP: userProfile?.xp || 0
  };
};