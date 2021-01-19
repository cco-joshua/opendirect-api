
import accounts from './accounts';
import validators from './validators';

export default async (app, data, self = {}) => {
  if (!app) {
    throw new Error('application context is required for models');
  }

  if (!app) {
    throw new Error('the data layer is required for models');
  }

  app.log.info('models: initializing model layer');

  let request = {
    log : app.log
  };

  // used by middleware to apply a request correlation identifier to all
  // logs for the inbound HTTP request
  self.setRequestLog = (log) => {
    request.log = log;
    data.setRequestLog(log);
  };

  // initialize JSON schema validators
  self.validators = await validators(app, request);

  self.accounts = accounts(app, request, self.validators, data);

  return self;
};