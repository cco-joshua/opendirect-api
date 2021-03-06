import accounts from './accounts';
import advertiserbrands from './advertiserbrands';
import Boom from 'boom';
import datasources from './datasources';
import middleware from './middleware';
import organizations from './organizations';
import products from './products';
import Router from 'koa-router';
import status from './status';
import version from './version';

export default async (app, models, self = {}) => {
  let options = new Router();

  if (!app) {
    throw new Error('application context is required for routes');
  }

  if (!models) {
    throw new Error('business model layer is required for routes');
  }

  app.log.info('routes: initializing routing layer');

  // register middleware
  middleware(app, models);

  // register API routes
  self.advertiserbrands = advertiserbrands(app, models);
  self.accounts = accounts(app, models);
  self.datasources = datasources(app, models);
  self.organizations = organizations(app, models);
  self.products = products(app, models);
  self.status = status(app, models);
  self.version = version(app, models);

  // 404s
  app.use(async (ctx) => {
    throw Boom.notFound(`${ctx.method} ${ctx.url}: does not exist`);
  });

  // hook up error handlers
  app.use(options.allowedMethods({
    methodNotAllowed : () => Boom.methodNotAllowed(),
    notImplemented : () => Boom.notImplemented(),
    throw : true
  }));

  return self;
};