import React, { useState } from 'react';
import emailjs from 'emailjs-com';  // Import EmailJS SDK
import './contact.css';  // Import your custom styles

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to validate email addresses
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    // Simple validation
    if (!name || !email || !phone || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isValidPhone(phone)) {
      setError('Please enter a valid phone number (10 digits).');
      return;
    }

    // Clear previous error
    setError('');

    // Send email using EmailJS
    const serviceId = 'Ahmadali.usedcars';  // Replace with your EmailJS service ID
    const templateId = 'template_24bqlz8';  // Replace with your EmailJS template ID
    const publicKey = 'tP0dZTqGtdNvVATI0';  // Replace with your EmailJS public key

    // Send the email via EmailJS
    emailjs.send(serviceId, templateId, {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message
    }, publicKey)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSuccess('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error('FAILED...', error);
      setError('Failed to send message. Please try again later.');
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-details">
        <p><strong>Phone number:</strong> +13132036018</p>
        <p><strong>Shop email:</strong> <a href="mailto:ahmadali.usedcars@gmail.com">ahmadali.usedcars@gmail.com</a></p>
        <p><strong>Shop address:</strong> 14041 Greenfield Rd, Detroit, MI, United States</p>
        <p><strong>Shop name:</strong> Greenfield Auto Center</p>
      </div>

      <h2>Contact Form</h2>

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
  );
};

export default Contact;
