import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendResetLink } from '../calls/userCalls'; // Function to call your API
import './../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendResetLink({ email });
      setMessage(res.message);
      setError('');
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remembered your password? <span onClick={() => navigate('/login')} className="login-link">Login</span>
      </p>
    </div>
  );
};

export default ForgotPassword;
