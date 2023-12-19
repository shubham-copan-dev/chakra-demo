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
  isRecordLoaded: false,
  isRecordRejected:false,
  rejectedRowErrormsg:null,
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
    setRecordRejected(init, action) {
      const state = init;
      state.isRecordRejected = action.payload;
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
        state.isRecordLoaded = false;
      })
      .addCase(fetchRecords.fulfilled, (init, action) => {
        const state = init;
        state.records = null;
        state.isRecordLoaded = true;
        state.records = action.payload.data.data.records;
        if(action.payload.data.data.records.length === 0){
          state.isRecordRejected = true;
          state.records = null;
        }
      })
      .addCase(fetchRecords.rejected, (init, action) => {
        const state = init;
        state.isRecordLoaded = true;
        state.isRecordRejected = true;
        console.log("failed", action);
        (state.error as any) = action.error.message;
        console.log(action.error.message,'redux');
        
      });
  },
});

// reducers exports
export const { setRecordData, updateRecord,setRecordRejected } = recordDataSlice.actions;
export default recordDataSlice.reducer;
