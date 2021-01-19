import * as plugins from './plugins.js';
import { Schema } from 'mongoose';

const AccountSchema = new Schema({
  
  AdvertiserId : {
    index : true,
    required : true,
    type : Schema.Types.String
  },
  BuyerId : {
    index : true,
    required : true,
    type : Schema.Types.String
  },
  Id : {
    index : { 
      unique : true
    },
    required : true,
    type : Schema.Types.String
  },
  Name : {
    index : false,
    required : true,
    type : Schema.Types.String
  },
  ProviderData : {
    index : false,
    required : false,
    type : Schema.Types.Mixed
  },
  ThirdPartyId : {
    index : true,
    required : true,
    type : Schema.Types.String
  }
}, {
  useNestedStrict : true
});

// add index for surrogate key
AccountSchema.index({
  AdvertiserId : 1,
  BuyerId : 1,
  ThirdPartyId : 1
}, {
  sparse : true,
  unique : true
});

plugins.timestamps(AccountSchema);
plugins.toObject(AccountSchema);

export default AccountSchema;