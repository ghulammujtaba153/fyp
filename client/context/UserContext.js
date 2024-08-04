"use client";
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); 
          console.log(decodedToken)
          const res = await axios.get(`http://localhost:5000/api/user/${decodedToken.userId}`);
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

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
