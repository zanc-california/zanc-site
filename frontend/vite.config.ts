import type { IncomingMessage, ServerResponse } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getSubscribeEnv, handleSubscribe } from './api/lib/handleSubscribe';
import {
  getSuggestionEnv,
  handleSuggestionSubmission,
} from './api/lib/handleSuggestions';

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

function readEnvValueFromFile(root: string, key: string): string {
  const envPath = join(root, '.env.local');
  if (!existsSync(envPath)) return '';
  const content = readFileSync(envPath, 'utf8');
  const line = content
    .split(/\r?\n/)
    .find((raw) => raw.trim().startsWith(`${key}=`));
  if (!line) return '';
  const value = line.slice(line.indexOf('=') + 1).trim();
  if (!value) return '';
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).trim();
  }
  return value;
}

function setCorsHeaders(res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function loadServerEnv(server: ViteDevServer) {
  const merged = loadEnv(server.config.mode, server.config.root, '');
  return {
    ...merged,
    SUPABASE_URL:
      merged.SUPABASE_URL ||
      readEnvValueFromFile(server.config.root, 'SUPABASE_URL') ||
      merged.VITE_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY:
      merged.SUPABASE_SERVICE_ROLE_KEY ||
      readEnvValueFromFile(server.config.root, 'SUPABASE_SERVICE_ROLE_KEY'),
  };
}

/** Dev-only: mirror the serverless APIs used in production. */
function serverlessDevApiPlugin(): Plugin {
  return {
    name: 'zanc-serverless-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url !== '/api/subscribe' && url !== '/api/suggestions') {
          return next();
        }

        const env = loadServerEnv(server);
        Object.assign(process.env, env);
        setCorsHeaders(res);

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
          const rawBody = await readBody(req);
          const parsedBody = JSON.parse(rawBody || '{}') as Record<string, unknown>;

          const result =
            url === '/api/subscribe'
              ? await handleSubscribe(parsedBody.email, getSubscribeEnv(env))
              : await handleSuggestionSubmission(
                  parsedBody,
                  getSuggestionEnv(env),
                  req.socket.remoteAddress ?? 'unknown',
                  parsedBody.website
                );

          res.statusCode =
            result.success ? 200 : result.code === 'rate_limited' ? 429 : 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              success: false,
              message: 'Something went wrong. Please try again later.',
            })
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), serverlessDevApiPlugin()],
    server: {
      port: 5173,
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
