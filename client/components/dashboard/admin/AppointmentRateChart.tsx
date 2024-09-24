// src/AppointmentSuccessRateChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AppointmentSuccessRateChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300} >
      <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Completed" fill="#82ca9d" />
        <Bar dataKey="Canceled" fill="#ff6666" />
        <Bar dataKey="Missed" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AppointmentSuccessRateChart;
