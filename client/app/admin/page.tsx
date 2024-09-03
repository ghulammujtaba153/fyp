"use client";
import Card from '@/components/dashboard/admin/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faBedPulse } from '@fortawesome/free-solid-svg-icons'; // Combined icon import
import React, { useEffect, useState } from 'react';
import { BadgeDollarSign, Users } from 'lucide-react';
import EarningGraph from '@/components/dashboard/admin/EarningGraph';
import TopDoctors from '@/components/dashboard/admin/TopDoctors';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/stats`);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cardData = {
    icon: <Users />,
    title: "Total Users",
    data: data?.totalUsers,
  };

  const doctorData = {
    icon: <FontAwesomeIcon icon={faUserMd} />,
    title: "Total Doctors",
    data: data?.totalDoctors,
  };

  const patientData = {
    icon: <FontAwesomeIcon icon={faBedPulse} />,
    title: "Total Patients",
    data: data?.totalPatients,
  };

  const revenueData = {
    icon: <BadgeDollarSign />,
    title: "Total Revenue",
    data: "$20,000",
  };

  const appointmentData = {
    icon: <BadgeDollarSign />,
    title: "Total Appointments",
    data: data?.totalAppointments,
  };

  const earningsData = {
    prices: [8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5],
    dates: [
      '2024-02-12',
      '2024-02-13',
      '2024-02-14',
      '2024-02-15',
      '2024-02-16',
      '2024-02-17',
      '2024-02-18',
    ],
  };

  return (
    <div className='flex flex-col items-center pl-[100px] gap-4 h-full w-full '>
      <div className="flex justify-between flex-wrap gap-4 w-full">
        <Card data={cardData} />
        <Card data={doctorData} />
        <Card data={patientData} />
        <Card data={revenueData} />
        <Card data={appointmentData} />
      </div>
      <div className='flex justify-between gap-4 w-full'>
        <div className="flex-2 flex-[2]">
          <EarningGraph data={earningsData} />
        </div>
        <div className="flex-1 flex-[1] bg-white p-4 rounded-lg shadow-md">
          <TopDoctors />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
