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
    if (points <= 0) return; // Don't show animation for 0 XP

    const now = Date.now();
    
    set((state) => {
      // Check for currently visible boosts (within last 1.5 seconds)
      const visibleBoosts = state.boosts.filter(boost => now - boost.timestamp < 1500);
      
      // If we have visible boosts, coalesce into the most recent one
      if (visibleBoosts.length > 0) {
        const latestBoost = visibleBoosts[visibleBoosts.length - 1];
        const coalescedPoints = latestBoost.points + points;
        
        // Update the latest boost with coalesced points and reset timestamp
        const updatedBoost: XPBoost = {
          ...latestBoost,
          points: coalescedPoints,
          message: coalescedPoints > 10 ? '🔥 Streak!' : message,
          timestamp: now, // Reset timestamp to extend hold time
        };
        
        // Remove old boosts and keep the updated one
        const otherBoosts = state.boosts.filter(boost => boost.id !== latestBoost.id);
        return { boosts: [...otherBoosts, updatedBoost] };
      } else {
        // No visible boosts, create new one
        const newBoost: XPBoost = {
          id: `${now}-${Math.random()}`,
          points,
          message,
          timestamp: now,
        };
        
        // Limit to max 3 boosts total
        const limitedBoosts = state.boosts.slice(-2);
        return { boosts: [...limitedBoosts, newBoost] };
      }
    });

    // Auto-remove after total animation duration (1.6s)
    setTimeout(() => {
      const currentBoosts = get().boosts;
      const boostToRemove = currentBoosts.find(b => b.timestamp === now);
      if (boostToRemove) {
        get().removeBoost(boostToRemove.id);
      }
    }, 1600);
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