"use client";

import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import API_BASE_URL from '@/utils/apiConfig'; // Import the common API path

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode JWT token
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userId = decodedToken.userId;

          // Fetch user data from API
          const res = await axios.get(`${API_BASE_URL}/user/${userId}`);
          setUser(res.data.user);
          
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null); // Clear user data on error
        }
      }
    };
    
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = async (updatedData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      // Decode JWT token
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      // Update user data
      const res = await axios.put(`${API_BASE_URL}/user/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update user state with the new data
      setUser(res.data.user);
      
      return res.data.user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
