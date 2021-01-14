import boom from 'boom';
import Router from 'koa-router';

export default (app, models, self = {}) => {
  let router = new Router();

  app.log.trace('routes.products: registering routes for /v1/products');

  router.get('/v1/products', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.get('/v1/products/:productId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.post('/v1/products/avails', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.post('/v1/products/search', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.use(router.routes());

  return self;
};

