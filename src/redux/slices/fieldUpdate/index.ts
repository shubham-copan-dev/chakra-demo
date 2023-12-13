import { createSlice } from '@reduxjs/toolkit';
import { FieldUpdateState } from './interface';

// initial state
const initialState = {
  fieldUpdateMode: 'instant',
  editedFields: null,
  selectedRows: null,
  selectedViewBy: 'all',
} as FieldUpdateState;

const fieldUpdateSlice = createSlice({
  name: 'fieldUpdate',
  initialState,
  reducers: {
    setFieldUpdateMode(init, action) {
        const state = init;
        state.fieldUpdateMode = action.payload;
      },   
    setEditedFields(init, action) {
      const state = init;
      if (state.editedFields && action?.payload) {
        const recordExist = state.editedFields?.find((item) => item?.id === action?.payload?.id);
        if (recordExist) {
          const copied = [...state.editedFields];
          const index = copied?.findIndex((item) => item?.id === action?.payload?.id);
          const record = { ...recordExist, ...action.payload };
          copied?.splice(index, 1, record);
          state.editedFields = copied;
        } else {
          const copied = [...state.editedFields];
          copied?.push(action?.payload);
          state.editedFields = copied;
        }
      } else {
        state.editedFields = action.payload ? [action.payload] : action.payload;
      }
    },
    setSelectedRows(init, action) {
      const state = init;
      state.selectedRows = action.payload;
    },
    setSelectedViewBy(init, action) {
      const state = init;
      state.selectedViewBy = action.payload;
    },
  },
});

// reducers exports
export const {
  
  setFieldUpdateMode,
  setEditedFields,
  setSelectedRows,
  setSelectedViewBy
} = fieldUpdateSlice.actions;

export default fieldUpdateSlice.reducer;
