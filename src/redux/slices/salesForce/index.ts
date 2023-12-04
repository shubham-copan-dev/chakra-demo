import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import { salesforce } from '@/axios/actions/salesforce';

export const fetchSalesforceData:any = createAsyncThunk(
  'salesforce/fetchData',
  async () => {
    try {
      const response = await salesforce({ method: 'GET', url: 'objects' });
      console.log(response,"From Thunk...");
      return response.data;
    } catch (error:any) {
      console.log(error);
      throw error
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,  
}

const salesforceSlice = createSlice({
  name: 'salesforce',
  initialState,
  reducers: {
    setSalesForce(init,action){
      const state = init;
      state.data = action.payload
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesforceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesforceData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
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

