import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegisterSuccess, onSwitchToLogin }) {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://mjkr94.pythonanywhere.com/accounts/register/', {
                username,
                password1,
                password2,
            });

            if (response.status === 201) {
                onRegisterSuccess();
            }
        } catch (error) {
            setError('Sign-up failed. Please ensure passwords match and try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="m-4">
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
                                    <label htmlFor="password1" className="form-label">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password1"
                                        value={password1}
                                        onChange={(e) => setPassword1(e.target.value)}
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </td>
                            <td style={{ width: '15%' }}></td>
                        </tr>

                        {/* Confirm Password Field */}
                        <tr>
                            <td style={{ width: '15%' }}></td>
                            <td style={{ width: '70%' }}>
                                <div className="mb-3">
                                    <label htmlFor="password2" className="form-label">
                                        Confirm Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password2"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
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
                                    Register
                                </button>
                            </td>
                            <td style={{ width: '15%' }}></td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {/* Error Message */}
            {error && <p className="error text-danger text-center">{error}</p>}

            {/* Switch to Login */}
            <div className="m-4 text-center">
                <button onClick={onSwitchToLogin} className="btn btn-link">
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
}

export default Register;
