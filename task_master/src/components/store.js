// store.js
import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from './drawerSlice';
import projectReducer from './projectSlice';
import taskReducer from './taskSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    projects: projectReducer,
    tasks: taskReducer,
    notifications: notificationsReducer,
  },
});