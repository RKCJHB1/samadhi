import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true, // Ensures React Router handles dynamic routes
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Plugin to copy _redirects file to dist folder for Cloudflare Pages
    {
      name: 'copy-redirects',
      writeBundle() {
        try {
          copyFileSync('_redirects', 'dist/_redirects');
          console.log('✅ _redirects file copied to dist folder');
        } catch (error) {
          console.warn('⚠️ Could not copy _redirects file:', error.message);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
