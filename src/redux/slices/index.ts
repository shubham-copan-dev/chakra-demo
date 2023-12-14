import { combineReducers } from "@reduxjs/toolkit";

// slices imports
import AuthSlice from "./auth";
import salesforceSlice from "./salesForce";
import recordDataslice from "./gridrecords";
import metaDataSlice from "./gridmetadata";
import dashboardSlice from "./dashboard";
import fieldUpdateSlice from "./fieldUpdate";
import ViewMetaDataSlice from "./viewmetadata";
import CommonSlice from "./common";

// combine reducer
const rootReducer = combineReducers({
  auth: AuthSlice,
  navdata: dashboardSlice,
  common: CommonSlice,
  salesforce: salesforceSlice,
  fieldupdate: fieldUpdateSlice,
  Viewmetadata: ViewMetaDataSlice,
  records: recordDataslice,
  metadata: metaDataSlice,
});

export default rootReducer;
