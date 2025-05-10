const mongoose = require('mongoose');

const triageSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required']
    },
    vitalsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vitals',
      required: [true, 'Vitals ID is required']
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuizResult',
      required: [true, 'Quiz ID is required']
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nurse',
      required: [true, 'Nurse ID is required']
    },
    notes: {
      type: String,
      default: ''
    },
    priorityNumber: {
      type: Number,
      required: [true, 'Priority number is required'],
      min: 0,
      max: 5
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
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

const Triage = mongoose.model('Triage', triageSchema);

module.exports = Triage;