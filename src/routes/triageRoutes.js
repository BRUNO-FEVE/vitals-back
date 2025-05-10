const express = require('express');
const triageController = require('../controllers/triageController');

const router = express.Router();

router.post('/', triageController.createTriage);
router.get('/:id', triageController.getTriageById);
router.put('/:id', triageController.updateTriage);
router.get('/pending', triageController.getPendingTriages);
router.get('/result/:id', triageController.getTriageResult);
router.post('/release/:patientId', triageController.releaseFromTriage);

module.exports = router;