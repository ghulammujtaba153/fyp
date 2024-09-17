import Notification from "../models/notificationSchema.js";


export const createNotification = async (req, res) => {
    try {
        const { receiverId, title, message, link, status, date, read } = req.body;
        const notification = await Notification.create({
            receiverId,
            title,
            message,
            link,
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification' });
    }
};

export const getNotificationsById = async (req, res) => {
    const { userId } = req.params;
    console.log("user id"+userId);

    try {
        const notifications = await Notification.find({ receiverId: userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error getting notifications' });
    }
};

export const changeNotificationStatus = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndUpdate(notificationId, { read: !notification.read });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error changing notification status' });
    }
};