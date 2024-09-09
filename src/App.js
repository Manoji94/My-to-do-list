import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import Register from './Register';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    // Check localStorage on app load to persist authentication state
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        
        if (storedToken && storedUsername) {
            setToken(storedToken);
            setUsername(storedUsername);
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = (token, username) => {
        // Store token and username in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        setToken(token);
        setUsername(username);
        setIsAuthenticated(true);
    };

    const handleRegisterSuccess = () => {
        setIsRegistering(false);
    };

    const handleSwitchToRegister = () => {
        setIsRegistering(true);
    };

    const handleSwitchToLogin = () => {
        setIsRegistering(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setToken(null);
        setUsername(null);

        // Remove token and username from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                isRegistering ? (
                    <Register
                        onRegisterSuccess={handleRegisterSuccess}
                        onSwitchToLogin={handleSwitchToLogin}
                    />
                ) : (
                    <Login
                        onLoginSuccess={handleLoginSuccess}
                        onSwitchToRegister={handleSwitchToRegister}
                    />
                )
            ) : (
                <div className="text-center">
                    <ToDo token={token} username={username} />
                    <button className="btn btn-primary" onClick={handleLogout} style={{ width: '50%' }}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default App;
