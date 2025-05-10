const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

// @route   GET /api/patients/:id
// @desc    Get patient by ID
// @access  Public
router.get('/:id', patientController.getPatientById);

// @route   POST /api/patients
// @desc    Create a new patient
// @access  Public
router.post('/', patientController.createPatient);

module.exports = router;