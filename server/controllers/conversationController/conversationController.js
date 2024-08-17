// controllers/conversationController.js

import Conversation from "../../models/conversationSchema.js";
import User from "../../models/userSchema.js";


// Create a new conversation
export const createConversation = async (req, res) => {
  try {
    const { participants } = req.body;
    console.log(req.body);

    // Check if all participants are valid users
    // const users = await User.find({ _id: { $in: participants } });
    // if (users.length !== participants.length) {
    //   return res.status(400).json({ message: 'One or more users are invalid' });
    // }

    // Create a new conversation
    const conversation = new Conversation({
      participants
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all conversations for a user
export const getUserConversations = async (req, res) => {
  try {
    const userId = req.params.userId;

    const conversations = await Conversation.find({
      participants: userId
    }).populate('participants');

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getConversationById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const conversation = await Conversation.findById(id)
        .populate('participants', 'name') // Optionally populate participant data
        .populate('messages.sender', 'name'); // Optionally populate sender data
  
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
  
      res.status(200).json(conversation);
    } catch (error) {
      console.error('Error retrieving conversation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };