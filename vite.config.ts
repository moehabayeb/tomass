import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8082,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Inject modulepreload for the lazy Index chunk so the browser starts
    // downloading it at HTML parse time (before main JS executes).
    {
      name: 'preload-index-chunk',
      enforce: 'post' as const,
      transformIndexHtml(html, ctx) {
        if (!ctx.bundle) return html;
        const indexChunk = Object.values(ctx.bundle).find(
          (chunk): chunk is import('rollup').OutputChunk =>
            chunk.type === 'chunk' && chunk.name === 'Index'
        );
        if (indexChunk) {
          return html.replace(
            '</head>',
            `    <link rel="modulepreload" crossorigin href="/${indexChunk.fileName}">\n  </head>`
          );
        }
        return html;
      }
    },
  ].filter(Boolean),
  optimizeDeps: {
    // Pre-bundle ALL runtime deps in one pass to prevent Vite from
    // discovering them at runtime, which causes hash mismatches and
    // dual React instances that break hooks.
    include: [
      // Core React
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      // Routing & state
      'react-router-dom',
      '@tanstack/react-query',
      'zustand',
      'react-hook-form',
      // UI libraries
      'sonner',
      'lucide-react',
      'cmdk',
      'vaul',
      'input-otp',
      'embla-carousel-react',
      'react-day-picker',
      'react-resizable-panels',
      'recharts',
      'react-confetti',
      '@react-hook/window-size',
      // Radix UI (all used components)
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      // Services & integrations
      '@supabase/supabase-js',
      '@sentry/react',
      '@amplitude/analytics-browser',
      '@capacitor/core',
      '@capacitor/local-notifications',
      '@capacitor-community/speech-recognition',
      '@capacitor-community/text-to-speech',
      // Utilities
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'date-fns',
      'zod',
      '@hookform/resolvers',
    ],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    drop: mode === 'production' ? ['debugger'] : [],
    pure: mode === 'production' ? ['console.log'] : [],
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
