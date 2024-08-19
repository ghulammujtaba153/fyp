"use client";

import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import API_BASE_URL from '@/utils/apiConfig'; 
import io from 'socket.io-client';

// Initialize socket connection once
const socket = io('http://localhost:5000');

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [videoCallsPariticipants, setVideoCallsPariticipants] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode JWT token
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userId = decodedToken.userId;

          // Emit 'user_online' event once the socket connection is established
          // socket.on('connect', () => {
            
          //   if (userId) {
          //     socket.emit('user_online', userId);
          //     console.log(`Socket connected user context: ${socket.id}`);
          //   }
          // });

          // Fetch user data from API
          const res = await axios.get(`${API_BASE_URL}/user/${userId}`);
          setUser(res.data.user);
          socket.emit('user_online', res.data.user._id);
          
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null); 
        }
      }
    };

    fetchUser();

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const setParticipants = (participants) => {
    setVideoCallsPariticipants(participants);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    socket.disconnect(); // Ensure socket is disconnected on logout
  };

  const updateUser = async (updatedData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      const userRes = await axios.get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const currentUser = userRes.data.user;

      let updateUrl;
      if (currentUser.role === 'doctor') {
        updateUrl = `${API_BASE_URL}/doctors/profiles/${userId}`;
      } else {
        updateUrl = `${API_BASE_URL}/user/${userId}`;
      }

      const res = await axios.put(updateUrl, updatedData);

      setUser(res.data.user);

      return res.data.user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, updateUser, videoCallsPariticipants, setVideoCallsPariticipants, setParticipants }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
