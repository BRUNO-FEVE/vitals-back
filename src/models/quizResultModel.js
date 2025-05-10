const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required']
    },
    quizType: {
      type: String,
      required: [true, 'Quiz type is required']
    },
    answers: [{
      type: String,
      required: [true, 'Answers are required']
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;