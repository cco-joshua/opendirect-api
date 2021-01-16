import countdown from 'countdown';
import accountSchema from './schemas/accounts';
import mongoose from 'mongoose';

const
  DEFAULT_OBJECT_FILTER = {
    filter : ['_id']
  },
  DEFAULT_PROJECTION = {
    __v : 0,
    _id : 0
  },
  DEFAULT_SEARCH_OPTIONS = {
    lean : true
  };

export default async (app, request, self = {}) => {
  app.log.trace('data.accounts: initializing data mapper for accounts');

  const Account = mongoose.model('Account', accountSchema);

  function accountIdentifierString (options) {
    if (options.Id) {
      return options.Id;
    }

    let identifier = [];

    ['AdvertiserId', 'BuyerId', 'ThirdPartyId'].forEach((field) => {
      if (options[field]) {
        identifier.push(field);
        identifier.push(': ');
        identifier.push(options[field]);
      }
    });

    return identifier.join(', ');
  }

  self.create = async (data) => {
    let
      account = new Account(data),
      startTime = new Date();

    request.log.trace('data.accounts.create: creating account %s', account.Id);

    await account.save();

    request.log.debug(
      'data.accounts.create: created account %s in %s',
      account.Id,
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return account.toObject(DEFAULT_OBJECT_FILTER);
  };

  self.delete = async (options) => {
    let
      account,
      startTime = new Date();

    // ensure we fields to delete by
    if (!Object.keys(options).length) {
      throw new Error('data.accounts.delete: Id or AdvertiserId, BuyerId and ThirdPartyId are required');
    }

    request.log.trace(
      'data.accounts.delete: deleting account %s',
      accountIdentifierString(options));

    account = await Account.findOneAndDelete(options);

    request.log.debug(
      'data.accounts.delete: deleted account %s in %s',
      accountIdentifierString(options),
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return account.toObject(DEFAULT_OBJECT_FILTER);
  };

  self.retrieve = async (options) => {
    let
      account,
      startTime = new Date();

    // ensure we fields to retrieve by
    if (!Object.keys(options).length) {
      throw new Error('data.accounts.retrieve: Id or AdvertiserId, BuyerId and ThirdPartyId are required');
    }

    request.log.trace(
      'data.accounts.retrieve: finding account %s',
      accountIdentifierString(options));

    account = await Account.findOne(options, DEFAULT_PROJECTION, DEFAULT_SEARCH_OPTIONS);

    request.log.debug(
      'data.accounts.retrieve: %s account %s in %s',
      account ? 'found' : 'unable to find',
      accountIdentifierString(options),
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return account;
  };

  self.search = async (options) => {
    let
      result,
      startTime = new Date();

    request.log.trace(
      'data.accounts.search: searching for accounts');

    result = await Account
      .find({}, DEFAULT_PROJECTION, DEFAULT_SEARCH_OPTIONS)
      .field(options)
      .filter(options)
      .order(options)
      .page(options);

    request.log.debug(
      'data.accounts.update: found %d accounts in %s',
      result.total,
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return result;
  };

  self.update = async (options, data) => {
    let
      account,
      startTime = new Date();

    // ensure we fields to update by
    if (!Object.keys(options).length) {
      throw new Error('data.accounts.update: Id or AdvertiserId, BuyerId and ThirdPartyId are required');
    }

    request.log.trace(
      'data.accounts.update: updating account %s',
      accountIdentifierString(options));

    account = await Account.findOneAndUpdate(
      options,
      data,
      {
        new : true,
        rawRresult : true
      });

    request.log.debug(
      'data.accounts.update: updated account %s in %s',
      accountIdentifierString(options),
      countdown(startTime, new Date(), countdown.MILLISECONDS));

    return account.toObject(DEFAULT_OBJECT_FILTER);
  };

  return self;
};