import { useState, useEffect, useCallback } from 'react';

interface StreakData {
  currentStreak: number;
  lastVisitDate: string;
  bestStreak: number;
}

export const useStreakTracker = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    lastVisitDate: '',
    bestStreak: 0
  });

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('streakData');
    
    if (saved) {
      const data: StreakData = JSON.parse(saved);
      const lastVisit = new Date(data.lastVisitDate);
      const todayDate = new Date(today);
      const timeDiff = todayDate.getTime() - lastVisit.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      if (daysDiff === 1) {
        // Consecutive day - increment streak
        const newStreak = data.currentStreak + 1;
        const newData = {
          currentStreak: newStreak,
          lastVisitDate: today,
          bestStreak: Math.max(newStreak, data.bestStreak)
        };
        setStreakData(newData);
        localStorage.setItem('streakData', JSON.stringify(newData));
      } else if (daysDiff === 0) {
        // Same day - keep current streak
        setStreakData(data);
      } else {
        // Streak broken - reset to 1
        const newData = {
          currentStreak: 1,
          lastVisitDate: today,
          bestStreak: data.bestStreak
        };
        setStreakData(newData);
        localStorage.setItem('streakData', JSON.stringify(newData));
      }
    } else {
      // First time user
      const newData = {
        currentStreak: 1,
        lastVisitDate: today,
        bestStreak: 1
      };
      setStreakData(newData);
      localStorage.setItem('streakData', JSON.stringify(newData));
    }
  }, []);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const getStreakMessage = () => {
    const { currentStreak } = streakData;
    if (currentStreak === 1) return "🔥 Day 1 - Great start!";
    if (currentStreak < 7) return `🔥 Day ${currentStreak} of 7 - Keep going!`;
    if (currentStreak === 7) return "🎉 Week completed! Amazing!";
    return `🔥 ${currentStreak} days strong! Unstoppable!`;
  };

  return {
    streakData,
    updateStreak,
    getStreakMessage
  };
};
