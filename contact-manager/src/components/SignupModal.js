import React, { useState } from 'react';
import './SignupModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPopup = ({ closePopup, handleSignupSuccess, handleExistingUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('loggedInUser', username); // Store username to mark user as logged in

      setSuccess('Signup successful!');
      setError('');

      // Notify the parent component about successful signup
      handleSignupSuccess();

      // Redirect to the Import Data page after successful signup
      setTimeout(() => {
        closePopup();
        navigate('/ImportData'); // Redirect to Import Data page
      }, 2000);
      
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Username already exists. Please log in.');
        handleExistingUser(); // Notify parent about existing user
      } else {
        setError('Server error. Please try again later.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="signup-popup">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
      <button className="close-btn" onClick={closePopup}>X</button>
    </div>
  );
};

export default SignupPopup;
