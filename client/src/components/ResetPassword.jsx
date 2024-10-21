import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../calls/userCalls'; // Function to call your API
import './../styles/ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ password, token });
      setSuccess(res.message);
      setError('');
      // Optionally, navigate to login page after success
      navigate('/login');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {success && <p>{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
