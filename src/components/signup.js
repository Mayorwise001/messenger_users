import React, { useState } from 'react';
import axios from 'axios';
import './styles_css/index.css'; // Import the CSS file
import logo from './images/messenger_image.png'; // Assuming you have a logo image file

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [darkMode, setDarkMode] = useState(false); // State for dark mode

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setUsername((e.target.value + lastName).toLowerCase());
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setUsername((firstName + e.target.value).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/sign-up', {
                firstName,
                lastName,
                password,
                confirmPassword,
            });
            setMessage(response.data.message);
            setMessageType('success');
        } catch (error) {
            setMessage(error.response.data.errors[0].msg);
            setMessageType('error');
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
                <form onSubmit={handleSubmit} className="sign-up-form">
                <h1>Sign Up Form</h1>
                    <div className="input-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            readOnly
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">Sign Up</button>
                    Already have an account? <a href="/login">Login.</a>
                    {message && <p className={`message ${messageType}`}>{message}</p>}
                    <p className="login-link">
                </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
