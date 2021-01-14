import boom from 'boom';
import Router from 'koa-router';

export default (app, models, self = {}) => {
  let router = new Router();

  app.log.trace('routes.accounts: registering routes for /v1/accounts');

  router.get('/v1/accounts', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.post('/v1/accounts', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.get('/v1/accounts/:id', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.use(router.routes());

  return self;
};
