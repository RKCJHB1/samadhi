import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import type { IncomingMessage, ServerResponse } from "http";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true, // fail if 8080 is taken, don't auto-switch
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
    {
      name: 'chant-groups-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const requestUrl = req.url ?? '';
          if (!requestUrl.startsWith('/api/chant-groups') && !requestUrl.startsWith('/api/chant-people')) {
            next();
            return;
          }
          void handleDevChantGroup(req, res);
        });
      },
    },
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

        // Copy Aum audio file
        try {
          const srcAum = 'public/aum.mp3';
          const destAum = 'dist/aum.mp3';

          if (existsSync(srcAum)) {
            copyFileSync(srcAum, destAum);
            console.log(`✅ aum.mp3 copied to dist folder`);
          }
        } catch (error) {
          console.warn(`⚠️ Could not copy aum.mp3:`, error.message);
        }
      }
    },

  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

function readAumTursoEnv(): { url: string; token: string } | null {
  const url = process.env.AUM_TURSO_URL || process.env.TURSO_CONNECTION_URL || '';
  const token = process.env.AUM_TURSO_TOKEN || process.env.TURSO_AUTH_TOKEN || '';
  if (url && token) return { url, token };
  if (!existsSync('backend/.env')) return null;
  const env: Record<string, string> = {};
  for (const line of readFileSync('backend/.env', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
  }
  const fileUrl = env.AUM_TURSO_URL || env.TURSO_CONNECTION_URL || '';
  const fileToken = env.AUM_TURSO_TOKEN || env.TURSO_AUTH_TOKEN || '';
  if (!fileUrl || !fileToken) return null;
  return { url: fileUrl, token: fileToken };
}

function readIncomingBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function handleDevChantGroup(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const { handleChantGroupRequest } = await import('./functions/_lib/chantGroups.ts');
    const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
    const method = req.method ?? 'GET';
    const body = method === 'GET' || method === 'HEAD' ? undefined : await readIncomingBody(req);
    const request = new Request(requestUrl, {
      method,
      headers: { 'content-type': 'application/json' },
      body,
    });
    const response = await handleChantGroupRequest(request, readAumTursoEnv());
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Group counting is not available right now.' }));
  }
}
