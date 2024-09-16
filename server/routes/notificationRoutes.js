import express from 'express';
import { changeNotificationStatus, createNotification, getNotificationsById } from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.post('/', createNotification);
notificationRouter.get('/:userId', getNotificationsById);
notificationRouter.put('/:notificationId', changeNotificationStatus);

export default notificationRouter;