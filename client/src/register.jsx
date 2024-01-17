import React, { useState } from 'react';
import { registerUser } from './authService';
import './register.css';

const Register = () => {
  // State to hold user registration data
const [userData, setUserData] = useState({
    username: '',
    password: '',
    // Add more fields as needed
});

  // State for success message
const [successMessage, setSuccessMessage] = useState('');

  // Event handler for form input changes
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
    ...prevData,
    [name]: value,
    }));
};

  // Event handler for form submission
const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call the registerUser function from authService
    await registerUser(userData);

      // Set success message
    setSuccessMessage('Your account has been created. Please proceed to login.');

      // Optionally, you can handle success (e.g., redirect user, show success message)
      // ...

    } catch (error) {
    console.error('Error during registration:', error);
      // Optionally, you can handle the error (e.g., display error message)
      // ...
    }
};

return (
    <div className="register-container">
    <h2>Register</h2>
    {successMessage && <p className="success-message">{successMessage}</p>}
    <form onSubmit={handleRegister}>
        <label>
        Username:
        <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
        />
        </label>
        <label>
        Password:
        <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
        />
        </label>
        {/* Add more form fields as needed */}
        <button type="submit">Register</button>
    </form>
    </div>
);
};

export default Register;

