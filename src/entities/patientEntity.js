const BaseEntity = require('./baseEntity');

class PatientEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.cpf = data.cpf || '';
    this.name = data.name || '';
    this.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
  }

  validate() {
    if (!this.cpf || this.cpf.trim() === '') {
      throw new Error('CPF is required');
    }

    if (!this.name || this.name.trim() === '') {
      throw new Error('Name is required');
    }

    if (!this.dateOfBirth) {
      throw new Error('Date of birth is required');
    }

    return true;
  }

  toObject() {
    return {
      ...super.toObject(),
      cpf: this.cpf,
      name: this.name,
      dateOfBirth: this.dateOfBirth
    };
  }
}

module.exports = PatientEntity;