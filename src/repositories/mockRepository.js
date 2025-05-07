/**
 * Mock Repository
 * In-memory implementation for testing and development
 */
class MockRepository {
  constructor() {
    this.data = new Map();
    this.idCounter = 1;
  }

  /**
   * Get all records
   * @param {Object} filter - Filter criteria (simplified)
   * @returns {Promise<Array>} Array of records
   */
  async findAll(filter = {}) {
    let result = Array.from(this.data.values());
    
    // Apply simple filtering
    if (Object.keys(filter).length > 0) {
      result = result.filter(item => {
        return Object.entries(filter).every(([key, value]) => {
          return item[key] === value;
        });
      });
    }
    
    return result;
  }

  /**
   * Get record by ID
   * @param {string|number} id - Record ID
   * @returns {Promise<Object|null>} Record or null
   */
  async findById(id) {
    return this.data.get(String(id)) || null;
  }

  /**
   * Get one record by filter
   * @param {Object} filter - Filter criteria
   * @returns {Promise<Object|null>} Record or null
   */
  async findOne(filter) {
    const records = await this.findAll(filter);
    return records.length > 0 ? records[0] : null;
  }

  /**
   * Create a new record
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record
   */
  async create(data) {
    const id = String(this.idCounter++);
    const record = {
      ...data,
      _id: id,
      id: id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.data.set(id, record);
    return record;
  }

  /**
   * Update record by ID
   * @param {string|number} id - Record ID
   * @param {Object} data - Update data
   * @returns {Promise<Object|null>} Updated record or null
   */
  async updateById(id, data) {
    const record = await this.findById(id);
    
    if (!record) {
      return null;
    }
    
    const updated = {
      ...record,
      ...data,
      updatedAt: new Date()
    };
    
    this.data.set(String(id), updated);
    return updated;
  }

  /**
   * Delete record by ID
   * @param {string|number} id - Record ID
   * @returns {Promise<Object|null>} Deleted record or null
   */
  async deleteById(id) {
    const record = await this.findById(id);
    
    if (!record) {
      return null;
    }
    
    this.data.delete(String(id));
    return record;
  }

  /**
   * Count records matching filter
   * @param {Object} filter - Filter criteria
   * @returns {Promise<number>} Count
   */
  async count(filter = {}) {
    const records = await this.findAll(filter);
    return records.length;
  }

  /**
   * Clear all data (for testing)
   */
  clear() {
    this.data.clear();
    this.idCounter = 1;
  }
}

module.exports = MockRepository;