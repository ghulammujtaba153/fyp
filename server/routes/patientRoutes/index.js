import { Router } from "express";
import { loginUser, registerUser, updateUser, user } from "../../controllers/patientControllers/auth.js";
import { bookAppointment, getDoctorUpcomingAppointments, getUpcomingAppointments, updateAppointmentStatus } from "../../controllers/patientControllers/appointment.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", user);
router.put('/user/:userId', updateUser);
//appointment

router.post('/appointments', bookAppointment);
router.patch('/appointments/:id/status', updateAppointmentStatus);
router.get('/appointments/upcoming/:patientId', getUpcomingAppointments);
router.get('/appointments/doctor/:doctorId', getDoctorUpcomingAppointments);

export default router;
