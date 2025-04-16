// routes/bookings.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // your db connection file


router.get('/bookings', (req, res) => {
  const query = `
    SELECT 
      b.BookingID,
      b.BookingDate,
      b.EventDate,
      b.BookingStatus,
      b.UserID,
      u.Name AS ClientName,
      sv.UserID AS SellerID,
      v.Name AS VendorName,
      b.ServiceID,
      sv.ServiceType,
      COALESCE(vc.ServiceName, ca.ServiceName, ph.ServiceName, de.ServiceName, en.ServiceName) AS ServiceName
    FROM booking b
    JOIN user u ON b.UserID = u.UserID
    JOIN service sv ON b.ServiceID = sv.ServiceID
    JOIN user v ON sv.UserID = v.UserID
    LEFT JOIN venue vc ON sv.ServiceID = vc.ServiceID
    LEFT JOIN catering ca ON sv.ServiceID = ca.ServiceID
    LEFT JOIN photography ph ON sv.ServiceID = ph.ServiceID
    LEFT JOIN decoration de ON sv.ServiceID = de.ServiceID
    LEFT JOIN entertainment en ON sv.ServiceID = en.ServiceID
    ORDER BY b.EventDate DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching bookings:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});



router.post('/bookings', (req, res) => {
  const { user_id, service_id, booking_date, event_date, payment_method } = req.body;

const sql = `
  INSERT INTO booking (UserID, ServiceID, BookingDate, EventDate, PaymentMethod)
VALUES (?, ?, ?, ?, ?)
`;

const values = [user_id, service_id, booking_date, event_date, payment_method];

db.query(sql, values, (err, result) => {
  if (err) {
    console.error('Failed to insert booking:', err);
    return res.status(500).json({ error: 'Booking failed' });
  }
  res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
});


});

router.get('/bookings/:userId', (req, res) => {
  const userId = req.params.userId;

  const baseQuery = `
    SELECT b.BookingID, b.ServiceID, b.BookingDate, b.EventDate, b.BookingStatus,
           s.UserID AS SellerID, s.ServiceType
    FROM booking b
    JOIN service s ON b.ServiceID = s.ServiceID
    WHERE b.UserID = ?
  `;

  db.query(baseQuery, [userId], async (err, bookings) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    const enriched = await Promise.all(
      bookings.map((booking) => {
        const table = booking.ServiceType.toLowerCase(); // photography, venue, etc.
        const detailQuery = `SELECT ServiceName, Location FROM ${table} WHERE ServiceID = ?`;

        return new Promise((resolve) => {
          db.query(detailQuery, [booking.ServiceID], (err, serviceRows) => {
            if (err || !serviceRows.length) {
              console.error(`Error fetching service details from ${table}:`, err);
              return resolve({ ...booking, ServiceName: null, Location: null });
            }

            const { ServiceName, Location } = serviceRows[0];
            resolve({ ...booking, ServiceName, Location });
          });
        });
      })
    );

    res.json(enriched);
  });
});


router.get('/vendor-bookings/:vendorId', (req, res) => {
  const vendorId = req.params.vendorId;

  const query = `
    SELECT 
      b.BookingID,
      b.EventDate,
      b.BookingStatus,
      u.Name AS ClientName,
      CASE s.ServiceType
        WHEN 'Photography' THEN p.ServiceName
        WHEN 'Catering' THEN c.ServiceName
        WHEN 'Venue' THEN v.ServiceName
        WHEN 'Decor' THEN d.ServiceName
        WHEN 'Entertainment' THEN e.ServiceName
      END AS ServiceName
    FROM booking b
    JOIN service s ON b.ServiceID = s.ServiceID
    JOIN user u ON b.UserID = u.UserID
    LEFT JOIN photography p ON s.ServiceType = 'Photography' AND s.ServiceID = p.ServiceID
    LEFT JOIN catering c ON s.ServiceType = 'Catering' AND s.ServiceID = c.ServiceID
    LEFT JOIN venue v ON s.ServiceType = 'Venue' AND s.ServiceID = v.ServiceID
    LEFT JOIN decoration d ON s.ServiceType = 'Decor' AND s.ServiceID = d.ServiceID
    LEFT JOIN entertainment e ON s.ServiceType = 'Entertainment' AND s.ServiceID = e.ServiceID
    WHERE s.UserID = ?
  `;

  db.query(query, [vendorId], (err, results) => {
    if (err) {
      console.error('Failed to fetch vendor bookings:', err);
      return res.status(500).json({ error: 'Failed to fetch vendor bookings' });
    }
    res.json(results);
  });
});


router.put('/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  const query = `UPDATE booking SET BookingStatus = ? WHERE BookingID = ?`;
  db.query(query, [status, bookingId], (err, result) => {
    if (err) {
      console.error('Failed to update booking status:', err);
      return res.status(500).json({ error: 'Failed to update status' });
    }
    res.json({ message: 'Booking status updated successfully' });
  });
});



router.post('/complete-booking', (req, res) => {
  const { bookingId, serviceId, serviceType, rating } = req.body;
  const table = serviceType.toLowerCase(); // e.g., 'venue'

  const updateQuery = `
    UPDATE weddingplanner.\`${table}\`
    SET 
      ReviewCount = ReviewCount + 1,
      Rating = ROUND(((Rating * (ReviewCount) + ?) / (ReviewCount + 1)), 1)
    WHERE ServiceID = ?
  `;

  db.query(updateQuery, [rating, serviceId], (err, result) => {
    if (err) {
      console.error("Error updating rating:", err);
      return res.status(500).json({ error: "Failed to update rating." });
    }

    return res.status(200).json({ message: "Rating submitted!" });
  });
});




module.exports = router;
