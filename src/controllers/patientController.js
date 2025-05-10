const PatientRepository = require('../repositories/patientRepository');
const PatientEntity = require('../entities/patientEntity');
const ApiResponse = require('../utils/apiResponse');

const patientRepo = new PatientRepository();

const patientController = {
  getPatientById: async (req, res, next) => {
    try {
      const patient = await patientRepo.findById(req.params.id);
      
      if (!patient) {
        return res.status(404).json(
          ApiResponse.error('Patient not found', 404)
        );
      }
      
      const patientEntity = new PatientEntity(patient);
      
      res.status(200).json(
        ApiResponse.success('Patient retrieved successfully', patientEntity.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  createPatient: async (req, res, next) => {
    try {
      const patientEntity = new PatientEntity(req.body);
      
      patientEntity.validate();
      
      const existingPatient = await patientRepo.findByCpf(patientEntity.cpf);
      if (existingPatient) {
        return res.status(400).json(
          ApiResponse.error('CPF already registered', 400)
        );
      }
      
      const createdPatient = await patientRepo.createPatient(patientEntity);
      
      res.status(201).json(
        ApiResponse.success('Patient created successfully', createdPatient.toObject(), 201)
      );
    } catch (error) {
      next(error);
    }
  }
};

module.exports = patientController;