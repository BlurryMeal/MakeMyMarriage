const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const query = `
    INSERT INTO weddingplanner.contact_messages (Name, Email, Phone, Subject, Message)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [name, email, phone, subject, message], (err, result) => {
    if (err) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    res.json({ success: true, message: 'Message stored successfully' });
  });
});


router.get('/messages', (req, res) => {
    const query = `SELECT * FROM weddingplanner.contact_messages ORDER BY SubmittedAt DESC`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching messages:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
  

  router.delete('/messages/:id', (req, res) => {
    const messageId = req.params.id;
    const query = 'DELETE FROM weddingplanner.contact_messages WHERE MessageID = ?';
  
    db.query(query, [messageId], (err, result) => {
      if (err) {
        console.error('Error deleting message:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    });
  });
  

module.exports = router;
