const BaseEntity = require('./baseEntity');

class TriageEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.patientId = data.patientId || null;
    this.vitalsId = data.vitalsId || null;
    this.quizId = data.quizId || null;
    this.nurseId = data.nurseId || null;
    this.notes = data.notes || '';
    this.priorityNumber = data.priorityNumber || null;
    this.state = data.state || 'pending';
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  }

  validate() {
    if (!this.patientId) {
      throw new Error('Patient ID is required');
    }
    if (!this.vitalsId) {
      throw new Error('Vitals ID is required');
    }
    if (!this.quizId) {
      throw new Error('Quiz ID is required');
    }
    if (!this.nurseId) {
      throw new Error('Nurse ID is required');
    }
    if (this.priorityNumber === null || this.priorityNumber < 0 || this.priorityNumber > 5) {
      throw new Error('Priority number must be between 0 and 5');
    }
    return true;
  }

  toObject() {
    return {
      ...super.toObject(),
      patientId: this.patientId,
      vitalsId: this.vitalsId,
      quizId: this.quizId,
      nurseId: this.nurseId,
      notes: this.notes,
      priorityNumber: this.priorityNumber,
      state: this.state,
      createdAt: this.createdAt
    };
  }
}

module.exports = TriageEntity;