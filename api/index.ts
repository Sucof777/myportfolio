import type { IncomingMessage, ServerResponse } from 'node:http';

type ExpressHandler = (req: IncomingMessage, res: ServerResponse) => void;

let cachedHandler: ExpressHandler | null = null;

const loadHandler = async (): Promise<ExpressHandler> => {
  if (!cachedHandler) {
    const module = await import('../dist/portfolio/server/server.mjs');

    if (!('app' in module)) {
      throw new Error('The Express application failed to build.');
    }

    cachedHandler = module.app as ExpressHandler;
  }

  return cachedHandler;
};

const handler = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const app = await loadHandler();

  await app(req, res);
};

module.exports = handler;
