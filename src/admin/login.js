import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL || 'https://gsff.qweb.dev/';

        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            navigate('/admin');
        })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-purple-800">Login</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-purple-700 mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-purple-700 mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;