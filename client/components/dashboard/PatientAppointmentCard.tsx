"use client";

import React, { useContext } from "react";
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/apiConfig";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import moment from "moment";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

export function PatientAppointmentCard({ cardData }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/appointments/${cardData._id}`);
  };

  // Log the timing data
  console.log("Raw Timing Data:", cardData.timing);

  // Check if timing is a valid date
  let formattedTiming;
  if (moment(cardData.timing, moment.ISO_8601, true).isValid()) {
    formattedTiming = moment(cardData.timing).format("YYYY-MM-DD hh:mm A");
  } else {
    console.warn("Invalid date format detected. Attempting manual parsing.");
    formattedTiming = moment(cardData.timing, "YYYY-MM-DDThh:mm A").format("YYYY-MM-DD hh:mm A");
  }

  const handleCancel = async () => {
    const now = moment();
    const appointmentTime = moment(cardData.timing);

    // Check if the current time is the same as the appointment time (or very close)
    if (now.isSame(appointmentTime, 'minute')) {
      toast.error("You cannot cancel the appointment at this time.");
      return;
    }

    try{
      const statusRes = await axios.put(`${API_BASE_URL}/appointments/${cardData._id}/status`, { status: 'canceled' });
      console.log(statusRes.data);
      toast.success("Appointment canceled successfully.");
    }catch{
      console.log("Error updating appointment status");
      toast.error("Error updating appointment status.");
    }
  };

  return (
    <CardContainer className="inter-var w-[90%]">
      <CardBody className="flex flex-col justify-center relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] text-white dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl gap-3 pt-6 pb-6 pr-6 pl-6 border">
        
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px]">
            <img
              src={cardData?.doctorId?.profile}
              height={60}
              width={60}
              className="object-cover rounded-full group-hover/card:shadow-xl"
              alt="Doctor Profile"
            />
          </div>
          <CardItem 
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {cardData?.doctorId?.firstName} {cardData?.doctorId?.lastName}
          </CardItem>
        </div>

        <div>
          
        </div>

        <div className="mt-4">
        <p className={`${cardData?.status === "new" ? "bg-green-400" : "bg-red-400"} px-2 inline-block rounded-full`}>
          {cardData?.status}
        </p>

          <p className="font-bold text-neutral-600 text-white">
            Appointment Timing: <span className=" text-gray-300">{formattedTiming || "Invalid Date"}</span>
          </p>
        </div>

        {
          cardData?.status =="completed" &&

          <div className="flex justify-center mt-6">
            <button 
              onClick={handleCardClick} 
              className="p-2 bg-white text-sm text-black-default rounded-md"
            >
              View Prescription
            </button>
          </div>
        }

        

        {cardData?.status =="new" && 
          <div className="flex justify-center mt-6">
          <button 
            onClick={handleCancel} 
            className="p-2 text-sm bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
        }

        
      </CardBody>
    </CardContainer>
  );
}
