// Data Service Layer - Prepares for easy Supabase Auth integration
// Currently uses localStorage, can be easily switched to Supabase tables

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
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId).single();
    
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    
    return null;
  }

  async saveUserProfile(profile: UserProfileData): Promise<void> {
    // TODO: Replace with Supabase upsert when auth is implemented
    // const { error } = await supabase.from('profiles').upsert(profile);
    
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  // Streak Management
  async getStreakData(userId?: string): Promise<{ currentStreak: number; lastVisitDate: string; bestStreak: number }> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('streaks').select('*').eq('user_id', userId).single();
    
    const saved = localStorage.getItem('streakData');
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
    
    localStorage.setItem('streakData', JSON.stringify(streakData));
  }

  // Chat History Management
  async getChatHistory(userId?: string): Promise<SessionRecord[]> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('chat_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  }

  async saveChatSession(session: SessionRecord, userId?: string): Promise<void> {
    // TODO: Replace with Supabase insert when auth is implemented
    // const { error } = await supabase.from('chat_sessions').insert({ ...session, user_id: userId });
    
    const history = await this.getChatHistory();
    const updatedHistory = [...history, session];
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  }

  // Conversation Messages Management
  async getConversationMessages(userId?: string): Promise<ConversationMessage[]> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('conversations').select('*').eq('user_id', userId).order('created_at', { ascending: true });
    
    const saved = localStorage.getItem('conversationMessages');
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
    localStorage.setItem('conversationMessages', JSON.stringify(updatedMessages));
  }

  // XP and Level Management
  async updateXPAndLevel(xp: number, level: number, userId?: string): Promise<void> {
    // TODO: Replace with Supabase update when auth is implemented
    // const { error } = await supabase.from('profiles').update({ xp, level }).eq('user_id', userId);
    
    const profile = await this.getUserProfile() || {} as UserProfileData;
    profile.xp = xp;
    profile.level = level;
    await this.saveUserProfile(profile);
  }

  // Clear all data (for logout or reset)
  async clearUserData(): Promise<void> {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('streakData');
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('conversationMessages');
  }
}

export const dataService = new DataService();