// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginUser } from '../calls/userCalls'; // Import LoginUser
import './../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginUser({ email, password }); // Use LoginUser function
      
      // Store token in cookies
      Cookies.set('token', res.token);
      
      navigate('/dashboard'); // Navigate to the dashboard after successful login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Forgot your password? <span onClick={() => navigate('/forgot-password')} className="forgot-password-link">Reset it</span>
      </p>
      <p>
        Don't have an account? <span onClick={() => navigate('/signup')} className="signup-link">Sign up</span>
      </p>
    </div>
  );
};

export default Login;
