// Data Service Layer - Uses Supabase for data persistence
import { supabase } from '@/integrations/supabase/client';

export interface UserProfileData {
  userId?: string;
  name: string;
  level: number;
  xp: number;
  currentStreak: number;
  bestStreak: number;
  lastVisitDate: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  soundEnabled: boolean;
}

export interface SessionRecord {
  input: string;
  corrected: string;
  time: string;
  userId?: string;
}

export interface ConversationMessage {
  text: string;
  isUser: boolean;
  isSystem: boolean;
  timestamp?: number;
  userId?: string;
}

class DataService {
  // User Profile Management
  async getUserProfile(userId?: string): Promise<UserProfileData | null> {
    if (!userId) {
      // Fallback to localStorage for non-authenticated users
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch {
          // Corrupted profile data
          return null;
        }
      }
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        return null;
      }

      if (data) {
        return {
          userId: data.user_id,
          name: data.name,
          level: data.level || 1,
          xp: data.xp_current || 0,
          currentStreak: data.current_streak || 0,
          bestStreak: data.best_streak || 0,
          lastVisitDate: data.last_visit_date || '',
          userLevel: data.user_level as 'beginner' | 'intermediate' | 'advanced' || 'beginner',
          soundEnabled: data.sound_enabled !== false
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async saveUserProfile(profile: UserProfileData): Promise<void> {
    if (!profile.userId) {
      // Fallback to localStorage for non-authenticated users
      localStorage.setItem('userProfile', JSON.stringify(profile));
      return;
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: profile.userId,
          name: profile.name,
          level: profile.level,
          xp_current: profile.xp,
          current_streak: profile.currentStreak,
          best_streak: profile.bestStreak,
          last_visit_date: profile.lastVisitDate,
          user_level: profile.userLevel,
          sound_enabled: profile.soundEnabled
        });

      if (error) {
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail - Non-critical operation
    }
  }

  // Streak Management
  async getStreakData(userId?: string): Promise<{ currentStreak: number; lastVisitDate: string; bestStreak: number }> {
    // Note: Using localStorage for offline-first access and instant loading
    const saved = localStorage.getItem('streakData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Corrupted streak data - return defaults
      }
    }

    return {
      currentStreak: 0,
      lastVisitDate: '',
      bestStreak: 0
    };
  }

  async saveStreakData(streakData: any, userId?: string): Promise<void> {
    // Note: Using localStorage for offline-first access
    localStorage.setItem('streakData', JSON.stringify(streakData));
  }

  // Chat History Management
  async getChatHistory(userId?: string): Promise<SessionRecord[]> {
    // Note: Using localStorage for privacy - chat history stays on device
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Corrupted chat history
      }
    }
    return [];
  }

  async saveChatSession(session: SessionRecord, userId?: string): Promise<void> {
    // Note: Using localStorage for privacy - chat history stays on device
    const history = await this.getChatHistory();
    const updatedHistory = [...history, session];
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  }

  // Conversation Messages Management
  async getConversationMessages(userId?: string): Promise<ConversationMessage[]> {
    // Note: Using localStorage for privacy - conversations stay on device
    const saved = localStorage.getItem('conversationMessages');
    const defaultMessages: ConversationMessage[] = [
      { text: "Hello! Ready to practice today? 🎤", isUser: false, isSystem: false },
      { text: "Yes, I had pizza today!", isUser: true, isSystem: false },
      { text: 'Great! You can also say: "I had a delicious pizza with friends." 🍕', isUser: false, isSystem: false },
      { text: "Next question: What do you usually eat for breakfast?", isUser: false, isSystem: false }
    ];

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Corrupted conversation messages
      }
    }
    return defaultMessages;
  }

  async saveConversationMessage(message: ConversationMessage, userId?: string): Promise<void> {
    // Note: Using localStorage for privacy - conversations stay on device
    const messages = await this.getConversationMessages();
    const updatedMessages = [...messages, message];
    localStorage.setItem('conversationMessages', JSON.stringify(updatedMessages));
  }

  // XP and Level Management
  async updateXPAndLevel(xp: number, level: number, userId?: string): Promise<void> {
    // Note: Using localStorage for offline-first access
    const profile = await this.getUserProfile() || {} as UserProfileData;
    profile.xp = xp;
    profile.level = level;
    await this.saveUserProfile(profile);
  }

  // Clear all data (for logout or reset)
  async clearUserData(): Promise<void> {
    // Clear localStorage data
    localStorage.removeItem('userProfile');
    localStorage.removeItem('streakData');
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('conversationMessages');
    
    // Clear session storage
    sessionStorage.clear();
  }
}

export const dataService = new DataService();