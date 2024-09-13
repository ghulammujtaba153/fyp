'use client';

import React, { useEffect, useState } from 'react';
import DoctorsTable from '@/components/dashboard/admin/DoctorsTable';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get(`${API_BASE_URL}/doctors`);
      setDoctors(res.data);
    };
    fetchDoctors();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.userId.firstName} ${doctor.userId.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto bg-gray-100 h-screen pl-[100px] p-2">
      <div className="max-w-full overflow-x-auto">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-lg p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <DoctorsTable doctors={filteredDoctors} />
      </div>
    </div>
  );
};

export default DoctorsPage;
