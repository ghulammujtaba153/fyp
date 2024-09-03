import { Router } from 'express';
import { createTest, getAllTests } from '../controllers/testsControllers.js';

const testsRouter = Router();

testsRouter.post('/create', createTest);

testsRouter.get('/all', getAllTests);

export default testsRouter;
