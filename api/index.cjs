let cachedHandler = null;

async function loadHandler() {
  if (!cachedHandler) {
    const module = await import('../dist/portfolio/server/server.mjs');

    if (!module || !('app' in module)) {
      throw new Error('The Express application failed to build.');
    }

    cachedHandler = module.app;
  }

  return cachedHandler;
}

async function handler(req, res) {
  const app = await loadHandler();

  await app(req, res);
}

module.exports = handler;
