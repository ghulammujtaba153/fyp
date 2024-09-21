"use client";
import { DoctorList } from '@/components/DoctorList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import Spinner from '@/components/Spinner';
import { Search } from 'lucide-react';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [feeRange, setFeeRange] = useState<number>(2000); // State for fee range, default 2000

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/doctors`);
        console.log(res.data);
        setDoctors(res.data);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFeeRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeeRange(Number(event.target.value));
  };

  // Filter doctors based on search term (by first and last name) and fee range
  const filteredDoctors = doctors.filter((doctor: any) =>
    `${doctor.userId.firstName} ${doctor.userId.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) &&
    doctor.fee <= feeRange
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="bg-black-100 py-[40px] text-white flex items-center flex-col pl-[80px] h-[100%]">
        <div className="w-full mx-auto mr-10 flex items-center justify-around">
          {/* Fee Range Filter */}
          <div className="flex items-center space-x-4">
            <label htmlFor="feeRange" className="text-white">Fee Range: {feeRange}</label>
            <input
              type="range"
              id="feeRange"
              min="200"
              max="2000"
              value={feeRange}
              onChange={handleFeeRangeChange}
              className="slider cursor-pointer"
            />
          </div>

          {/* Search Input */}
          <div className="flex items-center bg-white-100 pl-2 pr-2 rounded-md text-black-default">
            <Search className="w-6 h-6" />
            <input
              id="search"
              placeholder="Search by name"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="outline-none bg-white-100 p-2"
            />
          </div>
        </div>

        {filteredDoctors.length > 0 ? (
          <div>
            <DoctorList doctors={filteredDoctors} /> {/* Pass filtered doctors */}
          </div>
        ) : (
          <div className="bg-black-100 py-[40px] text-white flex items-center justify-center flex-col pl-[80px] h-screen">
            <p>No doctors found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Doctor;
