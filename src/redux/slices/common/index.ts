import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  showAddPanel:false,
  isFullScreen:false,
  isNavTabClicked:false
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
    setNavTabClicked(init, action) {
      const state = init;
      state.isNavTabClicked = action.payload;
    },
  },
});

// reducers exports
export const { setShowAddPanel,setFullScreen,setNavTabClicked } = CommonSlice.actions;

export default CommonSlice.reducer;
