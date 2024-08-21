import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const ViewUsers = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h2>View Users</h2>
      {/* Add functionality to list and manage users */}
      <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>

    </div>
  );
};

export default ViewUsers;
