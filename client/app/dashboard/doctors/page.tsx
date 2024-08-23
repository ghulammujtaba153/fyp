"use client";
import { DoctorList } from '@/components/DoctorList';
import Filters from '@/components/Filters';
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const Doctor = () => {
  
  return (
    <>
        <div className="bg-black-100 py-[40px] text-white flex items-center flex-col">
            <div className="w-full mx-auto mr-10 flex items-center justify-around">
                <Filters/>
                <Input id="text" placeholder="search" type="text"/>
            </div>
            <div>
                <DoctorList/>
            </div>
        </div>
    </>
  );
};

export default Doctor;
