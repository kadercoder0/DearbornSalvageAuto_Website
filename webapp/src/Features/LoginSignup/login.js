import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo1 from '../../Assets/logo1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <h3>Dont have an account? Sign up here</h3>
    </div>
  );
};

export default Login;
