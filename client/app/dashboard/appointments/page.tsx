"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // For navigation
import DashboardLayout from "../DashboardLayout";
import { AppointmentCard } from "@/components/dashboard/AppointmentCard";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";
import { PatientAppointmentCard } from "@/components/dashboard/PatientAppointmentCard";

const ITEMS_PER_PAGE = 2;

function Assignments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      if (!user) return;

      try {
        // const userRes = await axios.get(`${API_BASE_URL}/doctors/${user._id}`);
        const res = await axios.get(`${API_BASE_URL}/appointments/all/${user._id}`);
        setAppointments(res.data);
        console.log(res.data);
        const id=res.data.doctorId.userId;
        // const userRes = await axios.get(`${API_BASE_URL}/user/${id}`);
        // console.log(userRes.data)
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointments();
  }, [user]);

  

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>No upcoming appointments</p>
      </div>
    );
  }

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentAppointments = appointments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-4 w-full">
        {currentAppointments.map((appointment) => (
          <PatientAppointmentCard 
            key={appointment._id} 
            cardData={appointment} 
            
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-100 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
            aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900/10 active:bg-gray-900/20'}`}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-100 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
            aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
          </svg>
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Assignments;
