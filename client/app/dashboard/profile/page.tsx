"use client";

import React from 'react';
import DashboardLayout from '../DashboardLayout';
import { Input } from '@/components/ui/input';


const Profile = () => {
  return (
    <DashboardLayout>
      <div className='flex flex-col items-center justify-center gap-6'>
        <img src="/noise.webp" alt="p" className='w-[70px] h-[70px] rounded-full'/>
        <div className='flex flex-col items-center justify-center gap-6'>
            <Input type="text" name="name" value={"Ali"} />
            <Input type="text" name="name" value={"ali@gmail.com"} />
            <Input type="password" name="" placeholder='enter new password' />
        </div>
        <Input type="submit" value={"Submit"} className="cursor-pointer bg-green-600"/>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
