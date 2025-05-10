const express = require('express');
const nurseController = require('../controllers/nurseController');

const router = express.Router();

router.post('/', nurseController.createNurse);
router.get('/:id', nurseController.getNurseById);
router.put('/:id', nurseController.updateNurse);

module.exports = router;