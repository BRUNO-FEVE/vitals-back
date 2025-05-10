const NurseRepository = require('../repositories/nurseRepository');
const NurseEntity = require('../entities/nurseEntity');
const ApiResponse = require('../utils/apiResponse');

const nurseRepo = new NurseRepository();

const nurseController = {
  createNurse: async (req, res, next) => {
    try {
      const nurseEntity = new NurseEntity(req.body);
      nurseEntity.validate();
      
      const existingNurse = await nurseRepo.findByEmail(nurseEntity.email);
      if (existingNurse) {
        return res.status(400).json(
          ApiResponse.error('Email already registered', 400)
        );
      }
      
      const createdNurse = await nurseRepo.createNurse(nurseEntity);
      
      res.status(201).json(
        ApiResponse.success('Nurse created successfully', createdNurse.toObject(), 201)
      );
    } catch (error) {
      next(error);
    }
  },

  getNurseById: async (req, res, next) => {
    try {
      const nurse = await nurseRepo.findById(req.params.id);
      
      if (!nurse) {
        return res.status(404).json(
          ApiResponse.error('Nurse not found', 404)
        );
      }
      
      const nurseEntity = new NurseEntity(nurse);
      
      res.status(200).json(
        ApiResponse.success('Nurse retrieved successfully', nurseEntity.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  updateNurse: async (req, res, next) => {
    try {
      const existingNurse = await nurseRepo.findById(req.params.id);
      if (!existingNurse) {
        return res.status(404).json(
          ApiResponse.error('Nurse not found', 404)
        );
      }
      
      const nurseEntity = new NurseEntity({
        ...existingNurse,
        ...req.body
      });
      
      const updatedNurse = await nurseRepo.updateNurse(req.params.id, nurseEntity);
      
      res.status(200).json(
        ApiResponse.success('Nurse updated successfully', updatedNurse.toObject())
      );
    } catch (error) {
      next(error);
    }
  }
};

module.exports = nurseController;