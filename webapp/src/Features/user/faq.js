import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import './faq.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="faq-container">
      <nav className="navbar">
        <Link to="/home" className="nav-link">Back to Home</Link>
      </nav>

      <h1 className="faq-title">Frequently Asked Questions</h1>

      <div className="faq-section">
        <div className="faq-question" onClick={() => toggleFAQ(0)}>
          <h3>What cars do you offer for sale?</h3>
          {activeIndex === 0 && (
            <p className="faq-answer">We offer a variety of rebuilt cars, including sedans, SUVs, and trucks, all sourced from auctions and expertly repaired.</p>
          )}
        </div>

        <div className="faq-question" onClick={() => toggleFAQ(1)}>
          <h3>How are the cars repaired?</h3>
          {activeIndex === 1 && (
            <p className="faq-answer">Each car is thoroughly inspected and repaired by certified technicians to ensure it meets safety and performance standards.</p>
          )}
        </div>

        <div className="faq-question" onClick={() => toggleFAQ(2)}>
          <h3>Can I test drive the car before buying?</h3>
          {activeIndex === 2 && (
            <p className="faq-answer">Yes, we offer test drives for all vehicles at our location. Contact us to schedule an appointment.</p>
          )}
        </div>

        <div className="faq-question" onClick={() => toggleFAQ(3)}>
          <h3>What is your return policy?</h3>
          {activeIndex === 3 && (
            <p className="faq-answer">We provide a 7-day return policy on all vehicles if they do not meet your satisfaction.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
