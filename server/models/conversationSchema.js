// models/Conversation.js
import { Schema, model } from 'mongoose';

const conversationSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [{
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now },
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Conversation = model('Conversation', conversationSchema);

export default Conversation;
