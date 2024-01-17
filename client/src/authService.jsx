const loginUser = async (credentials) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();

        // Check if the response contains a token before storing it
        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Login successful:', data);
        } else {
            console.warn('Login response does not contain a token.');
        }

    } catch (error) {
        console.error('Error during login:', error);
    }
};

const registerUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    const data = await response.json();
    console.log('Registration successful:', data);

    } catch (error) {
    console.error('Error during registration:', error);
    }
};

const getUserData = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/api/user?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to fetch user data:', errorData);
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log('User data:', userData);

        return userData;

    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
};



export { loginUser, registerUser, getUserData };
