"use client";

import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import ChatComponent from '@/components/dashboard/ChatComponent';



const ChatPage = () => {
    

    return (
        <DashboardLayout>
            <div>Chat Page</div>
            <ChatComponent/>
        </DashboardLayout>
    );
};

export default ChatPage;
