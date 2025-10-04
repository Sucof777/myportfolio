import assert from 'node:assert/strict';
import { AddressInfo } from 'node:net';
import { afterEach, before, beforeEach, describe, test } from 'node:test';
import type { Application } from 'express';

let appInstance: Application;

before(async () => {
  process.env['ANGULAR_DISABLE_SSR'] = 'true';
  ({ app: appInstance } = await import('../../src/server.js'));
});

const validPayload = {
  name: 'Jane Tester',
  email: 'jane@example.com',
  message: 'This is a sufficiently long message body for testing purposes.',
};

const postContact = async (baseUrl: string, body: unknown) => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  return { response, data };
};

describe('POST /api/contact', () => {
  const originalEnv = { ...process.env };
  let server: ReturnType<Application['listen']> | null = null;
  let baseUrl = '';

  beforeEach(() => {
    server = appInstance.listen(0);
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) {
        delete process.env[key];
      }
    }

    Object.assign(process.env, originalEnv);

    if (server) {
      await new Promise<void>((resolve) => server?.close(() => resolve()));
      server = null;
    }
  });

  test('rejects invalid payloads', async () => {
    const { response, data } = await postContact(baseUrl, {
      name: 'Ja',
      email: 'invalid-email',
      message: 'Too short',
    });

    assert.equal(response.status, 400);
    assert.equal((data as { error: string } | null)?.error, 'Invalid contact payload.');
  });

  test('accepts valid payload when transport configured via JSON transport', async () => {
    process.env['CONTACT_TRANSPORT'] = 'json';

    const { response, data } = await postContact(baseUrl, validPayload);

    assert.equal(response.status, 202);
    assert.equal((data as { message: string } | null)?.message, 'Message sent.');
  });

  test('returns 500 when no transport configuration is available', async () => {
    delete process.env['CONTACT_TRANSPORT'];
    delete process.env['CONTACT_SMTP_HOST'];
    delete process.env['CONTACT_SMTP_USER'];
    delete process.env['CONTACT_SMTP_PASS'];

    const { response, data } = await postContact(baseUrl, validPayload);

    assert.equal(response.status, 500);
    assert.equal((data as { error: string } | null)?.error, 'Email transport is not configured.');
  });
});
