import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { updateEmail, updatePassword, signOut, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.email);
      // Assume phoneNumber is stored in user metadata or another database if necessary
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleEmailUpdate = () => {
    updateEmail(user, email)
      .then(() => {
        console.log('Email updated successfully');
      })
      .catch((error) => {
        console.error('Error updating email:', error);
      });
  };

  const handlePasswordUpdate = () => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            console.log('Password updated successfully');
          })
          .catch((error) => {
            console.error('Error updating password:', error);
          });
      })
      .catch((error) => {
        console.error('Error reauthenticating:', error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={handleLogout}>Logout</button>
      
      <div>
        <h3>Change Password</h3>
        <input 
          type="password" 
          placeholder="Current Password" 
          value={currentPassword} 
          onChange={handleCurrentPasswordChange} 
        />
        <input 
          type="password" 
          placeholder="New Password" 
          value={newPassword} 
          onChange={handleNewPasswordChange} 
        />
        <button onClick={handlePasswordUpdate}>Update Password</button>
      </div>
    </div>
  );
};

export default Profile;
