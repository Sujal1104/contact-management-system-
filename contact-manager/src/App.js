import React, { useState, useEffect } from 'react';
import SignupPopup from './components/SignupModal'; // Corrected import path
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/Home'; // Corrected import path
import ImportExport from './components/ImportExport'; // Corrected import path
import './App.css';

const App = () => {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [showImportData, setShowImportData] = useState(false); // State for showing Import Data link
  const [message, setMessage] = useState(''); // State for success/error message

  // Check if the user is already logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowImportData(true); // If token exists, show Import Data link
    }
  }, []);

  // Functions to open/close popups
  const openSignupPopup = () => setSignupOpen(true);
  const closeSignupPopup = () => setSignupOpen(false);

  // Function to handle successful signup
  const handleSignupSuccess = () => {
    setShowImportData(true); // Show Import Data link for successful signup
    setMessage('Signup successful! Welcome!'); // Set success message
    closeSignupPopup(); // Close the signup popup after successful signup

    setTimeout(() => {
      setMessage(''); // Clear the message after 3 seconds
  }, 3000);
  };

  // Function to handle existing user signup
  const handleExistingUser = () => {
    setMessage('Username already exists.'); // Set message for existing user
    closeSignupPopup(); // Close the signup popup
    // Clear the message after 3 seconds
    setTimeout(() => {
        setMessage(''); // Clear the message after 3 seconds
    }, 3000);
};
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li id='one'>
              <Link style={{ textDecoration: "none", color: "green" }} to="/">Home</Link>
            </li>
            {/* Always render the Import Data link based on signup status */}
            {showImportData && (
              <li id='one'>
                <Link style={{ textDecoration: "none", color: "green" }} to="/ImportData">Import Data</Link>
              </li>
            )}
            {/* Add a signup button */}
            <li>
              <button style={{ marginLeft: "-25px", fontSize: '18px' }} onClick={openSignupPopup} className="nav-button">Signup</button>
            </li>
          </ul>
        </nav>

        {/* Render success/error message if available */}
        {message && <p className="success-message">{message}</p>}

        {/* Routes for Home and Import Data pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ImportData" element={<ImportExport />} />
        </Routes>

        {/* Conditionally render popups */}
        {isSignupOpen && 
          <SignupPopup 
            closePopup={closeSignupPopup} 
            handleSignupSuccess={handleSignupSuccess} 
            handleExistingUser={handleExistingUser} 
          />
        }
      </div>
    </Router>
  );
};

export default App;
