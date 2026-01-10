import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tomashoca.app',
  appName: 'Tomas Hoca',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
  },
  server: {
    allowNavigation: ['*.supabase.co']
  }
};

export default config;
