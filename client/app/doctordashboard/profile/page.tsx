"use client";

import React from 'react';
import DashboardLayout from '../DashboardLayout';
import { Input } from '@/components/ui/input';

const Profile: React.FC = () => {
  const [name, setName] = React.useState<string>("Ali");
  const [email, setEmail] = React.useState<string>("ali@gmail.com");
  const [password, setPassword] = React.useState<string>("");
  const [education, setEducation] = React.useState<string>("Education");
  const [description, setDescription] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-6'>
        <img src="/noise.webp" alt="Profile Picture" className='w-[70px] h-[70px] rounded-full'/>
        <div className='flex flex-col items-center justify-center gap-6'>
          <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" name="password" placeholder='Enter new password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input type="text" name="education" value={education} onChange={(e) => setEducation(e.target.value)} />
          <textarea className="rounded-md" rows={4} placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <Input type="submit" value="Submit" className="cursor-pointer bg-green-600"/>
      </form>
    </DashboardLayout>
  );
};

export default Profile;
