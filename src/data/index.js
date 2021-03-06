import accounts from './accounts';
import mongoose from 'mongoose';
import mongooseMiddleware from '@brozeph/mongoose-middleware';

async function connectToDatabase (app) {
  if (mongoose.connection.readyState) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    mongoose.connect(
      app.settings.data.url,
      app.settings.data.options);

    mongoose.connection.once('error', reject);
    mongoose.connection.once('open', resolve);
  });
}

export default async (app, self = {}) => {
  if (!app) {
    throw new Error('application context is required for models');
  }

  app.log.info('data: initializing data layer');

  // connect to the configured database
  await connectToDatabase(app);

  // initialize mongoose-middleware
  mongooseMiddleware.initialize(
    {
      maxDocs : app.settings.data.middleware.maxDocs
    },
    mongoose);

  let request = {
    log : app.log
  };

  self.setRequestLog = (log) => {
    request.log = log;
  };

  // initialize and reference each data mapper
  self.accounts = accounts(app, request);

  return self;
};