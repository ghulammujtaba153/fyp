import { Router } from 'express';
import { createTestAppointment, getAllTestAppointments, getTestAppointmentById } from '../controllers/testAppointmentControllers.js';

const testAppointmentRouter = Router();

testAppointmentRouter.post('/create', createTestAppointment);

testAppointmentRouter.get('/all', getAllTestAppointments);

testAppointmentRouter.get('/:id', getTestAppointmentById);



export default testAppointmentRouter;