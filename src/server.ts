import express from 'express';
import nodemailer from 'nodemailer';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const shouldEnableAngular = process.env['ANGULAR_DISABLE_SSR'] !== 'true';

export const app = express();

app.use(express.json());

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const buildTransporter = () => {
  if (process.env['CONTACT_TRANSPORT'] === 'json') {
    return nodemailer.createTransport({ jsonTransport: true });
  }

  const host = process.env['CONTACT_SMTP_HOST'];
  const port = process.env['CONTACT_SMTP_PORT'];
  const user = process.env['CONTACT_SMTP_USER'];
  const pass = process.env['CONTACT_SMTP_PASS'];

  if (!host || !user || !pass) {
    return null;
  }

  const parsedPort = port ? Number.parseInt(port, 10) : 587;
  const secure =
    process.env['CONTACT_SMTP_SECURE'] === 'true' || parsedPort === 465;

  return nodemailer.createTransport({
    host,
    port: parsedPort,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

const isNonEmptyString = (value: unknown, minLength = 1): value is string =>
  typeof value === 'string' && value.trim().length >= minLength;

app.post('/api/contact', async (req, res) => {
  const body = req.body as ContactRequestBody;
  const { name, email, message } = body ?? {};

  if (
    !isNonEmptyString(name, 3) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(message, 20)
  ) {
    return res.status(400).json({ error: 'Invalid contact payload.' });
  }

  const transporter = buildTransporter();

  if (!transporter) {
    return res
      .status(500)
      .json({ error: 'Email transport is not configured.' });
  }

  const recipient =
    process.env['CONTACT_RECIPIENT'] ?? 'ferizovicsuco3@gmail.com';
  const fromAddress =
    process.env['CONTACT_FROM_ADDRESS'] ??
    process.env['CONTACT_SMTP_USER'] ??
    email;

  try {
    await transporter.sendMail({
      to: recipient,
      from: fromAddress,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(202).json({ message: 'Message sent.' });
  } catch (error) {
    console.error('Failed to forward contact message', error);
    return res.status(502).json({ error: 'Failed to send message.' });
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

let reqHandler: express.RequestHandler;

if (shouldEnableAngular) {
  const {
    AngularNodeAppEngine,
    createNodeRequestHandler,
    isMainModule,
    writeResponseToNodeResponse,
  } = await import('@angular/ssr/node');

  const angularApp = new AngularNodeAppEngine();

  app.use('/**', (req, res, next) => {
    angularApp
      .handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next(),
      )
      .catch(next);
  });

  if (isMainModule(import.meta.url)) {
    const port = process.env['PORT'] || 4000;
    app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  }

  reqHandler = createNodeRequestHandler(app);
} else {
  app.use('/**', (_req, res) => {
    res.status(501).send('SSR is disabled.');
  });

  const fallbackHandler: express.RequestHandler = (req, res, next) =>
    app(req, res, next);
  reqHandler = fallbackHandler;
}

export { reqHandler };
