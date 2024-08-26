
import Rating from '../models/ratingSchema.js';
import Appointment from './../models/appointmentSchema.js';

export const addRating = async (req, res) => {
  const { doctorId, patientId, appointmentId, rating, comment } = req.body;

  try {
    // Validate the appointment existence
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ensure that the patient is part of the appointment
    if (appointment.patientId.toString() !== patientId) {
      return res.status(403).json({ message: 'You are not authorized to rate this appointment' });
    }

    // Check if a rating already exists for this appointment
    const existingRating = await Rating.findOne({ doctorId, patientId, appointmentId });
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this appointment' });
    }

    // Create a new rating
    const newRating = new Rating({
      doctorId,
      patientId,
      appointmentId,
      rating,
      comment,
    });

    // Save the rating to the database
    await newRating.save();

    res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
