const UserRepository = require('../repositories/userRepository');
const UserEntity = require('../entities/userEntity');
const ApiResponse = require('../utils/apiResponse');

const userRepo = new UserRepository();

/**
 * User controller
 */
const userController = {
  /**
   * Get all users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userRepo.findAll();
      const userEntities = users.map(user => new UserEntity(user).toObject());
      
      res.status(200).json(
        ApiResponse.success('Users retrieved successfully', userEntities)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getUserById: async (req, res, next) => {
    try {
      const user = await userRepo.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json(
          ApiResponse.error('User not found', 404)
        );
      }
      
      const userEntity = new UserEntity(user);
      
      res.status(200).json(
        ApiResponse.success('User retrieved successfully', userEntity.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  createUser: async (req, res, next) => {
    try {
      const userEntity = new UserEntity(req.body);
      
      // Validate user entity
      userEntity.validate();
      
      // Check if email already exists
      const existingUser = await userRepo.findByEmail(userEntity.email);
      if (existingUser) {
        return res.status(400).json(
          ApiResponse.error('Email already in use', 400)
        );
      }
      
      // Create new user
      const createdUser = await userRepo.createUser(userEntity);
      
      res.status(201).json(
        ApiResponse.success('User created successfully', createdUser.toObject(), 201)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  updateUser: async (req, res, next) => {
    try {
      // Check if user exists
      const existingUser = await userRepo.findById(req.params.id);
      if (!existingUser) {
        return res.status(404).json(
          ApiResponse.error('User not found', 404)
        );
      }
      
      // Create user entity with updated data
      const userEntity = new UserEntity({
        ...existingUser,
        ...req.body
      });
      
      // Update user
      const updatedUser = await userRepo.updateUser(req.params.id, userEntity);
      
      res.status(200).json(
        ApiResponse.success('User updated successfully', updatedUser.toObject())
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  deleteUser: async (req, res, next) => {
    try {
      // Check if user exists
      const existingUser = await userRepo.findById(req.params.id);
      if (!existingUser) {
        return res.status(404).json(
          ApiResponse.error('User not found', 404)
        );
      }
      
      // Delete user
      await userRepo.deleteById(req.params.id);
      
      res.status(200).json(
        ApiResponse.success('User deleted successfully')
      );
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;