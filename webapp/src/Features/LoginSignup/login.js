import React, { useState } from 'react'; 
import logo1 from '../../Assets/logo1.png'; 
import './login.component.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState(''); // State for storing the email input
  const [password, setPassword] = useState(''); // State for storing the password input

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
      <h3>Don't have an account? Sign up here</h3>
    </div>
  );
};

export default Login; // Export the Login component as the default export
