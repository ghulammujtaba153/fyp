"use client"

import React from 'react'
import StatCard from '@/components/dashboard/admin/StatCard';
import { FaUsers, FaUserMd, FaCalendarCheck, FaFlask } from 'react-icons/fa';
import AppointmentSuccessRateChart from '@/components/dashboard/admin/AppointmentRateChart';
import UserGrowthChart from '@/components/dashboard/admin/UserGrowthChart';



const MainPage = () => {
  const appointmentData = [
    { month: 'Jan', Completed: 70, Canceled: 20, Missed: 10 },
    { month: 'Feb', Completed: 60, Canceled: 25, Missed: 15 },
    { month: 'Mar', Completed: 10, Canceled: 1, Missed: 1 },
    { month: 'April', Completed: 20, Canceled: 2, Missed: 25 },
    { month: 'May', Completed: 50, Canceled: 10, Missed: 30 },
    { month: 'June', Completed: 40, Canceled: 15, Missed: 45 },
    { month: 'July', Completed: 90, Canceled: 30, Missed: 20 },
  ];

  const userGrowthData = [
    { month: 'Jan', Doctors: 20, Patients: 50, LabOperators: 5 },
    { month: 'Feb', Doctors: 40, Patients: 80, LabOperators: 10 },
    { month: 'Mar', Doctors: 10, Patients: 40, LabOperators: 3 },
    { month: 'April', Doctors: 2, Patients: 30, LabOperators: 10 },
    { month: 'May', Doctors: 15, Patients: 50, LabOperators: 8 },
    { month: 'June', Doctors: 25, Patients: 60, LabOperators: 15 },
    { month: 'July', Doctors: 35, Patients: 10, LabOperators: 18 },
  ];
  

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard Overview</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUsers />}
          iconBg="#e0eafc"
          title= "10"
          subtitle="Total Appointments"
        />
        <StatCard
          icon={<FaUserMd />}
          iconBg="#e0f4f1"
          title="4"
          subtitle="New Appointments"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          iconBg="#fcf4dd"
          title="$ 2400"
          subtitle="Total Earnings"
        />
        <StatCard
          icon={<FaFlask />}
          iconBg="#fff4e5"
          title="3"
          subtitle="Total Laboratory Operators"
        />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 h-96">
          <UserGrowthChart data={userGrowthData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 h-96">
          <AppointmentSuccessRateChart data={appointmentData} />
        </div>
      </div>

    </div>
  )
}

export default MainPage