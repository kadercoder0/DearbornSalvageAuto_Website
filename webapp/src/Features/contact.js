import { Link } from 'react-router-dom'; 
import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Contact details and form.</p>
      <nav className="navbar">
        <Link to="/home" className="nav-link"> Back to Home</Link>
      </nav>
    </div>
  );
};

export default Contact;
