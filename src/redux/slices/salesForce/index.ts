import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salesforce } from "@/axios/actions/salesforce";
import { Props } from "@/axios/interface";

export const fetchSalesforceData: any = createAsyncThunk(
  "salesforce/fetchData",
  async (props: Props) => {
    try {
      const response = await salesforce(props);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  viewGridData: [],
  gridViewId: null,
  defaultGridViewId: null,
  selectedGridTab:null,
  defaultGrid: [],
  loading: false,
  error: null,
};

const salesforceSlice = createSlice({
  name: "salesforce",
  initialState,
  reducers: {
    setGridData(init, action) {
      const state = init;
      state.viewGridData = action.payload;
    },
    setGridId(init, action) {
      const state = init;
      state.gridViewId = action.payload;
    },
    setSelectedGridTab(init, action) {
      const state = init;
      state.selectedGridTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesforceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesforceData.fulfilled, (init, action) => {
        const state = init
        state.loading = false;
        state.viewGridData = action.payload.data;
        state.defaultGrid = action.payload.data[0];
        state.defaultGridViewId = action.payload.data[0]._id;
        state.selectedGridTab = action.payload.data[0]._id;
        state.error = null;
      })
      .addCase(fetchSalesforceData.rejected, (init, action) => {
        const state = init
        state.loading = false;
        console.log("failed", action);
        (state.error as any) = action.error.message;
      });
  },
});

// reducers exports
export const { setGridData, setGridId,setSelectedGridTab } = salesforceSlice.actions;
export default salesforceSlice.reducer;
