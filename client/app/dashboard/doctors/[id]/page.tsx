"use client";

import React, { use, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import AppointmentModal from '@/components/AppointmentModal';
import { UserContext } from '@/context/UserContext';
import StarRating from '@/components/dashboard/StarRatings';
import { Rating } from '@mui/material';

const DoctorDetail = () => {
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalRating, setTotalRating] = useState(4);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const pathname = usePathname();
  const userId = pathname?.split("=").pop();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      const fetchDoctor = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/doctors/${userId}`);
          console.log(res.data);
          setDoctor(res.data);
        } catch (error) {
          console.error('Error fetching doctor:', error);
        }
      };

      fetchDoctor();
    }
  }, [userId]);

  useEffect(() => { 
    if (userId) {
      const fetchDoctor = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/ratings/doctor/${userId}`);
          console.log(res.data);
          const reviewsData=res.data;
          const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = sum / reviewsData.length;
          setTotalRating(averageRating);
          setReviews(res.data);
        } catch (error) {
          console.error('Error fetching doctor ratings:', error);
        }
      };

      fetchDoctor();
    }
  },[userId]);

  const formatTime = (time24) => {
    const [hour, minute] = time24.split(':');
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  if (!doctor) {
    return (
      <div className="flex justify-between items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="text-white w-full flex items-center flex-col">
        <div className="flex justify-between p-2 gap-5 md:flex-row flex-col ">
          <div className="mr-[50px]">
            <p className='flex-1 text-4xl font-bold'>{doctor.userId.firstName} {doctor.userId.lastName}</p>
            <StarRating num={totalRating} />
            <p className="mt-4">Contact:</p>
            <p className="text-gray-300 text-sm">{doctor.userId.email}</p>
            <p className="text-gray-300 text-sm">{doctor.userId.contactNumber}</p>
            <p className="mt-2">Specialization</p>
            <p className="text-gray-300 text-sm">{doctor.specialization}</p>
            <p className="mt-2">Qualifications</p>
            {doctor.doctor_qualification.map((qualification, index) => (
              <p key={index} className="text-gray-300 text-sm">
                {qualification.qualificationName} ({qualification.startYear} - {qualification.endYear})
              </p>
            ))}
            <p className="mt-2">Availability</p>
            <p className="text-gray-300 text-sm">
              {formatTime(doctor.availability.startTime)} - {formatTime(doctor.availability.endTime)}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 mt-4 bg-blue-500 rounded text-white"
              >
                Book Appointment
              </button>
            </div>
          </div>
          
          <img src={doctor.userId.profile} alt="Doctor Profile" className='md:h-[500px] md:w-[500px] rounded-lg h-[150px] w-full md:object-cover object-contain' />
          
        </div>
        
        <div className="flex flex-col gap-4 pl-[100px] mt-[40px] w-full">
          <p className="text-lg font-semibold">Reviews</p>
          {reviews && 
            reviews.map((review, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-2 p-4 border border-gray-300 rounded-lg shadow-md bg-white w-full"
              >
                <div className="flex gap-4 items-center">
                  <img 
                    src={review.patientId.profile} 
                    alt="Profile" 
                    className="w-[40px] h-[40px] rounded-full border border-gray-300" 
                  />
                  <StarRating num={review.rating} />
                </div>
                <p className="ml-[50px] mt-2 text-gray-700">{review.comment}</p>
              </div>

              
            ))
          }
        </div>



        {showModal && (
          <AppointmentModal
            doctorId={doctor.userId._id}
            onClose={() => setShowModal(false)}
            doctorAvailability={doctor.availability}
          />
        )}
      </div>
    </>
  );
};

export default DoctorDetail;
