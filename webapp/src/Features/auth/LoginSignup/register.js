import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../../../Assets/logo1.png';
import './login.component.css';
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        updateProfile(userCredential.user, {
          displayName: name
        }).then(() => {
          console.log('Profile updated successfully');
          navigate('/login');
        }).catch((error) => {
          console.error('Error updating profile:', error);
        });
      })
      .catch((error) => {
        console.error('Error registering:', error);
      });
  };

  return (
    <div>
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      <h3>
        Already have an account? <Link to="/login">Login here</Link>
      </h3>
    </div>
  );
};

export default Register;
