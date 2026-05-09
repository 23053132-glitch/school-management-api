const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = require('./src/app');
const db = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect Database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }

  console.log('MySQL Connected');

  // Start Server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});