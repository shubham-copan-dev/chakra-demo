import { combineReducers } from '@reduxjs/toolkit';

// slices imports
import AuthSlice from './auth';
import salesforceSlice from './salesForce'
import recordDataslice from './gridrecords'
import metaDataSlice from './gridmetadata'


// combine reducer
const rootReducer = combineReducers({
  auth: AuthSlice,
  salesforce:salesforceSlice,
  records:recordDataslice,
  metadata:metaDataSlice,
});

export default rootReducer;
