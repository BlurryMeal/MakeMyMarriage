const express = require('express');
const router = express.Router();
const db = require('../db');

// Route 1: Vendor Listing (already present)
router.get('/vendor-listings', (req, res) => {
  const query = `
    SELECT 
      s.ServiceID,
      u.Name AS SellerName,
      u.BusinessName,
      u.PhoneNumber,
      u.Email,
      u.UserID,
      s.ServiceType,
      COALESCE(v.ServiceName, d.ServiceName, c.ServiceName, p.ServiceName, e.ServiceName) AS ServiceName,
      COALESCE(v.Description, d.Description, c.Description, p.Description, e.Description) AS Description,
      COALESCE(v.PriceRange, d.PriceRange, c.PriceRange, p.PriceRange, e.PriceRange) AS PriceRange,
      COALESCE(st.AverageRating, 0) AS Rating,
      COALESCE(st.TotalBookings, 0) AS ReviewCount,
      st.TotalEarnings
    FROM weddingplanner.service s
    JOIN weddingplanner.user u ON s.UserID = u.UserID
    LEFT JOIN weddingplanner.venue v ON v.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.decoration d ON d.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.catering c ON c.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.photography p ON p.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.entertainment e ON e.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.statistics st ON st.UserID = u.UserID
    WHERE u.UserType = 'Seller';
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const formatted = results.map(row => ({
      id: row.ServiceID,
      name: row.ServiceName,
      category: row.ServiceType.toLowerCase(),
      image: row.MainImage || `https://picsum.photos/seed/${row.ServiceType}-${row.ServiceID}/400/300`,
      location: row.BusinessName || 'Unknown',
      rating: parseFloat(row.Rating),
      reviewCount: row.ReviewCount || 0,
      price: row.PriceRange || 'Contact for pricing',
      priceRange: [0, 0],
      featured: row.ReviewCount > 5,
      tags: [row.Description || '']
    }));

    res.json(formatted);
  });
});

// ✅ Route 2: Vendor Detail by ID
router.get('/vendors/:id', (req, res) => {
  const serviceId = req.params.id;

  const query = `
    SELECT 
      s.ServiceID,
      s.ServiceType,
      COALESCE(v.ServiceName, d.ServiceName, c.ServiceName, p.ServiceName, e.ServiceName) AS ServiceName,
      COALESCE(v.Description, d.Description, c.Description, p.Description, e.Description) AS Description,
      COALESCE(v.PriceRange, d.PriceRange, c.PriceRange, p.PriceRange, e.PriceRange) AS PriceRange,
      COALESCE(v.Location, d.Location, c.Location, p.Location, e.Location) AS Location,
      COALESCE(v.Address, d.Address, c.Address, p.Address, e.Address) AS Address,
      COALESCE(v.ContactEmail, d.ContactEmail, c.ContactEmail, p.ContactEmail, e.ContactEmail) AS ContactEmail,
      COALESCE(v.ContactPhone, d.ContactPhone, c.ContactPhone, p.ContactPhone, e.ContactPhone) AS ContactPhone,
      COALESCE(v.Website, d.Website, c.Website, p.Website, e.Website) AS Website,
      COALESCE(v.Capacity, d.Capacity, c.Capacity, p.Capacity, e.Capacity) AS Capacity,
      COALESCE(v.Amenities, d.Amenities, c.Amenities, p.Amenities, e.Amenities) AS Amenities,
      COALESCE(v.Tags, d.Tags, c.Tags, p.Tags, e.Tags) AS Tags,
      COALESCE(v.MainImage, d.MainImage, c.MainImage, p.MainImage, e.MainImage) AS MainImage,
      COALESCE(st.AverageRating, 0) AS Rating,
      COALESCE(st.TotalBookings, 0) AS ReviewCount
    FROM weddingplanner.service s
    LEFT JOIN weddingplanner.venue v ON v.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.decoration d ON d.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.catering c ON c.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.photography p ON p.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.entertainment e ON e.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.statistics st ON st.UserID = s.UserID
    WHERE s.ServiceID = ?;
  `;

  db.query(query, [serviceId], (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    const row = results[0];
    const vendorDetails = {
      id: row.ServiceID,
      name: row.ServiceName,
      category: row.ServiceType.toLowerCase(),
      description: row.Description,
      location: row.Location,
      address: row.Address,
      contactEmail: row.ContactEmail,
      contactPhone: row.ContactPhone,
      website: row.Website,
      rating: parseFloat(row.Rating),
      reviewCount: row.ReviewCount || 0,
      price: row.PriceRange || 'Contact for pricing',
      capacity: row.Capacity,
      amenities: row.Amenities ? JSON.parse(JSON.stringify(row.Amenities)) : [],  
      featured: row.ReviewCount > 5,
      tags: row.Tags ? JSON.parse(JSON.stringify(row.Tags)) : [],
      mainImage: row.MainImage && row.MainImage.trim() !== "" ? row.MainImage : "https://picsum.photos/seed/${row.VendorID}-${row.ServiceType}/800/400"
    };

    res.json(vendorDetails);
  });
});


// ✅ Route: Admin Dashboard - Vendor Services
router.get('/admin/vendors', (req, res) => {
  const query = `
    SELECT 
      s.ServiceID,
      s.ServiceType,
      u.BusinessName AS VendorName,
      COALESCE(v.ServiceName, d.ServiceName, c.ServiceName, p.ServiceName, e.ServiceName) AS ServiceName,
      COALESCE(v.PriceRange, d.PriceRange, c.PriceRange, p.PriceRange, e.PriceRange) AS PriceRange,
      COALESCE(st.TotalEarnings, 0) AS TotalRevenue
    FROM weddingplanner.service s
    JOIN weddingplanner.user u ON s.UserID = u.UserID
    LEFT JOIN weddingplanner.venue v ON v.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.decoration d ON d.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.catering c ON c.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.photography p ON p.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.entertainment e ON e.ServiceID = s.ServiceID
    LEFT JOIN weddingplanner.statistics st ON st.UserID = u.UserID
    WHERE u.UserType = 'Seller';
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch admin vendor data:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Group by vendor
    const grouped = {};

    results.forEach(row => {
      const vendorId = row.VendorName;

      if (!grouped[vendorId]) {
        grouped[vendorId] = {
          id: Object.keys(grouped).length + 1,
          name: vendorId,
          category: row.ServiceType,
          services: [],
          totalRevenue: 0
        };
      }

      grouped[vendorId].services.push({
        name: row.ServiceName,
        price: row.PriceRange || 'Contact for pricing'
      });

      grouped[vendorId].totalRevenue += parseFloat(row.TotalRevenue) || 0;
    });

    res.json(Object.values(grouped));
  });
});





module.exports = router;
