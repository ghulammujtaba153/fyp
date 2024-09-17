import Appointment from "../models/appointmentSchema";


export const getParientStats = async (req, res) => {
  try {
    const totalApointments=await Appointment.countDocuments({patientId:req.params.patientId});


    res.status(200).json(totalApointments);
  } catch (error) {
    console.error('Error retrieving patient stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};