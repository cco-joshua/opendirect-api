import boom from 'boom';
import Router from 'koa-router';

export default (app, models, self = {}) => {
  let router = new Router();

  app.log.trace('routes.accounts: registering routes for /v1/accounts');

  // list all accounts for the organization specified via authorization
  router.get('/v1/accounts', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // create an account within the organization specified via authorization
  router.post('/v1/accounts', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // get a specific account from within the organization
  router.get('/v1/accounts/:accountId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/assignments');

  //
  router.get('/v1/accounts/:accountId/assignments', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.post('/v1/accounts/:accountId/assignments', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.delete('/v1/accounts/:accountId/assignments/:assignmentId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.get('/v1/accounts/:accountId/assignments/:assignmentId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.patch('/v1/accounts/:accountId/assignments/:assignmentId', async (ctx) => {
    // ?disable
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/creatives');

  router.get('/v1/accounts/:accountId/creatives', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/orders');

  router.get('/v1/accounts/:accountId/orders', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.post('/v1/accounts/:accountId/orders', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.delete('/v1/accounts/:accountId/orders/:orderId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required (oddly)
  router.get('/v1/accounts/:accountId/orders/:orderId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.patch('/v1/accounts/:accountId/orders/:orderId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/orders/{id}/lines');

  router.get('/v1/accounts/:accountId/orders/:orderId/lines', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.post('/v1/accounts/:accountId/orders/:orderId/lines', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.delete('/v1/accounts/:accountId/orders/:orderId/lines/:lineId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.get('/v1/accounts/:accountId/orders/:orderId/lines/:lineId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.patch('/v1/accounts/:accountId/orders/:orderId/lines/:lineId', async (ctx) => {
    // ?book
    // ?reserve
    // ?cancel
    // ?cancel
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/orders/{id}/lines/{id}/stats');

  // not required
  router.get('/v1/accounts/:accountId/orders/:orderId/lines/:lineId/stats', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/changerequests');

  // not required
  router.get('/v1/accounts/:accountId/changerequests', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.post('/v1/accounts/:accountId/changerequests', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.delete('/v1/accounts/:accountId/changerequests/:changeRequestId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.get('/v1/accounts/:accountId/changerequests/:changeRequestId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.patch('/v1/accounts/:accountId/changerequests/:changeRequestId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.put('/v1/accounts/:accountId/changerequests/:changeRequestId/approve', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.put('/v1/accounts/:accountId/changerequests/:changeRequestId/reject', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/changerequests/{id}/lines');

  // not required
  router.get('/v1/accounts/:accountId/changerequests/:changeRequestId/lines', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.post('/v1/accounts/:accountId/changerequests/:changeRequestId/lines', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.get('/v1/accounts/:accountId/changerequests/:changeRequestId/lines/:lineId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // not required
  router.patch('/v1/accounts/:accountId/changerequests/:changeRequestId/lines/:lineId', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.use(router.routes());

  return self;
};
