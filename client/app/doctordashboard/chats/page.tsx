"use client";

import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import ChatComponent from '@/components/dashboard/ChatComponent';



const ChatPage = () => {
    

    return (
        <>
            <div>Chat Page</div>
            <ChatComponent/>
        </>
    );
};

export default ChatPage;
