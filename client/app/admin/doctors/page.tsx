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
    <div className="bg-gray-100 h-screen flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded"
      />
      <DoctorsTable doctors={filteredDoctors} />
    </div>
  );
};

export default DoctorsPage;
