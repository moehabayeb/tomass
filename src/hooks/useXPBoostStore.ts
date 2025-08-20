import { create } from 'zustand';

export interface XPBoost {
  id: string;
  points: number;
  message?: string;
  timestamp: number;
}

interface XPBoostStore {
  boosts: XPBoost[];
  addBoost: (points: number, message?: string) => void;
  removeBoost: (id: string) => void;
  clearOldBoosts: () => void;
}

export const useXPBoostStore = create<XPBoostStore>((set, get) => ({
  boosts: [],
  
  addBoost: (points: number, message?: string) => {
    const now = Date.now();
    const newBoost: XPBoost = {
      id: `${now}-${Math.random()}`,
      points,
      message,
      timestamp: now,
    };

    set((state) => {
      // Check for recent boosts (within 2 seconds) to potentially coalesce
      const recentBoosts = state.boosts.filter(boost => now - boost.timestamp < 2000);
      
      // If we have recent boosts, coalesce them
      if (recentBoosts.length > 0) {
        const totalPoints = recentBoosts.reduce((sum, boost) => sum + boost.points, 0) + points;
        const coalesced: XPBoost = {
          id: `coalesced-${now}`,
          points: totalPoints,
          message: totalPoints > points ? undefined : message, // Only show message for single awards
          timestamp: now,
        };
        
        // Remove old boosts and add coalesced one
        const otherBoosts = state.boosts.filter(boost => now - boost.timestamp >= 2000);
        return { boosts: [...otherBoosts, coalesced] };
      } else {
        // No recent boosts, add normally but limit to 3 max
        const limitedBoosts = state.boosts.slice(-2); // Keep only last 2, so with new one we have max 3
        return { boosts: [...limitedBoosts, newBoost] };
      }
    });

    // Auto-remove after animation duration
    setTimeout(() => {
      get().removeBoost(newBoost.id);
    }, 1700);
  },

  removeBoost: (id: string) => {
    set((state) => ({
      boosts: state.boosts.filter(boost => boost.id !== id)
    }));
  },

  clearOldBoosts: () => {
    const now = Date.now();
    set((state) => ({
      boosts: state.boosts.filter(boost => now - boost.timestamp < 2000)
    }));
  },
}));