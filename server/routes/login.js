const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// POST: User login
router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  // Normalize userType
  let finalUserType = userType;
  if (userType.toLowerCase() === 'vendor') finalUserType = 'Seller';
  if (userType.toLowerCase() === 'client') finalUserType = 'Client';
  if (userType.toLowerCase() === 'admin') finalUserType = 'Admin';

  try {
    const [userResult] = await db.promise().query(
      'SELECT * FROM user WHERE Email = ? AND UserType = ?',
      [email, finalUserType]
    );

    if (userResult.length === 0) {
      return res.status(401).json({ error: 'User not found or wrong user type.' });
    }

    const user = userResult[0];

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.UserID,
        name: user.Name,
        email: user.Email,          
        phone: user.PhoneNumber,
        userType: user.UserType,
        businessName: user.BusinessName || null
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
