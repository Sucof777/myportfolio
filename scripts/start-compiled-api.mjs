#!/usr/bin/env node
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const compiledEntry = resolve(projectRoot, '.tmp/server-tests/src/server.js');

const moduleUrl = pathToFileURL(compiledEntry).href + `?cache-bust=${Date.now()}`;

const { app } = await import(moduleUrl);

if (!app || typeof app.listen !== 'function') {
  console.error('The compiled server module does not export an Express application.');
  process.exit(1);
}

const port = Number.parseInt(process.env['PORT'] ?? '4000', 10);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Express API listening on http://localhost:${port}`);
});

const shutdown = (signal) => {
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
