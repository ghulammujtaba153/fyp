"use client";

import React, { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { Phone, Send, Video } from 'lucide-react';
import Message from '@/components/Message';
import { UserContext } from '@/context/UserContext';
import { v4 as uuid } from 'uuid';
import VideoCall from '@/components/dashboard/videoCall';

const Loader = () => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="text-white">Loading...</div>
  </div>
);

const ErrorMessage = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-md shadow-md">
      <p className="text-red-500">{message}</p>
      <button onClick={onClose} className="mt-2 p-2 bg-blue-500 text-white rounded-md">Close</button>
    </div>
  </div>
);

const ConversationPage = ({ params }: { params: { id: string } }) => {
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [participant, setParticipant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, setParticipants } = useContext(UserContext);
  const [videoCalls, setVideoCalls] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchCalls = async () => {
      if (!user) {
        console.error('User is not available');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/videoCalls/user/${user._id}/active`);
        setVideoCalls(res.data);
      } catch (error) {
        console.error('Error fetching video calls:', error);
      }
    };
    fetchCalls();
  }, [user]);

  // Function to fetch conversation details
  const fetchConversation = async () => {
    if (!user) {
      console.error('User is not available');
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/conversations/${params.id}`);
      setConversation(res.data);

      const otherParticipant = res.data.participants.find(p => p._id !== user._id);
      setParticipant(otherParticipant?._id);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  // Fetch conversation on component mount
  useEffect(() => {
    fetchConversation();
  }, [params.id, user]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleJoin = async () => {
    setIsLoading(true);
    setError('');

    if (!user) {
      setError('User is not logged in');
      setIsLoading(false);
      return;
    }

    try {
      if (participant) {
        const roomId = uuid();
        setParticipants([user._id, participant]);
        router.push(`/room/${roomId}`);
      } else {
        setError('Participant not found');
      }
    } catch (err) {
      setError('Failed to join the room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        setConversation(prev => ({
          ...prev,
          messages: [
            ...(prev?.messages || []),
            {
              sender: user._id,
              content: newMessage,
              createdAt: new Date(),
            },
          ],
        }));
        await axios.post(`${API_BASE_URL}/conversations/${params.id}/messages`, {
          sender: user._id,
          content: newMessage,
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (!user) return <p>Loading user information...</p>; // Optionally handle loading state for user

  return (
    <div className='relative flex flex-col max-w-[1000px] h-screen bg-red-100 mx-auto'>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      <div className='flex items-center justify-between p-4 bg-red-300'>
        <div className="flex items-center">
          {conversation?.participants?.map((participant, index) => (
            user._id !== participant._id && (
              <div key={index} className="flex items-center">
                <img src={participant.profile} alt="profile" className='w-[40px] h-[40px] rounded-full' />
                <p className="ml-2">{participant.firstName + " " + participant.lastName}</p>
              </div>
            )
          ))}
        </div>
        <div onClick={handleJoin} className='p-3 cursor-pointer bg-red-500 rounded-md'>
          <Video />
        </div>
      </div>

      <div className="flex-grow w-full bg-red-200 overflow-auto p-4">
        {conversation?.messages?.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center w-full p-4 bg-red-300">
        <input
          type="text"
          placeholder='write your message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="p-6 bg-green-300 cursor-pointer ml-2" onClick={handleSendMessage}>
          <Send />
        </div>
      </div>

      {videoCalls.length > 0 && (
        <div className='absolute top-[70px] right-[20px] w-[250px]'>
          <VideoCall videoCalls={videoCalls} />
        </div>
      )}
    </div>
  );
};

export default ConversationPage;
