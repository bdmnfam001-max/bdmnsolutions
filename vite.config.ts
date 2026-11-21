import { Buffer } from 'node:buffer';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { processContactSubmission } from './api/contact';

const previewHostname = 'sb-60sdp7d65upz.vercel.run';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ['TURNSTILE_SECRET_KEY', 'TURNSTILE_ALLOWED_HOSTNAMES']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  }

  return {
    plugins: [
      react(),
      {
        name: 'local-contact-function',
        configureServer(server) {
          server.middlewares.use('/api/contact', (request, response, next) => {
            void (async () => {
              if (request.method !== 'POST') {
                const result = await processContactSubmission({
                  method: request.method,
                  headers: request.headers,
                });
                response.statusCode = result.status;
                response.setHeader('Content-Type', 'application/json; charset=utf-8');
                response.setHeader('Cache-Control', 'no-store');
                response.end(JSON.stringify(result.body));
                return;
              }

              const chunks: Buffer[] = [];
              let byteCount = 0;
              for await (const chunk of request) {
                const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
                byteCount += buffer.byteLength;
                if (byteCount > 12_000) {
                  response.statusCode = 413;
                  response.setHeader('Content-Type', 'application/json; charset=utf-8');
                  response.end(JSON.stringify({ ok: false, error: 'The inquiry is too large.' }));
                  return;
                }
                chunks.push(buffer);
              }

              let body: unknown;
              try {
                body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
              } catch {
                body = undefined;
              }

              const result = await processContactSubmission({
                method: request.method,
                headers: request.headers,
                body,
              });
              response.statusCode = result.status;
              response.setHeader('Content-Type', 'application/json; charset=utf-8');
              response.setHeader('Cache-Control', 'no-store');
              response.end(JSON.stringify(result.body));
            })().catch(next);
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      allowedHosts: [previewHostname, 'sb-1rb8713162e6.vercel.run'],
    },
    preview: {
      host: '0.0.0.0',
      allowedHosts: [previewHostname, 'sb-1rb8713162e6.vercel.run'],
    },
  };
});
