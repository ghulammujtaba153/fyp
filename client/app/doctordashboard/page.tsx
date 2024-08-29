"use client";

import React from 'react';
import UpcomingAppointment from '@/components/dashboard/UpcomingAppointment';
import Medicine from '@/components/dashboard/Medicine';


import DoctorUpcomingAppointment from '@/components/dashboard/DoctorUpcommingAppointment';
import Card from '@/components/dashboard/Card';


interface CardData {
  title: string;
  num: number;
}

const Dashboard = () => {
  const cardData: CardData[] = [
    { title: "Today's Appointments", num: 1 },
    { title: "Total Appointments", num: 50 },
    { title: "Total Earnings", num: 10 },
    { title: "Monthly Earnings", num: 10 },
    { title: "Monthly Appointments", num: 10 }
  ];

  return (
    <div className="flex flex-col items-center gap-4 pl-[100px] h-screen">
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      <DoctorUpcomingAppointment/>
      {/* <Medicine /> */}
      <p className="text-white ">Notes</p>
    </div>
  );
};

export default Dashboard;
