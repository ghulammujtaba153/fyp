"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";
import AppointmentsTable from "@/components/dashboard/AppointmentsTable";

function Assignments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]); // State for filtered results
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [searchDate, setSearchDate] = useState(''); // State for the search date
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      if (!user) return;

      try {
        const userRes = await axios.get(`${API_BASE_URL}/doctors/${user._id}`);
        const res = await axios.get(`${API_BASE_URL}/appointments/all/doctor/${userRes.data._id}`);
        
        // Convert custom date format and sort appointments
        const appointmentsWithParsedDates = res.data.map((appointment) => ({
          ...appointment,
          parsedTiming: parseCustomDateFormat(appointment.timing),
        })).sort((a, b) => a.parsedTiming - b.parsedTiming);

        setAppointments(appointmentsWithParsedDates);
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointments();
  }, [user]);

  useEffect(() => {
    const filtered = appointments.filter(appointment => {
      const fullName = `${appointment.patientId.firstName} ${appointment.patientId.lastName}`.toLowerCase();
      const appointmentDate = new Date(appointment.parsedTiming).setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate date comparison
      const selectedDate = searchDate ? new Date(searchDate).setHours(0, 0, 0, 0) : null; // Set time to 00:00:00 for accurate date comparison

      const nameMatch = fullName.includes(searchQuery.toLowerCase());
      const dateMatch = searchDate ? appointmentDate >= selectedDate : true; // Include appointments on or after the selected date

      return nameMatch && dateMatch;
    });

    setFilteredAppointments(filtered);
  }, [searchQuery, searchDate, appointments]); // Re-run the search whenever `searchQuery`, `searchDate`, or `appointments` change

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleDateChange = (e) => {
    setSearchDate(e.target.value); // Update search date
  };

  // Function to parse the custom date format
  const parseCustomDateFormat = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    let [hour, minute] = timePart.split(' ')[0].split(':');
    const period = timePart.split(' ')[1];
    
    // Convert hour to 24-hour format
    if (period === 'PM' && hour !== '12') {
      hour = parseInt(hour, 10) + 12;
    } else if (period === 'AM' && hour === '12') {
      hour = 0;
    }

    return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-screen w-full pl-[70px] pr-[30px]">
      <div className="flex items-center justify-between">
        <input 
          type="text" 
          placeholder="Search by patient's name" 
          value={searchQuery}
          onChange={handleInputChange} // Trigger search on input change
          className="p-2 border rounded-md"
        />
        <input 
          type="date"
          value={searchDate}
          onChange={handleDateChange} // Trigger date search on date change
          className="p-2 border rounded-md"
        />
      </div>
      <AppointmentsTable appointments={filteredAppointments} />
    </div>
  );
}

export default Assignments;
