import { Link } from 'react-router-dom';
import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      
      {/* Contact details */}
      <div>
        <p><strong>Phone number:</strong> +13132036018</p>
        <p><strong>Shop email:</strong> <a href="mailto:ahmadail.usedcars@gmail.com">ahmadail.usedcars@gmail.com</a></p>
        <p><strong>Shop address:</strong> 14041 Greenfield Rd, Detroit, MI, United States</p>
        <p><strong>Shop name:</strong> Greenfield Auto Center</p>
      </div>

      
      {/* Navigation back to Home */}
      <nav className="navbar">
        <Link to="/home" className="nav-link">Back to Home</Link>
      </nav>
    </div>
  );
};

export default Contact;
