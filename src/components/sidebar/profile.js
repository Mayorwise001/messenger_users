import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultAvatar from '../images/messenger_image.png'; // Default avatar image

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    profilePicture: '',
    facebookURL: '',
    linkedInURL: '',
    twitterURL: '',
    githubPages: '',
    aboutMe: '',
  });

  const [editable, setEditable] = useState(false);
  const [previewImage, setPreviewImage] = useState(); // State to store the preview image URL

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        // Handle missing token, e.g., redirect to login
        console.error('No token found, redirecting to login.');
        // window.location.href = '/login';
        return;
      }

      try {
        const res = await axios.get('https://backend-for-messenger.onrender.com/api/users/me', {
          headers: { Authorization:token },
        });

        if (res.data) {
          setUserData((prevState) => ({
            ...prevState,
            ...res.data,
          }));
        setPreviewImage(res.data.profilePicture ? `https://backend-for-messenger.onrender.com/${res.data.profilePicture}` : defaultAvatar); // Set the preview image to the current profile picture
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      console.error('No token found, unable to save.');
      return;
    }

    try {
      const res = await axios.put('https://backend-for-messenger.onrender.com/api/users/me', userData, {
        headers: { Authorization:token },
      });

      if (res.status === 200) {
        setEditable(false);
        // setPreviewImage(userData.profilePicture); // Update the preview image to the saved profile picture
      } else {
        console.error('Failed to save user data.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle file input change for profile picture upload
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the selected file
      const formData = new FormData();
      formData.append('profilePicture', file); // Append file to FormData

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, unable to upload image.');
        return;
      }

      axios.put('http://localhost:3000/api/users/me', formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            profilePicture: res.data.profilePicture, // Update the profile picture URL to the newly uploaded image
          }));
        } else {
          console.error('Failed to upload profile picture.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    }
  };


  return (
    <div className="profile-container">
      <h2 className="profile-title">Welcome, {userData.username}!</h2>
      <div className="profile-picture-container" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
      <img
        // src={previewImage || userData.profilePicture || defaultAvatar}
        src={previewImage}
        alt="Profile"
        className="profile-picture"
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
                 {editable && (
            <input
              accept="image/*"
              id="upload-button"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the file input
            />
          )}

       </div>
       {editable && (
          <button
            onClick={() => document.getElementById('upload-button').click()}
            className="upload-button"
            style={{ marginLeft: '16px' }}
          >
            Upload
          </button>
        )}
    </div>
      <div className="profile-info">
        <div className="profile-field">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            disabled
          />
        </div>
        <div className="profile-field">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            disabled
          />
        </div>
        <div className="profile-field">
          <label>Facebook URL:</label>
          <input
            type="text"
            name="facebookURL"
            value={userData.facebookURL}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>
        <div className="profile-field">
          <label>LinkedIn URL:</label>
          <input
            type="text"
            name="linkedInURL"
            value={userData.linkedInURL}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>
        <div className="profile-field">
          <label>Twitter URL:</label>
          <input
            type="text"
            name="twitterURL"
            value={userData.twitterURL}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>
        <div className="profile-field">
          <label>Github Pages:</label>
          <input
            type="text"
            name="githubPages"
            value={userData.githubPages}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>
        <div className="profile-field">
          <label>About Me:</label>
          <textarea
            name="aboutMe"
            value={userData.aboutMe}
            onChange={handleChange}
            disabled={!editable}
          ></textarea>
        </div>
      </div>
      <div className="profile-buttons">
      {editable ? (
          <button onClick={handleSave} className="save-button">Save</button>
        ) : (
          <button onClick={handleEdit} className="edit-button">Edit</button>
        )}
      </div>
    </div>
  );
};

export default Profile;

