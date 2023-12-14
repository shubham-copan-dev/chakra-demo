import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salesforce } from "@/axios/actions/salesforce";
import { Props } from "@/axios/interface";


const initialState = {
  viewByMeta: null,
  viewmetaLoader:true,
    error: null,
  };


export const fetchViewMetaData: any = createAsyncThunk(
  "fetchViewMetaData/fetchViewData",
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

const ViewMetaDataSlice = createSlice({
  name: "viewmetadata",
  initialState,
  reducers: {
    setViewByMeta(init, action) {
        const state = init;
        state.viewByMeta = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewMetaData.pending, (init) => {
        const state = init;
        state.viewmetaLoader = true;
      })
      .addCase(fetchViewMetaData.fulfilled, (init, action) => {
        const state = init;
        state.viewmetaLoader = false;
        state.viewByMeta = action.payload.data;
      })
      .addCase(fetchViewMetaData.rejected, (init, action) => {
        const state = init;
        state.viewmetaLoader = false;
        console.log("failed", action);
        (state.error as any) = action.error.message;
      });
  },
});

// reducers exports
export const { setViewByMeta } = ViewMetaDataSlice.actions;
export default ViewMetaDataSlice.reducer;
