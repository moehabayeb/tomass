import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tomashoca.app',
  appName: 'Tomas Hoca',
  webDir: 'dist',
  ios: {
    contentInset: 'never',
    allowsLinkPreview: false,
    backgroundColor: '#1e1b4b',
    scrollEnabled: false,  // Disable native scroll to prevent horizontal overflow
    overrideUserAgent: 'TomasHoca-iOS',
    webContentsDebuggingEnabled: false,
  },
  server: {
    allowNavigation: ['*.supabase.co']
  }
};

export default config;
