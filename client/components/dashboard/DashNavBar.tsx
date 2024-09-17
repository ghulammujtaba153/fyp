"use client";
import { UserContext } from '@/context/UserContext';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const DashNavBar = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/notifications/${user._id}`);
        setNotifications(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="text-white w-full flex gap-5 items-center justify-end p-4">
      <div className="relative">
        <Box
          sx={{ color: 'white' }}
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center cursor-pointer p-2 hover:bg-gray-100/50 rounded-full"
        >
          <Badge color="secondary" variant="dot" invisible={!notifications.length}>
            <NotificationsNoneIcon />
          </Badge>
        </Box>

        {open && (
          <div className="absolute right-0 mt-2 w-80 bg-black-default rounded-md text-gray-100 z-10">
            <p className="p-2 border-b border-gray-500">Notifications</p>
            <div className="flex flex-col p-2 overflow-y-scroll max-h-60">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification._id} className="flex items-start justify-between p-4 hover:bg-gray-700 cursor-pointer">
                    <div>
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-gray-400">{new Date(notification.date).toLocaleString()}</span>
                    </div>
                    <div>
                      {!notification.read && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">New</span>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center p-4 text-sm">No new notifications</p>
              )}
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
