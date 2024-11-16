import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTask,
  deleteTask,
  setSelectedTask,
} from "../redux/slices/tasksSlices";

const EditTaskModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.tasks.selectedTask); // Get the task to edit from Redux

  useEffect(() => {
    if (isOpen && !taskData) {
      // If the modal is open and no task is selected, do nothing or reset form
    }
  }, [isOpen, taskData]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    dispatch(updateTask(taskData)); // Dispatch the action to update the task in Redux
    closeModal(); // Close the modal after updating
    dispatch(setSelectedTask(null)); // Clear the selected task from Redux
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskData.id)); // Dispatch the action to delete the task
    closeModal(); // Close the modal after deleting
    dispatch(setSelectedTask(null)); // Clear the selected task from Redux
  };

  const handleChange = (field, value) => {
    dispatch(setSelectedTask({ ...taskData, [field]: value })); // Update specific task field in Redux
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Task</h2>
        <form onSubmit={handleUpdateTask}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Title"
              value={taskData?.title || ""}
              onChange={(e) => handleChange("title", e.target.value)} // Update task title in Redux
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Description"
              value={taskData?.description || ""}
              onChange={(e) => handleChange("description", e.target.value)} // Update description in Redux
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <select
              value={taskData?.priority || "Low"}
              onChange={(e) => handleChange("priority", e.target.value)} // Update priority in Redux
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-4">
            <select
              value={taskData?.status || "Pending"}
              onChange={(e) => handleChange("status", e.target.value)} // Update status in Redux
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Assignee"
              value={taskData?.assignee || ""}
              onChange={(e) => handleChange("assignee", e.target.value)} // Update assignee in Redux
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="date"
              value={taskData?.dueDate || ""}
              onChange={(e) => handleChange("dueDate", e.target.value)} // Update due date in Redux
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleDeleteTask}
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
