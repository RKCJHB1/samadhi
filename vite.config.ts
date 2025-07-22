import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, existsSync, mkdirSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true, // Ensures React Router handles dynamic routes
  },
  build: {
    rollupOptions: {
      // Optimize chunks for better performance
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-dialog', '@radix-ui/react-select'],
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Plugin to copy static files to dist folder for Cloudflare Pages
    {
      name: 'copy-static-files',
      writeBundle() {
        // Note: _redirects file removed since we're using static HTML files

        // Copy invitation HTML files
        const invitations = [
          'guru-purnima-invitation.html',
          'special-programme-invitation.html',
          'welcome-reception-invitation.html'
        ];

        invitations.forEach(invitation => {
          try {
            const srcFile = `public/services/${invitation}`;
            const destFile = `dist/services/${invitation}`;

            // Create destination directory if it doesn't exist
            const destDir = path.dirname(destFile);
            if (!existsSync(destDir)) {
              mkdirSync(destDir, { recursive: true });
            }

            if (existsSync(srcFile)) {
              copyFileSync(srcFile, destFile);
              console.log(`✅ ${invitation} copied to dist folder`);
            }
          } catch (error) {
            console.warn(`⚠️ Could not copy ${invitation}:`, error.message);
          }
        });
      }
    },

  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
