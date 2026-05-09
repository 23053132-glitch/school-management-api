const db = require('../config/db');
const calculateDistance = require('../utils/distance');

// Add School
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body || {};

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const sql = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, address, latitude, longitude],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: 'School added successfully',
        schoolId: result.insertId
      });
    }
  );
};

// List Schools
exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and Longitude are required'
    });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  db.query('SELECT * FROM schools', (err, schools) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    const sortedSchools = schools
      .map((school) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: `${distance.toFixed(2)} km`
        };
      })
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    res.status(200).json({
      success: true,
      schools: sortedSchools
    });
  });
};