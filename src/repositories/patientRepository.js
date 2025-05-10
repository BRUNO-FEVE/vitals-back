const BaseRepository = require('./baseRepository');
const PatientModel = require('../models/patientModel');
const PatientEntity = require('../entities/patientEntity');

class PatientRepository extends BaseRepository {
  constructor() {
    super(PatientModel);
  }

  async createPatient(patientEntity) {
    patientEntity.validate();
    const patientData = patientEntity.toObject();
    delete patientData.id;
    
    const patient = await this.create(patientData);
    return new PatientEntity(patient);
  }

  async findByCpf(cpf) {
    const patient = await this.findOne({ cpf });
    return patient ? new PatientEntity(patient) : null;
  }
}

module.exports = PatientRepository;