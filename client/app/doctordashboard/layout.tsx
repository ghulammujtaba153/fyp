"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { BellIcon, Bot, Home, LogOut, MessageCircleMore, MessagesSquare,NotebookText, Settings, Star, TestTubeDiagonal } from 'lucide-react';
import React, { useEffect, useState, useContext } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import DashNavBar from '@/components/dashboard/DashNavBar';

const layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    console.log(pathSegments)
    if (pathSegments.length > 3) {
      console.log(pathSegments[2])
      const lastSegment = pathSegments[2] || 'dashboard';
      console.log(lastSegment)
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    }else{
      const lastSegment = pathSegments.pop() || 'dashboard';
      console.log(lastSegment)
      if(lastSegment==="doctordashboard"){
        setActiveItem("Dashboard");
      }else{
        setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
      }
      

    }
    
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
            icon={<Home size={24}/>}
            text="Dashboard"
            href="/doctordashboard"
            active={activeItem === 'Dashboard'}
            onClick={() => handleItemClick('Dashboard')}
          />
          <SidebarItem
            icon={<HiUser size={24}/>}
            text="Profile"
            href="/doctordashboard/profile"
            active={activeItem === 'Profile'}
            onClick={() => handleItemClick('Profile')}
          />
          <SidebarItem
            icon={<NotebookText size={24}/>}
            text="Appointments"
            href="/doctordashboard/appointments"
            active={activeItem === 'Appointments'}
            onClick={() => handleItemClick('Appointments')}
          />
          <SidebarItem
            icon={<MessageCircleMore size={24}/>}
            text="Chats"
            href="/doctordashboard/chats"
            active={activeItem === 'Chats'}
            onClick={() => handleItemClick('Chats')}
          />

          <SidebarItem
            icon={<MessagesSquare size={24}/>}
            text="Feedback"
            href="/doctordashboard/feedback"
            active={activeItem === 'Feedback'}
            onClick={() => handleItemClick('Feedback')}
          />

          <SidebarItem
            icon={<Bot size={24}/>}
            text="Medicalbot"
            href="/doctordashboard/medicalbot"
            active={activeItem === 'Medicalbot'}
            onClick={() => handleItemClick('Medicalbot')}
          />

        <SidebarItem
            icon={<LogOut size={24}/>}
            text="Logout"
            href="/"
            active={activeItem === 'Logout'}
            onClick={() => handleLogout()}
          />
          
        </Sidebar>
      </div>
      
      <div className='flex flex-col  w-full gap-6 items-center'>
      <div className='w-full flex flex-end'>
      <DashNavBar/>
      </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
