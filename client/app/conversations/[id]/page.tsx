"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { Phone, Send } from 'lucide-react';

const ConversationPage = ({ params }: { params: { id: string } }) => {
  const [conversation, setConversation] = useState(null);
  const router = useRouter();
  console.log(params.id);

  return (
    <div className='flex flex-col max-w-[1000px] h-screen bg-red-100 mx-auto'>
        <div className='flex items-center justify-between p-4 bg-red-300'>
            <div className="flex items-center">
                <img src="" alt="" className='w-[40px] h-[40px] rounded-full'/>
                <p>Name</p>
            </div>
            <div className='p-5 cursor-pointer'>
                <Phone />
            </div>
            
        </div>

        <div className="flex-grow w-full bg-red-200 overflow-auto">
            <p>ppp</p>
        </div>
        
        <div className="flex items-center w-full p-4 bg-red-300">
            <input type="text" placeholder='write your message...' className="w-full p-2 border border-gray-300 rounded-md"/>
            <div className="p-6 bg-green-300 cursor-pointer ml-2">
                <Send />
            </div>
        </div>
    </div>
  );
};

export default ConversationPage;
