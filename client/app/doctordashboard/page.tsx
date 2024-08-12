"use client";

import React from 'react';
import UpcomingAppointment from '@/components/dashboard/UpcomingAppointment';
import Medicine from '@/components/dashboard/Medicine';
import DashboardLayout from './DashboardLayout';
import Card from '@/components/dashboard/card';


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
    <DashboardLayout>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      <UpcomingAppointment />
      {/* <Medicine /> */}
      <p className="text-white">Notes</p>
    </DashboardLayout>
  );
};

export default Dashboard;
