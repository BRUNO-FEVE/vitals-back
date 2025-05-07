const BaseEntity = require('./baseEntity');

/**
 * User Entity
 * Business logic and validation for user entities
 */
class UserEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || 'user';
    this.active = data.active !== undefined ? data.active : true;
  }

  /**
   * Validate user entity
   * @returns {boolean} Validation result
   */
  validate() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('User name is required');
    }

    if (!this.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      throw new Error('Valid email is required');
    }

    return true;
  }

  /**
   * Convert user entity to plain object
   * @returns {Object} Plain object representation
   */
  toObject() {
    return {
      ...super.toObject(),
      name: this.name,
      email: this.email,
      role: this.role,
      active: this.active
    };
  }
}

module.exports = UserEntity;