const BaseRepository = require('./baseRepository');
const UserModel = require('../models/userModel');
const UserEntity = require('../entities/userEntity');

/**
 * User Repository
 * Handles database operations for users
 */
class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  /**
   * Create a new user
   * @param {UserEntity} userEntity - User entity
   * @returns {Promise<UserEntity>} Created user entity
   */
  async createUser(userEntity) {
    userEntity.validate();
    const userData = userEntity.toObject();
    delete userData.id; // Remove id for creation
    
    const user = await this.create(userData);
    return new UserEntity(user);
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<UserEntity|null>} User entity or null
   */
  async findByEmail(email) {
    const user = await this.findOne({ email });
    return user ? new UserEntity(user) : null;
  }

  /**
   * Get all active users
   * @returns {Promise<Array<UserEntity>>} Array of user entities
   */
  async findAllActive() {
    const users = await this.findAll({ active: true });
    return users.map(user => new UserEntity(user));
  }

  /**
   * Update user
   * @param {string} id - User ID
   * @param {UserEntity} userEntity - User entity with updated data
   * @returns {Promise<UserEntity>} Updated user entity
   */
  async updateUser(id, userEntity) {
    userEntity.validate();
    const userData = userEntity.toObject();
    delete userData.id; // Remove id for update
    
    const user = await this.updateById(id, userData);
    return user ? new UserEntity(user) : null;
  }
}

module.exports = UserRepository;