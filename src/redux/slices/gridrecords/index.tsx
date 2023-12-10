import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salesforce } from "@/axios/actions/salesforce";
import { Props } from "@/axios/interface";

export const fetchRecords: any = createAsyncThunk(
  "fetchRecords/fetchData",
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
  records: null,
  recordLoading: false,
  error: null,
};

const recordDataSlice = createSlice({
  name: "salesforce",
  initialState,
  reducers: {
    setRecordData(init, action) {
      const state = init;
      state.records = action.payload;
    },
    setRecordLoading(init, action) {
      const state = init;
      state.recordLoading = action.payload;
    },
    updateRecord(init, action) {
      const state = init;
      if (state.records) {
        const newRecords = [...state.records];
        const indexOfRecord = newRecords?.findIndex(
          (item) => item?.Id === action.payload?.Id
        );
        newRecords.splice(indexOfRecord, 1, action.payload);
        state.records = newRecords;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (init) => {
        const state = init;
        state.recordLoading = true;
      })
      .addCase(fetchRecords.fulfilled, (init, action) => {
        const state = init;
        state.records = null;
        state.recordLoading = false;
        state.records = action.payload.data.data.records;
      })
      .addCase(fetchRecords.rejected, (init, action) => {
        const state = init;
        state.recordLoading = false;
        console.log("failed", action);
        (state.error as any) = action.error.message;
      });
  },
});

// reducers exports
export const { setRecordData, updateRecord } = recordDataSlice.actions;
export default recordDataSlice.reducer;
