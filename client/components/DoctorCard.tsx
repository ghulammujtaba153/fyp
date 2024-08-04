"use client";

import Image from 'next/image';
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export function DoctorCard({cardData}) {
  return (
    <CardContainer className="inter-var ">
      <CardBody className=" relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {cardData.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
         {cardData.disc}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={cardData.image}
            height={400}
            width={400}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className='flex items-center mt-5'>
          <p className='font-bold'>Price: <span className='text-sm text-gray-400'>{cardData.price}</span></p>
        </div>
        <div className="flex justify-between items-center mt-10">
          <Link href={`/doctor/id=${cardData.id}`} passHref>
            <p className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
              Take Appointment now →
            </p>
          </Link>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black  text-black-default text-xs font-bold"
          >
            online
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
