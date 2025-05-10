const TriageRepository = require('../repositories/triageRepository');
const TriageEntity = require('../entities/triageEntity');
const ApiResponse = require('../utils/apiResponse');

const triageRepo = new TriageRepository();

const triageController = {
  createTriage: async (req, res, next) => {
    try {
      const triageEntity = new TriageEntity(req.body);
      triageEntity.validate();
      
      const createdTriage = await triageRepo.createTriage(triageEntity);
      
      res.status(201).json(
        ApiResponse.success('Triage created successfully', createdTriage.toObject(), 201)
      );
    } catch (error) {
      next(error);
    }
  },

  getTriageById: async (req, res, next) => {
    try {
      const triage = await triageRepo.findById(req.params.id);
      
      if (!triage) {
        return res.status(404).json(
          ApiResponse.error('Triage not found', 404)
        );
      }
      
      const triageEntity = new TriageEntity(triage);
      
      res.status(200).json(
        ApiResponse.success('Triage retrieved successfully', triageEntity.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  updateTriage: async (req, res, next) => {
    try {
      const existingTriage = await triageRepo.findById(req.params.id);
      if (!existingTriage) {
        return res.status(404).json(
          ApiResponse.error('Triage not found', 404)
        );
      }
      
      const triageEntity = new TriageEntity({
        ...existingTriage,
        ...req.body
      });
      
      const updatedTriage = await triageRepo.updateTriage(req.params.id, triageEntity);
      
      res.status(200).json(
        ApiResponse.success('Triage updated successfully', updatedTriage.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  getPendingTriages: async (req, res, next) => {
    try {
      const pendingTriages = await triageRepo.getPendingTriages();
      
      res.status(200).json(
        ApiResponse.success('Pending triages retrieved successfully', 
          pendingTriages.map(triage => triage.toObject()))
      );
    } catch (error) {
      next(error);
    }
  },

  getTriageResult: async (req, res, next) => {
    try {
      const triageResult = await triageRepo.getTriageResult(req.params.id);
      
      if (!triageResult) {
        return res.status(404).json(
          ApiResponse.error('Triage result not found', 404)
        );
      }
      
      res.status(200).json(
        ApiResponse.success('Triage result retrieved successfully', triageResult.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  releaseFromTriage: async (req, res, next) => {
    try {
      const result = await triageRepo.releaseFromTriage(req.params.patientId);
      
      if (!result) {
        return res.status(404).json(
          ApiResponse.error('No active triage found for patient', 404)
        );
      }
      
      res.status(200).json(
        ApiResponse.success('Patient released from triage successfully', result.toObject())
      );
    } catch (error) {
      next(error);
    }
  }
};

module.exports = triageController;