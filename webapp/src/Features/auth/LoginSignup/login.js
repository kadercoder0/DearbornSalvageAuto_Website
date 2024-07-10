import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../../../Assets/logo1.png';
import './login.component.css';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/home'); // Navigating to the home page on successful login
      }).catch((error) => {
        console.log(error);
      });
  };

  // Handler function for updating the email state
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handler function for updating the password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      <h2>Login</h2>
      <form onSubmit={login}>
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
      <h3>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </h3>
    </div>
  );
};

export default Login;
