import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

// Define the Doctor Schema
const doctorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  doctor_qualificationId: [{
    type: Schema.Types.ObjectId,
    ref: 'Qualification'
  }],
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: 'AvailabilitySchedule'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Doctor Model
const Doctor = model('Doctor', doctorSchema);

export default Doctor;
