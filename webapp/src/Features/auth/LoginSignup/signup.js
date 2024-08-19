import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../../../Assets/logo1.png';
import { db, auth } from '../../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../LoginSignup/signup.module.css'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Updating profile with the name
      await updateProfile(user, {
        displayName: name
      });

      // Storing user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        phoneNumber: phoneNumber
      });

      console.log('User registered and details stored in Firestore');
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <img src={logo1} alt="Logo" style={{ width: '950px', height: '150px' }} />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            value={name} 
            onChange={handleNameChange} 
            placeholder="Name" // Placeholder for Name
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            placeholder="Email" // Placeholder for Email
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password" // Placeholder for Password
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            value={phoneNumber} 
            onChange={handlePhoneNumberChange} 
            placeholder="Phone Number" // Placeholder for Phone Number
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <h3>
        Already have an account? <Link to="/login">Login here</Link>
      </h3>
    </div>
  );
};

export default Signup;
