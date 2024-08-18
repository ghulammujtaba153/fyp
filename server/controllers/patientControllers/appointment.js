
import Appointment from '../../models/appointmentSchema.js';
import User from '../../models/userSchema.js';
import Doctor from './../../models/doctorSchema.js';

export const bookAppointment = async (req, res) => {
  const { doctorId, patientId, timing, reviews, prescription, diseases, dietPlan } = req.body;

  try {
    // Validate that the doctor and patient exist
    const doctor = await Doctor.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      timing,
      reviews,
      prescription,
      diseases,
      dietPlan
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      // Validate status value
      if (!['new', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      // Update the appointment status
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true } // Return the updated document
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



export const getUpcomingAppointments = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const now = new Date();
  
      const appointments = await Appointment.find({
        patientId,
        timing: { $gte: now },
      }).populate('doctorId');
  
      if (!appointments.length) {
        return res.status(404).json({ message: 'No upcoming appointments found' });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error retrieving upcoming appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const getDoctorUpcomingAppointments = async (req, res) => {
    const { doctorId } = req.params;
  
    try {
      const now = new Date();
  
      const appointments = await Appointment.find({
        doctorId,
        timing: { $gte: now },
      }).populate('patientId');
  
      if (!appointments.length) {
        return res.status(404).json({ message: 'No upcoming appointments found' });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error retrieving upcoming appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const getAllAppointmentforPatients = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const now = new Date();
  
      const appointments = await Appointment.find({
        patientId,
        timing: { $gte: now },
      })
        .populate({
          path: 'doctorId',
          populate: {
            path: 'userId', // Populating the userId within doctorId
            select: 'firstName lastName email profile', // Select the fields you want from the user
          },
        });
  
      if (!appointments.length) {
        return res.status(404).json({ message: 'No upcoming appointments found' });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error retrieving upcoming appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  