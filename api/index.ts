import type { IncomingMessage, ServerResponse } from 'node:http';

export type ExpressHandler = (req: IncomingMessage, res: ServerResponse) => void;

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

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const app = await loadHandler();

  return app(req, res);
}
