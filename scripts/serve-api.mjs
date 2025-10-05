#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const tscJsPath = resolve(projectRoot, 'node_modules/typescript/lib/tsc.js');
const tsconfigPath = resolve(projectRoot, 'tsconfig.server-test.json');
const runtimeEntry = resolve(__dirname, 'start-compiled-api.mjs');
const tmpPackageJsonPath = resolve(projectRoot, '.tmp/server-tests/package.json');

let serverProcess = null;
let shuttingDown = false;
let pendingRestart = false;
let initialBuildComplete = false;

function logWithTag(tag, message) {
  console.log(`[${tag}] ${message}`);
}

function startServerProcess() {
  mkdirSync(resolve(projectRoot, '.tmp/server-tests'), { recursive: true });
  writeFileSync(tmpPackageJsonPath, '{"type":"module"}\n');

  const env = { ...process.env };
  env['ANGULAR_DISABLE_SSR'] = env['ANGULAR_DISABLE_SSR'] ?? 'true';
  env['CONTACT_TRANSPORT'] = env['CONTACT_TRANSPORT'] ?? 'json';
  env['PORT'] = env['PORT'] ?? '4000';

  logWithTag('api', 'Starting Express server on http://localhost:' + env['PORT']);

  serverProcess = spawn(process.execPath, [runtimeEntry], {
    cwd: projectRoot,
    stdio: 'inherit',
    env,
  });

  serverProcess.on('exit', (code, signal) => {
    const wasRestarting = pendingRestart;
    serverProcess = null;
    pendingRestart = false;

    if (shuttingDown) {
      return;
    }

    if (signal) {
      logWithTag('api', `Server process terminated by ${signal}`);
    } else if (typeof code === 'number' && code !== 0) {
      logWithTag('api', `Server process exited with code ${code}`);
    }

    if (wasRestarting) {
      startServerProcess();
    }
  });
}

function requestServerRestart() {
  if (!initialBuildComplete) {
    return;
  }

  if (!serverProcess) {
    startServerProcess();
    return;
  }

  pendingRestart = true;
  serverProcess.kill('SIGTERM');
}

const tscProcess = spawn(
  process.execPath,
  [tscJsPath, '--project', tsconfigPath, '--watch', '--preserveWatchOutput'],
  {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

tscProcess.on('exit', (code, signal) => {
  if (shuttingDown) {
    return;
  }

  if (signal) {
    logWithTag('tsc', `TypeScript compiler terminated by ${signal}`);
  } else {
    logWithTag('tsc', `TypeScript compiler exited with code ${code}`);
  }

  shuttingDown = true;
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill('SIGTERM');
  }
});

const forwardOutput = (stream, tag) => {
  const rl = createInterface({ input: stream });
  rl.on('line', (line) => {
    logWithTag(tag, line);

    if (line.includes('Found 0 errors.')) {
      initialBuildComplete = true;
      requestServerRestart();
    }
  });
};

forwardOutput(tscProcess.stdout, 'tsc');
forwardOutput(tscProcess.stderr, 'tsc');

const terminate = (signal) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  logWithTag('dev', `Received ${signal}. Shutting down...`);

  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill(signal);
  }

  tscProcess.kill(signal);
};

process.on('SIGINT', () => terminate('SIGINT'));
process.on('SIGTERM', () => terminate('SIGTERM'));

process.on('exit', () => {
  shuttingDown = true;
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill('SIGTERM');
  }
  if (!tscProcess.killed) {
    tscProcess.kill('SIGTERM');
  }
});
