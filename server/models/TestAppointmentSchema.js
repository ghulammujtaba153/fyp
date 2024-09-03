import mongoose from "mongoose";

const Schema= mongoose.Schema;

const testAppoitmentSchema= new Schema({
    patientId:{
        type: Schema.types.ObjectId,
        ref: "User",
        req:true
    },
    testId:{
        type: Schema.types.ObjectId,
        ref: "Test",
        req:true
    },
    appointmentDate:{
        type: Date,
        required:true
    },
    appointmentTime:{
        type: Date,
        required:true
    }
});

const TestAppointment = mongoose.model("TestAppointment", testAppoitmentSchema);

export default TestAppointment;