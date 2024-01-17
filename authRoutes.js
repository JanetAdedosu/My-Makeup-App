const express = require('express');
const router = express.Router();
const User = require('./model/users');


// Register route
router.post('/api/register', async (req, res) => {
    try {
        console.log('Received registration request:', req.body);

        // Extract user information from request body
        const { username, password } = req.body;

        // Validate input data
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            username,
            password,
        });

        // Save the user to the database
        await newUser.save();
        console.log('Registration successful');

        // Return a success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/login', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Validate input data
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
        const user = rows[0];
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'This account does not exist.' });
        }

        // Return a success response
        res.json({ message: 'Login successful', username: user.username });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;