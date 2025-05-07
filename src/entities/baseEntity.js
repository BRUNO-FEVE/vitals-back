/**
 * Base Entity class
 * Represents the business entity structure separate from database models
 */
class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || data._id || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Validate entity data
   * @returns {boolean} Validation result
   */
  validate() {
    return true;
  }

  /**
   * Convert entity to plain object
   * @returns {Object} Plain object representation
   */
  toObject() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = BaseEntity;