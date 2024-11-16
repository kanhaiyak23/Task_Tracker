import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/tasksSlices";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Function to add a new task
  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center min-w-full">
      <div className="w-full max-w-full p-6 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Dashboard
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Create a Task
          </h2>
          <TaskForm addTask={handleAddTask} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Tasks
          </h2>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
