// components/AppointmentModal.js

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const AppointmentModal = ({ doctorId, onClose, doctorAvailability }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [status, setStatus] = useState('new');
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (doctorAvailability) {
      generateTimeSlots(doctorAvailability.startTime, doctorAvailability.endTime);
    }
  }, [doctorAvailability]);

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let current = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    while (current <= end) {
      slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
      current = new Date(current.getTime() + 30 * 60000); // Add 30 minutes
    }

    setTimeSlots(slots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if date and time are set
    if (!appointmentDate || !selectedTimeSlot) {
      alert('Please select both date and time.');
      return;
    }
  
    try {
      // Combine date and time into a single string in the format YYYY-MM-DDTHH:mm
      const appointmentDateTime = `${appointmentDate}T${selectedTimeSlot}`;
  
      const res=await axios.post(`${API_BASE_URL}/appointments`, {
        doctorId,
        patientId: user._id, 
        timing: appointmentDateTime, // Send time as string
        status
      });
      const notRes=await axios.post(`${API_BASE_URL}/notifications`, {
        receiverId: doctorId,
        title: 'New Appointment',
        message: `New appointment booked for ${appointmentDateTime}`,
        link: `/doctordashboard/appointments`,
      });
      console.log(notRes.data);
      console.log(res.data);
      handleBookAppointment(res.data._id);
      onClose();
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment.');
    }
  };
  
  

  const handleBookAppointment = async(id) => {
    const patientId = user._id;
    try {
      const newConversationRes = await axios.post(`${API_BASE_URL}/conversations/create`, {
        participants: [doctorId, patientId], appointmentId:id
      });
      const newConversationData = newConversationRes.data;
      router.push(`/conversations/${newConversationData._id}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
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
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="border rounded-md p-2 w-full text-black-default"
              required
            />
          </label>

          <label className="block mt-4">
            Select Time Slot:
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="border rounded-md p-2 w-full text-black-default"
              required
            >
              <option value="">-- Select Time Slot --</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
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
  