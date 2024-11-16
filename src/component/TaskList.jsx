import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTask, deleteTask } from "../redux/slices/tasksSlices"; // Assuming deleteTask is defined
import EditTaskModal from "./EditTaskModal";
const TaskList = ({ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks); // Fetch tasks from Redux store

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId)); // Dispatch delete task action
  };

  const handleEditClick = (task) => {
    dispatch(setSelectedTask(task)); // Set the task to be edited
    setIsModalOpen(true);
    // Open the edit modal
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">
          No tasks available. Add a new task!
        </p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Priority: {task.priority}</span>
                <span>Status: {task.status}</span>
                <span>Assignee: {task.assignee}</span>
                <span>Due: {task.dueDate}</span>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <EditTaskModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default TaskList;
