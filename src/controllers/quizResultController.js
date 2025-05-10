const QuizResultRepository = require('../repositories/quizResultRepository');
const QuizResultEntity = require('../entities/quizResultEntity');
const ApiResponse = require('../utils/apiResponse');

const quizResultRepo = new QuizResultRepository();

const quizResultController = {
  createQuizResult: async (req, res, next) => {
    try {
      const quizResultEntity = new QuizResultEntity(req.body);
      quizResultEntity.validate();
      
      const createdQuizResult = await quizResultRepo.createQuizResult(quizResultEntity);
      
      res.status(201).json(
        ApiResponse.success('Quiz result created successfully', createdQuizResult.toObject(), 201)
      );
    } catch (error) {
      next(error);
    }
  },

  getQuizResultById: async (req, res, next) => {
    try {
      const quizResult = await quizResultRepo.findById(req.params.id);
      
      if (!quizResult) {
        return res.status(404).json(
          ApiResponse.error('Quiz result not found', 404)
        );
      }
      
      const quizResultEntity = new QuizResultEntity(quizResult);
      
      res.status(200).json(
        ApiResponse.success('Quiz result retrieved successfully', quizResultEntity.toObject())
      );
    } catch (error) {
      next(error);
    }
  }
};

module.exports = quizResultController;