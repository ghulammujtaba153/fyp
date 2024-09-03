import express from "express";
import { getPatients, homeStats } from "../controllers/adminControllers.js";


const adminRouter = express.Router();

adminRouter.get("/patients", getPatients);

//total users, doctors, patients, appointments
adminRouter.get("/stats", homeStats);

export default adminRouter;