const express = require('express');
const vitalsController = require('../controllers/vitalsController');

const router = express.Router();

router.post('/', vitalsController.createVitals);
router.get('/:id', vitalsController.getVitalsById);
router.put('/:id', vitalsController.updateVitals);

module.exports = router;