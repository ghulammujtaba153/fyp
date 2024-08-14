"use client";

import React, { useState, useEffect } from 'react';

const DoctorProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    landlineNumber: '',
    postalAddress: '',
    permanentAddress: '',
    specialization: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold'>Doctor Profile</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-wrap gap-4'>
          {/* Left Column */}
          <div className='flex-1 min-w-[300px]'>
            <div className='mb-4'>
              <label htmlFor="firstName" className='block font-semibold'>First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter first name"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block font-semibold'>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter email"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="contactNumber" className='block font-semibold'>Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter contact number"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="postalAddress" className='block font-semibold'>Postal Address:</label>
              <input
                type="text"
                id="postalAddress"
                name="postalAddress"
                value={formData.postalAddress}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter postal address"
              />
            </div>
          </div>
          {/* Right Column */}
          <div className='flex-1 min-w-[300px]'>
            <div className='mb-4'>
              <label htmlFor="lastName" className='block font-semibold'>Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter last name"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="dateOfBirth" className='block font-semibold'>Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="landlineNumber" className='block font-semibold'>Landline Number:</label>
              <input
                type="text"
                id="landlineNumber"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter landline number"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="permanentAddress" className='block font-semibold'>Permanent Address:</label>
              <input
                type="text"
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter permanent address"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="specialization" className='block font-semibold'>Specialization:</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className='border p-2 rounded w-full'
                placeholder="Enter specialization"
              />
            </div>
          </div>
        </div>
        <button type="submit" className='bg-blue-600 text-white py-2 px-4 rounded'>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
