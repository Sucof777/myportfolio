#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

let shuttingDown = false;
let exitCode = 0;
let apiProcess = null;
let webProcess = null;

function logWithTag(tag, message) {
  console.log(`[${tag}] ${message}`);
}

function spawnWithTag(tag, command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: ['inherit', 'pipe', 'pipe'],
    ...options,
  });

  const stdoutRl = createInterface({ input: child.stdout });
  stdoutRl.on('line', (line) => logWithTag(tag, line));

  const stderrRl = createInterface({ input: child.stderr });
  stderrRl.on('line', (line) => logWithTag(tag, line));

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    if (typeof code === 'number' && code !== 0) {
      exitCode = code;
    }

    if (signal) {
      logWithTag(tag, `Process terminated with signal ${signal}`);
    } else {
      logWithTag(tag, `Process exited with code ${code}`);
    }

    shuttingDown = true;

    if (tag === 'api') {
      if (webProcess && !webProcess.killed) {
        webProcess.kill('SIGTERM');
      }
    } else if (tag === 'web') {
      if (apiProcess && !apiProcess.killed) {
        apiProcess.kill('SIGTERM');
      }
    }
  });

  return child;
}

apiProcess = spawnWithTag('api', process.execPath, [resolve(__dirname, 'serve-api.mjs')]);

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
webProcess = spawnWithTag('web', npmCommand, ['run', 'start']);

const terminate = (signal) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  logWithTag('dev', `Received ${signal}. Shutting down...`);

  if (apiProcess && !apiProcess.killed) {
    apiProcess.kill(signal);
  }

  if (webProcess && !webProcess.killed) {
    webProcess.kill(signal);
  }
};

process.on('SIGINT', () => terminate('SIGINT'));
process.on('SIGTERM', () => terminate('SIGTERM'));

process.on('exit', () => {
  if (!shuttingDown) {
    shuttingDown = true;
  }

  if (apiProcess && !apiProcess.killed) {
    apiProcess.kill('SIGTERM');
  }

  if (webProcess && !webProcess.killed) {
    webProcess.kill('SIGTERM');
  }

  if (exitCode && exitCode !== 0) {
    process.exitCode = exitCode;
  }
});
