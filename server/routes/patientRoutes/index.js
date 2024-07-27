import { Router } from "express";
import { loginUser, registerUser, user } from "../../controllers/patientControllers/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", user);

export default router;
