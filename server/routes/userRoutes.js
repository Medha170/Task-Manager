const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user (Signup)
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    userType: 'User'
  });

  try {
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send token in cookie
    res.cookie('token', token, {
      httpOnly: true, // Cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only set the cookie over HTTPS
    });

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

  // Send token in cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ message: 'Login successful', user });
});

// Logout user
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update user
  router.put('/:id', async (req, res) => {
      try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
          if (!updatedUser) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          res.status(200).json(updatedUser);
      } catch (error) {
          res.status(500).json({ message: 'Internal server error', error });
      }
  });
  
  // Delete user
  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Request reset password link
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
  
    // Generate a reset token and send an email (you need to implement sendEmail)
    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    await sendEmail(user.email, resetToken); // Implement sendEmail to send email with reset link
  
    res.status(200).json({ message: 'Reset link sent to your email' });
  });
  
  // Reset password
  router.post('/reset-password', async (req, res) => {
    const { password, token } = req.body;
  
    // Verify the token
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
    }
  });
  
// Get the current logged-in user based on the token in cookies
router.get('/current-user', (req, res) => {
    const token = req.cookies.authToken; // Assuming the token is stored in 'authToken' cookie

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.userId, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('authToken', { path: '/' }); // Clears the auth token cookie
    res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;