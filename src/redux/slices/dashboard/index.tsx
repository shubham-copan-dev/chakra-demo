import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salesforce } from "@/axios/actions/salesforce";
import { Props } from "@/axios/interface";

const initialState = {
  dashboards: [],
  isDashboardFetched: false,
  selectedNav: "Home",
  error: null,
};

export const fetchNavData: any = createAsyncThunk(
  "navdata/fetchNavData",
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

const dashboardSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    setNavData(state, action) {
      state.dashboards = action.payload;
    },
    setSelectedNav(state, action) {
      state.selectedNav = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavData.pending, (state) => {
        state.isDashboardFetched = false;
      })
      .addCase(fetchNavData.fulfilled, (state, action) => {
        state.dashboards = action.payload.data;
        state.isDashboardFetched = true;
      })
      .addCase(fetchNavData.rejected, (state, action) => {
        state.isDashboardFetched = true;
        state.error = action.error.message;
      });
  },
});

// Action creators from createSlice
export const { setNavData, setSelectedNav } = dashboardSlice.actions;
export default dashboardSlice.reducer;
