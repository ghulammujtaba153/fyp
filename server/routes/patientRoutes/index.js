import { Router } from "express";
import { loginUser, registerUser, updateUser, user } from "../../controllers/patientControllers/auth.js";
import { bookAppointment, getAllAppointmentforDoctor, getAllAppointmentforPatients, getDoctorUpcomingAppointments, getUpcomingAppointments, updateAppointmentStatus } from "../../controllers/patientControllers/appointment.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", user);
router.put('/user/:userId', updateUser);
//appointment

router.post('/appointments', bookAppointment);
router.put('/appointments/:id/status', updateAppointmentStatus);

router.get('/appointments/upcoming/:patientId', getUpcomingAppointments);
router.get('/appointments/all/:patientId', getAllAppointmentforPatients);

router.get('/appointments/doctor/:doctorId', getDoctorUpcomingAppointments);
router.get('/appointments/all/doctor/:doctorId', getAllAppointmentforDoctor);

export default router;
