import { combineReducers } from '@reduxjs/toolkit';

// slices imports
import AuthSlice from './auth';
import salesforceSlice from './salesForce'
import recordDataslice from './gridrecords'
import metaDataSlice from './gridmetadata'
import CommonSlice from './common'


// combine reducer
const rootReducer = combineReducers({
  auth: AuthSlice,
  common: CommonSlice,
  salesforce:salesforceSlice,
  records:recordDataslice,
  metadata:metaDataSlice,
});

export default rootReducer;
