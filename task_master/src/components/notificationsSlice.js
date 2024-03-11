import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    loadNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { addNotification, loadNotifications } = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;

export default notificationsSlice.reducer;
