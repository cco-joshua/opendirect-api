/* eslint brace-style : 0 */
/* eslint no-unused-expressions : 0 */

import chai from 'chai';
import initAccounts from '../../src/models/accounts.js';

const should = chai.should();

describe('accounts', () => {
  let
    accounts,
    messages = {
      debug : [],
      error : [],
      info : [],
      trace : [],
      warm : []
    },
    mockAccount = null,
    mockApp = {
      log : {
        debug : (...args) => { messages.debug.push(args); },
        error : (...args) => { messages.error.push(args); },
        info : (...args) => { messages.info.push(args); },
        trace : (...args) => { messages.trace.push(args); },
        warn : (...args) => { messages.warn.push(args); }
      },
      settings : {}
    },
    mockData = {
      accounts : {
        retrieve : async (options) => {
          return mockAccount || options;
        }
      }
    },
    mockRequest = {
      log : mockApp.log
    },
    mockValidators = {

    };
  
  beforeEach(() => {
    // init accounts
    accounts = initAccounts(mockApp, mockRequest, mockValidators, mockData);

    // reset mockAccount
    mockAccount = null;

    // reset messages
    messages = {
      debug : [],
      error : [],
      info : [],
      trace : [],
      warm : []
    };
  });

  describe('initialization', () => {
    it('should properly initialize', async () => {
      should.exist(accounts);
    });
  });

  describe('#lookup', () => {
    it('should handle lookup with a key prefix', async () => {
      let 
        key = 'accountId:12345',
        result = await accounts.lookup(key);

      result.should.exist;
      result.Id.should.exist;
      result.Id.should.equal('12345');
    });

    it('should handle lookup with a key prefix', async () => {
      let 
        key = '12345',
        result = await accounts.lookup(key);

      result.should.exist;
      result.Id.should.exist;
      result.Id.should.equal('12345');
    });

    it('should support lookup based on AdvertiserId', async () => {
      let
        options = { AdvertiserId : 'test' },
        result = await accounts.search(options);
      
      result.should.exist;
      console.log(result);
    });
  });
});