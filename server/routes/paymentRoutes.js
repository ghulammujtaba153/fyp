import express from 'express';
import { createPayment, getAllPayments, getPaymentsByDoctor, getPaymentsByPatient } from '../controllers/paymentControllers.js';

const paymentRouter = express.Router();

paymentRouter.post('/create', createPayment);
paymentRouter.get('/patient/:patientId', getPaymentsByPatient);
paymentRouter.get('/doctor/:doctorId', getPaymentsByDoctor);
paymentRouter.get('/', getAllPayments);

export default paymentRouter;