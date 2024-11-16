import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlices';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
