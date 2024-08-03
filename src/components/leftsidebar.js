import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers, FaComments, FaCog, FaSignOutAlt, FaMoon, FaSun, FaSpinner } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Profile from './sidebar/profile';
import Users from './sidebar/users'
import Chats from './sidebar/chats';
import Settings from './sidebar/settings';


const App = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [darkMode, setDarkMode] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAuthenticating(false);
    }, 2000); // Simulate an authentication delay
  }, []);



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (authenticating) {
    return (
      <div className="overlay">
        <span>
        <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" /> Please Wait...
        </span>
      </div>
    );
  }



  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="sidebar">
        <div className="sidebar-top">
          <div
            className={`sidebar-item ${activeTab === 'Profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('Profile')}
          >
            <FaUser className="sidebar-icon" />
            <span className="sidebar-text">Profile</span>
          </div>
          <div
            className={`sidebar-item ${activeTab === 'Users' ? 'active' : ''}`}
            onClick={() => setActiveTab('Users')}
          >
            <FaUsers className="sidebar-icon" />
            <span className="sidebar-text">Users</span>
          </div>
          <div
            className={`sidebar-item ${activeTab === 'Chats' ? 'active' : ''}`}
            onClick={() => setActiveTab('Chats')}
          >
            <FaComments className="sidebar-icon" />
            <span className="sidebar-text">Chats</span>
          </div>
          <div
            className={`sidebar-item ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('Settings')}
          >
            <FaCog className="sidebar-icon" />
            <span className="sidebar-text">Settings</span>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div
            className={`sidebar-item ${activeTab === 'Logout' ? 'active' : ''}`}
            onClick={() => setActiveTab('Logout')}
          >
            <FaSignOutAlt className="sidebar-icon" />
            <span className="sidebar-text"><Link to="/logout" className="btn logout">Logout</Link></span>
          </div>
          <div className="sidebar-item toggle-dark-mode" onClick={toggleDarkMode}>
          {darkMode ? <FaSun className="sidebar-icon" /> : <FaMoon className="sidebar-icon" />}
          <span className="sidebar-text ">{darkMode ? 'Light Mode ' : 'Dark Mode '}</span>
          <div className="toggle-switch" onClick={toggleDarkMode}>
            <div className={`toggle-thumb${darkMode ? 'dark' : ''}`}></div>
          </div>
        </div>
        </div>
      </div>
      {/* Main content */}
      <div className="main-content">
        {activeTab === 'Profile' && <Profile />}
        {activeTab === 'Users' && <Users />}
        {activeTab === 'Chats' && <Chats />}
        {activeTab === 'Settings' && <Settings />}
        {activeTab === 'Logout' && <Logout />}
      </div>
    </div>
  );
};



const Logout = () => <div>Logout Content</div>;

export default App;
