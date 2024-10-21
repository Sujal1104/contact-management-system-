// src/components/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';

const LoginModal = ({ closePopup, handleLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // Check if response is successful
      if (response.status === 200) {
        const { token } = response.data;

        // Store token in localStorage and set Authorization header
        localStorage.setItem('token', `Bearer ${token}`);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Call parent function to update login state
        handleLoginSuccess();
        closePopup(); // Close popup after login
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError('Invalid username or password');
        } else {
          setError('Server error. Please try again later.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="login-popup">
      <button className="close-btn" onClick={closePopup}>X</button>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginModal;
