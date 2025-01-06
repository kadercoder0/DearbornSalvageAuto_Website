import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS SDK
import "./contact.css"; // Import your custom styles
import InventoryHeader from "./Inventory/inventoryHeader";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeIndex, setActiveIndex] = useState(null); // For FAQ

  // Function to validate email addresses
  const isValidEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  // Function to validate phone number (10 digits)
  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    // Simple validation
    if (!name || !email || !phone || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number (10 digits).");
      return;
    }

    // Clear previous error
    setError("");

    // Send email using EmailJS
    const serviceId = "Ahmadali.usedcars"; // Replace with your EmailJS service ID
    const templateId = "template_24bqlz8"; // Replace with your EmailJS template ID
    const publicKey = "tP0dZTqGtdNvVATI0"; // Replace with your EmailJS public key

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        publicKey
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccess("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setError("Failed to send message. Please try again later.");
      });
  };

  // Toggle FAQ
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="contact-container">
      <InventoryHeader />
      <div className="wrapper">
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div
            className={`faq-question ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => toggleFAQ(0)}
          >
            <h3>What cars do you offer for sale?</h3>
            <span className="arrow">{activeIndex === 0 ? "▲" : "▼"}</span>
            <div
              className="faq-answer"
              style={{ maxHeight: activeIndex === 0 ? "200px" : "0" }}
            >
              We offer a variety of rebuilt cars, including sedans, SUVs, and
              trucks, all sourced from auctions and expertly repaired.
            </div>
          </div>
          <div
            className={`faq-question ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => toggleFAQ(1)}
          >
            <h3>How are the cars repaired?</h3>
            <span className="arrow">{activeIndex === 1 ? "▲" : "▼"}</span>
            <div
              className="faq-answer"
              style={{ maxHeight: activeIndex === 1 ? "200px" : "0" }}
            >
              Each car is thoroughly inspected and repaired by certified
              technicians to ensure it meets safety and performance standards.
            </div>
          </div>
          <div
            className={`faq-question ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => toggleFAQ(2)}
          >
            <h3>Can I test drive the car before buying?</h3>
            <span className="arrow">{activeIndex === 2 ? "▲" : "▼"}</span>
            <div
              className="faq-answer"
              style={{ maxHeight: activeIndex === 2 ? "200px" : "0" }}
            >
              Yes, we offer test drives for all vehicles at our location.
              Contact us to schedule an appointment.
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h2>Contact Us</h2>
          <p className="call-instruction">
            Click the call button to call or submit the form below to email us.
          </p>
          <a
            href="tel:3134152982"
            className="call-button"
            onClick={(e) => e.stopPropagation()}
          >
            Call Now
          </a>

          <form onSubmit={handleSubmit} className="contact-form">
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
            <div className="form-row">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;