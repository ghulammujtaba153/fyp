// components/AppointmentModal.js

import React, { useContext, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const AppointmentModal = ({ doctorId, onClose }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [status, setStatus] = useState('new');
  const {user} =useContext(UserContext);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/appointments`, {
        doctorId,
        patientId: user._id, 
        timing: new Date(appointmentDate).toISOString(),
        status
      });
      handleBookAppointment()
      onClose();
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment.');
    }
  };
  const handleBookAppointment = async() => {
    const patientId = user._id;
    try {
      const newConversationRes = await axios.post(`${API_BASE_URL}/conversations/create`, {
        participants: [doctorId, patientId],
      });
      const newConversationData = newConversationRes.data;
      router.push(`/conversations/${newConversationData._id}`);
      
    } catch (error) {
      
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black-default p-6 rounded-lg shadow-lg w-80 text-black">
        <h2 className="text-lg font-bold">Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mt-4">
            Appointment Date:
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="border rounded-md p-2 w-full text-black-default"
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Book
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
