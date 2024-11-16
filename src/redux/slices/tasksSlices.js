import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  selectedTask: null, // Add selectedTask to the initial state if you intend to manage it
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload }; // Merge updated task
      }
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload; // Set the task for editing
    },
  },
});

export const { addTask, deleteTask, updateTask, setSelectedTask } = tasksSlice.actions;
export default tasksSlice.reducer;
