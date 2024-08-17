// routes/conversationRoutes.js
import express from 'express';
import { createConversation, getConversationById, getUserConversations } from '../controllers/conversationController/conversationController.js';
import Conversation from '../models/conversationSchema.js';


const conversationRouter = express.Router();

// Create a new conversation
conversationRouter.post('/create', createConversation);

// Check if conversation exists between doctor and patient
conversationRouter.get('/doctor/:doctorId/patient/:patientId', async (req, res) => {
    const { doctorId, patientId } = req.params;
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [doctorId, patientId] }
      });
      res.status(200).json(conversation);
    } catch (error) {
      console.error('Error checking conversation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Get all conversations for a user
conversationRouter.get('/user/:userId', getUserConversations);

// Get conversation by ID
conversationRouter.get('/:id', getConversationById);

export default conversationRouter;
