const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Registration route
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for empty fields
        if (!username || !password) {
            return res.status(400).json({ error: 'Both username and password are required' });
        }

        const plainTextPassword = password;

        // Insert user into the Users table
        await pool.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password]);

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error registering user:', error);

        // Log the specific error message
        console.error('Registration error:', error.message);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Username already exists' });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    try {
        console.log('Received login request:', req.body);

        // Extract user information from the request body
        const { username, password } = req.body;


        // Find the user in the database
        const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // If authentication is successful, generate a JWT
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

        // Send the token in the response
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/user', async (req, res) => {
    try {
        console.log('Received GET request for /api/user');
        
        const username = req.query.username;

        // Find the user in the database
        const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
        const user = rows[0];

        // If the user doesn't exist, send an error response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
