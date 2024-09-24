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
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';

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
      const lastSegment = pathSegments[2] || 'nurse';
      console.log(lastSegment)
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    }else{
      const lastSegment = pathSegments.pop() || 'nurse';
      console.log(lastSegment)
      if(lastSegment=="nurse"){
        setActiveItem("Home");
      }else{
        setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
      }

    }
    
  }, [pathname]);

  const handleItemClick = (item: String) => {
    console.log(item)
    setActiveItem(item);
    if (item=="Home"){
        router.push(`/nurse`);
    }else{
        router.push(`/nurse/${item.toLowerCase()}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className='flex bg-gray-100'>
      <div className='flex'>
        <Sidebar>
          <SidebarItem
            icon={<Home />}
            text="Home"
            href="/nurse"
            active={activeItem === 'Home'}
            onClick={() => handleItemClick('Home')}
          />

          <SidebarItem
            icon={<PlaylistAddIcon />}
            text="Tests"
            href="/tests"
            active={activeItem === 'Tests'}
            onClick={() => handleItemClick('Tests')}
          />

          <SidebarItem
            icon={<PlaylistAddCheckCircleIcon />}
            text="List"
            href="/list"
            active={activeItem === 'List'}
            onClick={() => handleItemClick('List')}
          />

          <SidebarItem
            icon={<QueuePlayNextIcon />}
            text="Appointments"
            href="/appointments"
            active={activeItem === 'Appointments'}
            onClick={() => handleItemClick('Appointments')}
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
      
      <div className='flex flex-col  w-full gap-6 items-center m-5 '>
      <div className='w-full flex flex-end'>
      <DashNavBar/>
      </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
