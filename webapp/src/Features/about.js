import { Link } from 'react-router-dom'; 
import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>Information about the company.</p>
      <nav className="navbar">
        <Link to="/home" className="nav-link"> Back to Home</Link>
      </nav>
    </div>
  );
};

export default About;
