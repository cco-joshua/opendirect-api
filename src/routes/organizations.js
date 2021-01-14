import boom from 'boom';
import Router from 'koa-router';

export default (app, models, self = {}) => {
  let router = new Router();

  app.log.trace('routes.organizations: registering routes for /v1/organizations');

  router.get('/v1/organizations', async (ctx) => {
    throw boom.notImplemented(`${ctx.request.method} ${ctx.request.url} not implemented`);
  });

  app.use(router.routes());

  return self;
};
