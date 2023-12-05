import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import { salesforce } from '@/axios/actions/salesforce';
import { Props } from '@/axios/interface';

export const fetchSalesforceData:any = createAsyncThunk(
  'salesforce/fetchData',
  async (props:Props) => {
    try {
      const response = await salesforce(props);
      console.log(response, "From Thunk...");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


const initialState = {
  viewGridData: [],
  gridViewId:null,
  loading: false,
  error: null,  
}

const salesforceSlice = createSlice({
  name: 'salesforce',
  initialState,
  reducers: {
    setSalesForce(init,action){
      const state = init;
      state.viewGridData = action.payload
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesforceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesforceData.fulfilled, (state, action) => {
        state.loading = false;
        state.viewGridData = action.payload.data;
        state.gridViewId = action.payload.data[0]._id;
        state.error = null;
      })
      .addCase(fetchSalesforceData.rejected, (state, action) => {
        state.loading = false;
        console.log('failed',action);
        
        (state.error as any) = action.error.message;
      });
  },
});

// reducers exports
export const {
  setSalesForce
} = salesforceSlice.actions;
export default salesforceSlice.reducer;

