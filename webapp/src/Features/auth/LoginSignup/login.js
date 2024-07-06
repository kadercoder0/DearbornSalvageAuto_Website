import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import logo1 from '../../../Assets/logo1.png'
import './login.component.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Handler function for updating the email state
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handler function for updating the password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the login logic, such as sending the data to the server
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Simulate a successful login
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div>
      {/* Logo image */}
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      
      {/* Login heading */}
      <h2>Login</h2>
      
      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
          <h1>Forgot Password?</h1>
        </div>
        
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Signup prompt */}
      <h3>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </h3>
    </div>
  );
};

export default Login; // Export the Login component as the default export
