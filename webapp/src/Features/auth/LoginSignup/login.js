import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../../../Assets/logo1.png';
import './login.component.css';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = (e) => {

    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/home'); // Navigating to the home page on successful login
      }).catch((error) => {
        // Check for the specific error codes
          if (error.code === 'auth/wrong-password') {
            setErrorMessage('Incorrect password. Please try again.');
        } else if (error.code === 'auth/user-not-found') {
            setErrorMessage('No user found with this email.');
        } else {
            setErrorMessage('Incorrect email or password. Please try again.');
        }
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

  const handleReset = () =>{
    navigate('/reset');

  }

  return (
    <div>
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <p onClick={handleReset}>Forgot Password?</p>
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
