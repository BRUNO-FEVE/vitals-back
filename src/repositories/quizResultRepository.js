const BaseRepository = require('./baseRepository');
const QuizResultModel = require('../models/quizResultModel');
const QuizResultEntity = require('../entities/quizResultEntity');

class QuizResultRepository extends BaseRepository {
  constructor() {
    super(QuizResultModel);
  }

  async createQuizResult(quizResultEntity) {
    quizResultEntity.validate();
    const quizResultData = quizResultEntity.toObject();
    delete quizResultData.id;
    
    const quizResult = await this.create(quizResultData);
    return new QuizResultEntity(quizResult);
  }
}

module.exports = QuizResultRepository;