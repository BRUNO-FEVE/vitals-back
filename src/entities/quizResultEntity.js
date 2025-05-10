const BaseEntity = require('./baseEntity');

class QuizResultEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.patientId = data.patientId || null;
    this.quizType = data.quizType || null;
    this.answers = data.answers || [];
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  }

  validate() {
    if (!this.patientId) {
      throw new Error('Patient ID is required');
    }
    if (!this.quizType) {
      throw new Error('Quiz type is required');
    }
    if (!Array.isArray(this.answers) || this.answers.length === 0) {
      throw new Error('Answers are required');
    }
    return true;
  }

  toObject() {
    return {
      ...super.toObject(),
      patientId: this.patientId,
      quizType: this.quizType,
      answers: this.answers,
      createdAt: this.createdAt
    };
  }
}

module.exports = QuizResultEntity;