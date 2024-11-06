// src/App.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import Auth from './Auth';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {
    const [token, setToken] = useState(null);
    const [tasksUpdated, setTasksUpdated] = useState(0);

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`/api/tasks/${id}`, { headers: { Authorization: token } });
    //         setTasksUpdated(tasksUpdated + 1);
    //     } catch (error) {
    //         console.error('Error deleting task:', error);
    //     }
    // };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            {token ? (
                <>
                    <TaskForm token={token} onTaskAdded={() => setTasksUpdated(tasksUpdated + 1)} />
                    {/* <TaskList token={token} onDelete={handleDelete} /> */}
                </>
            ) : (
                <Auth setToken={setToken} />
            )}
        </div>
    );
};

export default App;
