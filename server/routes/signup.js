// server/routes/signup.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// POST: Register a new user
router.post('/signup', async (req, res) => {
  const { name, email, phone, password, userType, businessName } = req.body;

  if (!name || !email || !phone || !password || !userType) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  try {
    // Check if user already exists
    const [existingUser] = await db.promise().query(
      'SELECT * FROM user WHERE Email = ? OR PhoneNumber = ?',
      [email, phone]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User with this email or phone already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    let finalUserType = userType;
    if (userType.toLowerCase() === 'vendor') finalUserType = 'Seller';
    if (userType.toLowerCase() === 'client') finalUserType = 'Client';
    if (userType.toLowerCase() === 'admin') finalUserType = 'Admin';

    // Insert user into DB
    const [result] = await db.promise().query(
        'INSERT INTO user (Name, Email, PhoneNumber, Password, UserType, BusinessName) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, phone, hashedPassword, finalUserType, finalUserType === 'Seller' ? businessName : null]
      );
      

    res.status(201).json({ message: 'User registered successfully! Please log in.' });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
