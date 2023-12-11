import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  showAddPanel:false,
};

const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setShowAddPanel(init, action) {
      const state = init;
      state.showAddPanel = action.payload;
    },
  },
});

// reducers exports
export const { setShowAddPanel } = CommonSlice.actions;

export default CommonSlice.reducer;
