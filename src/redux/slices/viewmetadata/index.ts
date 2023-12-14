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
      deleteViewByMeta(init, action) {
        const state = init;
        if (state.viewByMeta) {
          const copyMeta = [...state.viewByMeta];
          const index = copyMeta?.findIndex((fi) => fi?._id === action.payload);
          copyMeta?.splice(index, 1);
          state.viewByMeta = copyMeta;
        }
      },
      pushToViewBy(init, action) {
        const state = init;
        state.viewByMeta?.push(action?.payload);
      },
      updateViewByMeta(init, action) {
        const state = init;
        if (state.viewByMeta) {
          const copyViews = [...state.viewByMeta];
          const indexOfRecord = copyViews?.findIndex((item) => item?._id === action.payload?._id);
          copyViews.splice(indexOfRecord, 1, action.payload);
          state.viewByMeta = copyViews;
        }
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
export const { setViewByMeta,deleteViewByMeta,pushToViewBy,updateViewByMeta } = ViewMetaDataSlice.actions;
export default ViewMetaDataSlice.reducer;
