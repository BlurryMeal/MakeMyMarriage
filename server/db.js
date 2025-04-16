require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require('mysql2');

console.log("ENV LOADED:", {
    host: 'tramway.proxy.rlwy.net',
    port: 57255,
    user: 'root',
    password: 'ivEqidPOIZWWZomwFIEeFAyEDSRxtVGk',
    database: 'railway'
  });

  
const db = mysql.createConnection({
  host: 'tramway.proxy.rlwy.net',
  port: 57255,
  user: 'root',
  password: 'ivEqidPOIZWWZomwFIEeFAyEDSRxtVGk',
  database: 'railway'
});




db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('MySQL connected');
  }
});

module.exports = db;
