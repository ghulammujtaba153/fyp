"use client";

import React, { useContext, useEffect, useState } from 'react';
import EarningGraph from '@/components/dashboard/admin/EarningGraph';

import DoctorUpcomingAppointment from '@/components/dashboard/DoctorUpcommingAppointment';
import Card from '@/components/dashboard/Card';
import { user } from './../../../server/controllers/patientControllers/auth';
import { UserContext } from '@/context/UserContext';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';


interface CardData {
  title: string;
  num: number;
}

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [earning, setEarning] = useState(0);
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/appointments/all/doctor/${user?._id}`);
        const data = res.data;
        console.log(data);
        setAppointments(data);

        const earning = await axios.get(`${API_BASE_URL}/doctorStats/totalEarning/${user?._id}`);
        setEarning(earning.data);
        console.log(earning.data);

      } catch (error) {
        console.error("Error fetching appointments", error.message);
      }
    };

    fetchAppointments();
  },[user])


  const cardData: CardData[] = [
    { title: "Total Appointments", num: 50 },
    { title: "Today's Appointments", num: 2 },
    { title: "Total Earnings", num: 4000 },
    { title: "overAll Ratings", num: 4 },
    // { title: "Monthly Appointments", num: 10 }
  ];

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
    <div className="flex flex-col items-center gap-4 pl-[100px] h-screen p-5">
      <p className="text-white flex-left">Welcome! Doctor </p>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      <DoctorUpcomingAppointment/>
      <div className='w-full bg-white'>
      <EarningGraph data={earningsData} />
      </div>
      

    </div>
  );
};

export default Dashboard;
