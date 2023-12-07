import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  selectedNav:'Home',
};

const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSelectedNav(init, action) {
      const state = init;
      state.selectedNav = action.payload;
    },
  },
});

// reducers exports
export const { setSelectedNav } = CommonSlice.actions;

export default CommonSlice.reducer;
