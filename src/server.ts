import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const shouldEnableAngular = process.env['ANGULAR_DISABLE_SSR'] !== 'true';

export const app = express();

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
