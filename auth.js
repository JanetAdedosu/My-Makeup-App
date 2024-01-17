const loginUser = async (credentials) => {
    try {
    const response = await fetch('/api/login', {
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

      // Store the JWT in localStorage
    localStorage.setItem('token', data.token);

    } catch (error) {
    console.error('Error during login:', error);
    }
};

export { loginUser };