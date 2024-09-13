import { Router } from 'express';
import { createTestAppointment, getAllTestAppointments, getTestAppointmentById, getTestAppointmentByTestId } from '../controllers/testAppointmentControllers.js';


const testAppointmentRouter = Router();

testAppointmentRouter.post('/create', createTestAppointment);

testAppointmentRouter.get('/all', getAllTestAppointments);

testAppointmentRouter.get('/:id', getTestAppointmentById);

//testid
testAppointmentRouter.get('/test/:id', getTestAppointmentByTestId);


export default testAppointmentRouter;