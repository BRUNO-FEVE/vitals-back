const BaseEntity = require('./baseEntity');

class NurseEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
  }

  validate() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Name is required');
    }
    if (!this.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      throw new Error('Valid email is required');
    }
    if (!this.password || this.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    return true;
  }

  toObject() {
    return {
      ...super.toObject(),
      name: this.name,
      email: this.email
      // Password is intentionally excluded from toObject for security
    };
  }
}

module.exports = NurseEntity;