import React from 'react';

const DashboardHome = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard! Here you can manage car listings, view users, and update your profile.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Quick Actions:</h3>
        <ul>
          <li><a href="/admin/managelistings">Manage Listings</a></li>
          <li><a href="/admin/viewusers">View Users</a></li>
          <li><a href="/admin/adminprofile">Profile Settings</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
