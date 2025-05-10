const BaseRepository = require('./baseRepository');
const VitalsModel = require('../models/vitalsModel');
const VitalsEntity = require('../entities/vitalsEntity');

class VitalsRepository extends BaseRepository {
  constructor() {
    super(VitalsModel);
  }

  async createVitals(vitalsEntity) {
    vitalsEntity.validate();
    const vitalsData = vitalsEntity.toObject();
    delete vitalsData.id;
    
    const vitals = await this.create(vitalsData);
    return new VitalsEntity(vitals);
  }

  async updateVitals(id, vitalsEntity) {
    vitalsEntity.validate();
    const vitalsData = vitalsEntity.toObject();
    delete vitalsData.id;
    
    const vitals = await this.updateById(id, vitalsData);
    return vitals ? new VitalsEntity(vitals) : null;
  }
}

module.exports = VitalsRepository;