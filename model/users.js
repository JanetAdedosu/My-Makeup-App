const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
host: process.env.DB_HOST || '127.0.0.1',
user: process.env.DB_USER || 'root',
password: process.env.DB_PASS || '',
database: process.env.DB_NAME || 'database',
connectionLimit: 10,
multipleStatements: true,
});

const query = util.promisify(pool.query).bind(pool);

// Function to create a new user
async function createUser(username, password) {
try {
    const result = await query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return result.insertId; // Return the ID of the inserted user
} catch (error) {
    throw error;
}
}

// Function to find a user by username
async function findUserByUsername(username) {
try {
    const [rows] = await query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0]; // Return the first user found (if any)
} catch (error) {
    throw error;
}
}

module.exports = {
createUser,
findUserByUsername,
  // Add other user-related functions as needed
};
