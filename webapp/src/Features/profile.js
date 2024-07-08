import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { updateEmail, updatePassword, signOut, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import '../Features/auth/authdetails'
import { Link } from 'react-router-dom'; 

const Profile = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setEmail(user.email);
        } else {
          setUser(null);
        }
      });
  
      return () => {
        listen();
      };
    }, []);
  
    const handleEmailChange = (e) => {
      setNewEmail(e.target.value);
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
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Verification email sent to the current email.');
          // Update the email after verification link is clicked
          const newEmailLink = `${window.location.origin}/verify-email?email=${newEmail}`;
          sendEmailVerification(auth.currentUser, {
            url: newEmailLink,
          }).then(() => {
            console.log('Verification email sent to the new email.');
            // After email is verified, update the email
            // Note: This part should ideally be handled in a backend server to confirm email verification
            updateEmail(auth.currentUser, newEmail)
              .then(() => {
                console.log('Email updated successfully');
                setEmail(newEmail);
              })
              .catch((error) => {
                console.error('Error updating email:', error);
              });
          }).catch((error) => {
            console.error('Error sending verification email:', error);
          });
        })
        .catch((error) => {
          console.error('Error sending verification email:', error);
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
      <div>
      <Link to="/home" className="nav-link"> Back to Home</Link>
      </div>
        <h2>Profile</h2>
        {user ? (
          <>
            <authdetails />
            <div>
              <label>Current Email:</label>
              <input type="email" value={email} readOnly />
            </div>
            <div>
              <label>New Email:</label>
              <input type="email" value={newEmail} onChange={handleEmailChange} />
              <button onClick={handleEmailUpdate}>Update Email</button>
            </div>
            <div>
              <label>Phone Number:</label>
              <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
              <button onClick={() => {/* Update phone number logic here */}}>Update Phone Number</button>
            </div>
            <div>
              <label>Current Password:</label>
              <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} />
            </div>
            <div>
              <label>New Password:</label>
              <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
              <button onClick={handlePasswordUpdate}>Update Password</button>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
    );
  };
  
  export default Profile;