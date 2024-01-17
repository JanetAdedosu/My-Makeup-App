import React, { useState } from 'react';
import { loginUser, getUserData } from './authService'; // Import the loginUser and getUserData functions
import './login.css';

const Login = () => {
const [credentials, setCredentials] = useState({
    username: '',
    password: '',
});

const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
    ...prevCredentials,
    [name]: value,
    }));
};

const handleLogin = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    setSuccessMessage('You have successfully logged in!');
    console.log('Login successful');


        if (response.status === 404) {
            const { error } = await response.json();
            throw new Error(error);
        }

        if (response.status === 401) {
            const { error } = await response.json();
            throw new Error(error);
        }

        if (response.status === 200) {
        const { token } = await response.json();

        // Store the token in local storage or a secure storage mechanism
        localStorage.setItem('token', token);

        // Reset error message
        setErrorMessage('');

        // Call the loginUser function from authService
        await loginUser(credentials);

        // Fetch user data after a successful login
        const userData = await getUserData(credentials.username); // Pass the username
    }
    } catch (error) {
    console.error('Error during login:', error);

    setErrorMessage(error.message);
    }
};

return (
    <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Add this line */}
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
);
};

export default Login;
