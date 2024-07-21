"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { Home, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

const DashboardLayout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments.pop() || 'dashboard';
    setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
  }, [pathname]);

  const handleItemClick = (item: String) => {
    setActiveItem(item);
    if (item=="Dashboard"){
        router.push(`/dashboard`);
    }else{
        router.push(`/dashboard/${item.toLowerCase()}`);
    }
  };

  return (
    <div className='flex items-center bg-black-100'>
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
            text="Settings"
            href="/dashboard/settings"
            active={activeItem === 'Settings'}
            onClick={() => handleItemClick('Settings')}
          />
        </Sidebar>
      </div>
      <div className='flex flex-col justify-center w-full gap-6 items-center m-5'>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
