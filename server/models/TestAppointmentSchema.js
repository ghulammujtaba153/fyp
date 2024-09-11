import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testAppointmentSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  testId: {
    type: Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String, 
    required: true
  }
});

const TestAppointment = mongoose.model("TestAppointment", testAppointmentSchema);

export default TestAppointment;