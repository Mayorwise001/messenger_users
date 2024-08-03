import React, { useState } from 'react';
import LeftSidebar from './leftsidebar'; // Adjust the path as needed
import Profile from './components/Profile'; // Adjust the path as needed
import Users from './components/Users'; // Adjust the path as needed
import Chats from './components/Chats'; // Adjust the path as needed
import Settings from './components/Settings'; // Adjust the path as needed
import Logout from './components/Logout'; // Adjust the path as needed





const App = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="app-container">
      <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
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

export default App;
