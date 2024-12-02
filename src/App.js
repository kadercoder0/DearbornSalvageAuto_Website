import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './Features/auth/authContext'; // Import the AuthProvider
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Features/auth/LoginSignup/login';
import Signup from './Features/auth/LoginSignup/signup';
import About from './Features/user/about';
import Inventory from './Features/user/Inventory/inventory';
import Contact from './Features/user/contact';
import ForgotPassword from './Features/auth/LoginSignup/forgotPassword';

import CarDetailsPage from '../src/Features/user/Inventory/singleCarComp/carDetailsPage'; // Import CarDetailsPage

// Importing Admin Dashboard components
import ManageListings from './Features/adminDashboard/managelistings';
import ViewListing from './Features/adminDashboard/viewListings';
import AdminProfile from './Features/adminDashboard/adminProfile';

// Importing the PrivateRoute component
import PrivateRoute from './Features/auth/privateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/car/:carId" element={<CarDetailsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<ForgotPassword />} />
            
            {/* Redirect root to inventory */}
            <Route path="/" element={<Navigate to="/inventory" />} />
            
            {/* Admin Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route
              path="/admin/managelistings"
              element={
                <PrivateRoute adminOnly>
                  <ManageListings />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/viewlisting/:id"
              element={
                <PrivateRoute adminOnly>
                  <ViewListing />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/adminprofile"
              element={
                <PrivateRoute adminOnly>
                  <AdminProfile />
                </PrivateRoute>
              }
            />

            {/* Catch-all route for unknown paths */}
            <Route path="*" element={<Navigate to="/inventory" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
