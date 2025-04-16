const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/user', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM user WHERE UserID = ?', [id], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

router.put('/user/:id', (req, res) => {
  const { name, email, phone, address } = req.body;
  const userId = req.params.id;

  db.query(
    'UPDATE user SET Name = ?, Email = ?, PhoneNumber = ? WHERE UserID = ?',
    [name, email, phone, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'DB Error' });
      res.json({ success: true });
    }
  );
}); 



router.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM user WHERE UserID = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete user" });
    return res.json({ message: "User deleted" });
  });
});


router.get('/clients', (req, res) => {
  const query = `
    SELECT 
      u.UserID AS id,
      u.Name AS name,
      u.Email AS email,
      u.PhoneNumber AS phone,
      u.UserType AS userType,
      COALESCE(SUM(p.AmountPaid), 0) AS totalSpent,
      MAX(b.EventDate) AS lastBooking,
      COUNT(b.BookingID) AS bookings
    FROM user u
    LEFT JOIN booking b ON u.UserID = b.UserID
    LEFT JOIN payment p ON b.BookingID = p.BookingID
    WHERE u.UserType = 'Client'
    GROUP BY u.UserID
    ORDER BY u.UserID;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch clients:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});







module.exports = router;
