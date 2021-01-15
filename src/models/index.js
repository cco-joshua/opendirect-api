
import initValidators from './validators';

export default async (app, data, self = {}) => {
  if (!app) {
    throw new Error('application context is required for models');
  }

  if (!app) {
    throw new Error('the data layer is required for models');
  }

  app.log.info('models: initializing model layer');

  let 
    request = {
      log : app.log
    },
    validators;

  self.setRequestLog = (log) => {
    request.log = log;
    data.setRequestLog(log);
  };

  // initialize JSON schema validators
  validators = await initValidators(app);



  return self;
};