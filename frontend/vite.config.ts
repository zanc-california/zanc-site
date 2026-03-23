import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin, ViteDevServer } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getSubscribeEnvFromProcess, handleSubscribe } from './api/lib/handleSubscribe';

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

/** Dev-only: same behavior as Vercel /api/subscribe when env vars are set in .env.local */
function subscribeDevApiPlugin(): Plugin {
  return {
    name: 'zanc-subscribe-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url !== '/api/subscribe') {
          return next();
        }

        // Merge .env / .env.local from the Vite project root (not always === process.cwd()).
        const merged = loadEnv(server.config.mode, server.config.root, '');
        Object.assign(process.env, merged);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
          return;
        }
        try {
          const raw = await readBody(req);
          let email: unknown;
          try {
            email = JSON.parse(raw || '{}').email;
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Invalid request.' }));
            return;
          }
          const subEnv = getSubscribeEnvFromProcess();
          if (!subEnv.supabaseUrl || !subEnv.supabaseServiceRoleKey) {
            console.warn(
              '[zanc] /api/subscribe: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY after loading env from',
              server.config.root
            );
          }
          const result = await handleSubscribe(email, subEnv);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({ success: false, message: 'Something went wrong. Please try again later.' })
          );
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), subscribeDevApiPlugin()],
    server: {
      port: 5173,
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
