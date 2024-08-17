import express from 'express';
import { getAllDoctors, getDoctorInfo, registerDoctor, updateProfile } from '../../controllers/doctorControllers/index.js';
// Adjust the path as necessary

const doctorRouter = express.Router();

// Route to register a new doctor
doctorRouter.post('/register', registerDoctor);

doctorRouter.get('/:userId', getDoctorInfo);
doctorRouter.get('/', getAllDoctors);
doctorRouter.put('/profiles/:id', updateProfile);

export default doctorRouter;
