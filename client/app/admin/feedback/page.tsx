"use client";

import Spinner from '@/components/Spinner';
import FeedbackTable from '@/components/dashboard/admin/FeedbackTable';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for search, role, and rating filter
  const [searchName, setSearchName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRating, setSelectedRating] = useState(''); 


  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/feedBack`);
        setData(res.data);
        setFilteredData(res.data); 
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 
  const handleFilter = () => {
    let filtered = data;

    if (searchName) {
      filtered = filtered.filter((feedback) =>
        `${feedback.userId.firstName} ${feedback.userId.lastName}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
    }

    if (selectedRole) {
      filtered = filtered.filter(
        (feedback) => feedback.userId.role === selectedRole
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(
        (feedback) => feedback.rating === parseInt(selectedRating)
      );
    }

    setFilteredData(filtered);
  };

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
        <Spinner />
        </div>
  }

  return (
    <div className="flex flex-col container mx-auto bg-gray-100 h-screen pl-[100px] p-2">
      <div className="flex md:items-center  flex-col gap-2 md:flex-row md:justify-between mb-4 space-x-4">
        {/* Search by name */}
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 p-2 rounded"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        {/* Filter by role */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="patient">Patient</option>
        </select>

        {/* Filter by rating */}
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Ratings</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        {/* Apply Filter button */}
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filter
        </button>
      </div>

      {/* Feedback table */}
      <FeedbackTable feedbackData={filteredData} />
    </div>
  );
};

export default Page;
