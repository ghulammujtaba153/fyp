"use client";

import React, { useContext } from "react";
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/apiConfig";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import moment from "moment";

export function PatientAppointmentCard({ cardData }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleCardClick = () => {
    const patientId = cardData.patientId;
    const doctorId = cardData.doctorId.userId._id;

    fetchConversationOrCreate(patientId, doctorId);
  };

  const fetchConversationOrCreate = async (patientId, doctorId) => {
    try {
      const conversationRes = await axios.get(`${API_BASE_URL}/conversations/doctor/${doctorId}/patient/${patientId}`);
      const conversationData = conversationRes.data;

      if (conversationData) {
        router.push(`/conversations/${conversationData._id}`);
      } else {
        const newConversationRes = await axios.post(`${API_BASE_URL}/conversations/create`, {
          participants: [doctorId, patientId],
        });
        const newConversationData = newConversationRes.data;
        router.push(`/conversations/${newConversationData._id}`);
      }
    } catch (error) {
      console.error('Error handling card click:', error);
    }
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

  return (
    <div onClick={handleCardClick}>
      <CardContainer className="inter-var w-[90%]">
        <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] text-white dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border cursor-pointer">
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className="w-15 h-15">
                <img
                  src={cardData.doctorId.profile}
                  height={60}
                  width={60}
                  className="object-cover rounded-full group-hover/card:shadow-xl"
                  alt="Profile"
                />
              </div>
              <CardItem 
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {cardData.doctorId.firstName + " " + cardData.doctorId.lastName}
              </CardItem>
            </div>
            <div className="font-bold">
              Status: <span className="text-white-200">{cardData.status}</span>
            </div>
          </div>
          
          <div className='flex items-center justify-between'>
            <div>
              <p className="font-bold">Medication</p>
              <p className="text-white-200">Medicine 1</p>
            </div>
            <div>
              <p className="font-bold">Timing</p>
              <p className="text-white-200">{formattedTiming || "Invalid Date"}</p>
            </div>
          </div>    
        </CardBody>
      </CardContainer>
    </div>
  );
}
