import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTask, deleteTask, addTask } from "../redux/slices/tasksSlices";
import EditTaskModal from "./EditTaskModal";

const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Edit Task Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Create Task Modal
  const [filter, setFilter] = useState(""); // Filter criteria
  const [sortCriteria, setSortCriteria] = useState(""); // Sort criteria
  const [today, setToday] = useState('');

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
    setToday(formattedDate);
  }, []);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    assignee: "",
    dueDate: "",
  });

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks); // Fetch tasks from Redux store

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId)); // Dispatch delete task action
  };

  const handleEditClick = (task) => {
    dispatch(setSelectedTask(task)); // Set the task to be edited
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false); // Close the create modal
    resetNewTask();
  };

  const resetNewTask = () => {
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      assignee: "",
      dueDate: "",
    });
  };

  const handleAddTask = () => {
    dispatch(addTask({ ...newTask, id: Date.now() })); // Add new task with a unique ID
    closeCreateModal();
  };

  // Filter tasks based on criteria
  const filteredTasks = tasks.filter((task) => {
    if (!filter) return true; // No filter applied
    return task.status === filter || task.priority === filter;
  });

  // Sort tasks based on criteria
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (!sortCriteria) return 0; // No sorting applied
    if (sortCriteria === "priority") {
      return a.priority.localeCompare(b.priority);
    }
    if (sortCriteria === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortCriteria === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  // Status color mapping
  const statusColor = {
    Pending: "text-yellow-500",
    Completed: "text-green-500",
    Overdue: "text-red-500",
    InProgress: "text-blue-500",
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Task List</h2>

      {/* Filter and Sort Controls */}
      <div className="flex space-x-4 mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">All</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          onChange={(e) => setSortCriteria(e.target.value)}
          value={sortCriteria}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">No Sort</option>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="status">Sort by Status</option>
        </select>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Task
        </button>
      </div>

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <p className="text-sm text-gray-600">No tasks available. Add a new task!</p>
      ) : (
        <ul className="space-y-4">
          {sortedTasks.map((task) => (
            <li key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Priority: {task.priority}</span>
                <span className={statusColor[task.status] || "text-gray-600"}>
                  Status: {task.status}
                </span>
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

      {/* Modals */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              required
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            ></textarea>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="InProgress">In Progress</option>
            </select>
            <input
              type="text"
              placeholder="Assignee"
              required
              value={newTask.assignee}
              onChange={(e) =>
                setNewTask({ ...newTask, assignee: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <input
              type="date"
              required
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              placeholder="17/07/2024"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeCreateModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
      <EditTaskModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TaskList;
