import { Link } from 'react-router-dom'; 
import React from 'react';

const FAQ = () => {
  return (
    <div>
      <h1>FAQ</h1>
      <p>Frequently Asked Questions.</p>
      <nav className="navbar">
        <Link to="/home" className="nav-link"> Back to Home</Link>
      </nav>
    </div>
  );
};

export default FAQ;
