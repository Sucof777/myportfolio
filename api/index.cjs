const { join } = require('node:path');
const { pathToFileURL } = require('node:url');

let cachedHandler = null;

const handlerModuleUrl = pathToFileURL(
  join(__dirname, '../dist/portfolio/server/server.mjs'),
).href;

async function loadHandler() {
  if (!cachedHandler) {
    const module = await import(handlerModuleUrl);

    const app = module && (module.app || module.default);

    if (typeof app !== 'function') {
      throw new Error('The Express application failed to build.');
    }

    cachedHandler = app;
  }

  return cachedHandler;
}

module.exports = async function handler(req, res) {
  const app = await loadHandler();
  return app(req, res);
};
