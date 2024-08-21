import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../../../Assets/logo1.png';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { checkIfAdmin } from '../adminUtils'; // Import the checkIfAdmin function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Check if the logged-in user is an admin and log the result
        const isAdmin = await checkIfAdmin(user.uid);
        console.log(`Is Admin: ${isAdmin}`);

        // For now, just navigate to the home page after logging in
        navigate('/home');
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.code === 'auth/wrong-password') {
            setErrorMessage('Incorrect password. Please try again.');
        } else if (error.code === 'auth/user-not-found') {
            setErrorMessage('No user found with this email.');
        } else {
            setErrorMessage('Incorrect email or password. Please try again.');
        }
    });
    
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReset = () => {
    navigate('/reset');
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      <h2>Login</h2>
      <form onSubmit={login} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            placeholder="Email" 
            required 
            style={{ width: '300px', padding: '10px', marginBottom: '20px' }} 
          />
        </div>
        <div>
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password" 
            required 
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }} 
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <p onClick={handleReset} style={{ cursor: 'pointer', color: '#007bff', marginBottom: '20px' }}>Forgot Password?</p>
        </div>
        <button type="submit" style={{ width: '300px', padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <h3 style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up here</Link>
      </h3>
    </div>
  );
};

export default Login;
