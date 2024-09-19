"use client";

import React from 'react';
import UpcomingAppointment from '@/components/dashboard/UpcomingAppointment';
import Medicine from '@/components/dashboard/Medicine';
import EarningGraph from '@/components/dashboard/admin/EarningGraph';

import DoctorUpcomingAppointment from '@/components/dashboard/DoctorUpcommingAppointment';
import Card from '@/components/dashboard/Card';


interface CardData {
  title: string;
  num: number;
}

const Dashboard = () => {
  const cardData: CardData[] = [
    { title: "Total Appointments", num: 50 },
    { title: "Today's Appointments", num: 2 },
    { title: "Total Earnings", num: 4000 },
    { title: "overAll Ratings", num: 4 },
    // { title: "Monthly Appointments", num: 10 }
  ];

  return (
    <div className="flex flex-col items-center gap-4 pl-[100px] h-screen p-5">
      <p className="text-white flex-left">Welcome! Doctor </p>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      <DoctorUpcomingAppointment/>
      <EarningGraph/>

    </div>
  );
};

export default Dashboard;
