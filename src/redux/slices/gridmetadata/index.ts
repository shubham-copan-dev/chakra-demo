import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salesforce } from "@/axios/actions/salesforce";
import { Props } from "@/axios/interface";

export const fetchMetaData: any = createAsyncThunk(
  "fetchMetaData/fetchData",
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
  metadata: null,
  metaLoader: false,
  error: null,
};

const metaDataSlice = createSlice({
  name: "salesforce",
  initialState,
  reducers: {
    setMetaData(init, action) {
      const state = init;
      state.metadata = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetaData.pending, (init) => {
        const state = init;
        state.metaLoader = true;
      })
      .addCase(fetchMetaData.fulfilled, (init, action) => {
        const state = init;
        state.metadata = null;
        state.metaLoader = false;
        state.metadata = action.payload.data.data.columns;
      })
      .addCase(fetchMetaData.rejected, (init, action) => {
        const state = init;
        state.metaLoader = false;
        console.log("failed", action);
        (state.error as any) = action.error.message;
      });
  },
});

// reducers exports
export const { setMetaData } = metaDataSlice.actions;
export default metaDataSlice.reducer;
