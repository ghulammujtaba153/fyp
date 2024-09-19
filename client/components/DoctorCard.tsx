"use client";

import Image from 'next/image';
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export function DoctorCard({cardData}) {
  
  console.log(cardData)

  return (
    <CardContainer className="inter-var ">
      <CardBody className=" relative flex items-center jutify-center flex-col group/card dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border">
        
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={cardData.userId.profile}
            height={250}
            width={250}
            className="h-60 w-full object-cover rounded-full group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {cardData.userId.firstName + " "+ cardData.userId.lastName}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
         {cardData.specialization}
        </CardItem>
        <div className='flex items-center mt-5'>
          <p className='font-bold'>Fee: <span className='text-sm text-gray-400'>{1000}</span></p>
        </div>
        <div className="flex justify-between items-center mt-10">
          <Link href={`/dashboard/doctors/${cardData.userId._id}`} className="cursor-pointer p-2 bg-white rounded-md" passHref>
            <p className="px-4 py-2 rounded-xl text-xs font-bold text-black-default">
              View now →
            </p>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
