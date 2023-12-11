import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  showAddPanel:false,
  isFullScreen:false,
};

const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setShowAddPanel(init, action) {
      const state = init;
      state.showAddPanel = action.payload;
    },
    setFullScreen(init, action) {
      const state = init;
      state.isFullScreen = action.payload;
    },
  },
});

// reducers exports
export const { setShowAddPanel,setFullScreen } = CommonSlice.actions;

export default CommonSlice.reducer;
