import { Router } from "express";
import { loginUser, registerUser, updateUser, user } from "../../controllers/patientControllers/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", user);
router.put('/user/:userId', updateUser);

export default router;
