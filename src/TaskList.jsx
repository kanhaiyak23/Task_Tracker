// src/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ token, onDelete }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('/api/tasks', {
                headers: { Authorization: token },
            });
            setTasks(response.data);
        };

        fetchTasks();
    }, [token]);

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl mb-4">Tasks</h2>
            <ul className="bg-white shadow-md rounded-lg">
                {tasks.map((task) => (
                    <li key={task._id} className="p-4 border-b">
                        <h3 className="text-lg font-bold">{task.title}</h3>
                        <p>{task.description}</p>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
