const Prescription = require('../models/Prescription');

// Create a new prescription
export const createPrescription = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentId, medications, notes, nextReviewDate } = req.body;

    // Create a new prescription document
    const newPrescription = new Prescription({
      patientId,
      doctorId,
      appointmentId,
      medications,
      notes,
      nextReviewDate
    });

    // Save the prescription to the database
    const savedPrescription = await newPrescription.save();

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      prescription: savedPrescription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create prescription',
      error: error.message
    });
  }
};


export const getPrescriptionsByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
      const prescriptions = await Prescription.find({ patientId }).populate('doctorId').populate('appointmentId');
  
      if (!prescriptions) {
        return res.status(404).json({
          success: false,
          message: 'No prescriptions found for this patient'
        });
      }
  
      res.status(200).json({
        success: true,
        prescriptions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch prescriptions',
        error: error.message
      });
    }
  };
  
  // Get all prescriptions by doctorId
  export const getPrescriptionsByDoctorId = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const prescriptions = await Prescription.find({ doctorId }).populate('patientId').populate('appointmentId');
  
      if (!prescriptions) {
        return res.status(404).json({
          success: false,
          message: 'No prescriptions found for this doctor'
        });
      }
  
      res.status(200).json({
        success: true,
        prescriptions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch prescriptions',
        error: error.message
      });
    }
  };