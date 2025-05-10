/**
 * Base Repository class
 * Provides common CRUD operations for MongoDB models
 */
class BaseRepository {
  /**
   * Create a new BaseRepository
   * @param {Model} model - Mongoose model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Get all documents
   * @param {Object} filter - Query filter
   * @param {string} projection - Fields to include/exclude
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of documents
   */
  async findAll(filter = {}, projection = '', options = {}) {
    return await this.model.find(filter, projection, options);
  }

  /**
   * Get document by ID
   * @param {string} id - Document ID
   * @returns {Promise<Object>} Document
   */
  async findById(id) {
    return await this.model.findById(id);
  }

  /**
   * Get one document by filter
   * @param {Object} filter - Query filter
   * @returns {Promise<Object>} Document
   */
  async findOne(filter) {
    return await this.model.findOne(filter);
  }

  /**
   * Create a new document
   * @param {Object} data - Document data
   * @returns {Promise<Object>} Created document
   */
  async create(data) {
    return await this.model.create(data);
  }

  /**
   * Update document by ID
   * @param {string} id - Document ID
   * @param {Object} data - Update data
   * @param {Object} options - Update options
   * @returns {Promise<Object>} Updated document
   */
  async updateById(id, data, options = { new: true, runValidators: true }) {
    return await this.model.findByIdAndUpdate(id, data, options);
  }

  /**
   * Delete document by ID
   * @param {string} id - Document ID
   * @returns {Promise<Object>} Deleted document
   */
  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }

  /**
   * Count documents matching filter
   * @param {Object} filter - Query filter
   * @returns {Promise<number>} Count
   */
  async count(filter = {}) {
    return await this.model.countDocuments(filter);
  }
}

module.exports = BaseRepository;