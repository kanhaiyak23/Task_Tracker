// src/Auth.js
import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegistering ? '/api/auth/register' : '/api/auth/login';
        try {
            const response = await axios.post(url, { username, password });
            if (!isRegistering) {
                setToken(response.data.token);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {isRegistering ? 'Register' : 'Login'}
                </button>
                <p className="mt-4">
                    {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
                    <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500">
                        {isRegistering ? 'Login' : 'Register'}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Auth;
