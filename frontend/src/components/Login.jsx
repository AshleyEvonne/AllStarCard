import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response;

      console.log(response.ok);

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        navigate("/")
        window.location.reload();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gradient-to-b from-purple-700 via-fuchsia-500 to-orange-400">
      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )} 
        <div>
        <h3 className="text-4xl font-bold text-gray-300 underline decoration-purple-400 decoration-2px decoration-double">
          LOGIN
        </h3>
       
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-gray-200 bg-opacity-50 shadow-md sm:max-w-md sm:rounded-lg hover:bg-opacity-40">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
      
          <div className="flex items-center justify-end mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 hover:text-white bg-yellow-500 rounded-lg shadow-md shadow-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </div>
        </form>
        <a className="underline text-white hover:cursor-pointer" onClick={() => navigate('/signup')}>
          Don't have an account?
        </a>
      </div>
    </div>
  );
};

export default Login;