"use client";

import Image from 'next/image';
import React from "react";
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

export function TestsCard({cardData}) {
  return (
    <CardContainer className="inter-var w-[90%]">
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] text-white dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border cursor-pointer">
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className="w-15 h-15">
              <Image
                src={cardData.image}
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
              {cardData.name}
            </CardItem>
          </div>
          <div className="font-bold">
              Status: <span className="text-white-200">completed</span>
          </div>
        </div>
        
        <div className='flex items-center justify-between'>
            <div>
                <p className="font-bold">Medication</p>
                <p className="text-white-200">Medicine 1</p>
            </div>
            <div>
                <p className="font-bold">Lab Tests</p>
                <p className="text-white-200">-none-</p>
            </div>
        </div>    
      </CardBody>
    </CardContainer>
  );
}
