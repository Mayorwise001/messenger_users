import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles_css/users.css'
import profile  from '../images/profile 2.PNG'
import logo from '../images/messenger_image.png';

const UserMessages = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://backend-for-messenger.onrender.com/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-messages-container">
      <h2 className="user-messages-title">Chats</h2>
      <ul className="user-messages-list">
        {users.map((user) => (
          <li key={user._id} className="user-messages-item">
            <div className="user-messages-avatar">
              <img src={profile} alt="User Avatar" />
            </div>
            <div className="user-messages-content">
              <h4 className="user-messages-name">{user.firstName} {user.lastName}</h4>
              <p className="user-messages-preview">Chat with {user.firstName}</p>
            </div>
            <div className="user-messages-status">3d ago</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Users = () => {

    const [darkMode, setDarkMode] = useState(false);


  return (
    <div className={`app-container2 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="sidebar2">
        <UserMessages />
      </div>
      <div className="main-content2">
        
        <div className="welcome-message">
          <img src={logo} alt="Welcome Icon" />
          <h1>Welcome to the Mayorwise Messaging App!</h1>
        </div>
      </div>
    </div>
  );
};

export default Users;
