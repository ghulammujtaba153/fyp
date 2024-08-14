"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { BellIcon, Home, Settings, Star, TestTubeDiagonal } from 'lucide-react';
import React, { useEffect, useState, useContext } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";

const DashboardLayout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments.pop() || 'dashboard';
    if(lastSegment=="admin"){
      setActiveItem("Dashboard");
    }else{
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    }
    // setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    
  }, [pathname]);

  const handleItemClick = (item: String) => {
    setActiveItem(item);
    if (item=="Dashboard"){
        router.push(`/admin`);
    }else{
        router.push(`/admin/${item.toLowerCase()}`);
    }
  };

  return (
    <div className='flex bg-black-100'>
      <div className='flex'>
        <Sidebar>
          <SidebarItem
            icon={<Home />}
            text="Dashboard"
            href="/admin"
            active={activeItem === 'Dashboard'}
            onClick={() => handleItemClick('Dashboard')}
          />
          <SidebarItem
            icon={<HiUser />}
            text="Users"
            href="/admin/user"
            active={activeItem === 'Users'}
            onClick={() => handleItemClick('Users')}
          />
          
          
        </Sidebar>
      </div>
      
      <div className='flex flex-col  w-full gap-6 items-center m-5'>
      <div className='w-full flex flex-end'>
      <div className='text-white w-full flex gap-5 items-center justify-end mr-0'>
        {
          user &&<>
          
          
            <BellIcon/>
            <img src={user.profile} className="w-[40px] h-[40px] rounded-full" alt="/"/>
            </>
        }
        
      </div>
      </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
