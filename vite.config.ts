import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'query-vendor': ['@tanstack/react-query'],
          'supabase-vendor': ['@supabase/supabase-js'],
          
          // App-specific chunks
          'lessons': [
            './src/components/LessonsApp.tsx',
            './src/components/lessons/views/LevelsView.tsx',
            './src/components/lessons/views/ModulesView.tsx'
          ],
          'games': [
            './src/components/FlashcardsGame.tsx',
            './src/components/HangmanGame.tsx'
          ],
          'speech': [
            './src/voice/TomasVoice.ts',
            './src/voice/SimpleTTS.ts',
            './src/voice/BilingualTTS.ts'
          ]
        }
      }
    }
  },
}));
