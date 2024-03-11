// uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    open: false,
  },
  reducers: {
    // toggleDrawer: state => {
    //   state.isDrawerOpen = !state.isDrawerOpen;
    // },
    openDrawer: state => {
      state.open = true
    },
    closeDrawer: state => {
      state.open = false
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
