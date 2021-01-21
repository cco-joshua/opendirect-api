import boom from 'boom';
import countdown from 'countdown';
import mongoose from 'mongoose';
import { v4 } from 'uuid';

const RE_KEY_ACCOUNT_ID = /^[^:]*$|^(account)?id:/i;

export default (app, request, validators, data, self = {}) => {
  app.log.trace('models.accounts: initializing business layer for accounts');

  self.create = async (account, index = 0) => {
    if (!account) {
      throw boom.badRequest(`index (${ index }): data is required to create an account`);
    }

    // handle scenarios when data is provided as an Array
    if (Array.isArray(account)) {
      let result = [];

      // create each account provided in order...
      /* eslint no-await-in-loop : 0 */
      for (let element of account) {
        element = await self.create(element, result.length);
        result.push(element);
      }

      return result;
    }

    // validate
    let check = validators.account(account);

    if (!check.valid) {
      request.log.error(
        'unable to create account at index %d: %d validation errors found',
        index,
        check.errors.length,
        check.errors);

      let err = boom.badRequest(`index (${ index }): account invalid with ${ check.errors.length } errors`);
      err.validationErrors = check.errors;

      throw err;
    }

    request.log.trace(
      'models.accounts.create: beginning to create a account (index: %d)',
      index);

    // assign a accountId
    if (!account.Id) {
      account.Id = v4().replace(/\-/g, '');
    }

    let startTime = new Date();

    try {
      await data.accounts.create(account);
    } catch (ex) {
      if (ex instanceof mongoose.mongo.MongoError) {
        throw boom.badRequest(ex.message, ex);
      }

      throw ex;
    }

    request.log.debug(
      'models.accounts.create: completed create account (index: %d) in %s',
      index,
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return account;
  };

  self.lookup = async (key) => {
    if (!key) {
      throw boom.badRequest('an identifier is required to lookup a account');
    }

    let
      account,
      options = {},
      startTime = new Date();

    if (RE_KEY_ACCOUNT_ID.test(key)) {
      options.Id = key.replace(RE_KEY_ACCOUNT_ID, '') || key;
    }

    request.log.trace(
      'models.accounts.lookup: beginning to lookup a account with identifier %s',
      options.Id);

    try {
      account = await data.accounts.retrieve(options);
    } catch (ex) {
      if (ex instanceof mongoose.mongo.MongoError) {
        throw boom.badRequest(ex.message, ex);
      }

      throw ex;
    }

    if (!account) {
      throw boom.notFound(`account "${ options.Id }" not found`);
    }

    request.log.debug(
      'models.accounts.lookup: completed lookup account %s in %s',
      options.Id, // || options.email,
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return account;
  };

  self.search = async (options) => {
    if (!options) {
      throw boom.badRequest('options are required for search');
    }

    request.log.trace(
      'models.accounts.search: beginning search for accounts',
      options);

    let
      result,
      startTime = new Date();

    result = await data.accounts.search(options);

    request.log.debug(
      'models.accounts.search: completed search in %s',
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return result;
  };

  self.update = async (key, account) => {
    if (!account) {
      throw boom.badRequest('data is required to update a account');
    }

    if (!key) {
      throw boom.badRequest('an identifier is required to update a account');
    }

    request.log.trace(
      'models.accounts.update: beginning to update a account with identifier %s',
      typeof key === 'string' ? key : key.Id); // || key.email);

    let
      options = typeof key === 'string' ? {} : key,
      startTime = new Date();

    if (typeof key === 'string' && RE_KEY_ACCOUNT_ID.test(key)) {
      options.Id = key.replace(RE_KEY_ACCOUNT_ID, '') || key;
    }

    try {
      account = await data.accounts.update(options, account);
    } catch (ex) {
      if (ex instanceof mongoose.mongo.MongoError) {
        throw boom.badRequest(ex.message, ex);
      }

      throw ex;
    }

    request.log.debug(
      'models.accounts.update: completed update account %s in %s',
      options.Id, // || options.email,
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return account;
  };

  return self;
};