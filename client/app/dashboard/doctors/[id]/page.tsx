"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import DashboardLayout from '../../DashboardLayout';
import API_BASE_URL from '@/utils/apiConfig';
import AppointmentModal from '@/components/AppointmentModal';
import { UserContext } from '@/context/UserContext';


const DoctorDetail = () => {
  const [doctor, setDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const pathname = usePathname();
  const userId = pathname?.split("=").pop();
  const { user } = useContext(UserContext);
  const router = useRouter();
  

  useEffect(() => {
    if (userId) {
      const fetchDoctor = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/doctors/${userId}`);
          setDoctor(res.data);
        } catch (error) {
          console.error('Error fetching doctor:', error);
        }
      };

      fetchDoctor();
    }
  }, [userId]);

  

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-black-100 py-[40px] text-white flex items-center flex-col">
        <div className="flex justify-around p-20 gap-5 md:flex-row flex-col">
          <div>
            <p className='flex-1 text-4xl font-bold'>{doctor.userId.firstName} {doctor.userId.lastName}</p>
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
            <p className="mt-2">Description</p>
            <p className="text-gray-300 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae tempore alias, iste reiciendis optio. Alias voluptatibus libero voluptatum, quidem ex odio maiores, repellendus neque aspernatur animi quod, temporibus dicta?</p>

            <div className="flex justify-center">
              <button
                 onClick={() => setShowModal(true)}
                
                className="px-4 py-2 bg-blue-500 rounded text-white"
              >
                Book Appointment
              </button>
            </div>
          </div>
          <div className=''>
            <img src={doctor.userId.profile} alt="Doctor Profile" className='md:h-[500px] md:w-[500px] rounded-lg h-[150px] w-full md:object-cover object-contain' />
          </div>
        </div>

        {showModal && (
          <AppointmentModal
            doctorId={doctor._id}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DoctorDetail;
