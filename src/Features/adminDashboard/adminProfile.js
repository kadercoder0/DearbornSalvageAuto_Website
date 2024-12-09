import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Adjust the import path as necessary
import { updatePassword, signOut, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './adminProfile.module.css';

// Import FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // Toggle visibility for current password
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle visibility for new password
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.email);
      setName(currentUser.name);
      fetchUserData(currentUser.uid);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setPhoneNumber(userData.phoneNumber);
        setName(userData.name);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
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

  const handlePasswordUpdate = () => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            console.log('Password updated successfully');
            setShowSuccessAlert(true); // Show the alert
            setTimeout(() => {
              setShowSuccessAlert(false); // Hide the alert after 5 seconds
            }, 5000);
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
        navigate('/inventory');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className={styles["profile-container"]}>
        <h2 className={styles["profile-heading"]}>Profile</h2>

        <div className={styles["user-info"]}>
            <h3>User Information</h3>
            <br />
            <p>Email: {email}</p>
            <br />
            <p>Phone Number: {phoneNumber}</p>
            <br />
            <p>Name: {name}</p>
        </div>

        <div>
            <h3>Change Password</h3>

            {/* Current Password Field with Eye Icon */}
            <div className={styles["password-toggle"]}>
                <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    className={styles.input}
                />
                <FontAwesomeIcon
                    icon={showCurrentPassword ? faEyeSlash : faEye}
                    className={styles["toggle-icon"]}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                />
            </div>

            {/* New Password Field with Eye Icon */}
            <div className={styles["password-toggle"]}>
                <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className={styles.input}
                />
                <FontAwesomeIcon
                    icon={showNewPassword ? faEyeSlash : faEye}
                    className={styles["toggle-icon"]}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                />
            </div>

            {/* Buttons centered in the button-container */}
            <div className={styles["button-container"]}>
                <button className={styles.button} onClick={handlePasswordUpdate}>
                    Update Password
                </button>
                <button className={styles.button} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>

        {showSuccessAlert && (
            <div className={styles.alert}>
                <span
                    className={styles.closebtn}
                    onClick={() => setShowSuccessAlert(false)}
                >
                    &times;
                </span>
                Password updated successfully!
            </div>
        )}

        <h2>
            <Link to="/admin/managelistings" className={styles["nav-link"]}>
                View Inventory
            </Link>
        </h2>
    </div>
);

};

export default AdminProfile;
