const BaseEntity = require('./baseEntity');

class VitalsEntity extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.patientId = data.patientId || null;
    this.temperature = data.temperature || null;
    this.heartRate = data.heartRate || null;
    this.oxygenSaturation = data.oxygenSaturation || null;
    this.systolicPressure = data.systolicPressure || null;
    this.diastolicPressure = data.diastolicPressure || null;
    this.weight = data.weight || null;
  }

  validate() {
    if (!this.patientId) {
      throw new Error('Patient ID is required');
    }
    if (this.temperature === null) {
      throw new Error('Temperature is required');
    }
    if (this.heartRate === null) {
      throw new Error('Heart rate is required');
    }
    if (this.oxygenSaturation === null) {
      throw new Error('Oxygen saturation is required');
    }
    if (this.systolicPressure === null) {
      throw new Error('Systolic pressure is required');
    }
    if (this.diastolicPressure === null) {
      throw new Error('Diastolic pressure is required');
    }
    if (this.weight === null) {
      throw new Error('Weight is required');
    }
    return true;
  }

  toObject() {
    return {
      ...super.toObject(),
      patientId: this.patientId,
      temperature: this.temperature,
      heartRate: this.heartRate,
      oxygenSaturation: this.oxygenSaturation,
      systolicPressure: this.systolicPressure,
      diastolicPressure: this.diastolicPressure,
      weight: this.weight
    };
  }
}

module.exports = VitalsEntity;