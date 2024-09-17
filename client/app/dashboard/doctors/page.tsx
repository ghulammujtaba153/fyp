"use client";
import { DoctorList } from '@/components/DoctorList';
import Filters from '@/components/Filters';
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import Spinner from '@/components/Spinner';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

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

  // Filter doctors based on search term (by first and last name)
  const filteredDoctors = doctors.filter((doctor: any) =>
    `${doctor.userId.firstName} ${doctor.userId.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      
        <div className="bg-black-100 py-[40px] text-white flex items-center flex-col pl-[80px] h-[100%]">
          <div className="w-full mx-auto mr-10 flex items-center justify-around">
            <Filters />
            <Input
              id="search"
              placeholder="Search by name"
              type="text"
              value={searchTerm}
              onChange={handleSearch} // Update search term
            />
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
