const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required']
    },
    temperature: {
      type: Number,
      required: [true, 'Temperature is required']
    },
    heartRate: {
      type: Number,
      required: [true, 'Heart rate is required']
    },
    oxygenSaturation: {
      type: Number,
      required: [true, 'Oxygen saturation is required']
    },
    systolicPressure: {
      type: Number,
      required: [true, 'Systolic pressure is required']
    },
    diastolicPressure: {
      type: Number,
      required: [true, 'Diastolic pressure is required']
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Vitals = mongoose.model('Vitals', vitalsSchema);

module.exports = Vitals;