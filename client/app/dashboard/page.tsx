"use client";

import React from 'react';
import UpcomingAppointment from '@/components/dashboard/UpcomingAppointment';
import Medicine from '@/components/dashboard/Medicine';
import DashboardLayout from './DashboardLayout';
import Card from '@/components/dashboard/card';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className='flex justify-between items-center gap-4 flex-wrap'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <UpcomingAppointment />
      <Medicine />
    </DashboardLayout>
  );
};

export default Dashboard;
