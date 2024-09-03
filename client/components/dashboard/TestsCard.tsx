"use client";

import Image from 'next/image';
import React from "react";
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

export function TestsCard({cardData}) {
  return (
    <CardContainer className="inter-var w-[450px]">
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] text-white dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border cursor-pointer">
        <div className='flex flex-col gap-4 justify-between'>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {cardData.testName}
          </CardItem>
          <img
            src={cardData.picture}
            className="object-cover w-full group-hover/card:shadow-xl"
            alt="Profile"
          />
          <div className="flex w-full justify-between items-center">
            <p className="font-bold">Price: <span className="text-white-200">{cardData.price}</span></p>
            <button className="p-2 bg-green-200 text-black-default rounded-lg hover:bg-green-400">
              Take Appointment
            </button> 
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
