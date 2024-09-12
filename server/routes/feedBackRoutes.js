import exporess from "express";
import { createFeedBack, getFeedBack } from "../controllers/feedbackController.js";

const feedBackRouter = exporess.Router();

feedBackRouter.post("/create", createFeedBack);
feedBackRouter.get("/", getFeedBack);

export default feedBackRouter;