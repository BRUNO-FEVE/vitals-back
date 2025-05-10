const BaseRepository = require('./baseRepository');
const TriageModel = require('../models/triageModel');
const TriageEntity = require('../entities/triageEntity');

class TriageRepository extends BaseRepository {
  constructor() {
    super(TriageModel);
  }

  async createTriage(triageEntity) {
    triageEntity.validate();
    const triageData = triageEntity.toObject();
    delete triageData.id;
    
    const triage = await this.create(triageData);
    return new TriageEntity(triage);
  }

  async updateTriage(id, triageEntity) {
    triageEntity.validate();
    const triageData = triageEntity.toObject();
    delete triageData.id;
    
    const triage = await this.updateById(id, triageData);
    return triage ? new TriageEntity(triage) : null;
  }

  async getPendingTriages() {
    const triages = await this.findAll({ state: 'pending' });
    return triages.map(triage => new TriageEntity(triage));
  }

  async getTriageResult(id) {
    const triage = await this.model.findById(id)
      .populate('patientId')
      .populate('vitalsId')
      .populate('quizId')
      .populate('nurseId');
    
    return triage ? new TriageEntity(triage) : null;
  }

  async releaseFromTriage(patientId) {
    const triage = await this.findOne({ 
      patientId, 
      state: { $ne: 'completed' } 
    });
    
    if (triage) {
      return await this.updateById(triage._id, { state: 'completed' });
    }
    return null;
  }
}

module.exports = TriageRepository;