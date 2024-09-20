"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { BellIcon, Home, LogOut, LucideLogOut, MessageCircleMore, MessagesSquare, Settings, Star, TestTubeDiagonal } from 'lucide-react';
import React, { useEffect, useState, useContext } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import DashNavBar from '@/components/dashboard/DashNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';

const layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    console.log(pathSegments);
    if (pathSegments.length > 3) {
      console.log(pathSegments[2])
      const lastSegment = pathSegments[2] || 'admin';
      console.log(lastSegment)
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    }else{
      const lastSegment = pathSegments.pop() || 'admin';
      console.log(lastSegment);
      console.log(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
      if (lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) == "Admin"){
        setActiveItem("Home");
      }else{
        setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
      }
      // setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));

    }
    
  }, [pathname]);

  const handleItemClick = (item: String) => {
    setActiveItem(item);
    console.log(item)
    if (item=="Home"){
        router.push(`/admin`);
    }else{
        router.push(`/admin/${item.toLowerCase()}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className='flex bg-gray-100 text-black-default'>
      <div className='flex'>
        <Sidebar>
          <SidebarItem
            icon={<Home />}
            text="Home"
            href="/admin"
            active={activeItem === 'Home'}
            onClick={() => handleItemClick('Home')}
          />
          <SidebarItem
            icon={<FontAwesomeIcon icon={faHospitalUser} />}
            text="Users"
            href="/admin/users"
            active={activeItem === 'Users'}
            onClick={() => handleItemClick('Users')}
          />

          <SidebarItem
            icon={<FontAwesomeIcon icon={faUserMd} />}
            text="Doctors"
            href="/admin/doctors"
            active={activeItem === 'Doctors'}
            onClick={() => handleItemClick('Doctors')}
          />

          <SidebarItem
            icon={<FontAwesomeIcon icon={faBedPulse} />}
            text="Patients"
            href="/admin/patients"
            active={activeItem === 'Patients'}
            onClick={() => handleItemClick('Patients')}
          />

          <SidebarItem
            icon={<FontAwesomeIcon icon={faBedPulse} />}
            text="Appointments"
            href="/admin/appointments"
            active={activeItem === 'Appointments'}
            onClick={() => handleItemClick('Appointments')}
          />

          <SidebarItem
            icon={<MessagesSquare />}
            text="Feedback"
            href="/admin/feedback"
            active={activeItem === 'Feedback'}
            onClick={() => handleItemClick('Feedback')}
          />

        <SidebarItem
            icon={<LucideLogOut />}
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
