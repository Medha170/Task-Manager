// src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RegisterUser } from '../calls/userCalls'; // Import RegisterUser
import './../styles/Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RegisterUser({ name, email, password }); // Use RegisterUser function
      
      // Store token in cookies
      Cookies.set('token', res.token);
      
      navigate('/dashboard'); // Navigate to the dashboard after successful signup
    } catch (err) {
      setError('User already exists or registration error');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <span onClick={() => navigate('/login')} className="login-link">Login</span>
      </p>
    </div>
  );
};

export default Signup;
