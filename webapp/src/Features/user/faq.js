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

      <p className="intro-text">
        At Greenfield Auto Center, we believe that finding the right vehicle should be hassle-free and enjoyable.
        That’s why we offer expertly rebuilt cars from auctions, ensuring they meet all safety and performance
        standards. Whether you're looking for a family SUV, a durable truck, or a stylish sedan, we have it all.
      </p>

      <div className="faq-section">
        <div className={`faq-question ${activeIndex === 0 ? 'active' : ''}`} onClick={() => toggleFAQ(0)}>
          <h3>What cars do you offer for sale?</h3>
          <span className="arrow">{activeIndex === 0 ? '▲' : '▼'}</span>
          {activeIndex === 0 && (
            <p className="faq-answer">We offer a variety of rebuilt cars, including sedans, SUVs, and trucks, all sourced from auctions and expertly repaired.</p>
          )}
        </div>

        <div className={`faq-question ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleFAQ(1)}>
          <h3>How are the cars repaired?</h3>
          <span className="arrow">{activeIndex === 1 ? '▲' : '▼'}</span>
          {activeIndex === 1 && (
            <p className="faq-answer">Each car is thoroughly inspected and repaired by certified technicians to ensure it meets safety and performance standards.</p>
          )}
        </div>

        <div className={`faq-question ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleFAQ(2)}>
          <h3>Can I test drive the car before buying?</h3>
          <span className="arrow">{activeIndex === 2 ? '▲' : '▼'}</span>
          {activeIndex === 2 && (
            <p className="faq-answer">Yes, we offer test drives for all vehicles at our location. Contact us to schedule an appointment.</p>
          )}
        </div>

        <div className={`faq-question ${activeIndex === 3 ? 'active' : ''}`} onClick={() => toggleFAQ(3)}>
          <h3>What is your return policy?</h3>
          <span className="arrow">{activeIndex === 3 ? '▲' : '▼'}</span>
          {activeIndex === 3 && (
            <p className="faq-answer">We provide a 7-day return policy on all vehicles if they do not meet your satisfaction.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
