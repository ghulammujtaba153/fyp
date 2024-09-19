// "use client";

// import Sidebar from '@/components/dashboard/Sidebar';
// import { SidebarItem } from '@/components/dashboard/SidebarItem';
// import { BellIcon, Home, LogOut, MessageCircleMore, NotebookText, Settings, Star, TestTubeDiagonal } from 'lucide-react';
// import React, { useContext, useEffect, useState } from 'react';
// import { HiUser } from 'react-icons/hi';
// import { useRouter, usePathname } from 'next/navigation';
// import { UserContext } from '@/context/UserContext';
// import DashNavBar from '@/components/dashboard/DashNavBar';

// // FontAwesome imports
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserMd } from '@fortawesome/free-solid-svg-icons';

// const Layout = ({ children }) => {
//   const [activeItem, setActiveItem] = useState('Dashboard');
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, logout } = useContext(UserContext);



//   useEffect(() => {
//     const pathSegments = pathname.split('/');
//     console.log(pathSegments)
//     if (pathSegments.length > 3) {
//       console.log(pathSegments[2])
//       const lastSegment = pathSegments[2] || 'dashboard';
//       console.log(lastSegment)
//       setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
//     }else{
//       const lastSegment = pathSegments.pop() || 'dashboard';
//       setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));

//     }
    
//   }, [pathname]);

//   const handleItemClick = (item) => {
//     setActiveItem(item);
//     if (item === "Dashboard") {
//       router.push(`/dashboard`);
//     } else {
//       router.push(`/dashboard/${item.toLowerCase()}`);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   return (
//     <div className='flex bg-black-100'>
//       <div className='flex'>
//         <Sidebar>
//           <SidebarItem
//             icon={<Home />}
//             text="Dashboard"
//             href="/dashboard"
//             active={activeItem === 'Dashboard'}
//             onClick={() => handleItemClick('Dashboard')}
//           />
//           <SidebarItem
//             icon={<HiUser />}
//             text="Profile"
//             href="/dashboard/profile"
//             active={activeItem === 'Profile'}
//             onClick={() => handleItemClick('Profile')}
//           />
//           <SidebarItem
//             icon={<FontAwesomeIcon icon={faUserMd} />}
//             text="Doctors"
//             href="/dashboard/doctors"
//             active={activeItem === 'Doctors'}
//             onClick={() => handleItemClick('Doctors')}
//           />
//           <SidebarItem
//             icon={<NotebookText />}
//             text="Appointments"
//             href="/dashboard/appointments"
//             active={activeItem === 'Appointments'}
//             onClick={() => handleItemClick('Appointments')}
//           />
          
//           <SidebarItem
//             icon={<MessageCircleMore />}
//             text="Chats"
//             href="/dashboard/chats"
//             active={activeItem === 'Chats'}
//             onClick={() => handleItemClick('Chats')}
//           />
//           <SidebarItem
//             icon={<TestTubeDiagonal />}
//             text="Lab Tests"
//             href="/dashboard/labtests"
//             active={activeItem === 'Labtests'}
//             onClick={() => handleItemClick('Labtests')}
//           />
//           <SidebarItem
//             icon={<Star />}
//             text="Favorites"
//             href="/dashboard/favorites"
//             active={activeItem === 'Favorites'}
//             onClick={() => handleItemClick('Favorites')}
//           />
//         </Sidebar>
//       </div>
//       <div className='flex flex-col w-full gap-6 items-center m-5'>
//         <div className='w-full flex flex-end'>
//         <DashNavBar/>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;


"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { BellIcon, Home, LogOut, MessageCircleMore, MessagesSquare, NotebookText, Settings, Star, TestTubeDiagonal } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter, usePathname } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import DashNavBar from '@/components/dashboard/DashNavBar';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    if (pathSegments.length > 3) {
      const lastSegment = pathSegments[2] || 'dashboard';
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    } else {
      const lastSegment = pathSegments.pop() || 'dashboard';
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    }
  }, [pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);

    if (item === "Appointments") {
      setIsSubMenuVisible(!isSubMenuVisible); // Toggle sub-menu visibility
    } else {
      setIsSubMenuVisible(false);
      if (item === "Dashboard") {
        router.push(`/dashboard`);
      } else {
        router.push(`/dashboard/${item.toLowerCase()}`);
      }
    }
  };

  const handleSubItemClick = (subItem) => {
    if (subItem === 'Doctor') {
      router.push(`/dashboard/appointments`);
    } else if (subItem === 'Lab') {
      router.push(`/dashboard/testAppointments`);
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
            href="/dashboard"
            active={activeItem === 'Dashboard'}
            onClick={() => handleItemClick('Dashboard')}
          />
          <SidebarItem
            icon={<HiUser size={24}/>}
            text="Profile"
            href="/dashboard/profile"
            active={activeItem === 'Profile'}
            onClick={() => handleItemClick('Profile')}
          />
          <SidebarItem
            icon={<FontAwesomeIcon icon={faUserMd} size="lg"/>}
            text="Doctors"
            href="/dashboard/doctors"
            active={activeItem === 'Doctors'}
            onClick={() => handleItemClick('Doctors')}
          />
          <SidebarItem
            icon={<NotebookText size={24}/>}
            text="Appointments"
            href="/dashboard/"
            active={activeItem === 'Appointments'}
            onClick={() => handleItemClick('Appointments')}
          />
          {isSubMenuVisible && (
            <div className="ml-6">
              <SidebarItem
                icon={<FontAwesomeIcon icon={faUserMd} size="lg"/>}
                text="Doctor"
                href="/dashboard/appointments"
                active={pathname.includes('/appointments')}
                onClick={() => handleSubItemClick('Doctor')}
              />
              <SidebarItem
                icon={<TestTubeDiagonal size={24}/>}
                text="Lab"
                href="/dashboard/testAppointments"
                active={pathname.includes('/testAppointments')}
                onClick={() => handleSubItemClick('Lab')}
              />
            </div>
          )}
          <SidebarItem
            icon={<MessageCircleMore size={24}/>}
            text="Chats"
            href="/dashboard/chats"
            active={activeItem === 'Chats'}
            onClick={() => handleItemClick('Chats')}
          />
          <SidebarItem
            icon={<TestTubeDiagonal size={24}/>}
            text="Lab Tests"
            href="/dashboard/labtests"
            active={activeItem === 'Labtests'}
            onClick={() => handleItemClick('Labtests')}
          />
          <SidebarItem
            icon={<MessagesSquare size={24}/>}
            text="Feedback"
            href="/dashboard/feedback"
            active={activeItem === 'Feedback'}
            onClick={() => handleItemClick('Feedback')}
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
      <div className='flex flex-col w-full gap-6'>
        <div className='w-full flex flex-end'>
          <DashNavBar />
        </div>
        <div className="w-full pr-3">
        {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
