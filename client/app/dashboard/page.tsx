"use client";

import React, {useContext} from 'react';
import UpcomingAppointment from '@/components/dashboard/UpcomingAppointment';
import "../globals.css"
import Card from '@/components/dashboard/Card';
import Medicine from '@/components/dashboard/Medicine';
import { UserContext } from '@/context/UserContext';

const Dashboard = () => {
  const {user}=useContext(UserContext);

  const cardData = [
    { title: 'Total Appointments', num: 10 },
    { title: 'UpComming Appointments', num: 2 },
    { title: 'Test Appointments', num: 5 },
    { title: 'UpComming Test Appointments', num: 1 },
    
  ];

  return (
    < div className='h-screen flex flex-col jutify-center items-center gap-5 pl-[100px] m-5'>
      <p className="text-white">Welcome back! {user?.firstName} {user?.lastName}</p>
      <div className='flex justify-between  items-center gap-4 flex-wrap'>
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      <UpcomingAppointment />
      <Medicine />
    </div>
  );
};

export default Dashboard;
