"use client";
import Spinner from '@/components/Spinner';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ECGuploadModal from '@/components/dashboard/nurse/ECGuploadModal';
import CBCuploadModal from '@/components/dashboard/nurse/CBCuploadModal';

interface TestAppointmentDetailsProps {
  params: {
    id: string;
  };
}

const TestAppointmentDetails: React.FC<TestAppointmentDetailsProps> = ({ params: { id } }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios(`${API_BASE_URL}/testAppointments/test/${id}`);
        setData(res.data.testAppointment);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch appointment details:', error);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const formatTiming = (date: Date | string, time?: string): string => {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    let formattedTime = time ? moment(time, "HH:mm").format("hh:mm A") : "";
    return `${formattedDate}${formattedTime ? ` at ${formattedTime}` : ""}`;
  };

  const handleUploadClick = (fileType: string) => {
    // Logic for handling file upload based on fileType (ECG or Blood Report)
    console.log(`Upload ${fileType} clicked`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Unable to load appointment details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen pl-[100px] text-white">
      <h1 className="text-4xl font-bold text-center mb-4">Appointment Details</h1>
      <div className="flex items-center mb-4">
        <img
          src={data.patientId?.profile || '/default-profile.png'}
          alt="Patient's profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col ml-4">
          <p className="text-lg font-semibold">
            {data.patientId?.firstName} {data.patientId?.lastName}
          </p>
          <p className="text-sm text-gray-400">Email: {data.patientId?.email || 'N/A'}</p>
        </div>
      </div>
      <p className="text-lg font-semibold">
        Appointment Date <span className="text-sm">(yyyy:mm:dd)</span>: {data.appointmentDate ? formatTiming(data.appointmentDate, data.appointmentTime) : "N/A"}
      </p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Test Details:</h2>
        <p>Test Name: {data.testId?.testName || 'N/A'}</p>
        <p>Price: {data.testId?.price || 'N/A'}</p>
        <p>Description: {data.testId?.description || 'N/A'}</p>
      </div>

      <div className="flex items-center ">
        <ECGuploadModal id={id}/>
        <p className="text-center text-gray-500">or</p>
        <CBCuploadModal id={id}/>
      </div>
    </div>
  );
};

export default TestAppointmentDetails;
