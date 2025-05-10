const express = require('express');
const userRoutes = require('./userRoutes');
const patientRoutes = require('./patientRoutes');

const router = express.Router();

// Health check
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running'
  });
});

// Mount routes
router.use('/users', userRoutes);
router.use('/patients', patientRoutes);

// 404 handler for API routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404
  });
});

module.exports = router;