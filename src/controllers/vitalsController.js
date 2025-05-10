const VitalsRepository = require('../repositories/vitalsRepository');
const VitalsEntity = require('../entities/vitalsEntity');
const ApiResponse = require('../utils/apiResponse');

const vitalsRepo = new VitalsRepository();

const vitalsController = {
  createVitals: async (req, res, next) => {
    try {
      const vitalsEntity = new VitalsEntity(req.body);
      vitalsEntity.validate();
      
      const createdVitals = await vitalsRepo.createVitals(vitalsEntity);
      
      res.status(201).json(
        ApiResponse.success('Vitals created successfully', createdVitals.toObject(), 201)
      );
    } catch (error) {
      next(error);
    }
  },

  getVitalsById: async (req, res, next) => {
    try {
      const vitals = await vitalsRepo.findById(req.params.id);
      
      if (!vitals) {
        return res.status(404).json(
          ApiResponse.error('Vitals not found', 404)
        );
      }
      
      const vitalsEntity = new VitalsEntity(vitals);
      
      res.status(200).json(
        ApiResponse.success('Vitals retrieved successfully', vitalsEntity.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  updateVitals: async (req, res, next) => {
    try {
      const existingVitals = await vitalsRepo.findById(req.params.id);
      if (!existingVitals) {
        return res.status(404).json(
          ApiResponse.error('Vitals not found', 404)
        );
      }
      
      const vitalsEntity = new VitalsEntity({
        ...existingVitals,
        ...req.body
      });
      
      const updatedVitals = await vitalsRepo.updateVitals(req.params.id, vitalsEntity);
      
      res.status(200).json(
        ApiResponse.success('Vitals updated successfully', updatedVitals.toObject())
      );
    } catch (error) {
      next(error);
    }
  }
};

module.exports = vitalsController;