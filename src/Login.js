import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess, onSwitchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://mjkr94.pythonanywhere.com/api-token-auth/', {
                username,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;
                onLoginSuccess(token, username); // Pass token to App component
            }
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="m-4">
                <table style={{ width: '100%' }}>
                    <tbody>
                        {/* Username Field */}
                        <tr>
                            <td style={{ width: '15%' }}></td>
                            <td style={{ width: '70%' }}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </td>
                            <td style={{ width: '15%' }}></td>
                        </tr>

                        {/* Password Field */}
                        <tr>
                            <td style={{ width: '15%' }}></td>
                            <td style={{ width: '70%' }}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </td>
                            <td style={{ width: '15%' }}></td>
                        </tr>

                        {/* Submit Button */}
                        <tr>
                            <td style={{ width: '15%' }}></td>
                            <td style={{ width: '70%', textAlign: 'center' }}>
                                <button type="submit" className="btn btn-primary" style={{ width: '70%' }}>
                                    Login
                                </button>
                            </td>
                            <td style={{ width: '15%' }}></td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {/* Error Message */}
            {error && <p className="error text-danger text-center">{error}</p>}

            {/* Switch to Register */}
            <div className="m-4 text-center">
                <button onClick={onSwitchToRegister} className="btn btn-link">
                    Don't have an account? Register
                </button>
            </div>
        </div>
    );
}

export default Login;