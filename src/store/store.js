import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import collabReducer from './collabSlice';
import taskRouter from './taskSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    collab: collabReducer,
    task: taskRouter,
  },
});

export default store;
