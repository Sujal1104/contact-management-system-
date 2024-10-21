// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config(); // To load environment variables

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user with the hashed password
    user = new User({ username, password: hashedPassword });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Return the JWT token
    res.status(201).json({ token });
  } catch (err) {
    console.error('Signup Error: ', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Login route
// auth.js - login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password); // Correct comparison

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    console.log('Login successful, token generated');
    res.json({ token });
  } catch (err) {
    console.error('Login Error: ', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});



// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user id to request
    next(); // Call next middleware
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Example protected route
router.get('/protected', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user); // Get the user from the database using the id in the token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username }); // Send back the user's username or other info
  } catch (err) {
    console.error('Protected Route Error: ', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
