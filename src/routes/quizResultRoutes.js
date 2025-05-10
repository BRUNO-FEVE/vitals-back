const express = require('express');
const quizResultController = require('../controllers/quizResultController');

const router = express.Router();

router.post('/', quizResultController.createQuizResult);
router.get('/:id', quizResultController.getQuizResultById);

module.exports = router;