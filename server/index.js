import express, { json } from 'express';
import cors from 'cors';

import { connection } from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/patientRoutes/index.js';
import doctorRouter from './routes/doctorRoutes/index.js';
import conversationRouter from './routes/conversationRoutes.js';
import videoCallRouter from './routes/videoCallRoutes.js';
import perscriptionRouter from './routes/perscriptionRoutes.js';
import ratingRouter from './routes/ratingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import testsRouter from './routes/testsRoutes.js';
import testAppointmentRouter from './routes/testAppointmentRoutes.js';

dotenv.config();



const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(json());

connection();
app.use("/api/", router);
app.use('/api/doctors', doctorRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/videoCalls', videoCallRouter);
app.use('/api/prescriptions', perscriptionRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tests', testsRouter);
app.use('/api/testappointments', testAppointmentRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
