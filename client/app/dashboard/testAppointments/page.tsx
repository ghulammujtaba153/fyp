"use client"
import React, { useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const TestAppointmentPage = () => {
    const {user}= useContext(UserContext);

    useEffect(() => {
        const fetch=async()=>{
            try {
                const res= await axios.get(`${API_BASE_URL}/testAppointments/${user._id}`);
                console.log(res.data.testAppointment);
                
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        }

        fetch();
    }, [user]);

  return (
    <div>
        <h1>TestAppointmentPage</h1>
    </div>
  )
}

export default TestAppointmentPage;