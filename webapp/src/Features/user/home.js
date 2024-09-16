import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import lineup from '../../Assets/lineup.png';
import './home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate(); // Hook to navigate

  // Function to handle admin login navigation
  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="home-container">      
      <h1 className="home-title">Dearborn Salvage Auto</h1>
      
      <p className="home-subtitle">Quality Cars that Don't Break your Bank!</p>
      <p className="home-description">Salvage and Clean Titles</p>
      
      <nav className="navbar">
        <Link to="/inventory" className="nav-link">Inventory</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
        <Link to="/faq" className="nav-link">FAQ</Link>
      </nav>

      <img src={lineup} alt="background cars" className="responsive-image" />
    </div>
  );
};

export default Home;
