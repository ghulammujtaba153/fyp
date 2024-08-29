"use client";

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { UserContext } from '@/context/UserContext'; // Adjust path as needed

const DoctorUpcomingAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null); // State to store doctor details
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUpcomingAppointment = async () => {
      if (!user) return; // Early return if user is not defined

      try {
        console.log(user._id)
        const userRes = await axios.get(`${API_BASE_URL}/doctors/${user._id}`);
        console.log(userRes.data)
        // Fetch upcoming appointment
        const res = await axios.get(`${API_BASE_URL}/appointments/doctor/${userRes.data._id}`);
        console.log(res.data)
        if (res.data.length > 0) {
          setAppointment(res.data[0]);
          setDoctor(res.data[0].patientId);
        }
      } catch (error) {
        console.error('Error fetching upcoming appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointment();
  }, [user]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className='flex flex-col justify-center bg-white-100 rounded-md w-full items-center p-4'>
        <p>No upcoming appointments</p>
      </div>
    );
  }

  const { doctorId, timing } = appointment;

  return (
    <div className='flex flex-col justify-center bg-white-100 rounded-md w-full items-center p-4'>
      <p className='font-bold text-lg'>Upcoming Appointment</p>
      <div className='flex justify-center items-center gap-[40px]'>
        <div className='flex items-center gap-2'>
          {doctor && (
            <>
              <img src={doctor.profile} alt="Doctor" className='w-[50px] h-[50px] rounded-full'/>
              <p className='font-bold'>{doctor.firstName} {doctor.lastName}</p>
            </>
          )}
        </div>
        <p>Appointment At: <span>{new Date(timing).toLocaleString()}</span></p>
      </div>
    </div>
  );
};

export default DoctorUpcomingAppointment;
