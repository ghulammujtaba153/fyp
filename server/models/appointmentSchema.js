import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  doctorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  patientId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  timing: { 
    type: String, 
    required: true 
  },
  reviews: [{
    patientId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    review: { 
      type: String 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5 
    }
  }],
  prescription: [{
    medicineName: { 
      type: String 
    },
    dosage: { 
      type: String 
    },
    duration: { 
      type: String 
    }
  }],
  diseases: [{
    diseaseName: { 
      type: String 
    },
    diagnosisDate: { 
      type: Date 
    }
  }],
  dietPlan: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['new', 'completed'],
    default: 'new'
  }
}, {
  timestamps: true
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;
