const express = require('express');
const cors = require('cors');

const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/schools', schoolRoutes);

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'School Management API Running'
  });
});

module.exports = app;