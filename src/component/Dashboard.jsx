import React from "react";
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Bug Tracker</h1>
          <button
            onClick={() => handleAddTask({
              id: Date.now(),
              title: "New Task",
              description: "Sample description",
              priority: "Medium",
              status: "Pending",
              dueDate: new Date().toISOString().split("T")[0],
              assignee: "Unassigned",
            })}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Add Task
          </button>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Tasks
          </h2>
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
