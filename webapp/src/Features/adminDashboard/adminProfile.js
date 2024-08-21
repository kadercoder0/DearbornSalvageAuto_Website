import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';



const AdminProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login'); // Redirect to login page after logout
    });
  };

  return (
    <div>
      <h2>Admin Profile</h2>
      {/* Add functionality to view profile info and change password */}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminProfile;
