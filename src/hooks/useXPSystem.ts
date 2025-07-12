import { useState, useCallback } from 'react';

interface XPBoost {
  id: string;
  points: number;
  message: string;
  timestamp: number;
}

export const useXPSystem = (initialXP = 230, initialLevel = 5) => {
  const [xp, setXp] = useState(initialXP);
  const [level, setLevel] = useState(initialLevel);
  const [xpBoosts, setXpBoosts] = useState<XPBoost[]>([]);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);

  const showLevelUp = useCallback(() => {
    setShowLevelUpPopup(true);
    setTimeout(() => {
      const popup = document.querySelector('[data-level-popup]') as HTMLElement;
      if (popup) {
        popup.style.opacity = "0";
        popup.style.transform = "translate(-50%, -50%) scale(0.9)";
        setTimeout(() => {
          setShowLevelUpPopup(false);
        }, 500);
      }
    }, 1500);
  }, []);

  const addXP = useCallback((points: number, responseTime?: number, isCorrect = true) => {
    // Calculate bonus based on response speed and accuracy
    let bonusMultiplier = 1;
    let bonusMessage = '';

    if (responseTime && responseTime < 3000 && isCorrect) {
      bonusMultiplier = 1.5;
      bonusMessage = 'Quick & Correct!';
    } else if (responseTime && responseTime < 5000 && isCorrect) {
      bonusMultiplier = 1.2;
      bonusMessage = 'Well done!';
    } else if (isCorrect) {
      bonusMessage = 'Good job!';
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

    setXp(prevXp => {
      const newXp = prevXp + finalPoints;
      
      if (newXp >= 500) {
        setLevel(prevLevel => {
          const newLevel = prevLevel + 1;
          showLevelUp();
          return newLevel;
        });
        return newXp - 500; // Carry over excess XP
      }
      
      return newXp;
    });

    return finalPoints;
  }, [showLevelUp]);

  return {
    xp,
    level,
    xpBoosts,
    showLevelUpPopup,
    addXP
  };
};