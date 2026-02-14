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
    include: [
      'react',
      'react-dom',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-toast',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-accordion',
      '@radix-ui/react-tabs',
      '@radix-ui/react-select',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-progress',
      '@radix-ui/react-avatar',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
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
