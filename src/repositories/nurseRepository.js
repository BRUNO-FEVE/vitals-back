const BaseRepository = require('./baseRepository');
const NurseModel = require('../models/nurseModel');
const NurseEntity = require('../entities/nurseEntity');

class NurseRepository extends BaseRepository {
  constructor() {
    super(NurseModel);
  }

  async createNurse(nurseEntity) {
    nurseEntity.validate();
    const nurseData = nurseEntity.toObject();
    delete nurseData.id;
    
    const nurse = await this.create(nurseData);
    return new NurseEntity(nurse);
  }

  async updateNurse(id, nurseEntity) {
    nurseEntity.validate();
    const nurseData = nurseEntity.toObject();
    delete nurseData.id;
    
    const nurse = await this.updateById(id, nurseData);
    return nurse ? new NurseEntity(nurse) : null;
  }

  async findByEmail(email) {
    const nurse = await this.findOne({ email });
    return nurse ? new NurseEntity(nurse) : null;
  }
}

module.exports = NurseRepository;