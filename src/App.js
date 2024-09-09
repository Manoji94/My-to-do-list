import React, { useState } from 'react';
import ToDo from './ToDo';
import Register from './Register';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [token, setToken] = useState(null);

    const handleLoginSuccess = (token) => {
        setToken(token);
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
        // Optionally, clear tokens or user data from local storage here
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
                    <ToDo token={token} />
                    <button className="btn btn-primary" onClick={handleLogout} style={{ width: '70%' }}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default App;
