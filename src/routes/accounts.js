import boom from 'boom';
import Router from 'koa-router';

export default (app, models, self = {}) => {
  let router = new Router();

  app.log.trace('routes.accounts: registering routes for /v1/accounts');

  // list all accounts for the organization specified via authorization
  router.get('/v1/accounts', async (ctx) => {
    ctx.body = await models.accounts.search(ctx.request.queryOptions);
  });

  // create an account within the organization specified via authorization
  router.post('/v1/accounts', async (ctx) => {
    ctx.body = await models.accounts.create(ctx.request.body);
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
    if (typeof ctx.request.query.disable !== 'undefined') {
      app.log.debug(`${ctx.request.method} ${ctx.request.url} requested with disable query parameter`);
    }

    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // different implementation from spec (calls out action is a querystring parameter with `PATCH`)
  router.put('/v1/accounts/:accountId/assignments/:assignmentId/disable', async (ctx) => {
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
    if (ctx.params.lineId === 'stats') {
      app.log.debug(`${ctx.request.method} ${ctx.request.url} requested with stats query parameter instead of lineId`);
    }

    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  router.patch('/v1/accounts/:accountId/orders/:orderId/lines/:lineId', async (ctx) => {
    // ?book
    if (typeof ctx.request.query.book !== 'undefined') {
      app.log.debug(`${ctx.request.method} ${ctx.request.url} requested with book query parameter`);
    }

    // ?reserve
    if (typeof ctx.request.query.reserve !== 'undefined') {
      app.log.debug(`${ctx.request.method} ${ctx.request.url} requested with reserve query parameter`);
    }
    
    // ?cancel
    if (typeof ctx.request.query.cancel !== 'undefined') {
      app.log.debug(`${ctx.request.method} ${ctx.request.url} requested with cancel query parameter`);
    }
    
    // ?reset
    if (typeof ctx.request.query.reset !== 'undefined') {
      app.log.debug(`${ctx.request.method} ${ctx.request.url} requested with reset query parameter`);
    }
    
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // different implementation from spec (calls out action is a querystring parameter with `PATCH`)
  router.put('/v1/accounts/:accountId/orders/:orderId/lines/:lineId/book', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // different implementation from spec (calls out action is a querystring parameter with `PATCH`)
  router.put('/v1/accounts/:accountId/orders/:orderId/lines/:lineId/cancel', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // different implementation from spec (calls out action is a querystring parameter with `PATCH`)
  router.put('/v1/accounts/:accountId/orders/:orderId/lines/:lineId/reserve', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  // different implementation from spec (calls out action is a querystring parameter with `PATCH`)
  router.put('/v1/accounts/:accountId/orders/:orderId/lines/:lineId/reset', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/orders/{id}/lines/{id}/stats');

  // not required
  router.get('/v1/accounts/:accountId/orders/:orderId/lines/:lineId/stats', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/changerequests');

  // not required
  // different implementation from spec (changerequests is plural)
  router.get(
    '/v1/accounts/:accountId/changerequest', 
    '/v1/accounts/:accountId/changerequests', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.post(
    '/v1/accounts/:accountId/changerequest', 
    '/v1/accounts/:accountId/changerequests', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.delete(
    '/v1/accounts/:accountId/changerequest/:changeRequestId', 
    '/v1/accounts/:accountId/changerequests/:changeRequestId', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.get(
    '/v1/accounts/:accountId/changerequest/:changeRequestId',
    '/v1/accounts/:accountId/changerequests/:changeRequestId', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.patch(
    '/v1/accounts/:accountId/changerequest/:changeRequestId',
    '/v1/accounts/:accountId/changerequests/:changeRequestId', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.put(
    '/v1/accounts/:accountId/changerequest/:changeRequestId/approve', 
    '/v1/accounts/:accountId/changerequests/:changeRequestId/approve', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.put(
    '/v1/accounts/:accountId/changerequest/:changeRequestId/reject', 
    '/v1/accounts/:accountId/changerequests/:changeRequestId/reject', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  app.log.trace('routes.accounts: registering routes for /v1/accounts/{id}/changerequests/{id}/lines');

  // not required
  // different implementation from spec (changerequests is plural)
  router.get(
    '/v1/accounts/:accountId/changerequest/:changeRequestId/lines', 
    '/v1/accounts/:accountId/changerequests/:changeRequestId/lines', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.post(
    '/v1/accounts/:accountId/changerequest/:changeRequestId/lines', 
    '/v1/accounts/:accountId/changerequests/:changeRequestId/lines', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.get(
    '/v1/accounts/:accountId/changerequest/:changeRequestId/lines/:lineId', 
    '/v1/accounts/:accountId/changerequests/:changeRequestId/lines/:lineId', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  // not required
  // different implementation from spec (changerequests is plural)
  router.patch(
    '/v1/accounts/:accountId/changerequest/:changeRequestId/lines/:lineId', 
    '/v1/accounts/:accountId/changerequests/:changeRequestId/lines/:lineId', 
    async (ctx) => {
      throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
    });

  app.use(router.routes());

  return self;
};
