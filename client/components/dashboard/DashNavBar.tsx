"use client";
import { UserContext } from '@/context/UserContext';
import { BellIcon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

const DashNavBar = () => {
    const { user, logout } = useContext(UserContext);
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div className='text-white w-full flex gap-5 items-center justify-end p-4'>
            <div className='relative'>
                <div onClick={() => setOpen(!open)} className='flex items-center justify-center cursor-pointer p-2 bg-gray-400 rounded-md'>
                    <BellIcon  />
                </div>
                
                {open && (
                    <div className='absolute bg-black-default right-0 mt-2 w-80 bg-black rounded-md text-gray-100 z-10'>
                        <p className='p-2 border-b border-gray-500'>Notifications</p>
                        <div className='flex flex-col p-2 overflow-y-scroll max-h-60'>
                            <div className='flex items-center justify-between p-4'>
                                <p>Sample Notification</p>
                                <span className='text-xs text-gray-400'>Date and time</span>
                            </div>
                            <div className='w-full bg-gray-300 h-[1px]'></div>
                            {/* Add more notification items here */}
                        </div>
                    </div>
                )}
            </div>

            {user && user.profile ? (
                <img src={user.profile} className="w-[40px] h-[40px] rounded-full" alt="Profile" />
            ) : (
                <div className="w-[40px] h-[40px] rounded-full bg-gray-500" />
            )}
            <p className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                Logout <LogOut />
            </p>
        </div>
    );
};

export default DashNavBar;
