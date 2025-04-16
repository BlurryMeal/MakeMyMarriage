require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');





const app = express();
app.use(cors());
app.use(express.json());


const vendorRoutes = require('./routes/vendorRoutes');
app.use('/api', vendorRoutes);

const signup = require('./routes/signup');
app.use('/api', signup);
const login = require('./routes/login');
app.use('/api', login);

const registerService = require('./routes/registerService');
app.use('/api', registerService);


const contactRoutes = require('./routes/contactRoutes');
app.use('/api', contactRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/api', bookingRoutes);





app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
