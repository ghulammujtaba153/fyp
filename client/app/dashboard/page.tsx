"use client";

import React from 'react';
import UpcomingAppointment from '@/components/dashboard/UpcomingAppointment';

import "../globals.css"
import Card from '@/components/dashboard/Card';
import Medicine from '@/components/dashboard/Medicine';

const Dashboard = () => {
  const cardData = [
    { title: 'Appointments', num: 12 },
    { title: 'Patients', num: 34 },
    { title: 'Earnings', num: 56 },
    { title: 'Messages', num: 78 },
    { title: 'Notifications', num: 90 }
  ];

  return (
    < div className='h-[100%] flex flex-col jutify-center items-center gap-5 pl-[100px]'>
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
