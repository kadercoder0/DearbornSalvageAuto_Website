import './App.css';
import Login from './Features/auth/LoginSignup/login';
import Signup from './Features/auth/LoginSignup/signup';
import Home from './Features/user/home';
import About from './Features/user/about';
import Inventory from './Features/user/Inventory/inventory';
import Contact from './Features/user/contact';
import FAQ from './Features/user/faq';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthDetails from './Features/auth/authdetails';
import Profile from './Features/user/profile';
import ForgotPassword from './Features/auth/LoginSignup/forgotPassword';

// Importing Admin Dashboard components
import DashboardHome from './Features/adminDashboard/DashboardHome';
import ManageListings from './Features/adminDashboard/managelistings';
import ViewUsers from './Features/adminDashboard/viewUsers';
import ViewListing from './Features/adminDashboard/viewListings';
import AdminProfile from './Features/adminDashboard/adminProfile';
import ManageFAQs from './Features/adminDashboard/manageFaqs';

// Importing the PrivateRoute component
import PrivateRoute from './Features/auth/privateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute adminOnly>
                <DashboardHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/managelistings"
            element={
              <PrivateRoute adminOnly>
                <ManageListings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/viewusers"
            element={
              <PrivateRoute adminOnly>
                <ViewUsers />
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
          <Route
            path="/admin/manageFaqs"
            element={
              <PrivateRoute adminOnly>
                <ManageFAQs />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
