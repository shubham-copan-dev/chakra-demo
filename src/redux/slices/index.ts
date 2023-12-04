import { combineReducers } from '@reduxjs/toolkit';

// slices imports
import AuthSlice from './auth';
import salesforceSlice from './salesForce'


// combine reducer
const rootReducer = combineReducers({
  auth: AuthSlice,
  salesforce:salesforceSlice,
});

export default rootReducer;
