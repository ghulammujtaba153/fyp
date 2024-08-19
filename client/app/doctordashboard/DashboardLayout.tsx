"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { BellIcon, Home, LogOut, MessageCircleMore, Settings, Star, TestTubeDiagonal } from 'lucide-react';
import React, { useEffect, useState, useContext } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import DashNavBar from '@/components/dashboard/DashNavBar';

const DashboardLayout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments.pop() || 'dashboard';
    if(lastSegment=="doctordashboard"){
      setActiveItem("Dashboard");
    }else{
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    }
    // setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    
  }, [pathname]);

  const handleItemClick = (item: String) => {
    setActiveItem(item);
    if (item=="Dashboard"){
        router.push(`/doctordashboard`);
    }else{
        router.push(`/doctordashboard/${item.toLowerCase()}`);
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
            href="/doctordashboard"
            active={activeItem === 'Dashboard'}
            onClick={() => handleItemClick('Dashboard')}
          />
          <SidebarItem
            icon={<HiUser />}
            text="Profile"
            href="/doctordashboard/profile"
            active={activeItem === 'Profile'}
            onClick={() => handleItemClick('Profile')}
          />
          <SidebarItem
            icon={<Settings />}
            text="Appointments"
            href="/doctordashboard/appointments"
            active={activeItem === 'Appointments'}
            onClick={() => handleItemClick('Appointments')}
          />
          <SidebarItem
            icon={<MessageCircleMore />}
            text="Chats"
            href="/doctordashboard/chats"
            active={activeItem === 'Chats'}
            onClick={() => handleItemClick('Chats')}
          />
          
        </Sidebar>
      </div>
      
      <div className='flex flex-col  w-full gap-6 items-center m-5'>
      <div className='w-full flex flex-end'>
      <DashNavBar/>
      </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
