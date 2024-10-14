import React, { useState } from 'react';
import './faq.css';
import InventoryHeader from './Inventory/inventoryHeader';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse the current section
    } else {
      setActiveIndex(index); // Expand the selected section
    }
  };

  return (
    <div className="faq-container">
      <InventoryHeader />
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
          <div className="faq-answer" style={{ maxHeight: activeIndex === 0 ? '200px' : '0', overflow: 'hidden' }}>
            We offer a variety of rebuilt cars, including sedans, SUVs, and trucks, all sourced from auctions and expertly repaired.
          </div>
        </div>

        <div className={`faq-question ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleFAQ(1)}>
          <h3>How are the cars repaired?</h3>
          <span className="arrow">{activeIndex === 1 ? '▲' : '▼'}</span>
          <div className="faq-answer" style={{ maxHeight: activeIndex === 1 ? '200px' : '0', overflow: 'hidden' }}>
            Each car is thoroughly inspected and repaired by certified technicians to ensure it meets safety and performance standards.
          </div>
        </div>

        <div className={`faq-question ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleFAQ(2)}>
          <h3>Can I test drive the car before buying?</h3>
          <span className="arrow">{activeIndex === 2 ? '▲' : '▼'}</span>
          <div className="faq-answer" style={{ maxHeight: activeIndex === 2 ? '200px' : '0', overflow: 'hidden' }}>
            Yes, we offer test drives for all vehicles at our location. Contact us to schedule an appointment.
          </div>
        </div>

        <div className={`faq-question ${activeIndex === 3 ? 'active' : ''}`} onClick={() => toggleFAQ(3)}>
          <h3>What is your return policy?</h3>
          <span className="arrow">{activeIndex === 3 ? '▲' : '▼'}</span>
          <div className="faq-answer" style={{ maxHeight: activeIndex === 3 ? '200px' : '0', overflow: 'hidden' }}>
            We provide a 7-day return policy on all vehicles if they do not meet your satisfaction.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
