import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const ManageListings = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h2>Manage Listings</h2>
      {/* Add functionality for adding, editing, and deleting car listings */}
      <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>

    </div>
  );
};

export default ManageListings;
