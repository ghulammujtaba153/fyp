
import express from 'express';
import { createECGReport, getECGReportById } from '../controllers/testReportsController.js';


const testReportRouter = express.Router();

testReportRouter.post('/ecg/create', createECGReport);
testReportRouter.get('/test/:id', getECGReportById);

export default testReportRouter;