
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profile from '../images/profile 2.PNG';
import logo from '../images/messenger_image.png';
import '@fortawesome/fontawesome-free/css/all.min.css';



const UserMessages = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [previewImage, setPreviewImage] = useState(profile); // Initial state with the default profile image
  const [userData, setUserData] = useState({}); // State to store user data

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found, redirecting to login.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/users', {
          headers: { Authorization: token },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found, redirecting to login.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: token },
        });

        if (res.data) {
          setUserData((prevState) => ({
            ...prevState,
            ...res.data,
          }));
          setPreviewImage(
            res.data.profilePicture 
              ? `http://localhost:3000/${res.data.profilePicture}` 
              : profile
          ); // Set the preview image to the current profile picture
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  return (
    <div className="user-messages-container">
      <h2 className="user-messages-title">Chats</h2>
      <ul className="user-messages-list">
        {users.map((user) => (
          <li
            key={user._id}
            className="user-messages-item"
            onClick={() => onSelectUser(user)}
          >
            <div className="user-messages-avatar">
              <img
                src={previewImage}
                alt="User Avatar"
              />
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



const ChatBox = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user's information

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: token },
        });
        setCurrentUser(res.data.firstName); // Store the current user's information
      } catch (err) {
        console.error('Error fetching current user:', err);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login.');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/messages/${selectedUser._id}`, {
          headers: { Authorization: token },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, unable to send message.');
      return;
    }

    if (!newMessage.trim()) return;
    const messageWithUserName = `${currentUser}: ${newMessage}`; // Attach the selected user's first name to the message

    try {
      const res = await axios.post(
        `http://localhost:3000/api/messages/${selectedUser._id}`, 
        { 
          text: messageWithUserName, 
          senderName: currentUser?.firstName // Include the current user's name
        },
        { headers: { Authorization: token } }
      );

      if (res.status === 201) {
        setMessages([...messages, res.data]);
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-box">
      <h3>Chat with {selectedUser.firstName}</h3>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.sentByCurrentUser ? 'sent' : 'received'}`}>
            {msg.senderName && <small>Sent by: {msg.senderName}</small>}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const Users = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className={`app-container2 ${darkMode ? 'dark-mode' : ''}`}>
      {!selectedUser ? (
        <div className="sidebar2">
          <UserMessages onSelectUser={setSelectedUser} />
        </div>
      ) : (
        <div className="main-content2">
          <div className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left"></i> Back
          </div>
          <ChatBox selectedUser={selectedUser} />
        </div>
      )}
      {!selectedUser && (
        <div className="main-content2">
          <div className="welcome-message">
            <img src={logo} alt="Welcome Icon" />
            <h1>Welcome to the Mayorwise Messaging App!</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;


