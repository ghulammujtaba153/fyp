import express from 'express';
import { addRating } from '../controllers/ratingController.js';


const ratingRouter = express.Router();

// POST /api/ratings
ratingRouter.post('/create', addRating);

export default ratingRouter;
