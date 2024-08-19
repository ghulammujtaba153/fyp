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
      .populate('participants', 'firstName lastName profile')  // Assuming 'name' is a derived value from firstName and lastName
      .populate({
        path: 'messages.sender',
        select: 'firstName lastName email profile', // Adjust the fields according to your User schema
      });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // console.log(JSON.stringify(conversation, null, 2));  // Log to inspect the populated data

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error retrieving conversation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





  // export const sendMessage = async (req, res) => {
  //   const { conversationId } = req.params;
  //   const { sender, content } = req.body;

  //   // console.log(req.body)
  
  //   try {
  //     const conversation = await Conversation.findById(conversationId);
  
  //     if (!conversation) {
  //       return res.status(404).json({ message: 'Conversation not found' });
  //     }
  
  //     const newMessage = {
  //       sender: sender, 
  //       content: content,
  //       createdAt: new Date()
  //     };
  
  //     conversation.messages.push(newMessage);
  //     // console.log(conversation)
  

  //     await conversation.save();
  //     io.to(id).emit('new_message', message);
  
  //     res.status(200).json({
  //       message: 'Message sent successfully',
  //       conversation
  //     });
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // };


  // import { io } from '../../index.js';  // Import the io instance

export const sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { sender, content } = req.body;

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const newMessage = {
      sender,
      content,
      createdAt: new Date()
    };

    conversation.messages.push(newMessage);
    await conversation.save();

    // Emit the new message to the conversation room
    // io.to(conversationId).emit('new_message', newMessage);

    res.status(200).json({
      message: 'Message sent successfully',
      conversation
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};