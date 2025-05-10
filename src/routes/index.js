const express = require('express');
const patientRoutes = require('./patientRoutes');
const vitalsRoutes = require('./vitalsRoutes');
const quizResultRoutes = require('./quizResultRoutes');
const triageRoutes = require('./triageRoutes');

const router = express.Router();

// Health check
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running'
  });
});

// Mount routes
router.use('/patients', patientRoutes);
router.use('/vitals', vitalsRoutes);
router.use('/quiz-results', quizResultRoutes);
router.use('/triage', triageRoutes);
// 404 handler for API routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404
  });
});

module.exports = router;