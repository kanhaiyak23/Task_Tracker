import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/tasksSlices"; // Import the addTask action

const TaskForm = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(), // Unique ID for the task
      title: e.target.title.value,
      description: e.target.description.value,
      priority: e.target.priority.value,
      status: e.target.status.value,
      assignee: e.target.assignee.value,
      dueDate: e.target.dueDate.value,
      createdAt: new Date().toISOString(), // Timestamp for task creation
    };

    dispatch(addTask(newTask)); // Dispatch the action to add the task to Redux store

    // Reset form fields after submission
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Task</h2>
      <div className="mb-4">
        <input
          name="title"
          type="text"
          placeholder="Task Title"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          placeholder="Description"
          required
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          name="priority"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-4">
        <select
          name="status"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          name="assignee"
          type="text"
          placeholder="Assignee"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          name="dueDate"
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
