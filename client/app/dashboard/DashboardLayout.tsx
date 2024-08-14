"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { BellIcon, Home, LogOut, Settings, Star, TestTubeDiagonal } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { UserContext } from '@/context/UserContext';

const DashboardLayout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments.pop() || 'dashboard';
    setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
  }, [pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === "Dashboard") {
      router.push(`/dashboard`);
    } else {
      router.push(`/dashboard/${item.toLowerCase()}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className='flex bg-black-100'>
      <div className='flex'>
        <Sidebar>
          <SidebarItem
            icon={<Home />}
            text="Dashboard"
            href="/dashboard"
            active={activeItem === 'Dashboard'}
            onClick={() => handleItemClick('Dashboard')}
          />
          <SidebarItem
            icon={<HiUser />}
            text="Profile"
            href="/dashboard/profile"
            active={activeItem === 'Profile'}
            onClick={() => handleItemClick('Profile')}
          />
          <SidebarItem
            icon={<Settings />}
            text="Appointments"
            href="/dashboard/appointments"
            active={activeItem === 'Appointments'}
            onClick={() => handleItemClick('Appointments')}
          />
          <SidebarItem
            icon={<TestTubeDiagonal />}
            text="Lab Tests"
            href="/dashboard/labtests"
            active={activeItem === 'Labtests'}
            onClick={() => handleItemClick('Labtests')}
          />
          <SidebarItem
            icon={<Star />}
            text="Favorites"
            href="/dashboard/favorites"
            active={activeItem === 'Favorites'}
            onClick={() => handleItemClick('Favorites')}
          />
        </Sidebar>
      </div>
      <div className='flex flex-col w-full gap-6 items-center m-5'>
        <div className='w-full flex flex-end'>
          <div className='text-white w-full flex gap-5 items-center justify-end mr-0'>
            <BellIcon />
            {user && user.profile ? (
              <img src={user.profile} className="w-[40px] h-[40px] rounded-full" alt="Profile" />
            ) : (
              <div className="w-[40px] h-[40px] rounded-full bg-gray-500" />
            )}
            <p className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
              logout <LogOut />
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
