const express = require('express');
const router = express.Router();
const db = require('../db');

const allowedCategories = ['venue', 'catering', 'photography', 'entertainment', 'decoration'];

router.post('/register-service', async (req, res) => {
  const {
    businessName,
    category,
    email,
    phone,
    serviceName,
    location,
    address,
    description,
    pricing,
    website,
    capacity,
    amenities,
    featured,
    tags,
    mainImage
  } = req.body;

  try {
    // Validate required fields
    if (!businessName || !category || !email || !phone || !serviceName || !pricing) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid service category.' });
    }

    const [existingUser] = await db.promise().query(
      'SELECT * FROM user WHERE Email = ? AND PhoneNumber = ? AND BusinessName = ? AND UserType = "Seller"',
      [email, phone, businessName]
    );

    if (existingUser.length === 0) {
      return res.status(400).json({ error: 'Seller not found. Please sign up as a seller first.' });
    }

    const userId = existingUser[0].UserID;

    const [serviceResult] = await db.promise().query(
      'INSERT INTO service (UserID, ServiceType) VALUES (?, ?)',
      [userId, category]
    );

    const serviceId = serviceResult.insertId;

    const insertQuery = `INSERT INTO ${category} (
      ServiceID, ServiceName, Description, PriceRange, VerificationStatus, Location, Address, ContactEmail, ContactPhone,
      Website, Rating, ReviewCount, Capacity, Amenities, Featured, Tags, MainImage
    ) VALUES (?, ?, ?, ?, 'Pending', ?, ?, ?, ?, ?, 0.0, 0, ?, ?, ?, ?, ?)`;

    await db.promise().query(insertQuery, [
      serviceId,
      serviceName,
      description || '',
      pricing,
      location || '',
      address || '',
      email,
      phone,
      website || '',
      capacity || '',
      JSON.stringify(amenities || []),
      featured ? 1 : 0,
      JSON.stringify(tags || []),
      mainImage || ''
    ]);

    return res.status(201).json({
      message: 'Service registered successfully!',
      serviceId
    });
  } catch (err) {
    console.error('Error in /register-service:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
