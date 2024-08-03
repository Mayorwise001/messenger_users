import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from './messenger_image.png'; // Assuming you have a logo image file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Add state for message type
    const [darkMode, setDarkMode] = useState(false); // State for dark mode
    const [loading, setLoading] = useState(false); // State for loading
    const [authenticating, setAuthenticating] = useState(false); // State for authentication

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password
            });
             setMessage(response.data.message);

             const token = response.data.token;
             const user = response.data.user.username;
             setMessageType('success'); // Set message type to success
             localStorage.setItem('token', token);
             localStorage.setItem('user', user);
             setLoading(false); // Stop loading
             setAuthenticating(true); // Start authenticating


            // Redirect to dashboard or home page after successful login
            setTimeout(() => {
                navigate('/'); // Or any route you want to redirect to
                
            }, 200);

            } catch (error) {
                setLoading(false); // Stop loading
                if (error.response && error.response.data.errors) {
                    setMessage(error.response.data.errors.map(err => err.msg).join(', '));
                    setMessageType('error'); // Set message type to error
                } else if (error.response && error.response.data.error) {
                    setMessage(error.response.data.error);
                    setMessageType('error'); // Set message type to error
                } else {
                    setMessage('An unexpected error occurred');
                    setMessageType('error');
                }
            }
        };


        return (
<div className={darkMode ? 'app-container dark-mode' : 'app-container'}>
            <div className="toggle-container">
                <label>Dark Mode</label>
                <div className="toggle-switch" onClick={() => setDarkMode(!darkMode)}>
                    <div className={`toggle-thumb ${darkMode ? 'dark' : ''}`}></div>
                </div>
            </div>
            <div className="form-wrapper">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Welcome to Mayorwise Messenger</h1>
                <h1>Login</h1>
                {message && (
                    <p className={`message ${messageType}`}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? (
                            <span>
                                <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" /> Authenticating...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>
                    <div className="button-group">
                        <Link to="/sign-up" className="btn">Register</Link>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login;