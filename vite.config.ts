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
    // Optimize chunk sizes and loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Bundle vendor libraries separately
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          router: ['react-router-dom'],
        },
      },
    },
    // Increase chunk size limit to prevent warnings
    chunkSizeWarningLimit: 1000,
    // Use esbuild for minification (faster and included with Vite)
    minify: 'esbuild',
    // Optimize assets
    assetsInlineLimit: 4096,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'lucide-react',
      '@radix-ui/react-toast',
      '@radix-ui/react-dropdown-menu'
    ],
    force: false,
  },
}));
