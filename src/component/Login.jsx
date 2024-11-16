import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Adjust the path to your image
import bug_cover from '../assets/bug_cover.png';

export default function LoginForm() {
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    // Mock credentials
    const mockCredentials = {
      username: 'username',
      password: 'password',
    };

    // Mock validation (you can replace this with your real API response logic)
    if (username === mockCredentials.username && password === mockCredentials.password) {
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify({ username })); // Save user data in local storage
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Navigate to the dashboard page after successful login
    } else {
      toast.error('Invalid credentials');
      setError('Invalid credentials'); // Show error if credentials do not match
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-500">
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg border border-gray-300 w-full max-w-5xl">
        {/* Side Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={bug_cover}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-l-lg border-r border-gray-300"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center border-b border-gray-300 pb-3">
            Bug Tracker 
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p> To log in:</p>
            <p>
              <strong>Username:</strong> username
            </p>
            <p>
              <strong>Password:</strong> password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}