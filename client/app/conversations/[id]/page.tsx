"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { Phone, Send } from 'lucide-react';
import Message from '@/components/Message';
import { UserContext } from '@/context/UserContext';

const ConversationPage = ({ params }: { params: { id: string } }) => {
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState(''); // State to track input message
  const router = useRouter();
  const { user } = useContext(UserContext);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/conversations/${params.id}`);
      setConversation(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Polling mechanism to fetch messages every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchMessages, 1500); // Fetch messages every 2 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [params.id]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const res = await axios.post(`${API_BASE_URL}/conversations/${params.id}/messages`, {
          sender: user._id,
          content: newMessage,
        });
        setConversation((prev) => ({
          ...prev,
          messages: [...prev.messages, res.data], // Add new message to conversation
        }));
        setNewMessage(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className='flex flex-col max-w-[1000px] h-screen bg-red-100 mx-auto'>
      <div className='flex items-center justify-between p-4 bg-red-300'>
        <div className="flex items-center">
          <img src="" alt="" className='w-[40px] h-[40px] rounded-full'/>
          <p>Name</p>
        </div>
        <div className='p-5 cursor-pointer'>
          <Phone />
        </div>
      </div>

      <div className="flex-grow w-full bg-red-200 overflow-auto">
        {conversation && conversation.messages.map((message, index) => (
          <Message key={index} message={message}/>
        ))}
      </div>
      
      <div className="flex items-center w-full p-4 bg-red-300">
        <input 
          type="text" 
          placeholder='write your message...' 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} // Update input state
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="p-6 bg-green-300 cursor-pointer ml-2" onClick={handleSendMessage}>
          <Send />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;



// "use client";

// import React, { useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import API_BASE_URL from '@/utils/apiConfig';
// import { Phone, Send } from 'lucide-react';
// import Message from '@/components/Message';
// import { UserContext } from '@/context/UserContext';
// import io from 'socket.io-client';

// const socket = io("http://localhost:5000");

// const ConversationPage = ({ params }: { params: { id: string } }) => {
//   const [conversation, setConversation] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const router = useRouter();
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     // Join the room corresponding to the conversation ID
//     socket.emit('join_room', params.id);

//     return () => {
//       // Leave the room when component unmounts
//       socket.emit('leave_room', params.id);
//     };
//   }, [params.id]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/conversations/${params.id}`);
//         setConversation(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchMessages();
//   }, [params.id]);

//   useEffect(() => {
//     socket.on('message', (message) => {
//       setConversation((prev) => ({
//         ...prev,
//         messages: [...prev.messages, message],
//       }));
//     });
  
//     return () => {
//       socket.off('message'); // Clean up the listener on component unmount or before re-adding it
//     };
//   }, []);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       try {
//         const res = await axios.post(`${API_BASE_URL}/conversations/${params.id}/messages`, {
//           sender: user._id,
//           content: newMessage,
//         });

//         // Extract the updated conversation and new message from the response
//         const { conversation, message } = res.data;

//         // Update the conversation state
//         setConversation(conversation);

//         // Clear the input field
//         setNewMessage('');

//         // Emit the new message to the server
//         socket.emit('send_message', {
//           room: params.id,
//           message
//         });

//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   return (
//     <div className='flex flex-col max-w-[1000px] h-screen bg-red-100 mx-auto'>
//       <div className='flex items-center justify-between p-4 bg-red-300'>
//         <div className="flex items-center">
//           <img src="" alt="" className='w-[40px] h-[40px] rounded-full'/>
//           <p>Name</p>
//         </div>
//         <div className='p-5 cursor-pointer'>
//           <Phone />
//         </div>
//       </div>

//       <div className="flex-grow w-full bg-red-200 overflow-auto">
//         {conversation && conversation.messages.map((message, index) => (
//           <Message key={index} message={message} />
//         ))}
//       </div>
      
//       <div className="flex items-center w-full p-4 bg-red-300">
//         <input 
//           type="text" 
//           placeholder='write your message...' 
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//         <div className="p-6 bg-green-300 cursor-pointer ml-2" onClick={handleSendMessage}>
//           <Send />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationPage;
