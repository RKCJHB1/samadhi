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
          'guru-purnima-invitation',
          'special-programme-invitation',
          'welcome-reception-invitation'
        ];

        invitations.forEach(invitation => {
          try {
            const srcDir = `public/services/${invitation}`;
            const destDir = `dist/services/${invitation}`;

            // Create destination directory if it doesn't exist
            if (!existsSync(destDir)) {
              mkdirSync(destDir, { recursive: true });
            }

            // Copy index.html file
            const srcFile = path.join(srcDir, 'index.html');
            const destFile = path.join(destDir, 'index.html');

            if (existsSync(srcFile)) {
              copyFileSync(srcFile, destFile);
              console.log(`✅ ${invitation} HTML file copied to dist folder`);
            }
          } catch (error) {
            console.warn(`⚠️ Could not copy ${invitation} files:`, error.message);
          }
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
