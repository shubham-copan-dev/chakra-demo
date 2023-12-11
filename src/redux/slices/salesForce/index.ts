import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salesforce } from "@/axios/actions/salesforce";
import { Props } from "@/axios/interface";

const initialState = {
  dashboards: [],
  viewGridData: [],
  gridViewId: null,
  defaultGridViewId: null,
  selectedGridTab: null,
  defaultGrid: [],
  isSucess: false,
  countFetch: 0,
  loading: false,
  error: null,
};

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
        state.isSucess = false;
      })
      .addCase(fetchSalesforceData.fulfilled, (init, action) => {
        const state = init;
        state.loading = false;
        state.isSucess = true;
        state.viewGridData = action.payload.data;
        state.defaultGrid = action.payload.data[0];
        state.defaultGridViewId = action.payload.data[0]._id;
        state.selectedGridTab = action.payload.data[0]._id;
        state.countFetch = state.countFetch + 1;
        state.error = null;
      })
      .addCase(fetchSalesforceData.rejected, (init, action) => {
        const state = init;
        state.loading = false;
        state.isSucess = true;
        console.log("failed", action);
        (state.error as any) = action.error.message;
      });
  },
});

// reducers exports
export const { setGridData, setGridId, setSelectedGridTab } =
  salesforceSlice.actions;
export default salesforceSlice.reducer;
