// Data Service Layer - Uses Supabase for data persistence
// Bug #5 Fix: Using safe safeLocalStorage wrapper
import { supabase } from '@/integrations/supabase/client';
import { safeLocalStorage } from '@/utils/safeLocalStorage';

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
      // Fallback to safeLocalStorage for non-authenticated users
      const savedProfile = safeLocalStorage.getItem('userProfile');
      if (savedProfile) {
        return JSON.parse(savedProfile);
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
      // Fallback to safeLocalStorage for non-authenticated users
      safeLocalStorage.setItem('userProfile', JSON.stringify(profile));
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
    }
  }

  // Streak Management
  async getStreakData(userId?: string): Promise<{ currentStreak: number; lastVisitDate: string; bestStreak: number }> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('streaks').select('*').eq('user_id', userId).single();
    
    const saved = safeLocalStorage.getItem('streakData');
    if (saved) {
      return JSON.parse(saved);
    }
    
    return {
      currentStreak: 0,
      lastVisitDate: '',
      bestStreak: 0
    };
  }

  async saveStreakData(streakData: any, userId?: string): Promise<void> {
    // TODO: Replace with Supabase upsert when auth is implemented
    // const { error } = await supabase.from('streaks').upsert({ ...streakData, user_id: userId });
    
    safeLocalStorage.setItem('streakData', JSON.stringify(streakData));
  }

  // Chat History Management
  async getChatHistory(userId?: string): Promise<SessionRecord[]> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('chat_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    
    const saved = safeLocalStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  }

  async saveChatSession(session: SessionRecord, userId?: string): Promise<void> {
    // TODO: Replace with Supabase insert when auth is implemented
    // const { error } = await supabase.from('chat_sessions').insert({ ...session, user_id: userId });
    
    const history = await this.getChatHistory();
    const updatedHistory = [...history, session];
    safeLocalStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  }

  // Conversation Messages Management
  async getConversationMessages(userId?: string): Promise<ConversationMessage[]> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('conversations').select('*').eq('user_id', userId).order('created_at', { ascending: true });
    
    const saved = safeLocalStorage.getItem('conversationMessages');
    return saved ? JSON.parse(saved) : [
      { text: "Hello! Ready to practice today? 🎤", isUser: false, isSystem: false },
      { text: "Yes, I had pizza today!", isUser: true, isSystem: false },
      { text: 'Great! You can also say: "I had a delicious pizza with friends." 🍕', isUser: false, isSystem: false },
      { text: "Next question: What do you usually eat for breakfast?", isUser: false, isSystem: false }
    ];
  }

  async saveConversationMessage(message: ConversationMessage, userId?: string): Promise<void> {
    // TODO: Replace with Supabase insert when auth is implemented
    // const { error } = await supabase.from('conversations').insert({ ...message, user_id: userId });
    
    const messages = await this.getConversationMessages();
    const updatedMessages = [...messages, message];
    safeLocalStorage.setItem('conversationMessages', JSON.stringify(updatedMessages));
  }

  // XP and Level Management
  async updateXPAndLevel(xp: number, level: number, userId?: string): Promise<void> {
    // TODO: Replace with Supabase update when auth is implemented
    // const { error } = await supabase.from('user_profiles').update({ xp_current: xp, level }).eq('user_id', userId);
    
    const profile = await this.getUserProfile() || {} as UserProfileData;
    profile.xp = xp;
    profile.level = level;
    await this.saveUserProfile(profile);
  }

  // Clear all data (for logout or reset)
  async clearUserData(): Promise<void> {
    // Clear safeLocalStorage data
    safeLocalStorage.removeItem('userProfile');
    safeLocalStorage.removeItem('streakData');
    safeLocalStorage.removeItem('chatHistory');
    safeLocalStorage.removeItem('conversationMessages');
    
    // Clear session storage
    sessionStorage.clear();
  }
}

export const dataService = new DataService();