import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import logo1 from '../../Assets/logo1.png';
import '../LoginSignup/login.component.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Simulate successful registration
    navigate('/login');
  };

  return (
    <div>
      {/* Logo image */}
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      
      {/* Register heading */}
      <h2>Register</h2>
      
      {/* Register form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        
        {/* Submit button */}
        <button type="submit">Register</button>
      </form>

      {/* Link to login */}
      <h3>
        Already have an account? <Link to="/login">Login here</Link>
      </h3>
    </div>
  );
};

export default Register;
