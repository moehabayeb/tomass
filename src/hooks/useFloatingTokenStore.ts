import { create } from 'zustand';

export interface FloatingToken {
  id: string;
  points: number;
  message?: string;
  timestamp: number;
  status: 'spawning' | 'traveling' | 'landing';
}

interface FloatingTokenStore {
  tokens: FloatingToken[];
  addToken: (points: number, message?: string) => void;
  updateTokenStatus: (id: string, status: FloatingToken['status']) => void;
  removeToken: (id: string) => void;
  clearOldTokens: () => void;
}

export const useFloatingTokenStore = create<FloatingTokenStore>((set, get) => ({
  tokens: [],
  
  addToken: (points: number, message?: string) => {
    if (points <= 0) return; // Don't show animation for 0 XP

    const now = Date.now();
    
    set((state) => {
      // Check for tokens within batching window (1.5s)
      const recentTokens = state.tokens.filter(token => 
        now - token.timestamp < 1500 && 
        (token.status === 'spawning' || token.status === 'traveling')
      );
      
      // Limit to max 2 concurrent tokens
      if (recentTokens.length >= 2) {
        // Find the most recent token and merge into it
        const latestToken = recentTokens[recentTokens.length - 1];
        const coalescedPoints = latestToken.points + points;
        
        // Update the latest token with coalesced points
        const updatedTokens = state.tokens.map(token => 
          token.id === latestToken.id 
            ? { 
                ...token, 
                points: coalescedPoints,
                message: coalescedPoints > 10 ? '🔥 Streak!' : message,
                timestamp: now // Reset timestamp
              }
            : token
        );
        
        return { tokens: updatedTokens };
      } else {
        // Create new token
        const newToken: FloatingToken = {
          id: `${now}-${Math.random()}`,
          points,
          message,
          timestamp: now,
          status: 'spawning',
        };
        
        // Keep only recent tokens to prevent memory buildup
        const activeTokens = state.tokens.filter(token => now - token.timestamp < 3000);
        return { tokens: [...activeTokens, newToken] };
      }
    });

    // Auto-remove after animation completes (1.4s total)
    setTimeout(() => {
      const currentTokens = get().tokens;
      const tokenToRemove = currentTokens.find(t => t.timestamp === now);
      if (tokenToRemove) {
        get().removeToken(tokenToRemove.id);
      }
    }, 1400);
  },

  updateTokenStatus: (id: string, status: FloatingToken['status']) => {
    set((state) => ({
      tokens: state.tokens.map(token => 
        token.id === id ? { ...token, status } : token
      )
    }));
  },

  removeToken: (id: string) => {
    set((state) => ({
      tokens: state.tokens.filter(token => token.id !== id)
    }));
  },

  clearOldTokens: () => {
    const now = Date.now();
    set((state) => ({
      tokens: state.tokens.filter(token => now - token.timestamp < 3000)
    }));
  },
}));
