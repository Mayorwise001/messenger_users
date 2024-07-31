import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Add state for message type
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password
            });
             setMessage(response.data.message);
             setMessageType('success'); // Set message type to success


            } catch (error) {
                setMessage('wrong email or password');
                setMessageType('error'); // Set message type to error
            }
        };


        return (
            <div className="container">
            <div className="login-container">
                <h2>Login</h2>
                {message && (
                        <p className={`message ${messageType}`}>
                            {message}
                        </p>
                    )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-group">
                                <button type="submit">Login</button>
                                <Link to="/sign-up" className="btn">Register</Link>
                                <Link to="/logout" className="btn">Logout</Link>
                            </div>
                </form>
        
        
        
            </div>
        </div>
          );
        






};

export default Login;