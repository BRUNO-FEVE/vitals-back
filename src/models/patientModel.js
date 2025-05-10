const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    cpf: {
      type: String,
      required: [true, 'CPF is required'],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;